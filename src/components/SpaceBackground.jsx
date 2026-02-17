import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Premium 3D Starfield background
 * - 5000 twinkling particles
 * - Parallax movement based on mouse/scroll
 */
function Starfield({ dark }) {
    const ref = useRef();

    // Generate 5000 random points within a sphere
    const sphere = useMemo(() => {
        const points = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000 * 3; i++) {
            points[i] = (Math.random() - 0.5) * 10;
        }
        return points;
    }, []);

    useFrame((state, delta) => {
        // Subtle rotation
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Slight parallax based on mouse
        const x = state.mouse.x * 0.2;
        const y = state.mouse.y * 0.2;
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x, 0.1);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y, 0.1);
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={dark ? "#ff5c4d" : "#000000"}
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
                    opacity={dark ? 0.8 : 0.2}
                />
            </Points>
        </group>
    );
}

export default function SpaceBackground({ dark }) {
    return (
        <div className="space-bg-container">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                gl={{ alpha: true }}
                onCreated={(state) => state.gl.setClearColor(0x000000, 0)}
            >
                <Starfield dark={dark} />
            </Canvas>
        </div>
    );
}
