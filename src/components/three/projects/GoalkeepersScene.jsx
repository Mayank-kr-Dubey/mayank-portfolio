import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function RealisticEarth() {
  const earthRef = useRef();
  
  // Use a public reliable texture
  const [colorMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'
  ]);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={earthRef}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          map={colorMap} 
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      
      {/* Bandages on the Earth */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh 
          key={i} 
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
        >
          {/* A ring representing a bandage wrapping around the earth */}
          <torusGeometry args={[1.01, 0.05, 8, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>
      ))}
      
      {/* Small medical crosses on bandages */}
      {Array.from({ length: 4 }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 4);
        const theta = Math.sqrt(4 * Math.PI) * phi;
        const x = 1.05 * Math.cos(theta) * Math.sin(phi);
        const y = 1.05 * Math.sin(theta) * Math.sin(phi);
        const z = 1.05 * Math.cos(phi);
        
        return (
          <group key={`cross-${i}`} position={[x, y, z]} lookAt={[0, 0, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.08, 0.02, 0.02]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.02, 0.08, 0.02]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
          </group>
        );
      })}
      
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <meshStandardMaterial color="#34d399" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function HealerBoy({ position, rotation, delay }) {
  const armRef = useRef();
  
  useFrame((state) => {
    if (armRef.current) {
      // Gentle healing motion
      const t = state.clock.elapsedTime + delay;
      armRef.current.position.z = 0.15 + Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Head */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#e8b89d" />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 0.7, -0.02]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#27272a" roughness={0.8} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.25, 0.4, 0.15]} />
        <meshStandardMaterial color="#34d399" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.07, -0.15, 0]}>
        <capsuleGeometry args={[0.04, 0.25, 8, 8]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      <mesh position={[0.07, -0.15, 0]}>
        <capsuleGeometry args={[0.04, 0.25, 8, 8]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      
      {/* Healing Arms outstretched */}
      <group ref={armRef}>
        <mesh position={[-0.15, 0.3, 0.15]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <capsuleGeometry args={[0.03, 0.3, 8, 8]} />
          <meshStandardMaterial color="#e8b89d" />
        </mesh>
        <mesh position={[0.15, 0.3, 0.15]} rotation={[-Math.PI / 2, 0, -0.2]}>
          <capsuleGeometry args={[0.03, 0.3, 8, 8]} />
          <meshStandardMaterial color="#e8b89d" />
        </mesh>
      </group>

      {/* Healing Particle Beam */}
      <mesh position={[0, 0.3, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#34d399" transparent opacity={0.3} emissive="#34d399" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function OrbitingSDGs() {
  const groupRef = useRef();
  const sdgs = useMemo(() => [
    { color: '#e5243b', label: 'No Poverty' },
    { color: '#dda63a', label: 'Zero Hunger' },
    { color: '#4c9f38', label: 'Good Health' },
    { color: '#c5192d', label: 'Education' },
    { color: '#ff3a21', label: 'Gender Eq.' },
    { color: '#26bde2', label: 'Clean Water' },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {sdgs.map((sdg, i) => {
        const angle = (i / sdgs.length) * Math.PI * 2;
        const radius = 1.8;
        return (
          <Float key={i} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * 0.5,
              Math.sin(angle) * radius,
            ]}>
              <mesh>
                <boxGeometry args={[0.15, 0.15, 0.03]} />
                <meshStandardMaterial color={sdg.color} emissive={sdg.color} emissiveIntensity={0.3} />
              </mesh>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

function GoalkeepersContent() {
  return (
    <>
      <ambientLight intensity={2.5} />
      <pointLight position={[3, 3, 3]} intensity={4} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={2.5} color="#06b6d4" />
      
      <group position={[0, -0.2, 0]}>
        <Suspense fallback={
          <mesh>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#22c55e" wireframe />
          </mesh>
        }>
          <RealisticEarth />
        </Suspense>
        
        <OrbitingSDGs />

        {/* 4 Boys healing the earth */}
        <HealerBoy position={[0, -0.4, 1.4]} rotation={[0, Math.PI, 0]} delay={0} />
        <HealerBoy position={[1.4, -0.4, 0]} rotation={[0, -Math.PI / 2, 0]} delay={1.5} />
        <HealerBoy position={[-1.4, -0.4, 0]} rotation={[0, Math.PI / 2, 0]} delay={0.8} />
        <HealerBoy position={[0, -0.4, -1.4]} rotation={[0, 0, 0]} delay={2.1} />
      </group>
    </>
  );
}

export default function GoalkeepersScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.8, 4.5], fov: 45 }}
      style={{ width: '100%', height: '100%', borderRadius: '12px' }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#022c22']} />
      <GoalkeepersContent />
    </Canvas>
  );
}
