import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { isCompactViewport } from '@/lib/motion';

interface PointerState {
  x: number;
  y: number;
}

function createParticlePositions(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = radius * (0.55 + Math.random() * 0.6);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return positions;
}

interface SceneContentProps {
  pointer: RefObject<PointerState>;
  compact: boolean;
}

function SceneContent({ pointer, compact }: SceneContentProps) {
  const rig = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const orbiter = useRef<THREE.Mesh>(null);
  const particles = useRef<THREE.Points>(null);

  const particlePositions = useMemo(
    () => createParticlePositions(compact ? 120 : 320, 4.2),
    [compact]
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const pointerX = pointer.current?.x ?? 0;
    const pointerY = pointer.current?.y ?? 0;

    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(
        rig.current.rotation.y,
        time * 0.12 + pointerX * 0.45,
        0.05
      );

      rig.current.rotation.x = THREE.MathUtils.lerp(
        rig.current.rotation.x,
        pointerY * 0.25,
        0.05
      );
    }

    if (rings.current) {
      rings.current.rotation.z += delta * 0.12;
    }

    if (orbiter.current) {
      const angle = time * 0.9;

      orbiter.current.position.set(
        Math.cos(angle) * 2.3 + 0.55,
        Math.sin(angle) * 2.3,
        0
      );
    }

    if (particles.current) {
      particles.current.rotation.y += delta * 0.025;
      particles.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <>
      <group ref={rig}>
        {/* Outer rotating wireframe */}
        <mesh>
          <icosahedronGeometry args={[1.85, 1]} />

          <meshBasicMaterial
            color="#60a5fa"
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* Cyan and purple rotating rings */}
        <group ref={rings}>
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[2.3, 0.012, 16, 180]} />

            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.75}
            />
          </mesh>

          <mesh rotation={[Math.PI / 3, Math.PI / 5, 0]}>
            <torusGeometry args={[2.7, 0.008, 16, 180]} />

            <meshBasicMaterial
              color="#a78bfa"
              transparent
              opacity={0.5}
            />
          </mesh>

          {/* Moving light particle */}
          <mesh ref={orbiter}>
            <sphereGeometry args={[0.055, 16, 16]} />

            <meshBasicMaterial color="#e0f2fe" />
          </mesh>
        </group>

        {/* Background particles */}
        <points ref={particles}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlePositions.length / 3}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>

          <pointsMaterial
            color="#93c5fd"
            size={0.03}
            sizeAttenuation
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </points>
      </group>
    </>
  );
}

interface HeroSceneProps {
  isActive: boolean;
}

export default function HeroScene({ isActive }: HeroSceneProps) {
  const pointer = useRef<PointerState>({ x: 0, y: 0 });
  const compact = useMemo(() => isCompactViewport(), []);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      pointer.current.y =
        -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('pointermove', handleMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <Canvas
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 6.4], fov: 40 }}
      dpr={compact ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: !compact,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      frameloop={isActive ? 'always' : 'never'}
    >
      <SceneContent pointer={pointer} compact={compact} />
    </Canvas>
  );
}