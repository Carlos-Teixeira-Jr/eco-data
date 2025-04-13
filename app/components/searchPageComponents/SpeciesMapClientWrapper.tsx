'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SpeciesMap = dynamic(() => import('./SpeciesMap'), {
  ssr: false,
});

export default function SpeciesMapClientWrapper({ taxonKey }: { taxonKey: number }) {
  return (
    <Suspense fallback={<p>Carregando mapa...</p>}>
      <SpeciesMap taxonKey={taxonKey} />
    </Suspense>
  );
}
