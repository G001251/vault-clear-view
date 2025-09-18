import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Points, Point } from '@react-three/drei';
import * as THREE from 'three';

// Connection points data - scattered across the globe
const connectionPoints = [
  { lat: 40.7128, lon: -74.0060 }, // New York
  { lat: 51.5074, lon: -0.1278 },  // London
  { lat: 35.6762, lon: 139.6503 }, // Tokyo
  { lat: -33.8688, lon: 151.2093 }, // Sydney
  { lat: 37.7749, lon: -122.4194 }, // San Francisco
  { lat: 55.7558, lon: 37.6176 },  // Moscow
  { lat: -22.9068, lon: -43.1729 }, // Rio de Janeiro
  { lat: 28.6139, lon: 77.2090 },  // New Delhi
  { lat: 1.3521, lon: 103.8198 },  // Singapore
  { lat: -26.2041, lon: 28.0473 },  // Johannesburg
  { lat: 19.4326, lon: -99.1332 },  // Mexico City
  { lat: 52.5200, lon: 13.4050 },  // Berlin
];

// Convert lat/lon to 3D coordinates
const latLonTo3D = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
};

const ConnectionPoint = ({ position, delay }: { position: [number, number, number]; delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() + delay;
      meshRef.current.scale.setScalar(0.5 + Math.sin(time * 3) * 0.3);
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.6 + Math.sin(time * 2) * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#60a5fa" transparent />
    </mesh>
  );
};

const GlobeCore = ({ isSpinning }: { isSpinning: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (isSpinning && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (isSpinning && atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.2;
    }
  });

  // Generate connection points in 3D space
  const points = connectionPoints.map((point, index) => {
    const pos = latLonTo3D(point.lat, point.lon, 1.01);
    return (
      <ConnectionPoint 
        key={index}
        position={[pos.x, pos.y, pos.z]} 
        delay={index * 0.5}
      />
    );
  });

  return (
    <group>
      {/* Main globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#1e293b"
          transparent
          opacity={0.8}
          shininess={100}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Connection points */}
      {points}

      {/* Ambient light */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#60a5fa" intensity={0.3} />
    </group>
  );
};

interface GlobeProps {
  isSpinning: boolean;
}

export const Globe = ({ isSpinning }: GlobeProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <GlobeCore isSpinning={isSpinning} />
      </Canvas>
    </div>
  );
};