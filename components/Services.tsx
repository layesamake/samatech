import { defaultServices } from '@/lib/wordpress';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Nos Services</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg p-8 shadow hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
