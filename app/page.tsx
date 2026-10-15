'use client';

import { Suspense } from 'react';
import { Scene } from '@/components/canvas/Scene';

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      {/* 3D Scene canvas container */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Suspense
          fallback={
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white font-mono">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-4" />
              <div className="text-xs uppercase tracking-widest text-zinc-400">
                INITIALIZING FRONTIER 3D TERMINAL...
              </div>
            </div>
          }
        >
          <Scene />
        </Suspense>
      </div>
    </main>
  );
}
