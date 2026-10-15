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

const CATEGORY_COLORS: Record<string, string> = {
  'Space Tech': '#3b82f6', // Blue
  'Robotics & Drones': '#10b981', // Emerald
  'Industrial AI': '#8b5cf6', // Purple
  'Quantum Tech': '#ec4899', // Pink
  'Semiconductors': '#f59e0b', // Amber
  'EV & Energy Tech': '#06b6d4', // Cyan
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

  const color = CATEGORY_COLORS[company.category] || '#ffffff';

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = isFilteredOut ? 0.5 : isSelected ? 1.8 : hovered ? 1.4 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);
  });

  return (
    <group position={[company.x, company.y, company.z]}>
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
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isFilteredOut ? 0.05 : isSelected ? 0.8 : hovered ? 0.5 : 0.2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={isFilteredOut ? 0.15 : 1.0}
        />
      </mesh>

      {/* Outer glow ring for selected or hovered */}
      {!isFilteredOut && (hovered || isSelected) && (
        <mesh>
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} wireframe />
        </mesh>
      )}

      {/* Label HTML tag */}
      {!isFilteredOut && (hovered || isSelected) && (
        <Html position={[0, 1.2, 0]} center distanceFactor={15}>
          <div className="px-2 py-1 text-xs font-medium text-white bg-zinc-900/90 border border-zinc-700 rounded shadow-lg backdrop-blur whitespace-nowrap pointer-events-none">
            <span className="font-bold">{company.name}</span>
            <span className="block text-[10px] text-zinc-400">{company.category}</span>
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
