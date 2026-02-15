import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    PerspectiveCamera,
    Float,
    MeshDistortMaterial,
    Environment,
    ContactShadows,
    Sparkles,
    Clouds,
    Cloud,
    Text,
    Image,
    ScrollControls,
    useScroll
} from '@react-three/drei';
import * as THREE from 'three';

// --- Components ---

const SesameSeeds = ({ scroll }: { scroll: number }) => {
    const count = 150;
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                x: (Math.random() - 0.5) * 3,
                y: (Math.random() - 0.5) * 4 + 1,
                z: (Math.random() - 0.5) * 2,
                speed: 0.002 + Math.random() * 0.005,
                rotation: Math.random() * Math.PI,
                factor: Math.random() * 0.8 + 0.2
            });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        particles.forEach((p, i) => {
            const time = state.clock.getElapsedTime();
            p.y -= p.speed;
            if (p.y < -2) p.y = 4;

            // Apply scroll effect - rise faster as we scroll
            const yPos = p.y + scroll * 5;

            dummy.position.set(
                p.x + Math.sin(time * 0.3 + i) * 0.1,
                yPos,
                p.z + Math.cos(time * 0.2 + i) * 0.1
            );
            dummy.scale.setScalar(0.012 * p.factor);
            dummy.rotation.set(time * 0.5 + i, time * 0.3, 0);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[ undefined, undefined, count ]} frustumCulled={false}>
            <boxGeometry args={[ 1, 1, 0.2 ]} />
            <meshStandardMaterial color="#f0e68c" emissive="#ccaa44" emissiveIntensity={0.5} />
        </instancedMesh>
    );
};

const HeatDistortion = () => {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.5;
        }
    });

    return (
        <mesh ref={mesh} position={[ 0, 0.4, 0 ]}>
            <cylinderGeometry args={[ 0.7, 0.8, 0.8, 32, 1, true ]} />
            <MeshDistortMaterial
                transparent
                opacity={0.15}
                speed={3}
                distort={0.4}
                color="#ffaa44"
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

const GoldParticles = ({ progress }: { progress: number }) => {
    const count = 5000;
    const points = useRef<THREE.Points>(null!);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Initial position: dispersed around the dish
            pos[ i * 3 ] = (Math.random() - 0.5) * 2;
            pos[ i * 3 + 1 ] = Math.random() * 0.5;
            pos[ i * 3 + 2 ] = (Math.random() - 0.5) * 2;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!points.current) return;
        const array = points.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            // Particles rise and disperse based on progress
            const speed = 0.02 + (i % 100) / 5000;
            array[ i * 3 + 1 ] += (progress * speed * 20); // Rise upward
            array[ i * 3 ] += Math.sin(state.clock.elapsedTime + i) * 0.01 * progress; // Lateral drift
            array[ i * 3 + 2 ] += Math.cos(state.clock.elapsedTime + i) * 0.01 * progress;
        }
        points.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={points} visible={progress > 0.05}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#eebe2b"
                transparent
                opacity={Math.min(1, progress * 2)}
                sizeAttenuation
            />
        </points>
    );
};

