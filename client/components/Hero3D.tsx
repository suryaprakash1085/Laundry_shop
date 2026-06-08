import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, TorusKnot, Icosahedron, Stars } from "@react-three/drei";
import * as THREE from "three";

const Scene = () => {
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.25;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
    if (knot.current) {
      knot.current.rotation.x = t * 0.5;
      knot.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group ref={group}>
      {/* Central morphing bubble */}
      <Float speed={2.4} rotationIntensity={1.4} floatIntensity={2}>
        <Sphere args={[1.05, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial color="#3B82F6" distort={0.55} speed={2.6} roughness={0.05} metalness={0.55} />
        </Sphere>
      </Float>

      {/* Spinning torus knot */}
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.4}>
        <mesh ref={knot} position={[0, 0, 0]}>
          <torusKnotGeometry args={[1.6, 0.05, 180, 24, 2, 5]} />
          <meshStandardMaterial color="#60A5FA" emissive="#60A5FA" emissiveIntensity={0.6} metalness={0.7} roughness={0.2} />
        </mesh>
      </Float>

      {/* Orbiting crystals */}
      {[
        { p: [1.9, 0.8, 0.4], s: 0.3, c: "#93C5FD" },
        { p: [-1.9, -0.7, 0.5], s: 0.22, c: "#BFDBFE" },
        { p: [-1.4, 1.4, -0.8], s: 0.18, c: "#DBEAFE" },
        { p: [1.5, -1.3, 0.7], s: 0.26, c: "#3B82F6" },
      ].map((o, i) => (
        <Float key={i} speed={1.6 + i * 0.3} rotationIntensity={2} floatIntensity={2.2}>
          <Icosahedron args={[o.s, 0]} position={o.p as [number, number, number]}>
            <meshStandardMaterial color={o.c} roughness={0.15} metalness={0.75} emissive={o.c} emissiveIntensity={0.2} />
          </Icosahedron>
        </Float>
      ))}

      {/* Glow specks */}
      {[
        [-1.2, 1.1, 0.8], [1.2, -0.9, -0.6], [0.8, 1.3, -0.4],
      ].map((p, i) => (
        <Float key={`s-${i}`} speed={2 + i} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[0.07, 16, 16]} position={p as [number, number, number]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

const Hero3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 5, 5]} intensity={1.3} />
        <pointLight position={[-4, -3, -4]} color="#60A5FA" intensity={1.8} />
        <pointLight position={[4, 3, 2]} color="#a78bfa" intensity={1.2} />
        <Suspense fallback={null}>
          <Stars radius={20} depth={30} count={1200} factor={2} saturation={0} fade speed={1.2} />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
