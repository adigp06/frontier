'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { NodeField } from './NodeField';
import { CameraController } from './CameraController';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryFilters } from '@/components/ui/CategoryFilters';
import { CompanyDrawer } from '@/components/ui/CompanyDrawer';
import { Company } from '@/types/company';
import { AiExtractorModal } from '@/components/ui/AiExtractorModal';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface SceneProps {
  companies: Company[];
}

export function Scene({ companies: initialCompanies }: SceneProps) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const handleAddCompany = (newCompany: Company) => {
    setCompanies((prev) => [newCompany, ...prev]);
    setSelectedCompany(newCompany);
  };

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(companies.map((c) => c.category)));
  }, [companies]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    return companies.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [companies]);

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [companies, selectedCategory, searchQuery]);

  return (
    <div className="relative w-full h-screen bg-zinc-950 overflow-hidden font-sans">
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
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
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

      {/* Bloomberg Terminal HUD Header & Filter Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pointer-events-none">

        {/* Top-Left Branding & Search */}
        <div className="flex flex-col gap-2.5 pointer-events-auto w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/90 border border-zinc-800 rounded-lg backdrop-blur w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-mono font-semibold tracking-wider text-zinc-300">
              BLOOMBERG TERMINAL // FRONTIER DEEPTECH HUD
            </span>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={filteredCompanies.length}
            totalCount={companies.length}
          />
          <AiExtractorModal onAddCompany={handleAddCompany} />
        </div>

        {/* Top-Right Sector Category Filters */}
        <div className="pointer-events-auto bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3 backdrop-blur-md shadow-xl max-w-full overflow-x-auto">
          <div className="text-[10px] font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
            Sector Taxonomy Filter
          </div>
          <CategoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
          />
        </div>

      </div>

      {/* Slide-over Company Drawer */}
      <CompanyDrawer
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />

      {/* Bottom Instructions HUD */}
      <div className="absolute bottom-6 left-6 z-10 px-3 py-2 bg-zinc-900/85 border border-zinc-800/80 rounded-lg backdrop-blur text-xs text-zinc-400 pointer-events-none font-mono">
        <p className="font-medium text-zinc-300">FRONTIER 3D STARTUP ECOSYSTEM</p>
        <p className="text-[11px] mt-0.5 text-zinc-400">
          Click any 3D node to inspect profile & citations • Drag to orbit • Scroll to zoom
        </p>
      </div>

    </div>
  );
}
