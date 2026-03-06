import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 500 }) {
    const mesh = useRef<THREE.Points>(null);

    // Generate random positions within a wider volume
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#06b6d4"
                transparent
                opacity={0.4}
                sizeAttenuation={true}
            />
        </points>
    );
}

export function ParticleNetwork() {
    return (
        <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-0 overflow-hidden opacity-40">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 1.5]} // Limit pixel ratio for performance
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                <Particles />
            </Canvas>
        </div>
    );
}
