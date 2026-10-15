'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
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
import { INDIAN_DEEPTECH_STARTUPS } from '@/lib/supabase/seed-data';

export function Scene() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    const seed = INDIAN_DEEPTECH_STARTUPS.map((c, index) => ({
      ...c,
      id: `seed-${index}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })) as Company[];
    setCompanies(seed);
  }, []);

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
    <>
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 20, 35], fov: 60 }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={['#000000']} />

          {/* Luxury Monochrome & Ambient Lights */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[20, 30, 20]} intensity={1.8} color="#ffffff" />
          <pointLight position={[-20, -20, -20]} intensity={0.6} color="#e4e4e7" />

          {/* Immersive Starfield & Minimalist Grid */}
          <Stars radius={150} depth={50} count={8000} factor={4} saturation={0} fade speed={0.4} />
          <gridHelper args={[140, 70, '#ffffff', '#27272a']} position={[0, -15, 0]} />

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
            maxDistance={130}
            minDistance={4}
          />
        </Canvas>
      </div>

      {/* Floating HUD Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 overflow-hidden">

        {/* Top Header & Filters Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pointer-events-none">

          {/* Top-Left Branding, Search & AI Extractor */}
          <div className="flex flex-col gap-3 pointer-events-auto w-full lg:w-auto">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-black/80 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl w-fit">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-white">
                FRONTIER // LUXURY TERMINAL v3.0
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

          {/* Top-Right Sector Taxonomy Filters */}
          <div className="pointer-events-auto backdrop-blur-md bg-black/80 border border-white/10 rounded-2xl p-4 shadow-2xl max-w-full overflow-x-auto">
            <div className="text-[10px] font-mono text-zinc-400 mb-2 uppercase tracking-widest">
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

        {/* Bottom Status HUD */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
          <div className="backdrop-blur-md bg-black/80 border border-white/10 rounded-2xl px-4 py-3 shadow-2xl pointer-events-none font-mono">
            <p className="text-xs font-bold text-white tracking-wider">3D DEEPTECH ECOSYSTEM</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Click node to inspect • Drag to orbit space • Scroll to zoom
            </p>
          </div>

          <div className="backdrop-blur-md bg-black/80 border border-white/10 rounded-2xl px-4 py-3 shadow-2xl pointer-events-none font-mono text-right hidden sm:block">
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">SYSTEM STATUS</p>
            <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 justify-end mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              SECURE 3D PIPELINE ACTIVE
            </p>
          </div>
        </div>

      </div>

      {/* Slide-over Company Detail Drawer */}
      <CompanyDrawer
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </>
  );
}
