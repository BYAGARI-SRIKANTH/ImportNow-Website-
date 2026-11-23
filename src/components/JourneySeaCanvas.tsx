import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { isSoftwareGl, scheduleAfterDraw } from '../utils/webgl';
import { SHANGHAI_PORT_IMAGE } from '../data/importNowData';

interface JourneySeaCanvasProps {
  /** Continuous normalized scroll progress in [0, 1] controlled by ImportJourney */
  progressRef: React.MutableRefObject<number>;
  /** Honors prefers-reduced-motion accessibility preference */
  reducedMotion: boolean;
}

interface PortGantryBuild {
  group: THREE.Group;
  trolley: THREE.Group;
}

function buildContainerShip(): { ship: THREE.Group; wakeMesh: THREE.Mesh } {
  const ship = new THREE.Group();

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x0b132b,
    roughness: 0.52,
    metalness: 0.28,
  });
  const waterlineMat = new THREE.MeshStandardMaterial({
    color: 0xc2410c,
    roughness: 0.62,
    metalness: 0.14,
  });
  const deckMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.72,
    metalness: 0.16,
  });
  const superMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.38,
    metalness: 0.08,
  });
  const windowMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.12,
    metalness: 0.85,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: 0xea580c,
    roughness: 0.42,
    metalness: 0.22,
  });
  const beaconMat = new THREE.MeshBasicMaterial({
    color: 0xfb923c,
  });

  // Main hull body
  const hull = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.56, 1.14), hullMat);
  hull.position.set(0, 0.28, 0);
  ship.add(hull);

  // Lower rust-orange waterline stripe
  const waterline = new THREE.Mesh(new THREE.BoxGeometry(3.86, 0.18, 1.16), waterlineMat);
  waterline.position.set(0, 0.04, 0);
  ship.add(waterline);

  // Pointed bow wedge
  const bowShape = new THREE.Shape();
  bowShape.moveTo(0, -0.57);
  bowShape.lineTo(0.9, 0);
  bowShape.lineTo(0, 0.57);
  bowShape.closePath();
  const bowGeo = new THREE.ExtrudeGeometry(bowShape, {
    depth: 0.57,
    bevelEnabled: false,
  });
  bowGeo.rotateX(-Math.PI / 2);
  const bow = new THREE.Mesh(bowGeo, hullMat);
  bow.position.set(1.9, 0.0, 0);
  ship.add(bow);

  // Deck plate
  const deck = new THREE.Mesh(new THREE.BoxGeometry(3.72, 0.06, 1.08), deckMat);
  deck.position.set(0, 0.59, 0);
  ship.add(deck);

  // Aft bridge superstructure
  const bridgeBase = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.96, 0.94), superMat);
  bridgeBase.position.set(-1.35, 1.07, 0);
  ship.add(bridgeBase);

  const bridgeWing = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 1.26), superMat);
  bridgeWing.position.set(-1.24, 1.5, 0);
  ship.add(bridgeWing);

  const bridgeGlass = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 1.16), windowMat);
  bridgeGlass.position.set(-1.21, 1.52, 0);
  ship.add(bridgeGlass);

  // Funnel with ImportNow orange collar
  const funnel = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.44, 0.28), accentMat);
  funnel.position.set(-1.62, 1.4, 0);
  ship.add(funnel);

  // Radar mast & warm navigation beacon
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.46, 8), superMat);
  mast.position.set(-1.28, 1.82, 0);
  ship.add(mast);

  const navLight = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), beaconMat);
  navLight.position.set(-1.28, 2.07, 0);
  ship.add(navLight);

  // Stacked shipping containers
  const containerColors = [0xea580c, 0x1e3a8a, 0x0f766e, 0xf97316, 0x334155, 0xd97706];
  const containerMats = containerColors.map(
    (c) =>
      new THREE.MeshStandardMaterial({
        color: c,
        roughness: 0.5,
        metalness: 0.22,
      }),
  );
  const containerGeo = new THREE.BoxGeometry(0.56, 0.24, 0.28);

  const cols = 4;
  const rows = 3;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const stackHeight = c === 3 ? 2 : r === 1 ? 3 : 2;
      for (let h = 0; h < stackHeight; h++) {
        const mat = containerMats[(c * 5 + r * 3 + h) % containerMats.length];
        const box = new THREE.Mesh(containerGeo, mat);
        box.position.set(-0.68 + c * 0.62, 0.74 + h * 0.25, -0.31 + r * 0.31);
        ship.add(box);
      }
    }
  }

  // Subtle trailing wake foam behind the stern
  const wakeGeo = new THREE.PlaneGeometry(2.6, 1.15);
  wakeGeo.rotateX(-Math.PI / 2);
  const wakeMat = new THREE.MeshBasicMaterial({
    color: 0xbae6fd,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  });
  const wakeMesh = new THREE.Mesh(wakeGeo, wakeMat);
  wakeMesh.position.set(-3.1, 0.03, 0);
  ship.add(wakeMesh);

  return { ship, wakeMesh };
}

