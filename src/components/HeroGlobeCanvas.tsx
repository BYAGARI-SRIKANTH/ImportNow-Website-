import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { isSoftwareGl, latLngToVector3, scheduleAfterDraw } from '../utils/webgl';
import { FlagCN, FlagIN } from './BrandPrimitives';
import { SHANGHAI_PORT_IMAGE } from '../data/importNowData';

interface CityNode {
  id: string;
  name: string;
  country: 'CN' | 'IN';
  lat: number;
  lng: number;
  /** Screen-space offset [dx, dy] in px to keep all 7 labels readable with zero overlap */
  labelOffset: [number, number];
}

const CITIES: CityNode[] = [
  { id: 'shanghai', name: 'Shanghai', country: 'CN', lat: 31.23, lng: 121.47, labelOffset: [-48, -14] },
  { id: 'yiwu', name: 'Yiwu', country: 'CN', lat: 29.31, lng: 120.08, labelOffset: [-34, 16] },
  { id: 'guangzhou', name: 'Guangzhou', country: 'CN', lat: 23.13, lng: 113.26, labelOffset: [-52, -16] },
  { id: 'shenzhen', name: 'Shenzhen', country: 'CN', lat: 22.54, lng: 114.06, labelOffset: [-44, 18] },
  { id: 'nhava-sheva', name: 'Nhava Sheva', country: 'IN', lat: 18.95, lng: 72.95, labelOffset: [-64, -2] },
  { id: 'hyderabad', name: 'Hyderabad', country: 'IN', lat: 17.38, lng: 78.49, labelOffset: [56, -8] },
  { id: 'chennai', name: 'Chennai', country: 'IN', lat: 13.08, lng: 80.27, labelOffset: [46, 18] },
];

const TRADE_ROUTES: [string, string][] = [
  ['shanghai', 'nhava-sheva'],
  ['shanghai', 'hyderabad'],
  ['yiwu', 'chennai'],
  ['guangzhou', 'hyderabad'],
  ['guangzhou', 'chennai'],
  ['shenzhen', 'nhava-sheva'],
];

const EARTH_TEXTURES = {
  color: '/textures/earth_atmos_2048.jpg',
  normal: '/textures/earth_normal_2048.jpg',
  specular: '/textures/earth_specular_2048.jpg',
  clouds: '/textures/earth_clouds_1024.png',
};

/**
 * Fallback procedural texture used immediately while high-res satellite textures load
 * or if a texture request fails.
 */
function createFallbackEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#0a1c3f');
  grad.addColorStop(0.5, '#133163');
  grad.addColorStop(1, '#091836');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Converts a NASA ocean-specular mask (bright ocean, dark land) into a PBR roughness map
 * (smooth glossy ocean ~0.34, natural matte continents ~0.88).
 */
function buildRoughnessFromSpecular(img: HTMLImageElement): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = img.width || 1024;
  canvas.height = img.height || 512;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    // High value in specular map = water -> low roughness (~92/255)
    // Low value in specular map = land -> high roughness (~226/255)
    const spec = data[i] / 255;
    const rough = Math.round(226 - spec * 134);
    data[i] = rough;
    data[i + 1] = rough;
    data[i + 2] = rough;
    data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Soft radial sky-blue glow sprite texture rendered behind the Earth sphere
 * so the blue atmospheric aura blends seamlessly onto the white page background.
 */
function createBlueHaloTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const grad = ctx.createRadialGradient(cx, cx, size * 0.34, cx, cx, size * 0.5);
  grad.addColorStop(0.0, 'rgba(37, 99, 235, 0.72)');
  grad.addColorStop(0.28, 'rgba(59, 130, 246, 0.62)');
  grad.addColorStop(0.56, 'rgba(96, 165, 250, 0.32)');
  grad.addColorStop(0.8, 'rgba(147, 197, 253, 0.10)');
  grad.addColorStop(1.0, 'rgba(147, 197, 253, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function HeroGlobeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
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
    renderer.toneMappingExposure = 1.12;

    const width = container.clientWidth || 620;
    const height = container.clientHeight || 580;
    renderer.setSize(width, height);
    renderer.domElement.className = 'w-full h-full block cursor-grab active:cursor-grabbing';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    scene.environmentIntensity = 0.45;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    const updateCameraDistance = (w: number, h: number) => {
      const aspect = w / Math.max(1, h);
      const baseZ = aspect < 0.92 ? 7.1 : aspect < 1.08 ? 6.5 : 6.15;
      camera.position.set(0, 0.12, baseZ);
      camera.lookAt(0, 0, 0);
    };
    updateCameraDistance(width, height);

    // Pure daylight + soft sky-blue lighting (no purple or pink tints)
    const sunKey = new THREE.DirectionalLight(0xffffff, 2.45);
    sunKey.position.set(5.5, 3.8, 7.2);
    scene.add(sunKey);

    const skyFill = new THREE.DirectionalLight(0x93c5fd, 0.78);
    skyFill.position.set(-6.0, 2.2, 3.5);
    scene.add(skyFill);

    scene.add(new THREE.HemisphereLight(0xf8fafc, 0x1e3a5f, 0.92));

    // Globe root oriented to showcase Arabian Sea, India, Himalayas & China cleanly like the reference
    const globeGroup = new THREE.Group();
    const focusLng = 84;
    const focusLat = 22;
    const baseRotY = Math.PI * 0.5 - ((focusLng + 180) * Math.PI) / 180;
    const baseRotX = (focusLat * Math.PI) / 180;
    globeGroup.rotation.set(baseRotX, baseRotY, 0);
    scene.add(globeGroup);

    const R = 1.82;
    const fallbackTex = createFallbackEarthTexture();
    const loadedTextures: THREE.Texture[] = [];

    const sphereGeo = new THREE.SphereGeometry(R, software ? 48 : 80, software ? 36 : 60);
    const earthMat = new THREE.MeshStandardMaterial({
      map: fallbackTex,
      roughness: 0.78,
      metalness: 0.06,
      normalScale: new THREE.Vector2(0.85, 0.85),
    });
    const earthMesh = new THREE.Mesh(sphereGeo, earthMat);
    globeGroup.add(earthMesh);

    // Cloud layer floating slightly above the Earth surface
    const cloudGeo = new THREE.SphereGeometry(R * 1.008, software ? 40 : 64, software ? 28 : 48);
    const cloudMat = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.0,
      roughness: 0.95,
      metalness: 0.0,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    globeGroup.add(cloudMesh);

    // Load actual high-resolution NASA Blue Marble Earth satellite textures
    let disposed = false;
    const loader = new THREE.TextureLoader();

    loader.load(
      EARTH_TEXTURES.color,
      (tex) => {
        if (disposed) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        loadedTextures.push(tex);
        earthMat.map = tex;
        earthMat.needsUpdate = true;
      },
      undefined,
      () => {
        // Keeps fallbackTex cleanly if color map fails
      },
    );

    loader.load(
      EARTH_TEXTURES.normal,
      (tex) => {
        if (disposed) {
          tex.dispose();
          return;
        }
        loadedTextures.push(tex);
        earthMat.normalMap = tex;
        earthMat.needsUpdate = true;
      },
      undefined,
      () => {
        // Optional normal map
      },
    );

    const specImg = new Image();
    specImg.crossOrigin = 'anonymous';
    specImg.onload = () => {
      if (disposed) return;
      const roughTex = buildRoughnessFromSpecular(specImg);
      loadedTextures.push(roughTex);
      earthMat.roughnessMap = roughTex;
      earthMat.roughness = 1.0;
      earthMat.needsUpdate = true;
    };
    specImg.src = EARTH_TEXTURES.specular;

    loader.load(
      EARTH_TEXTURES.clouds,
      (tex) => {
        if (disposed) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        loadedTextures.push(tex);
        cloudMat.map = tex;
        cloudMat.opacity = 0.52;
        cloudMat.needsUpdate = true;
      },
      undefined,
      () => {
        // Clouds optional if loading fails
      },
    );

    // 1. Inner atmospheric sky-blue Fresnel limb glow over the Earth's curved edge
    const innerAtmoGeo = new THREE.SphereGeometry(R * 1.016, software ? 36 : 56, software ? 28 : 44);
    const innerAtmoMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
      uniforms: {
        uColor: { value: new THREE.Color('#60a5fa') },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          float rim = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.2);
          gl_FragColor = vec4(uColor, rim * 0.62);
        }
      `,
    });
    const innerAtmoMesh = new THREE.Mesh(innerAtmoGeo, innerAtmoMat);
    globeGroup.add(innerAtmoMesh);

    // 2. Soft luminous blue outer atmospheric halo behind the globe (clean NormalBlending on white bg)
    const haloTex = createBlueHaloTexture();
    const haloPlaneGeo = new THREE.PlaneGeometry(R * 2.52, R * 2.52);
    const haloPlaneMat = new THREE.MeshBasicMaterial({
      map: haloTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.92,
    });
    const haloBackdrop = new THREE.Mesh(haloPlaneGeo, haloPlaneMat);
    haloBackdrop.position.set(0, 0, -0.35);
    haloBackdrop.renderOrder = -1;
    scene.add(haloBackdrop);

    // Location beacons (China hubs in glowing red/orange, India destinations in crisp luminous white rings)
    const cityMap = new Map<string, THREE.Vector3>();
    const dotGeo = new THREE.SphereGeometry(0.028, 14, 14);
    const staticRingGeo = new THREE.RingGeometry(0.048, 0.068, 28);
    const pulseRingGeo = new THREE.RingGeometry(0.055, 0.088, 28);

    const cnDotMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const inDotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cnStaticRingMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const inStaticRingMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });

    const pulseRings: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }[] = [];
    const cityVectors: { node: CityNode; localPos: THREE.Vector3 }[] = [];

    CITIES.forEach((city, idx) => {
      const pos = latLngToVector3(city.lat, city.lng, R + 0.02);
      cityMap.set(city.id, pos);
      cityVectors.push({ node: city, localPos: pos.clone() });

      const isChina = city.country === 'CN';
      const outward = pos.clone().multiplyScalar(2);

      const dot = new THREE.Mesh(dotGeo, isChina ? cnDotMat : inDotMat);
      dot.position.copy(pos);
      globeGroup.add(dot);

      const staticRing = new THREE.Mesh(
        staticRingGeo,
        isChina ? cnStaticRingMat : inStaticRingMat,
      );
      staticRing.position.copy(pos.clone().multiplyScalar(1.002));
      staticRing.lookAt(outward);
      globeGroup.add(staticRing);

      const pMat = new THREE.MeshBasicMaterial({
        color: isChina ? 0xf97316 : 0xe0f2fe,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
      });
      const pRing = new THREE.Mesh(pulseRingGeo, pMat);
      pRing.position.copy(pos.clone().multiplyScalar(1.003));
      pRing.lookAt(outward);
      globeGroup.add(pRing);
      pulseRings.push({ mesh: pRing, mat: pMat, phase: idx * 0.85 });
    });

    // Curved glowing red/orange shipping routes + bright moving comet particles
    const arcGeos: THREE.BufferGeometry[] = [];
    const routeCoreMat = new THREE.MeshBasicMaterial({
      color: 0xea3820,
      transparent: true,
      opacity: 0.9,
    });
    const routeHaloMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.28,
    });

    const particleHeadGeo = new THREE.SphereGeometry(0.032, 12, 12);
    const particleTrailGeo = new THREE.SphereGeometry(0.02, 10, 10);
    const particleHeadMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const particleGlowMat = new THREE.MeshBasicMaterial({
      color: 0xfdba74,
      transparent: true,
      opacity: 0.85,
    });

    interface RouteParticle {
      head: THREE.Mesh;
      trail1: THREE.Mesh;
      trail2: THREE.Mesh;
      curve: THREE.QuadraticBezierCurve3;
      offset: number;
      speed: number;
    }
    const particles: RouteParticle[] = [];

    TRADE_ROUTES.forEach(([fromId, toId], idx) => {
      const start = cityMap.get(fromId);
      const end = cityMap.get(toId);
      if (!start || !end) return;

      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(R + 0.14 + dist * 0.22);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);

      const coreGeo = new THREE.TubeGeometry(curve, 48, 0.0075, 8, false);
      const glowGeo = new THREE.TubeGeometry(curve, 48, 0.019, 8, false);
      arcGeos.push(coreGeo, glowGeo);

      globeGroup.add(new THREE.Mesh(coreGeo, routeCoreMat));
      globeGroup.add(new THREE.Mesh(glowGeo, routeHaloMat));

      const head = new THREE.Mesh(particleHeadGeo, particleHeadMat);
      const trail1 = new THREE.Mesh(particleTrailGeo, particleGlowMat);
      const trail2 = new THREE.Mesh(particleTrailGeo, particleGlowMat);
      trail2.scale.setScalar(0.65);
      globeGroup.add(head, trail1, trail2);

      particles.push({
        head,
        trail1,
        trail2,
        curve,
        offset: idx * 0.17,
        speed: 0.16 + (idx % 3) * 0.035,
      });
    });

    // Subtle drag & hover interaction while keeping China & India effortlessly viewable
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - lastPointerX;
        const dy = e.clientY - lastPointerY;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
        targetOffsetY = THREE.MathUtils.clamp(targetOffsetY + dx * 0.0055, -0.75, 0.75);
        targetOffsetX = THREE.MathUtils.clamp(targetOffsetX + dy * 0.004, -0.45, 0.45);
      } else {
        const rect = container.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          targetOffsetY = nx * 0.16;
          targetOffsetX = ny * 0.09;
        }
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(1, Math.floor(entry.contentRect.width));
        const h = Math.max(1, Math.floor(entry.contentRect.height));
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        updateCameraDistance(w, h);
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Pause animation loop when hero is scrolled out of view
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '150px 0px' },
    );
    intersectionObserver.observe(container);

    const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionMq.matches;
    const onMotionChange = () => {
      reducedMotion = reducedMotionMq.matches;
    };
    reducedMotionMq.addEventListener('change', onMotionChange);

    // Pre-allocated vectors for zero-GC animation loop
    const tempWorld = new THREE.Vector3();
    const tempProjected = new THREE.Vector3();
    const tempNormal = new THREE.Vector3();
    const tempCamDir = new THREE.Vector3();
    const clock = new THREE.Clock();

    let frameHandle = 0;

    const renderFrame = () => {
      if (disposed) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      if (isVisible) {
        // Slow smooth globe oscillation keeping China & India continuously in view
        const slowSpinY = reducedMotion ? 0 : Math.sin(elapsed * 0.24) * 0.13;
        const slowTiltX = reducedMotion ? 0 : Math.cos(elapsed * 0.19) * 0.025;

        const damp = 1 - Math.exp(-4.8 * dt);
        currentOffsetY = THREE.MathUtils.lerp(currentOffsetY, targetOffsetY, damp);
        currentOffsetX = THREE.MathUtils.lerp(currentOffsetX, targetOffsetX, damp);

        globeGroup.rotation.y = baseRotY + currentOffsetY + slowSpinY;
        globeGroup.rotation.x = baseRotX + currentOffsetX + slowTiltX;

        // Gentle atmospheric cloud drift
        if (!reducedMotion) {
          cloudMesh.rotation.y += dt * 0.011;
        }

        haloBackdrop.lookAt(camera.position);

        // Animate concentric pulse rings at origin & destination hubs
        for (let i = 0; i < pulseRings.length; i++) {
          const pr = pulseRings[i];
          const cycle = reducedMotion ? 0.35 : (elapsed * 0.52 + pr.phase) % 1;
          pr.mesh.scale.setScalar(0.85 + cycle * 1.35);
          pr.mat.opacity = (1 - cycle) * 0.65;
        }

        // Advance moving shipment indicators along China -> India arcs
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const t = reducedMotion ? 0.5 : (elapsed * p.speed + p.offset) % 1;
          const t1 = Math.max(0, t - 0.028);
          const t2 = Math.max(0, t - 0.054);

          p.curve.getPoint(t, p.head.position);
          p.curve.getPoint(t1, p.trail1.position);
          p.curve.getPoint(t2, p.trail2.position);
          p.trail1.visible = t > 0.03;
          p.trail2.visible = t > 0.058;
        }

        globeGroup.updateMatrixWorld(true);
        renderer.render(scene, camera);

        // Project crisp white city labels near their geographical markers
        const cw = container.clientWidth;
        const ch = container.clientHeight;
        const offsetScale = cw < 440 ? 0.65 : 1;

        for (let i = 0; i < cityVectors.length; i++) {
          const { node, localPos } = cityVectors[i];
          const el = labelRefs.current[node.id];
          if (!el) continue;

          tempWorld.copy(localPos).applyMatrix4(globeGroup.matrixWorld);
          tempNormal.copy(tempWorld).normalize();
          tempCamDir.copy(camera.position).sub(tempWorld).normalize();
          const facing = tempNormal.dot(tempCamDir);

          tempProjected.copy(tempWorld).project(camera);
          const rawX = (tempProjected.x * 0.5 + 0.5) * cw + node.labelOffset[0] * offsetScale;
          const rawY = (-tempProjected.y * 0.5 + 0.5) * ch + node.labelOffset[1] * offsetScale;

          // Keep labels cleanly within canvas bounds
          const sx = THREE.MathUtils.clamp(rawX, 52, cw - 52);
          const sy = THREE.MathUtils.clamp(rawY, 18, ch - 18);

          el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(-50%, -50%)`;
          el.style.opacity = facing > 0.12 ? '1' : '0';
        }
      }

      frameHandle = scheduleAfterDraw(renderer, software, renderFrame);
    };

    renderFrame();

    return () => {
      disposed = true;
      if (software) {
        window.clearTimeout(frameHandle);
      } else {
        window.cancelAnimationFrame(frameHandle);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotionMq.removeEventListener('change', onMotionChange);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      sphereGeo.dispose();
      earthMat.dispose();
      fallbackTex.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      innerAtmoGeo.dispose();
      innerAtmoMat.dispose();
      haloPlaneGeo.dispose();
      haloPlaneMat.dispose();
      haloTex.dispose();
      loadedTextures.forEach((t) => t.dispose());
      dotGeo.dispose();
      staticRingGeo.dispose();
      pulseRingGeo.dispose();
      cnDotMat.dispose();
      inDotMat.dispose();
      cnStaticRingMat.dispose();
      inStaticRingMat.dispose();
      pulseRings.forEach((p) => p.mat.dispose());
      arcGeos.forEach((g) => g.dispose());
      routeCoreMat.dispose();
      routeHaloMat.dispose();
      particleHeadGeo.dispose();
      particleTrailGeo.dispose();
      particleHeadMat.dispose();
      particleGlowMat.dispose();
      envTarget.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
        <img
          src={SHANGHAI_PORT_IMAGE}
          alt="Shanghai container port terminal serving China to India trade routes"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden">
      {/* Clean white projected location labels (opaque surface, no backdrop-blur over WebGL) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {CITIES.map((city) => (
          <div
            key={city.id}
            ref={(el) => {
              labelRefs.current[city.id] = el;
            }}
            className="absolute top-0 left-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(11,19,43,0.18)] text-[10.5px] sm:text-[11.5px] font-semibold text-[#0B132B] whitespace-nowrap transition-opacity duration-200 will-change-transform"
            style={{ opacity: 0 }}
          >
            {city.country === 'CN' ? (
              <FlagCN className="w-3.5 h-2.5 rounded-[1.5px] shrink-0" />
            ) : (
              <FlagIN className="w-3.5 h-2.5 rounded-[1.5px] shrink-0" />
            )}
            <span>{city.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
