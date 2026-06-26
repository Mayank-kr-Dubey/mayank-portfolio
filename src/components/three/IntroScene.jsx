import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import ComputerDesk from './ComputerDesk';
import CoderBoy from './CoderBoy';

function Particles({ count = 50, scrollProgress }) {
  const meshRef = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8b5cf6"
        transparent
        opacity={scrollProgress > 0.3 ? 0.8 : 0.2}
        sizeAttenuation
      />
    </points>
  );
}

function ResponsiveCamera() {
  const { camera, size } = useThree();
  
  useEffect(() => {
    const isMobile = size.width < 768;
    // On mobile, shift camera to the right to see the objects, and zoom out slightly
    camera.position.x = isMobile ? 2.5 : 0;
    camera.position.z = isMobile ? 9 : 6;
    // On mobile, tilt the camera slightly up if needed or keep it centered
    camera.position.y = isMobile ? 0.8 : 1;
    camera.lookAt(isMobile ? 2.5 : 0, 0, 0);
  }, [size, camera]);

  return null;
}

function SceneContent({ timeProgress }) {
  return (
    <>
      <ResponsiveCamera />
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#f1f5f9" castShadow />
      <pointLight position={[-3, 3, 2]} intensity={0.4} color="#8b5cf6" />
      <pointLight position={[3, 3, 2]} intensity={0.3} color="#06b6d4" />
      
      {/* Scene floor with grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color="#080818" 
          roughness={0.9}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* 3D Models */}
      <ComputerDesk timeProgress={timeProgress} />
      <CoderBoy timeProgress={timeProgress} />
      
      {/* Floating Particles */}
      <Particles scrollProgress={timeProgress} />
      
      {/* Stars in background */}
      <Stars radius={50} depth={50} count={1000} factor={3} saturation={0.5} fade speed={0.5} />
    </>
  );
}

export default function IntroScene({ timeProgress }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 6], fov: 50 }}
      shadows
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContent timeProgress={timeProgress} />
    </Canvas>
  );
}
