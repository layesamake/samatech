<?php
/**
 * Plugin Name: Samatech — Réalisations
 * Description: Gère les réalisations (portfolio) affichées sur samatech.cloud : fiches projet, localisation pour la carte des clients, import initial et mise à jour immédiate du site.
 * Version: 1.0.0
 * Requires at least: 6.4
 * Requires PHP: 8.0
 * Author: Samatech
 * Text Domain: samatech-realisations
 */

if (!defined('ABSPATH')) {
	exit;
}

const SAMATECH_REAL_CPT = 'realisation';
const SAMATECH_REAL_OPTION = 'samatech_realisations_settings';

/** Champs de la fiche, stockés en métadonnées. */
function samatech_real_fields(): array {
	return [
		'client'       => ['label' => 'Client', 'type' => 'string'],
		'category'     => ['label' => 'Type de projet', 'type' => 'string', 'choices' => ['website' => 'Site web', 'application' => 'Application web', 'saas' => 'Logiciel SaaS']],
		'status'       => ['label' => 'Statut', 'type' => 'string', 'choices' => ['en-ligne' => 'En ligne', 'version-de-travail' => 'Version de travail', 'en-cours' => 'En cours de réalisation']],
		'url'          => ['label' => 'Adresse du site', 'type' => 'string', 'help' => 'Laisser vide si le projet n’est pas encore en ligne.'],
		'sector'       => ['label' => 'Secteur', 'type' => 'string'],
		'city'         => ['label' => 'Ville', 'type' => 'string'],
		'country'      => ['label' => 'Pays', 'type' => 'string'],
		'country_code' => ['label' => 'Code pays (2 lettres)', 'type' => 'string', 'help' => 'Exemples : SN, ML, BE, CN.'],
		'lat'          => ['label' => 'Latitude', 'type' => 'number', 'help' => 'Position sur la carte. Exemple pour Thiès : 14.791'],
		'lng'          => ['label' => 'Longitude', 'type' => 'number', 'help' => 'Exemple pour Thiès : -16.9359'],
		'features'     => ['label' => 'Fonctionnalités', 'type' => 'string', 'multiline' => true, 'help' => 'Une fonctionnalité par ligne.'],
		'technologies' => ['label' => 'Technologies', 'type' => 'string', 'help' => 'Séparées par des virgules.'],
	];
}

/* -------------------------------------------------------------------------
 * Type de contenu et champs
 * ---------------------------------------------------------------------- */

add_action('init', function () {
	register_post_type(SAMATECH_REAL_CPT, [
		'labels' => [
			'name'               => 'Réalisations',
			'singular_name'      => 'Réalisation',
			'add_new'            => 'Ajouter',
			'add_new_item'       => 'Ajouter une réalisation',
			'edit_item'          => 'Modifier la réalisation',
			'new_item'           => 'Nouvelle réalisation',
			'view_item'          => 'Voir la réalisation',
			'search_items'       => 'Rechercher une réalisation',
			'not_found'          => 'Aucune réalisation',
			'not_found_in_trash' => 'Aucune réalisation dans la corbeille',
			'all_items'          => 'Toutes les réalisations',
			'menu_name'          => 'Réalisations',
		],
		'public'             => false,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'show_in_rest'       => true,
		'menu_icon'          => 'dashicons-portfolio',
		'menu_position'      => 5,
		'supports'           => ['title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'],
		'has_archive'        => false,
		'rewrite'            => false,
	]);

	foreach (samatech_real_fields() as $key => $field) {
		register_post_meta(SAMATECH_REAL_CPT, $key, [
			'type'          => $field['type'],
			'single'        => true,
			'show_in_rest'  => true,
			'auth_callback' => fn() => current_user_can('edit_posts'),
		]);
	}
});

// Titres d'aide dans l'éditeur
add_filter('enter_title_here', fn($text, $post) => $post->post_type === SAMATECH_REAL_CPT ? 'Titre du projet (ex. : Site d’un fabricant de machines agricoles)' : $text, 10, 2);

add_action('add_meta_boxes', function () {
	add_meta_box('samatech_real_fields', 'Fiche du projet', 'samatech_real_render_box', SAMATECH_REAL_CPT, 'normal', 'high');
});

