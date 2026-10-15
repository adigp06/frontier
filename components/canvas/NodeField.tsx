'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Company } from '@/types/company';

interface NodeFieldProps {
  companies: Company[];
  selectedCompany: Company | null;
  onSelectCompany: (company: Company | null) => void;
  searchQuery: string;
  selectedCategory: string;
}

const CATEGORY_ACCENTS: Record<string, string> = {
  'Space Tech': '#ffffff',         // Pure White
  'Robotics & Drones': '#d4d4d8',   // Zinc 300
  'Industrial AI': '#a1a1aa',     // Zinc 400
  'Quantum Tech': '#ffffff',      // Pure White
  'Semiconductors': '#e4e4e7',    // Zinc 200
  'EV & Energy Tech': '#71717a',  // Zinc 500
};

function CompanyNode({
  company,
  isSelected,
  onSelect,
  isFilteredOut,
}: {
  company: Company;
  isSelected: boolean;
  onSelect: (company: Company) => void;
  isFilteredOut: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const accentColor = CATEGORY_ACCENTS[company.category] || '#ffffff';

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = isFilteredOut ? 0.4 : isSelected ? 2.0 : hovered ? 1.5 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 12);
  });

  return (
    <group position={[company.x, company.y, company.z]}>
      {/* Core Node Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          if (isFilteredOut) return;
          e.stopPropagation();
          onSelect(company);
        }}
        onPointerOver={(e) => {
          if (isFilteredOut) return;
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color={isSelected ? '#ffffff' : hovered ? '#f4f4f5' : '#18181b'}
          emissive={accentColor}
          emissiveIntensity={isFilteredOut ? 0.05 : isSelected ? 0.9 : hovered ? 0.6 : 0.25}
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={isFilteredOut ? 0.12 : 1.0}
        />
      </mesh>

      {/* Outer Luxury Halo Ring for Selected / Hovered */}
      {!isFilteredOut && (hovered || isSelected) && (
        <mesh>
          <sphereGeometry args={[0.85, 24, 24]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} wireframe />
        </mesh>
      )}

      {/* High-End Terminal HTML Label */}
      {!isFilteredOut && (hovered || isSelected) && (
        <Html position={[0, 1.2, 0]} center distanceFactor={16}>
          <div className="px-3 py-1.5 text-xs font-mono text-white bg-black/90 border border-white/20 rounded-xl shadow-2xl backdrop-blur-xl whitespace-nowrap pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-bold tracking-wider">{company.name}</span>
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5 uppercase tracking-widest">{company.category}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export function NodeField({ companies, selectedCompany, onSelectCompany, searchQuery, selectedCategory }: NodeFieldProps) {
  return (
    <group>
      {companies.map((company) => {
        const matchesCategory = selectedCategory === 'All' || company.category === selectedCategory;
        const matchesSearch = searchQuery === '' ||
          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.description.toLowerCase().includes(searchQuery.toLowerCase());

        const isFilteredOut = !(matchesCategory && matchesSearch);

        return (
          <CompanyNode
            key={company.id || company.slug}
            company={company}
            isSelected={selectedCompany?.id === company.id}
            onSelect={onSelectCompany}
            isFilteredOut={isFilteredOut}
          />
        );
      })}
    </group>
  );
}
