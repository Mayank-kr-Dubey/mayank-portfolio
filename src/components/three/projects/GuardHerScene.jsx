import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GuardianAura() {
  const auraRef = useRef();
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (auraRef.current) {
      auraRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      auraRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* Distorted glowing dome */}
      <mesh ref={auraRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <MeshDistortMaterial
          color="#f472b6"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.2}
          roughness={0.1}
          transparent
          opacity={0.15}
          distort={0.3}
          speed={2}
        />
      </mesh>
      {/* Guardian Rings */}
      <mesh ref={particlesRef} position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 64]} />
        <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={2} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 64]} />
        <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={1} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Phone() {
  const phoneRef = useRef();
  
  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1 - 0.2;
    }
  });

  return (
    <group ref={phoneRef} position={[0.4, 0.8, 0.6]} rotation={[-0.1, -0.2, 0]}>
      {/* Phone Case */}
      <mesh>
        <boxGeometry args={[0.35, 0.7, 0.04]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.021]}>
        <planeGeometry args={[0.32, 0.65]} />
        <meshStandardMaterial color="#0f172a" emissive="#0f172a" emissiveIntensity={0.5} />
      </mesh>
      {/* Text on Screen */}
      <Text
        position={[0, 0.1, 0.025]}
        fontSize={0.06}
        color="#f472b6"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.3}
        textAlign="center"
      >
        Guard{"\n"}Her
      </Text>
      {/* SOS Button representation */}
      <mesh position={[0, -0.15, 0.025]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
      </mesh>
      <pointLight position={[0, 0, 0.2]} color="#f472b6" intensity={1} distance={2} />
    </group>
  );
}

function RealisticGirl({ position }) {
  return (
    <group position={position}>
      {/* Head */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#fcd5ce" roughness={0.4} />
      </mesh>
      {/* Hair (Long back) */}
      <mesh position={[0, 1.35, -0.1]}>
        <capsuleGeometry args={[0.22, 0.4, 16, 16]} />
        <meshStandardMaterial color="#3b2f2f" roughness={0.8} />
      </mesh>
      {/* Hair (Bangs) */}
      <mesh position={[0, 1.55, 0.05]} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[0.21, 16, 16, 0, Math.PI, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3b2f2f" roughness={0.8} />
      </mesh>

      {/* Torso / Dress top */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.7, 32]} />
        <meshStandardMaterial color="#f472b6" roughness={0.6} />
      </mesh>
      
      {/* Skirt */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.22, 0.35, 0.4, 32]} />
        <meshStandardMaterial color="#ec4899" roughness={0.7} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.1, -0.1, 0]}>
        <capsuleGeometry args={[0.08, 0.5, 16, 16]} />
        <meshStandardMaterial color="#fcd5ce" roughness={0.4} />
      </mesh>
      <mesh position={[0.1, -0.1, 0]}>
        <capsuleGeometry args={[0.08, 0.5, 16, 16]} />
        <meshStandardMaterial color="#fcd5ce" roughness={0.4} />
      </mesh>

      {/* Left Arm (Holding phone) */}
      <group position={[0.25, 1.1, 0]} rotation={[0, 0, 0.2]}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.06, 0.4, 16, 16]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.4} />
        </mesh>
        {/* Forearm bending up */}
        <mesh position={[0, -0.4, 0.15]} rotation={[-1, 0, 0]}>
          <capsuleGeometry args={[0.05, 0.3, 16, 16]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.4} />
        </mesh>
      </group>

      {/* Right Arm (Relaxed) */}
      <group position={[-0.25, 1.1, 0]} rotation={[0, 0, -0.2]}>
        <mesh position={[0, -0.25, 0]}>
          <capsuleGeometry args={[0.06, 0.5, 16, 16]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

function GuardHerContent() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={2.5} />
      <pointLight position={[2, 4, 3]} intensity={4} color="#ffffff" />
      <pointLight position={[-2, 2, 1]} intensity={3} color="#f472b6" />
      
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
        <group position={[0, -0.8, 0]}>
          <RealisticGirl position={[0, 0, 0]} />
          <Phone />
          <GuardianAura />
        </group>
      </Float>
    </Suspense>
  );
}

export default function GuardHerScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4.5], fov: 45 }}
      style={{ width: '100%', height: '100%', borderRadius: '12px' }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#170f1e']} />
      <GuardHerContent />
    </Canvas>
  );
}
