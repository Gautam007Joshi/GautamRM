import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Tell drei where the Draco decoder lives
useGLTF.setDecoderPath('/draco/');

export default function LogoModel() {
  const groupRef = useRef();
  const controlsRef = useRef();
  const { size } = useThree();

  // 1. Load compressed model
  const { scene } = useGLTF('/logo.glb');

  // 2. One lightweight material for every mesh
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2563eb',
        emissive: '#3b82f6',
        emissiveIntensity: 0.35,
        metalness: 0.2,
        roughness: 0.25,
      }),
    []
  );

  // 3. Replace materials + disable shadows for speed
  useEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.material = mat;
        o.castShadow = false;
        o.receiveShadow = false;
        o.geometry.computeBoundingSphere();
      }
    });
  }, [scene, mat]);

  // 4. FPS-capped rotation (30 fps on mobile, 60 on desktop)
  const fps = size.width < 600 ? 30 : 60;
  let last = 0;
  useFrame((state) => {
    if ((state.clock.elapsedTime - last) < 1 / fps) return;
    last = state.clock.elapsedTime;
    if (groupRef.current && !controlsRef.current?.enabled) {
      groupRef.current.rotation.y += 0.5;
    }
  });

  // 5. Responsive scale
  const scale = useMemo(() => {
  if (size.width < 600) return 1.6;   // was 1.2 → now 2.0
  if (size.width < 900) return 2;   // was 1.6 → now 2.6
  return 2.6;                         // was 2   → now 3.2
}, [size.width]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} />

      <group ref={groupRef} scale={scale}>
        <primitive object={scene} />
      </group>

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableDamping={false}
        autoRotate
        autoRotateSpeed={8}
      />
    </>
  );
}