import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ComputerDesk({ timeProgress = 0 }) {
  const groupRef = useRef();
  const screenRef = useRef();
  const screenGlowRef = useRef();

  // Animate based on scroll
  const targetX = useMemo(() => timeProgress > 0.05 ? 0 : -8, [timeProgress]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Slide in from left between 0.2 and 0.4
    const slideProgress = Math.min(1, Math.max(0, (timeProgress - 0.2) * 5));
    const eased = 1 - Math.pow(1 - slideProgress, 3); // easeOutCubic
    groupRef.current.position.x = THREE.MathUtils.lerp(-12, 3.0, eased);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(-Math.PI, -Math.PI / 2.2, eased);
    
    // Screen glow pulse
    if (screenGlowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 0.85;
      screenGlowRef.current.material.emissiveIntensity = timeProgress > 0.7 ? pulse : 0;
    }
    
    // Subtle floating when idle
    if (timeProgress > 0.4) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05 - 1.2;
    } else {
      groupRef.current.position.y = -1.2;
    }
  });

  const codeLines = timeProgress > 0.7;

  return (
    <group ref={groupRef} position={[-8, -1.2, 0]} scale={0.8}>
      {/* Desk Surface */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.12, 1.8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.1} />
      </mesh>
      
      {/* Desk Legs */}
      {[[-1.5, -0.8, -0.7], [1.5, -0.8, -0.7], [-1.5, -0.8, 0.7], [1.5, -0.8, 0.7]].map((pos, i) => (
        <mesh key={`leg-${i}`} position={pos} castShadow>
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}

      {/* Monitor Stand */}
      <mesh position={[0, 0.15, -0.3]} castShadow>
        <boxGeometry args={[0.4, 0.3, 0.15]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Monitor Neck */}
      <mesh position={[0, 0.5, -0.3]} castShadow>
        <boxGeometry args={[0.12, 0.4, 0.08]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Monitor Frame */}
      <mesh position={[0, 1.1, -0.35]} castShadow>
        <boxGeometry args={[2.4, 1.4, 0.08]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Monitor Screen */}
      <mesh ref={screenRef} position={[0, 1.1, -0.3]}>
        <planeGeometry args={[2.2, 1.2]} />
        <meshStandardMaterial 
          color={codeLines ? "#0d1117" : "#111111"}
          emissive={codeLines ? "#8b5cf6" : "#000000"}
          emissiveIntensity={codeLines ? 0.08 : 0}
        />
      </mesh>

      {/* Screen Glow (Code Effect) */}
      <mesh ref={screenGlowRef} position={[0, 1.1, -0.28]}>
        <planeGeometry args={[2.3, 1.3]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0}
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Code lines on screen */}
      {codeLines && (
        <group position={[-0.8, 1.4, -0.28]}>
          {[0, -0.12, -0.24, -0.36, -0.48, -0.6].map((y, i) => (
            <mesh key={`code-${i}`} position={[i % 2 * 0.1, y, 0]}>
              <planeGeometry args={[0.4 + Math.random() * 0.8, 0.04]} />
              <meshBasicMaterial 
                color={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#34d399"} 
                transparent 
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Keyboard */}
      <mesh position={[0, 0.1, 0.35]} castShadow>
        <boxGeometry args={[1.4, 0.04, 0.5]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Keyboard keys (simplified) */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`key-${i}`} position={[-0.55 + (i % 5) * 0.25, 0.14, 0.2 + Math.floor(i / 5) * 0.12]}>
          <boxGeometry args={[0.18, 0.02, 0.08]} />
          <meshStandardMaterial 
            color="#1e1e3a" 
            emissive={codeLines ? "#8b5cf6" : "#000000"}
            emissiveIntensity={codeLines ? 0.3 : 0}
          />
        </mesh>
      ))}

      {/* Mouse */}
      <mesh position={[1.0, 0.1, 0.4]} castShadow>
        <capsuleGeometry args={[0.06, 0.1, 4, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Coffee mug */}
      <mesh position={[1.4, 0.2, -0.1]} castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.15, 8]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Ambient desk light */}
      <pointLight 
        position={[0, 1.8, -0.2]} 
        color="#8b5cf6" 
        intensity={codeLines ? 2 : 0} 
        distance={3} 
        decay={2} 
      />
    </group>
  );
}
