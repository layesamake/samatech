// components/ClientsMapView.tsx
'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type LeafletMapType from './LeafletMap';

// Leaflet a besoin du navigateur (window) : la carte n'est pas rendue côté serveur
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-blue-50 flex items-center justify-center text-sm text-gray-500">
      Chargement de la carte…
    </div>
  ),
});

export default function ClientsMapView(props: ComponentProps<typeof LeafletMapType>) {
  return <LeafletMap {...props} />;
}
