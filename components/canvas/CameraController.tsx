'use client';

import { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Company } from '@/types/company';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CameraControllerProps {
  selectedCompany: Company | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

export function CameraController({ selectedCompany, controlsRef }: CameraControllerProps) {
  const { camera } = useThree();

  useEffect(() => {
    if (!controlsRef.current) return;
    if (!selectedCompany) {
      // Optional: reset or keep orbit state
    }
  }, [selectedCompany, controlsRef]);

  // Smooth camera transition using useFrame
  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (selectedCompany) {
      const targetCamPos = new THREE.Vector3(
        selectedCompany.x + 3.5,
        selectedCompany.y + 2.5,
        selectedCompany.z + 5.5
      );
      const targetLookAt = new THREE.Vector3(
        selectedCompany.x,
        selectedCompany.y,
        selectedCompany.z
      );

      camera.position.lerp(targetCamPos, delta * 3);
      controlsRef.current.target.lerp(targetLookAt, delta * 3);
      controlsRef.current.update();
    }
  });

  return null;
}