function samatech_real_render_box(WP_Post $post): void {
	wp_nonce_field('samatech_real_save', 'samatech_real_nonce');
	echo '<p style="margin-top:0">Le <strong>titre</strong> est le nom du projet, le <strong>contenu</strong> sa description (un paragraphe par bloc), l’<strong>extrait</strong> le résumé affiché sur les cartes et l’<strong>image mise en avant</strong> la capture du site. L’ordre d’affichage se règle dans « Attributs › Ordre ».</p>';
	echo '<table class="form-table" role="presentation"><tbody>';
	foreach (samatech_real_fields() as $key => $field) {
		$value = get_post_meta($post->ID, $key, true);
		$id    = 'samatech_real_' . $key;
		echo '<tr><th scope="row"><label for="' . esc_attr($id) . '">' . esc_html($field['label']) . '</label></th><td>';
		if (!empty($field['choices'])) {
			echo '<select id="' . esc_attr($id) . '" name="samatech_real[' . esc_attr($key) . ']">';
			foreach ($field['choices'] as $choice => $label) {
				echo '<option value="' . esc_attr($choice) . '"' . selected($value, $choice, false) . '>' . esc_html($label) . '</option>';
			}
			echo '</select>';
		} elseif (!empty($field['multiline'])) {
			echo '<textarea id="' . esc_attr($id) . '" name="samatech_real[' . esc_attr($key) . ']" rows="6" class="large-text">' . esc_textarea((string) $value) . '</textarea>';
		} else {
			$type = $field['type'] === 'number' ? 'number" step="any' : ($key === 'url' ? 'url' : 'text');
			echo '<input id="' . esc_attr($id) . '" type="' . $type . '" name="samatech_real[' . esc_attr($key) . ']" value="' . esc_attr((string) $value) . '" class="regular-text">';
		}
		if (!empty($field['help'])) {
			echo '<p class="description">' . esc_html($field['help']) . '</p>';
		}
		echo '</td></tr>';
	}
	echo '</tbody></table>';
}