function buildPortGantry(xPos: number, isOrigin: boolean): PortGantryBuild {
  const group = new THREE.Group();
  const orangeMat = new THREE.MeshStandardMaterial({
    color: isOrigin ? 0xea580c : 0xf97316,
    roughness: 0.45,
    metalness: 0.35,
  });
  const pierMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.85,
    metalness: 0.12,
  });
  const yardBoxMat = new THREE.MeshStandardMaterial({
    color: isOrigin ? 0x1e3a8a : 0x0f766e,
    roughness: 0.55,
    metalness: 0.2,
  });
  const cableMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
  const beaconMat = new THREE.MeshBasicMaterial({
    color: isOrigin ? 0xf97316 : 0x38bdf8,
  });

  // Concrete quay pier
  const pier = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.72, 2.5), pierMat);
  pier.position.set(0, 0.18, -2.15);
  group.add(pier);

  // Stacked yard containers on quay
  const yardGeo = new THREE.BoxGeometry(0.65, 0.26, 0.32);
  for (let i = 0; i < 3; i++) {
    const stack = new THREE.Mesh(yardGeo, i % 2 === 0 ? yardBoxMat : orangeMat);
    stack.position.set(-1.15 + i * 0.78, 0.67, -2.55);
    group.add(stack);
  }

  // Vertical gantry legs
  const legGeo = new THREE.BoxGeometry(0.14, 2.55, 0.14);
  const legPositions: [number, number][] = [
    [-0.6, -1.35],
    [0.6, -1.35],
    [-0.6, -2.25],
    [0.6, -2.25],
  ];
  legPositions.forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(legGeo, orangeMat);
    leg.position.set(lx, 1.62, lz);
    group.add(leg);
  });

  // Boom extending over the water berth
  const boom = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 3.3), orangeMat);
  boom.position.set(0, 2.82, -0.85);
  group.add(boom);

  // Crossbeam
  const cross = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.16, 0.22), orangeMat);
  cross.position.set(0, 2.48, -1.8);
  group.add(cross);

  // Port beacon light atop boom
  const portBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), beaconMat);
  portBeacon.position.set(0, 3.0, 0.65);
  group.add(portBeacon);

  // Moving crane spreader trolley + suspended container
  const trolley = new THREE.Group();
  const carriage = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.36), pierMat);
  carriage.position.set(0, 2.7, 0.15);
  trolley.add(carriage);

  const cableL = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.85, 6), cableMat);
  cableL.position.set(-0.2, 2.25, 0.15);
  trolley.add(cableL);

  const cableR = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.85, 6), cableMat);
  cableR.position.set(0.2, 2.25, 0.15);
  trolley.add(cableR);

  const hangingContainer = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.24, 0.3), orangeMat);
  hangingContainer.position.set(0, 1.78, 0.15);
  trolley.add(hangingContainer);

  group.add(trolley);
  group.position.set(xPos, 0, 0);

  return { group, trolley };
}

