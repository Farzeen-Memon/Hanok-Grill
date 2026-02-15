import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    PerspectiveCamera,
    Text,
    Float,
    Environment,
    Clouds,
    Cloud,
    ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';

// --- Grill Bars Component ---
const GrillBars = () => {
    const barCount = 14;
    const barWidth = 0.18;
    const barSpacing = 0.42;
    const barLength = 12;

    return (
        <group position={[ 0, 0, 0 ]}>
            {[ ...Array(barCount) ].map((_, i) => (
                <mesh key={i} position={[ 0, 0, (i - barCount / 2) * barSpacing ]} castShadow receiveShadow>
                    <boxGeometry args={[ barLength, barWidth, barWidth ]} />
                    <meshStandardMaterial
                        color="#080808"
                        roughness={0.7}
                        metalness={0.9}
                        emissive="#000"
                        envMapIntensity={1}
                    />
                </mesh>
            ))}
        </group>
    );
};

// --- Embers Component ---
const Embers = () => {
    const mesh = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.children.forEach((child, i) => {
                if (child instanceof THREE.PointLight) {
                    child.intensity = 40 + Math.sin(t * 2 + i * 0.5) * 20;
                    child.position.x += Math.sin(t * 0.5 + i) * 0.01;
                }
            });
        }
    });

    return (
        <group ref={mesh} position={[ 0, -0.7, 0 ]}>
            {/* Base Heat Glow */}
            <mesh rotation={[ -Math.PI / 2, 0, 0 ]}>
                <planeGeometry args={[ 12, 8 ]} />
                <meshStandardMaterial
                    color="#000"
                    emissive="#ff3300"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Pulsing Ember Points */}
            {[ ...Array(10) ].map((_, i) => (
                <pointLight
                    key={i}
                    position={[ (Math.random() - 0.5) * 8, 0.3, (Math.random() - 0.5) * 6 ]}
                    distance={5}
                    intensity={50}
                    color="#ff6600"
                />
            ))}

            {/* Heat Haze Distortion */}
            <mesh position={[ 0, 0.5, 0 ]}>
                <boxGeometry args={[ 10, 1, 6 ]} />
                <meshStandardMaterial
                    transparent
                    opacity={0}
                    metalness={0}
                    roughness={0}
                />
            </mesh>
        </group>
    );
};

// --- Smoke Component ---
const CinematicSmoke = () => {
    return (
        <group position={[ 0, 0.5, 0 ]}>
            <Clouds scale={1.5}>
                <Cloud
                    seed={1}
                    bounds={[ 8, 1, 6 ]}
                    volume={2}
                    color="#1a1a1a"
                    opacity={0.12}
                    fade={15}
                    speed={0.15}
                    segments={50}
                />
                <Cloud
                    seed={5}
                    bounds={[ 10, 2, 8 ]}
                    volume={1.5}
                    color="#222"
                    opacity={0.08}
                    fade={25}
                    speed={0.1}
                    segments={40}
                    position={[ 0, 1, 0 ]}
                />
            </Clouds>
        </group>
    );
};

// --- Typography Component ---
const FloatingTypography = () => {
    const textRef = useRef<THREE.Mesh>(null!);
    const lightRef = useRef<THREE.SpotLight>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (lightRef.current) {
            // Sweep light across text for "shimmer"
            lightRef.current.position.x = Math.sin(t * 0.5) * 5;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1}>
                <Text
                    ref={textRef}
                    font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFv7ku5OtSEMmsmZf6xeRC987kxrb886G586JT25PF5.woff"
                    fontSize={1.4}
                    color="#eebe2b"
                    maxWidth={12}
                    lineHeight={1}
                    letterSpacing={0.25}
                    textAlign="center"
                    position={[ 0, 1.8, 1 ]}
                    anchorX="center"
                    anchorY="middle"
                >
                    {"HANOK GRILL"}
                    <meshStandardMaterial
                        color="#eebe2b"
                        metalness={1}
                        roughness={0.05}
                        envMapIntensity={3}
                    />
                </Text>
            </Float>
            <spotLight
                ref={lightRef}
                position={[ 0, 5, 5 ]}
                angle={0.1}
                penumbra={1}
                intensity={100}
                color="#fff"
                target-position={[ 0, 1.8, 1 ]}
            />
        </group>
    );
};

// --- Rising Sparks Component ---
const RisingSparks = () => {
    const count = 60;
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                x: (Math.random() - 0.5) * 8,
                y: -0.5 + Math.random() * 4,
                z: (Math.random() - 0.5) * 5,
                speed: 0.01 + Math.random() * 0.02,
                noise: Math.random() * 10
            });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        particles.forEach((p, i) => {
            p.y += p.speed;
            if (p.y > 4) p.y = -0.5;

            dummy.position.set(
                p.x + Math.sin(t + p.noise) * 0.2,
                p.y,
                p.z + Math.cos(t + p.noise) * 0.2
            );
            dummy.scale.setScalar(0.01 + Math.sin(t * 2 + i) * 0.005);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[ undefined, undefined, count ]}>
            <sphereGeometry args={[ 1, 4, 4 ]} />
            <meshStandardMaterial color="#eebe2b" emissive="#ffaa00" emissiveIntensity={4} />
        </instancedMesh>
    );
};

// --- Main Scene ---
const Scene = () => {
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Dynamic camera movement: Slow push-in
        state.camera.position.z = 7.5 - t * 0.06;
        if (state.camera.position.z < 4.5) state.camera.position.z = 4.5;

        state.camera.position.x = Math.sin(t * 0.1) * 0.2;
        state.camera.position.y = 2.2 + Math.cos(t * 0.2) * 0.1;
        state.camera.lookAt(0, 0.8, 0);
    });

    return (
        <>
            <Environment preset="night" />
            <color attach="background" args={[ "#010101" ]} />
            <fog attach="fog" args={[ "#010101", 5, 20 ]} />

            <ambientLight intensity={0.02} />

            {/* Dramatic Rim Lights */}
            <spotLight position={[ 12, 6, 4 ]} angle={0.2} penumbra={1} intensity={500} color="#fff" castShadow />
            <spotLight position={[ -12, 6, 4 ]} angle={0.2} penumbra={1} intensity={500} color="#fff" castShadow />

            {/* Warm underglow light */}
            <pointLight position={[ 0, -0.5, 0 ]} intensity={200} color="#ff3300" distance={12} />

            <group position={[ 0, 0, 0 ]}>
                <GrillBars />
                <Embers />
                <CinematicSmoke />
                <FloatingTypography />
                <RisingSparks />
            </group>

            <ContactShadows
                position={[ 0, -0.7, 0 ]}
                opacity={0.6}
                scale={30}
                blur={2.5}
                far={5}
            />
        </>
    );
};

const GrillHeroScene: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <Canvas shadows dpr={[ 1, 2 ]}>
                <PerspectiveCamera makeDefault fov={40} position={[ 0, 2, 6 ]} />
                <Scene />
            </Canvas>

            {/* Final Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-10 border border-white/5 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)] opacity-60 pointer-events-none" />
        </div>
    );
};

export default GrillHeroScene;