add_action('save_post_' . SAMATECH_REAL_CPT, function (int $post_id) {
	if (!isset($_POST['samatech_real_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['samatech_real_nonce'])), 'samatech_real_save')) {
		return;
	}
	if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || !current_user_can('edit_post', $post_id)) {
		return;
	}
	$input = isset($_POST['samatech_real']) ? (array) wp_unslash($_POST['samatech_real']) : [];
	samatech_real_save_fields($post_id, $input);
});

function samatech_real_save_fields(int $post_id, array $input): void {
	foreach (samatech_real_fields() as $key => $field) {
		if (!array_key_exists($key, $input)) {
			continue;
		}
		$raw = $input[$key];
		if ($field['type'] === 'number') {
			$value = is_numeric($raw) ? (float) $raw : '';
		} elseif ($key === 'url') {
			$value = esc_url_raw((string) $raw);
		} elseif (!empty($field['multiline'])) {
			$value = sanitize_textarea_field((string) $raw);
		} else {
			$value = sanitize_text_field((string) $raw);
		}
		if (!empty($field['choices']) && !array_key_exists($value, $field['choices'])) {
			$value = array_key_first($field['choices']);
		}
		if ($key === 'country_code') {
			$value = strtoupper(substr($value, 0, 2));
		}
		update_post_meta($post_id, $key, $value);
	}
}

/* -------------------------------------------------------------------------
 * API lue par samatech.cloud : /wp-json/samatech/v1/realisations
 * ---------------------------------------------------------------------- */

add_action('rest_api_init', function () {
	register_rest_route('samatech/v1', '/realisations', [
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => function () {
			$posts = get_posts([
				'post_type'      => SAMATECH_REAL_CPT,
				'post_status'    => 'publish',
				'posts_per_page' => 200,
				'orderby'        => ['menu_order' => 'ASC', 'date' => 'DESC'],
			]);
			return rest_ensure_response(array_map('samatech_real_to_array', $posts));
		},
	]);
});

function samatech_real_paragraphs(string $content): array {
	$content = preg_replace('/<!--.*?-->/s', '', $content);
	$parts   = preg_split('/<\/p>|\n\s*\n/i', $content);
	$parts   = array_map(fn($p) => trim(html_entity_decode(wp_strip_all_tags($p), ENT_QUOTES, 'UTF-8')), $parts);
	return array_values(array_filter($parts, fn($p) => $p !== ''));
}

function samatech_real_to_array(WP_Post $post): array {
	$meta  = fn(string $key) => get_post_meta($post->ID, $key, true);
	$lines = fn(string $text, string $separator) => array_values(array_filter(array_map('trim', explode($separator, (string) $text)), fn($v) => $v !== ''));
	$image = get_the_post_thumbnail_url($post, 'large');

	return [
		'slug'         => $post->post_name,
		'client'       => (string) $meta('client'),
		'title'        => html_entity_decode(get_the_title($post), ENT_QUOTES, 'UTF-8'),
		'category'     => $meta('category') ?: 'website',
		'status'       => $meta('status') ?: 'en-ligne',
		'url'          => $meta('url') ?: null,
		'country'      => (string) $meta('country'),
		'countryCode'  => (string) $meta('country_code'),
		'city'         => (string) $meta('city'),
		'lat'          => (float) $meta('lat'),
		'lng'          => (float) $meta('lng'),
		'sector'       => (string) $meta('sector'),
		'summary'      => trim(wp_strip_all_tags($post->post_excerpt)),
		'description'  => samatech_real_paragraphs($post->post_content),
		'features'     => $lines($meta('features'), "\n"),
		'technologies' => $lines($meta('technologies'), ','),
		'image'        => $image ?: null,
	];
}

/* -------------------------------------------------------------------------
 * Réglages : adresse du site et mise à jour immédiate
 * ---------------------------------------------------------------------- */

function samatech_real_settings(): array {
	return wp_parse_args(get_option(SAMATECH_REAL_OPTION, []), [
		'site_url' => 'https://samatech.cloud',
		'secret'   => '',
	]);
}

// Prévient samatech.cloud qu'une réalisation a changé (publication, mise à jour, corbeille)
function samatech_real_notify_site(): void {
	$settings = samatech_real_settings();
	if ($settings['secret'] === '' || !empty($GLOBALS['samatech_real_importing'])) {
		return;
	}
	wp_remote_post(trailingslashit($settings['site_url']) . 'api/revalidate', [
		'timeout'  => 5,
		'blocking' => false,
		'headers'  => ['x-revalidate-secret' => $settings['secret']],
	]);
}

// Dépublication ou mise à la corbeille
add_action('transition_post_status', function ($new, $old, $post) {
	if ($post->post_type === SAMATECH_REAL_CPT && $old === 'publish' && $new !== 'publish') {
		samatech_real_notify_site();
	}
}, 10, 3);

// Publication ou mise à jour : après l'enregistrement des champs (priorité 10)
add_action('save_post_' . SAMATECH_REAL_CPT, function ($post_id, $post) {
	if ($post->post_status === 'publish' && !wp_is_post_revision($post_id)) {
		samatech_real_notify_site();
	}
}, 20, 2);

/* -------------------------------------------------------------------------
 * Page « Réalisations › Réglages et import »
 * ---------------------------------------------------------------------- */

add_action('admin_menu', function () {
	add_submenu_page(
		'edit.php?post_type=' . SAMATECH_REAL_CPT,
		'Réglages et import',
		'Réglages et import',
		'manage_options',
		'samatech-realisations',
		'samatech_real_render_settings'
	);
});

function samatech_real_render_settings(): void {
	if (!current_user_can('manage_options')) {
		return;
	}
	$notice = '';

	if (isset($_POST['samatech_real_action']) && check_admin_referer('samatech_real_admin')) {
		$action = sanitize_key(wp_unslash($_POST['samatech_real_action']));
		if ($action === 'save') {
			update_option(SAMATECH_REAL_OPTION, [
				'site_url' => esc_url_raw(wp_unslash($_POST['site_url'] ?? '')) ?: 'https://samatech.cloud',
				'secret'   => sanitize_text_field(wp_unslash($_POST['secret'] ?? '')),
			]);
			$notice = 'Réglages enregistrés.';
		} elseif ($action === 'import') {
			$notice = samatech_real_import();
		} elseif ($action === 'notify') {
			samatech_real_notify_site();
			$notice = 'Demande de mise à jour envoyée au site.';
		}
	}

	$settings = samatech_real_settings();
	?>
	<div class="wrap">
		<h1>Réalisations — réglages et import</h1>
		<?php if ($notice) : ?>
			<div class="notice notice-success is-dismissible"><p><?php echo wp_kses_post($notice); ?></p></div>
		<?php endif; ?>

		<h2>Site public</h2>
		<form method="post">
			<?php wp_nonce_field('samatech_real_admin'); ?>
			<input type="hidden" name="samatech_real_action" value="save">
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="site_url">Adresse du site</label></th>
					<td><input id="site_url" name="site_url" type="url" class="regular-text" value="<?php echo esc_attr($settings['site_url']); ?>"></td>
				</tr>
				<tr>
					<th scope="row"><label for="secret">Clé de mise à jour</label></th>
					<td>
						<input id="secret" name="secret" type="password" class="regular-text" value="<?php echo esc_attr($settings['secret']); ?>" autocomplete="off">
						<p class="description">La même valeur que la variable <code>REVALIDATE_SECRET</code> du site sur Hostinger. Sans clé, le site se met à jour au plus tard une heure après chaque modification.</p>
					</td>
				</tr>
			</table>
			<?php submit_button('Enregistrer'); ?>
		</form>

		<h2>Import des fiches Samatech</h2>
		<p>Crée ou met à jour les réalisations fournies avec l’extension (retrouvées par leur identifiant : aucun doublon). Les captures sont téléchargées depuis le site public si la fiche n’a pas encore d’image. Les fiches modifiées depuis seront remplacées par la version de l’extension.</p>
		<form method="post">
			<?php wp_nonce_field('samatech_real_admin'); ?>
			<input type="hidden" name="samatech_real_action" value="import">
			<?php submit_button('Importer les fiches', 'secondary'); ?>
		</form>

		<h2>Forcer la mise à jour du site</h2>
		<form method="post">
			<?php wp_nonce_field('samatech_real_admin'); ?>
			<input type="hidden" name="samatech_real_action" value="notify">
			<?php submit_button('Mettre à jour samatech.cloud maintenant', 'secondary'); ?>
		</form>
	</div>
	<?php
}

function samatech_real_import(): string {
	$file = __DIR__ . '/realisations.json';
	$data = file_exists($file) ? json_decode((string) file_get_contents($file), true) : null;
	if (!is_array($data)) {
		return 'Fichier realisations.json introuvable ou illisible.';
	}

	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	$settings = samatech_real_settings();
	$created  = 0;
	$updated  = 0;
	$errors   = [];
	// Un seul appel au site à la fin de l'import, pas un par fiche
	$GLOBALS['samatech_real_importing'] = true;

	foreach ($data as $order => $item) {
		$existing = get_posts([
			'post_type'   => SAMATECH_REAL_CPT,
			'name'        => $item['slug'],
			'post_status' => 'any',
			'numberposts' => 1,
		]);
		$postarr = [
			'post_type'    => SAMATECH_REAL_CPT,
			'post_status'  => 'publish',
			'post_name'    => $item['slug'],
			'post_title'   => $item['title'],
			'post_excerpt' => $item['summary'],
			'post_content' => implode("\n\n", array_map(fn($p) => '<!-- wp:paragraph --><p>' . esc_html($p) . '</p><!-- /wp:paragraph -->', $item['description'])),
			'menu_order'   => $order,
		];
		if ($existing) {
			$postarr['ID'] = $existing[0]->ID;
		}
		$post_id = wp_insert_post(wp_slash($postarr), true);
		if (is_wp_error($post_id)) {
			$errors[] = esc_html($item['slug'] . ' : ' . $post_id->get_error_message());
			continue;
		}
		$existing ? $updated++ : $created++;

		samatech_real_save_fields($post_id, [
			'client'       => $item['client'],
			'category'     => $item['category'],
			'status'       => $item['status'],
			'url'          => $item['url'] ?? '',
			'sector'       => $item['sector'],
			'city'         => $item['city'],
			'country'      => $item['country'],
			'country_code' => $item['countryCode'],
			'lat'          => $item['lat'],
			'lng'          => $item['lng'],
			'features'     => implode("\n", $item['features']),
			'technologies' => implode(', ', $item['technologies']),
		]);

		if (!empty($item['image']) && !has_post_thumbnail($post_id)) {
			$image_url = untrailingslashit($settings['site_url']) . $item['image'];
			$media_id  = media_sideload_image($image_url, $post_id, $item['client'], 'id');
			if (is_wp_error($media_id)) {
				$errors[] = esc_html($item['slug'] . ' (image) : ' . $media_id->get_error_message());
			} else {
				set_post_thumbnail($post_id, $media_id);
			}
		}
	}

	$GLOBALS['samatech_real_importing'] = false;
	samatech_real_notify_site();

	$message = sprintf('%d réalisation(s) créée(s), %d mise(s) à jour.', $created, $updated);
	if ($errors) {
		$message .= '<br>Problèmes : ' . implode('<br>', $errors);
	}
	return $message;
}
