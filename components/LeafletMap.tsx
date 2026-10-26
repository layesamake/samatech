// components/LeafletMap.tsx
'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { categoryLabels, type MapLocation } from '@/lib/realisations';

// Recadre la carte une fois sa taille réelle connue (le conteneur est mesuré après le chargement)
function FitBounds({ bounds }: { bounds: L.LatLngBounds }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, bounds]);
  return null;
}

function markerIcon(count: number) {
  return L.divIcon({
    className: '',
    html: `<span class="samatech-marker">${count}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16],
  });
}

interface Props {
  locations: MapLocation[];
  lang: string;
  // Fiche projet : carte centrée sur une seule ville
  zoom?: number;
  className?: string;
}

export default function LeafletMap({ locations, lang, zoom, className }: Props) {
  const single = locations.length === 1 && zoom !== undefined;
  const bounds = useMemo(
    () => L.latLngBounds(locations.map(l => [l.lat, l.lng] as [number, number])),
    [locations],
  );

  return (
    <MapContainer
      className={className}
      center={[locations[0].lat, locations[0].lng]}
      zoom={zoom ?? 3}
      minZoom={2}
      maxBounds={[[-85, -200], [85, 200]]}
      scrollWheelZoom={false}
    >
      {!single && <FitBounds bounds={bounds} />}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map(location => (
        <Marker
          key={location.key}
          position={[location.lat, location.lng]}
          icon={markerIcon(location.projects.length)}
          title={`${location.city}, ${location.country}`}
        >
          <Popup>
            <p className="font-bold text-gray-900 !m-0">
              {location.city}, {location.country}
            </p>
            <ul className="!mt-2 space-y-2">
              {location.projects.map(project => (
                <li key={project.slug}>
                  <Link
                    href={`/${lang}/realisations/${project.slug}`}
                    className="font-semibold !text-blue-700 hover:underline"
                  >
                    {project.label}
                  </Link>
                  <span className="block text-xs text-gray-600">
                    {categoryLabels[project.category]}
                    {project.label === project.client ? ` · ${project.title}` : ` · ${project.client}`}
                  </span>
                </li>
              ))}
            </ul>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
