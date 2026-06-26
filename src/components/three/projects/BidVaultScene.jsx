import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Gavel() {
  const gavelRef = useRef();
  
  useFrame((state) => {
    if (gavelRef.current) {
      // Striking animation
      gavelRef.current.rotation.x = Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 1.5 - 0.5;
    }
  });

  return (
    <group ref={gavelRef} position={[0.2, 0.4, 0.2]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Handle */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#8b6914" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
        <meshStandardMaterial color="#6b4f12" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

function Auctioneer() {
  return (
    <group position={[0, 0, -0.5]}>
      {/* Head */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#e8b89d" />
      </mesh>
      {/* Body / Suit */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.35, 0.5, 0.2]} />
        <meshStandardMaterial color="#1e1e2f" />
      </mesh>
      {/* Tie */}
      <mesh position={[0, 0.6, 0.11]}>
        <planeGeometry args={[0.04, 0.2]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <Gavel />
    </group>
  );
}

function Table() {
  return (
    <group position={[0, 0.2, 0]}>
      {/* Table Top */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.5]} />
        <meshStandardMaterial color="#3e2723" roughness={0.7} />
      </mesh>
      {/* Table Base */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.8, 0.4, 0.3]} />
        <meshStandardMaterial color="#2d2d4a" />
      </mesh>
    </group>
  );
}

function Auditorium() {
  return (
    <group position={[0, -0.2, 1.5]}>
      {/* Row 1 */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[4, 0.2, 0.6]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      {/* Row 2 */}
      <mesh position={[0, 0.3, 0.8]} rotation={[0, 0, 0]}>
        <boxGeometry args={[5, 0.4, 0.6]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      {/* Row 3 */}
      <mesh position={[0, 0.6, 1.6]} rotation={[0, 0, 0]}>
        <boxGeometry args={[6, 0.6, 0.6]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
    </group>
  );
}

function Buyer({ position, color, delay }) {
  const armRef = useRef();
  
  useFrame((state) => {
    if (armRef.current) {
      // Randomly raise arm to bid
      const t = state.clock.elapsedTime + delay;
      const isBidding = Math.sin(t * 1.5) > 0.8;
      armRef.current.rotation.x = isBidding ? -Math.PI * 0.8 : 0;
    }
  });

  return (
    <group position={position}>
      {/* Head */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#fcd5ce" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.25, 0.35, 0.15]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Right Arm (Bidding Arm) */}
      <group position={[0.18, 0.2, 0]} ref={armRef}>
        <mesh position={[0, -0.1, 0]}>
          <capsuleGeometry args={[0.04, 0.2, 8, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Paddle */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.1, 0.15, 0.02]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
      {/* Left Arm */}
      <mesh position={[-0.18, 0.1, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.04, 0.2, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function FloatingBids() {
  const groupRef = useRef();
  const bids = useMemo(() => 
    Array.from({ length: 8 }).map((_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 1.2 + Math.random() * 0.5,
      y: 0.5 + Math.random(),
      speed: 0.5 + Math.random() * 0.5,
    })), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {bids.map((bid, i) => (
        <Float key={i} speed={bid.speed} rotationIntensity={0.5} floatIntensity={0.5}>
          <group position={[Math.cos(bid.angle) * bid.radius, bid.y, Math.sin(bid.angle) * bid.radius]}>
             <mesh>
              <boxGeometry args={[0.3, 0.2, 0.02]} />
              <meshStandardMaterial color="#2d2d4a" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, 0.015]}>
              <planeGeometry args={[0.2, 0.04]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

function BidVaultContent() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={1.8} />
      <spotLight position={[0, 5, 0]} angle={0.4} penumbra={0.5} intensity={4} color="#fbbf24" />
      <pointLight position={[0, 2, 2]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-2, 1, 3]} intensity={1.5} color="#60a5fa" />
      
      <group position={[0, -0.8, -0.5]}>
        <Auctioneer />
        <Table />
        <Auditorium />
        
        {/* Row 1 Buyers */}
        <Buyer position={[-0.8, 0.3, 1.3]} color="#3b82f6" delay={0} />
        <Buyer position={[0, 0.3, 1.3]} color="#10b981" delay={1.2} />
        <Buyer position={[0.8, 0.3, 1.3]} color="#f59e0b" delay={0.5} />
        
        {/* Row 2 Buyers */}
        <Buyer position={[-1.2, 0.7, 2.1]} color="#8b5cf6" delay={2.1} />
        <Buyer position={[-0.4, 0.7, 2.1]} color="#ec4899" delay={0.8} />
        <Buyer position={[0.4, 0.7, 2.1]} color="#6366f1" delay={1.7} />
        <Buyer position={[1.2, 0.7, 2.1]} color="#ef4444" delay={0.3} />
      </group>

      <FloatingBids />
    </Suspense>
  );
}

export default function BidVaultScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 4.5], fov: 45 }}
      style={{ width: '100%', height: '100%', borderRadius: '12px' }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#0f172a']} />
      <BidVaultContent />
    </Canvas>
  );
}
