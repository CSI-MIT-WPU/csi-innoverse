"use client";
import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import * as random from "maath/random/dist/maath-random.esm";
import { Environment, PointMaterial, Points } from "@react-three/drei";
import { a, useTransition } from "@react-spring/three";
import { FontLoader, TextGeometry } from "three-stdlib";
import { create } from "zustand";

export default function Hero() {
  return (
    <div className="h-56 sm:my-auto md:h-96 lg:h-[48rem] xl:h-screen">
      <Canvas camera={{ position: [0, 3, 17], near: 1, far: 40 }}>
        <color attach="background" args={["#020817"]} />
        <ambientLight color={"#Ffffff"} />
        <directionalLight castShadow position={[2.5, 12, 12]} intensity={60} />
        <Suspense fallback={null}>
          <Geometries />
          <EffectComposer disableNormalPass>
            <N8AO aoRadius={3} distanceFalloff={3} intensity={1} />
          </EffectComposer>
        </Suspense>
        <Stars />
        <Environment preset="dawn" />
        {/* <Rig /> */}
      </Canvas>
    </div>
  );
}

const useStore = create((set) => {
  new FontLoader().load("/fonts/font.blob", (font) => {
    const config1 = {
      font,
      size: 2,
      height: 1,
      curveSegments: 12,
      bevelEnabled: false,
    };
    const config = {
      font,
      size: 5,
      height: 2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.1,
      bevelOffset: 0.2,
    };

    set({
      items: [
        {
          position: [-2.1, 0.5, -3],
          r: 0,
          geometry: new TextGeometry("CSI", config1),
        },
        {
          position: [-0.2, 0.5, -3],
          r: 0,
          geometry: new TextGeometry("MITWPU", config1),
          name: "MITWPU",
        },
        {
          position: [-6, -1.5, -4],
          r: 0,
          geometry: new TextGeometry("INNOVERSE", config),
        },
      ],
    });
  });
  const material = new THREE.MeshStandardMaterial({
    color: "#0d2498",
    metalness: 0.5,
    roughness: 0.3,
  });
  const materialMITWPU = new THREE.MeshStandardMaterial({
    color: "#800000",
    metalness: 0.5,
    roughness: 0.3,
  });
  return { items: [], material, materialMITWPU };
});

function Geometry({ r, position, ...props }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x =
      ref.current.rotation.y =
      ref.current.rotation.z +=
        0.004 * r;
    ref.current.position.y =
      position[1] +
      Math[r > 0.5 ? "cos" : "sin"](state.clock.getElapsedTime() * r) * r;
  });
  return (
    <group position={position} ref={ref}>
      <a.mesh {...props} />
    </group>
  );
}

function Geometries() {
  const { items, material, materialMITWPU } = useStore();

  const transition = useTransition(items, {
    from: { scale: [0, 0, 0], rotation: [0, 0, 0] },
    enter: ({ r }) => ({ scale: [1, 1, 1], rotation: [r * 3, r * 3, r * 3] }),
    leave: { scale: [0.1, 0.1, 0.1], rotation: [0, 0, 0] },
    config: { mass: 5, tension: 1000, friction: 100 },
    trail: 100,
  });

  return transition((props, { position: [x, y, z], r, geometry }) => {
    // console.log(geometry);
    const materialToUse =
      geometry.id === 4 || geometry.id === 3 ? materialMITWPU : material;
    return (
      <Geometry
        position={[x * 3, y * 3, z]}
        material={materialToUse}
        geometry={geometry}
        r={r}
        {...props}
      />
    );
  });
}

function Rig() {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();
  return useFrame(() =>
    camera.position.lerp(
      vec.set(pointer.x * 2, pointer.y * 1, camera.position.z),
      0.02
    )
  );
}

function Stars(props) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5001), { radius: 20 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0a0"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={true}
        />
      </Points>
    </group>
  );
}