export function JourneySeaCanvas({ progressRef, reducedMotion }: JourneySeaCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(reducedMotion);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const gl = renderer.getContext();
    const software = isSoftwareGl(gl);
    const isMobile = window.innerWidth < 768;

    renderer.setPixelRatio(
      software ? 1 : Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 540;
    renderer.setSize(width, height);
    renderer.domElement.className = 'w-full h-full block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x081026);
    scene.fog = new THREE.FogExp2(0x081026, 0.036);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 140);

    // Maritime lighting: warm horizon sun + amber rim + cool sky hemisphere
    const sunLight = new THREE.DirectionalLight(0xffedd5, 2.3);
    sunLight.position.set(12, 14, 9);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xf97316, 0.95);
    rimLight.position.set(-12, 5, -7);
    scene.add(rimLight);

    scene.add(new THREE.HemisphereLight(0x93c5fd, 0x0b132b, 0.85));

    // Ocean mesh — lighter vertex density on software/mobile GPUs
    const segX = software || isMobile ? 34 : 56;
    const segZ = software || isMobile ? 22 : 34;
    const seaGeo = new THREE.PlaneGeometry(54, 30, segX, segZ);
    seaGeo.rotateX(-Math.PI / 2);
    const seaMat = new THREE.MeshStandardMaterial({
      color: 0x0f2747,
      roughness: 0.28,
      metalness: 0.44,
      flatShading: true,
    });
    const seaMesh = new THREE.Mesh(seaGeo, seaMat);
    seaMesh.position.y = 0;
    scene.add(seaMesh);

    const seaPosAttr = seaGeo.attributes.position as THREE.BufferAttribute;
    const baseSeaX = new Float32Array(seaPosAttr.count);
    const baseSeaZ = new Float32Array(seaPosAttr.count);
    for (let i = 0; i < seaPosAttr.count; i++) {
      baseSeaX[i] = seaPosAttr.getX(i);
      baseSeaZ[i] = seaPosAttr.getZ(i);
    }

    // Continuous curved shipping corridor from China (Shanghai) to India (Chennai)
    const shipPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6.2, 0.04, 0.15), // China departure berth (Shanghai)
      new THREE.Vector3(-4.2, 0.04, 0.45), // Clearing Shanghai harbor
      new THREE.Vector3(-1.4, 0.04, 1.05), // South China Sea arc
      new THREE.Vector3(1.8, 0.04, 0.95),  // Indian Ocean crossing
      new THREE.Vector3(4.5, 0.04, 0.42),  // Chennai port approach
      new THREE.Vector3(6.2, 0.04, 0.15),  // Chennai arrival berth
    ]);

    // Glowing maritime corridor guide line on the water
    const laneGeo = new THREE.TubeGeometry(shipPath, 72, 0.028, 6, false);
    const laneMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.42,
    });
    const laneMesh = new THREE.Mesh(laneGeo, laneMat);
    scene.add(laneMesh);

    // Subtle waypoint buoys along the sea lane
    const buoyGeo = new THREE.SphereGeometry(0.065, 10, 10);
    const buoyMat = new THREE.MeshBasicMaterial({ color: 0xfb923c });
    [0.2, 0.4, 0.6, 0.8].forEach((u) => {
      const pt = shipPath.getPointAt(u);
      const buoy = new THREE.Mesh(buoyGeo, buoyMat);
      buoy.position.set(pt.x, 0.08, pt.z);
      scene.add(buoy);
    });

    // Origin (Shanghai) and Destination (Chennai) port terminals
    const shanghaiPort = buildPortGantry(-6.2, true);
    const chennaiPort = buildPortGantry(6.2, false);
    scene.add(shanghaiPort.group);
    scene.add(chennaiPort.group);

    // Composite container ship
    const { ship, wakeMesh } = buildContainerShip();
    const initialPoint = shipPath.getPointAt(0);
    ship.position.copy(initialPoint);
    scene.add(ship);

    // Smooth camera track synchronized to ship progress
    const camPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8.4, 3.6, 7.2),
      new THREE.Vector3(-5.2, 3.3, 6.8),
      new THREE.Vector3(-1.8, 3.0, 7.6),
      new THREE.Vector3(1.8, 2.8, 7.5),
      new THREE.Vector3(5.1, 3.3, 6.8),
      new THREE.Vector3(8.0, 3.6, 7.2),
    ]);

    // Resize handling (adapts desktop offset so ship stays visible right of sidebar on wide viewports)
    let viewportWidth = width;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(1, Math.floor(entry.contentRect.width));
        const h = Math.max(1, Math.floor(entry.contentRect.height));
        viewportWidth = w;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Pause rendering when scrolled off-screen to preserve GPU/battery
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '200px 0px' },
    );
    intersectionObserver.observe(container);

    // Pre-allocated math objects for zero-GC animation loop
    const clock = new THREE.Clock();
    const targetShipPos = new THREE.Vector3();
    const shipTangent = new THREE.Vector3();
    const targetCamPos = new THREE.Vector3();
    const targetLook = new THREE.Vector3();
    const currentLook = new THREE.Vector3(-6.2, 0.7, 0.15);

    let smoothProgress = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    let prevSmoothProgress = smoothProgress;
    let disposed = false;
    let frameHandle = 0;

    // Position camera cleanly on first frame
    camPath.getPointAt(smoothProgress, targetCamPos);
    camera.position.copy(targetCamPos);
    camera.lookAt(currentLook);

    const animate = () => {
      if (disposed) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();

      if (isVisible) {
        const reduce = reducedMotionRef.current;
        const targetProgress = THREE.MathUtils.clamp(progressRef.current, 0, 1);

        // Smooth frame-rate-independent damping in both scroll directions (down & up)
        const dampRate = reduce ? 12 : 6.2;
        const alpha = 1 - Math.exp(-dampRate * dt);
        smoothProgress = THREE.MathUtils.lerp(smoothProgress, targetProgress, alpha);

        const scrollSpeed = Math.abs(smoothProgress - prevSmoothProgress) / Math.max(dt, 0.001);
        prevSmoothProgress = smoothProgress;

        // Subtle rolling ocean surface (paused for prefers-reduced-motion)
        if (!reduce) {
          for (let i = 0; i < seaPosAttr.count; i++) {
            const x = baseSeaX[i];
            const z = baseSeaZ[i];
            const wave =
              Math.sin(x * 0.42 + t * 1.35) * 0.085 +
              Math.cos(z * 0.52 + t * 1.05) * 0.055;
            seaPosAttr.setY(i, wave);
          }
          seaPosAttr.needsUpdate = true;
        }

        // Ship position & heading along the China -> India spline
        shipPath.getPointAt(smoothProgress, targetShipPos);
        shipPath.getTangentAt(smoothProgress, shipTangent);

        ship.position.x = targetShipPos.x;
        ship.position.z = targetShipPos.z;
        ship.position.y = reduce ? 0.04 : 0.04 + Math.sin(t * 1.65) * 0.042;

        // Smoothly steer bow along curved corridor (ship model faces +X)
        const targetYaw = Math.atan2(-shipTangent.z, shipTangent.x);
        ship.rotation.y = THREE.MathUtils.lerp(ship.rotation.y, targetYaw, alpha);
        ship.rotation.z = reduce ? 0 : Math.sin(t * 1.3) * 0.02;
        ship.rotation.x = reduce ? 0 : Math.cos(t * 1.05) * 0.016;

        // Scale wake intensity subtly with movement across the ocean
        const wakeMat = wakeMesh.material as THREE.MeshBasicMaterial;
        const inOpenSea = Math.sin(smoothProgress * Math.PI);
        const targetWakeOpacity = reduce
          ? 0.06
          : THREE.MathUtils.clamp(0.08 + inOpenSea * 0.14 + scrollSpeed * 0.25, 0.06, 0.34);
        wakeMat.opacity = THREE.MathUtils.lerp(wakeMat.opacity, targetWakeOpacity, alpha);

        // Animate Shanghai crane lowering container around loading stage (progress ~0.30..0.42)
        const loadPhase = THREE.MathUtils.clamp(1 - Math.abs(smoothProgress - 0.34) / 0.18, 0, 1);
        shanghaiPort.trolley.position.y = -loadPhase * 0.52;

        // Animate Chennai crane lifting container around arrival/unloading (progress ~0.82..1.0)
        const unloadPhase = THREE.MathUtils.clamp((smoothProgress - 0.78) / 0.22, 0, 1);
        chennaiPort.trolley.position.y = -Math.sin(unloadPhase * Math.PI) * 0.5;

        // Smooth camera tracking along paired spline
        // On wide desktop screens, bias lookAt slightly left so the ship sits framed cleanly to the right of the step sidebar
        const desktopShift = viewportWidth >= 1024 ? -1.45 : 0;
        camPath.getPointAt(smoothProgress, targetCamPos);
        targetCamPos.x += desktopShift * 0.55 + (reduce ? 0 : Math.sin(t * 0.28) * 0.18);
        targetCamPos.z += viewportWidth < 640 ? 1.5 : 0;

        targetLook.set(targetShipPos.x + desktopShift, 0.72, targetShipPos.z);

        camera.position.lerp(targetCamPos, alpha);
        currentLook.lerp(targetLook, alpha);
        camera.lookAt(currentLook);

        renderer.render(scene, camera);
      }

      frameHandle = scheduleAfterDraw(renderer, software, animate);
    };

    animate();

    return () => {
      disposed = true;
      if (software) {
        window.clearTimeout(frameHandle);
      } else {
        window.cancelAnimationFrame(frameHandle);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      envTarget.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [progressRef]);

  if (webglFailed) {
    return (
      <img
        src={SHANGHAI_PORT_IMAGE}
        alt="Container ship sailing from Shanghai to Chennai"
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    );
  }

  return <div ref={containerRef} className="w-full h-full" aria-hidden="true" />;
}
