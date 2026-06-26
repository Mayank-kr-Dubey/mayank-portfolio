import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Stylized low-poly coder character
export default function CoderBoy({ timeProgress = 0 }) {
  const groupRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Slide in from left between 0.4 and 0.6
    const slideProgress = Math.min(1, Math.max(0, (timeProgress - 0.4) * 5));
    const eased = 1 - Math.pow(1 - slideProgress, 3);
    groupRef.current.position.x = THREE.MathUtils.lerp(-12, 1.8, eased);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI / 2, eased);

    // Sitting animation between 0.6 and 0.7
    const sittingProgress = Math.min(1, Math.max(0, (timeProgress - 0.6) * 10));
    const sitEased = 1 - Math.pow(1 - sittingProgress, 2);
    groupRef.current.position.y = THREE.MathUtils.lerp(-0.8, -1.2, sitEased);

    // Head bob (typing) starts > 0.7
    if (headRef.current && timeProgress > 0.7) {
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 3) * 0.05;
      headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    } else if (headRef.current) {
      headRef.current.rotation.x = 0;
      headRef.current.rotation.z = 0;
    }

    // Arm typing animation starts > 0.7
    if (timeProgress > 0.7) {
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -0.8 + Math.sin(state.clock.elapsedTime * 8) * 0.1;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -0.8 + Math.sin(state.clock.elapsedTime * 8 + 1) * 0.1;
      }
    } else {
      if (leftArmRef.current) leftArmRef.current.rotation.x = 0;
      if (rightArmRef.current) rightArmRef.current.rotation.x = 0;
    }
  });

  const skinColor = "#f1c27d";
  const shirtColor = "#0ea5e9";
  const pantsColor = "#334155";
  const hairColor = "#1e293b";
  const shoeColor = "#0f172a";

  return (
    <group ref={groupRef} position={[8, -0.8, 0.5]} scale={0.7}>
      {/* Body / Torso */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.7, 0.9, 0.4]} />
        <meshStandardMaterial color={shirtColor} roughness={0.7} />
      </mesh>

      {/* Shirt collar detail */}
      <mesh position={[0, 1.2, 0.05]}>
        <boxGeometry args={[0.35, 0.08, 0.35]} />
        <meshStandardMaterial color="#7c3aed" roughness={0.7} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 1.65, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.6, 0.5]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.25, -0.02]}>
          <boxGeometry args={[0.6, 0.2, 0.55]} />
          <meshStandardMaterial color={hairColor} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.1, -0.27]}>
          <boxGeometry args={[0.58, 0.5, 0.05]} />
          <meshStandardMaterial color={hairColor} roughness={0.9} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.12, 0.05, 0.26]}>
          <boxGeometry args={[0.08, 0.06, 0.02]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.12, 0.05, 0.26]}>
          <boxGeometry args={[0.08, 0.06, 0.02]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>

        {/* Glasses */}
        <mesh position={[-0.12, 0.05, 0.27]}>
          <ringGeometry args={[0.06, 0.08, 6]} />
          <meshBasicMaterial color="#06b6d4" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.12, 0.05, 0.27]}>
          <ringGeometry args={[0.06, 0.08, 6]} />
          <meshBasicMaterial color="#06b6d4" side={THREE.DoubleSide} />
        </mesh>
        {/* Bridge */}
        <mesh position={[0, 0.05, 0.27]}>
          <boxGeometry args={[0.08, 0.02, 0.01]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>

        {/* Smile */}
        <mesh position={[0, -0.1, 0.26]}>
          <boxGeometry args={[0.15, 0.03, 0.01]} />
          <meshBasicMaterial color="#c98a6e" />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.5, 1.0, 0]}>
        <mesh position={[0, -0.3, 0.1]} castShadow>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.6, 0.15]}>
          <boxGeometry args={[0.15, 0.12, 0.12]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.5, 1.0, 0]}>
        <mesh position={[0, -0.3, 0.1]} castShadow>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.6, 0.15]}>
          <boxGeometry args={[0.15, 0.12, 0.12]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Legs - Bent for Sitting */}
      {/* Thighs */}
      <mesh position={[-0.18, 0.25, 0.2]} castShadow>
        <boxGeometry args={[0.28, 0.25, 0.5]} />
        <meshStandardMaterial color={pantsColor} roughness={0.7} />
      </mesh>
      <mesh position={[0.18, 0.25, 0.2]} castShadow>
        <boxGeometry args={[0.28, 0.25, 0.5]} />
        <meshStandardMaterial color={pantsColor} roughness={0.7} />
      </mesh>

      {/* Calves */}
      <mesh position={[-0.18, -0.15, 0.35]} castShadow>
        <boxGeometry args={[0.28, 0.6, 0.25]} />
        <meshStandardMaterial color={pantsColor} roughness={0.7} />
      </mesh>
      <mesh position={[0.18, -0.15, 0.35]} castShadow>
        <boxGeometry args={[0.28, 0.6, 0.25]} />
        <meshStandardMaterial color={pantsColor} roughness={0.7} />
      </mesh>

      {/* Shoes */}
      <mesh position={[-0.18, -0.5, 0.45]} castShadow>
        <boxGeometry args={[0.25, 0.12, 0.4]} />
        <meshStandardMaterial color={shoeColor} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0.18, -0.5, 0.45]} castShadow>
        <boxGeometry args={[0.25, 0.12, 0.4]} />
        <meshStandardMaterial color={shoeColor} roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Chair */}
      <group position={[0, -0.3, -0.1]}>
        {/* Seat */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.8, 0.08, 0.7]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 1.1, -0.3]} castShadow>
          <boxGeometry args={[0.75, 0.9, 0.08]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Chair base pole */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.3, 8]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Chair base */}
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 8]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Wheels */}
        {[0, 1, 2, 3, 4].map(i => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh key={`wheel-${i}`} position={[Math.cos(angle) * 0.3, -0.82, Math.sin(angle) * 0.3]}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
            </mesh>
          );
        })}
      </group>

      {/* Glow effect */}
      <pointLight
        position={[0, 1.5, 0.5]}
        color="#8b5cf6"
        intensity={timeProgress > 0.7 ? 1.5 : 0}
        distance={2}
        decay={2}
      />
    </group>
  );
}
