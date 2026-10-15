'use client';

import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { NodeField } from './NodeField';
import { CameraController } from './CameraController';
import { Company } from '@/types/company';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface SceneProps {
  companies: Company[];
}

export function Scene({ companies }: SceneProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div className="relative w-full h-screen bg-zinc-950 overflow-hidden">
      <Canvas
        camera={{ position: [0, 20, 35], fov: 60 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#030712']} />

        {/* Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[20, 30, 20]} intensity={1.5} />
        <pointLight position={[-20, -20, -20]} intensity={0.5} />

        {/* Space background elements */}
        <Stars radius={120} depth={50} count={6000} factor={4} saturation={0.2} fade speed={0.5} />
        <gridHelper args={[120, 60, '#1e293b', '#0f172a']} position={[0, -15, 0]} />

        {/* Node Field */}
        <NodeField
          companies={companies}
          selectedCompany={selectedCompany}
          onSelectCompany={(company) => setSelectedCompany(company)}
        />

        {/* Camera Controller */}
        <CameraController selectedCompany={selectedCompany} controlsRef={controlsRef} />

        {/* Orbit Controls */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.05}
          maxDistance={120}
          minDistance={3}
        />
      </Canvas>

      {/* Temporary HUD overlay info for Milestone 3 selection & reset */}
      {selectedCompany && (
        <div className="absolute top-6 left-6 z-10 p-4 bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-2xl backdrop-blur-md text-white max-w-sm">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">
                {selectedCompany.category}
              </span>
              <h2 className="text-lg font-bold mt-1">{selectedCompany.name}</h2>
            </div>
            <button
              onClick={() => setSelectedCompany(null)}
              className="text-zinc-400 hover:text-white text-xs px-2 py-1 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
            >
              Reset
            </button>
          </div>
          <p className="text-xs text-zinc-300 line-clamp-2 mb-3">{selectedCompany.tagline}</p>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
            <span>Stage: <strong className="text-zinc-200">{selectedCompany.funding_stage}</strong></span>
            <span>Founded: <strong className="text-zinc-200">{selectedCompany.founded_year}</strong></span>
          </div>
        </div>
      )}

      {/* Instructions HUD */}
      <div className="absolute bottom-6 left-6 z-10 px-3 py-2 bg-zinc-900/85 border border-zinc-800/80 rounded-lg backdrop-blur text-xs text-zinc-400 pointer-events-none">
        <p className="font-medium text-zinc-300">FRONTIER 3D Startup Ecosystem</p>
        <p className="text-[11px] mt-0.5">Click node to inspect & focus • Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
}