const FoodDish = ({ progress }: { progress: number }) => {
    return (
        <group scale={1 - progress} position={[ 0, -progress * 2, 0 ]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Bowl */}
                <mesh position={[ 0, 0, 0 ]} castShadow receiveShadow>
                    <cylinderGeometry args={[ 1.2, 0.9, 0.45, 64 ]} />
                    <meshStandardMaterial
                        color="#080808"
                        roughness={0.1}
                        metalness={1}
                        envMapIntensity={2}
                    />
                </mesh>

                {/* Food Content */}
                <group position={[ 0, 0.2, 0 ]}>
                    <mesh rotation={[ -Math.PI / 2, 0, 0 ]}>
                        <circleGeometry args={[ 1.1, 32 ]} />
                        <meshStandardMaterial color="#ffffff" roughness={1} />
                    </mesh>

                    {/* Highly detailed Bibimbap layout */}
                    {[ ...Array(12) ].map((_, i) => (
                        <group key={i} rotation={[ 0, (i * Math.PI) / 6, 0 ]}>
                            <mesh position={[ 0.6, 0.05, 0 ]} castShadow>
                                <boxGeometry args={[ 0.5, 0.1, 0.2 ]} />
                                <meshStandardMaterial
                                    color={[ '#2d5a27', '#8b0000', '#ff8c00', '#552200', '#ddccaa', '#aa2211' ][ i % 6 ]}
                                    roughness={0.6}
                                />
                            </mesh>
                        </group>
                    ))}

                    {/* Glowing Egg Yolk */}
                    <mesh position={[ 0, 0.08, 0 ]} castShadow>
                        <sphereGeometry args={[ 0.25, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2 ]} />
                        <meshStandardMaterial
                            color="#ffbb00"
                            emissive="#ff6600"
                            emissiveIntensity={2}
                            roughness={0}
                            metalness={1}
                        />
                    </mesh>
                </group>

                <HeatDistortion />
                {/* Volumetric Smoke */}
                <Clouds material={THREE.MeshStandardMaterial}>
                    <Cloud seed={10} bounds={[ 0.5, 0.5, 0.5 ]} volume={0.4} color="#555" opacity={0.2} fade={10} speed={0.2} segments={20} position={[ 0, 0.5, 0 ]} />
                    <Cloud seed={20} bounds={[ 0.8, 0.2, 0.8 ]} volume={0.5} color="#333" opacity={0.1} fade={15} speed={0.1} segments={15} position={[ 0, 1.2, 0 ]} />
                </Clouds>
            </Float>
        </group>
    );
};

const HanokBackground = () => {
    return (
        <group position={[ 0, 0, -10 ]}>
            {/* Silhouette of Hanok Roof */}
            <mesh position={[ 0, 2, -2 ]}>
                <planeGeometry args={[ 20, 10 ]} />
                <meshBasicMaterial
                    color="#050505"
                    transparent
                    opacity={0.8}
                    alphaMap={new THREE.TextureLoader().load('https://images.unsplash.com/photo-1543326175-3b608882416c?auto=format&fit=crop&q=80&w=1200')} // Using image as alpha map hint
                />
            </mesh>
            {/* Atmospheric Haze */}
            <Clouds position={[ 0, 0, -5 ]}>
                <Cloud seed={40} speed={0.05} opacity={0.1} volume={10} color="#111" bounds={[ 20, 10, 5 ]} />
            </Clouds>
            {/* Distant Golden Rim Light */}
            <pointLight position={[ 0, 5, -8 ]} intensity={50} color="#eebe2b" />
        </group>
    );
};

const Scene = () => {
    // Standard static cinematic camera
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        state.camera.position.set(
            Math.sin(t * 0.1) * 0.1,
            1.1 + Math.cos(t * 0.1) * 0.05,
            3.0 // Closer for more dominance
        );
        state.camera.lookAt(0, -0.1, 0);
    });

    return (
        <>
            <Environment preset="night" />
            <ambientLight intensity={0.02} />

            <spotLight
                position={[ 5, 5, 5 ]}
                angle={0.25}
                penumbra={1}
                intensity={300}
                castShadow
                color="#ffbb44"
            />

            <spotLight
                position={[ -5, 2, -3 ]}
                angle={0.4}
                penumbra={1}
                intensity={150}
                color="#eebe2b"
            />

            {/* Increased Dish Scale to 1.5 to dominate frame */}
            <group scale={1.8}>
                <FoodDish progress={0} />
            </group>

            <SesameSeeds scroll={0} />
            <HanokBackground />

            <Sparkles count={80} scale={6} size={2} speed={0.4} color="#eebe2b" opacity={0.6} />

            <ContactShadows
                position={[ 0, -0.2, 0 ]}
                opacity={0.6}
                scale={10}
                blur={2.5}
                far={2}
            />

            <fog attach="fog" args={[ '#050505', 2, 12 ]} />
        </>
    );
};

const CinematicScene: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full z-0">
            <Canvas shadows dpr={[ 1, 2 ]}>
                <PerspectiveCamera makeDefault fov={45} />
                <color attach="background" args={[ '#050505' ]} />
                <Scene />
            </Canvas>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_80%)] opacity-40 pointer-events-none" />
        </div>
    );
};

export default CinematicScene;
