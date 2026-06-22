"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import styles from "../services3d.module.css";

type PremiumService = {
  label: string;
  title: string;
  copy: string;
  stack: string;
  accent: string;
};

type ScrollProgressRef = {
  current: number;
};

const premiumServices: PremiumService[] = [
  {
    label: "01 / BUILD",
    title: "Figma to WordPress",
    copy: "Pixel-perfect Elementor Pro pages built from approved designs with clean responsive spacing and editable sections.",
    stack: "Elementor Pro · Responsive · QA",
    accent: "#7dd3fc",
  },
  {
    label: "02 / REDESIGN",
    title: "Business Website Redesign",
    copy: "Modern layouts, stronger content flow, clearer CTAs, and mobile-first UX for outdated WordPress websites.",
    stack: "UX Cleanup · CTAs · Mobile",
    accent: "#86efac",
  },
  {
    label: "03 / STORE",
    title: "WooCommerce & Booking",
    copy: "Product pages, custom pricing logic, booking forms, checkout fields, and business workflow improvements.",
    stack: "WooCommerce · Bookings · Payments",
    accent: "#fb923c",
  },
  {
    label: "04 / DEV",
    title: "Custom WordPress Development",
    copy: "ACF/CPT systems, PHP snippets, custom plugins, filters, dashboards, and functionality plugins cannot handle.",
    stack: "PHP · ACF · CPT · JS",
    accent: "#c4b5fd",
  },
  {
    label: "05 / OPTIMIZE",
    title: "Speed & Technical Fixes",
    copy: "Performance cleanup, Core Web Vitals improvements, plugin conflict checks, mobile bugs, and technical QA.",
    stack: "Speed · CWV · Debugging",
    accent: "#facc15",
  },
];

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let nextY = y;

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, nextY);
      line = word;
      nextY += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line) ctx.fillText(line, x, nextY);
}

function createServiceTexture(service: PremiumService, index: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 900;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const dark = ctx.createLinearGradient(0, 0, 1280, 900);
  dark.addColorStop(0, "#070707");
  dark.addColorStop(0.42, "#121212");
  dark.addColorStop(1, "#050505");
  ctx.fillStyle = dark;
  ctx.fillRect(0, 0, 1280, 900);

  const glowA = ctx.createRadialGradient(160, 120, 20, 160, 120, 620);
  glowA.addColorStop(0, `${service.accent}cc`);
  glowA.addColorStop(0.36, `${service.accent}44`);
  glowA.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, 1280, 900);

  const glowB = ctx.createRadialGradient(1120, 780, 20, 1120, 780, 720);
  glowB.addColorStop(0, "rgba(255,255,255,.24)");
  glowB.addColorStop(0.46, `${service.accent}26`);
  glowB.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, 1280, 900);

  ctx.save();
  drawRoundRect(ctx, 52, 52, 1176, 796, 56);
  ctx.clip();
  ctx.fillStyle = "rgba(255,255,255,.055)";
  ctx.fillRect(52, 52, 1176, 796);

  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.lineWidth = 3;
  drawRoundRect(ctx, 52, 52, 1176, 796, 56);
  ctx.stroke();

  ctx.strokeStyle = `${service.accent}70`;
  ctx.lineWidth = 2;
  for (let i = 0; i < 12; i += 1) {
    const offset = i * 122;
    ctx.beginPath();
    ctx.moveTo(70 + offset, 70);
    ctx.lineTo(-220 + offset, 848);
    ctx.stroke();
  }

  ctx.fillStyle = service.accent;
  ctx.globalAlpha = 0.16;
  ctx.font = "950 230px Arial, sans-serif";
  ctx.fillText(`0${index + 1}`, 840, 760);
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(255,255,255,.10)";
  drawRoundRect(ctx, 94, 94, 250, 62, 31);
  ctx.fill();
  ctx.fillStyle = service.accent;
  ctx.font = "800 28px Arial, sans-serif";
  ctx.fillText(service.label, 124, 136);

  ctx.fillStyle = "rgba(255,255,255,.94)";
  ctx.font = "950 92px Arial, sans-serif";
  wrapText(ctx, service.title, 94, 316, 750, 94);

  ctx.fillStyle = "rgba(255,255,255,.68)";
  ctx.font = "600 34px Arial, sans-serif";
  wrapText(ctx, service.copy, 100, 586, 790, 48);

  ctx.fillStyle = "rgba(255,255,255,.12)";
  drawRoundRect(ctx, 94, 738, 620, 78, 39);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.84)";
  ctx.font = "800 30px Arial, sans-serif";
  ctx.fillText(service.stack, 128, 789);

  ctx.fillStyle = "rgba(255,255,255,.08)";
  ctx.beginPath();
  ctx.arc(1050, 210, 132, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = `${service.accent}8a`;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(1050, 210, 94, -0.7, Math.PI * 1.52);
  ctx.stroke();

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function GalleryScene({ progressRef }: { progressRef: ScrollProgressRef }) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const textures = useMemo(() => {
    if (typeof document === "undefined") return [];
    return premiumServices
      .map((service, index) => createServiceTexture(service, index))
      .filter((texture): texture is THREE.CanvasTexture => Boolean(texture));
  }, []);

  useEffect(() => {
    return () => textures.forEach((texture) => texture.dispose());
  }, [textures]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const timeline = progressRef.current * (premiumServices.length - 1);

    premiumServices.forEach((_, index) => {
      const mesh = meshRefs.current[index];
      if (!mesh) return;

      const delta = index - timeline;
      const distance = Math.abs(delta);
      const activeWeight = THREE.MathUtils.clamp(1 - distance, 0, 1);
      const nearWeight = THREE.MathUtils.clamp(1 - distance / 1.25, 0, 1);
      const visibleWeight = THREE.MathUtils.clamp(1 - distance / 1.05, 0, 1);

      const clampedDelta = THREE.MathUtils.clamp(delta, -1.35, 1.35);
      const x = clampedDelta * 0.16;
      const y = -clampedDelta * 3.25;
      const z = THREE.MathUtils.lerp(-4.2, 2.6, nearWeight);
      const scale = THREE.MathUtils.lerp(0.82, 1.08, activeWeight);

      mesh.position.set(x, y, z);
      mesh.rotation.x = THREE.MathUtils.lerp(0.26 * Math.sign(delta), 0, activeWeight);
      mesh.rotation.y = Math.sin(time * 0.25 + index) * 0.025;
      mesh.rotation.z = THREE.MathUtils.lerp(-0.08 * Math.sign(delta), 0, activeWeight);
      mesh.scale.setScalar(scale);
      mesh.renderOrder = Math.round(activeWeight * 1000);

      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = visibleWeight;
      material.needsUpdate = true;
    });
  });

  if (textures.length === 0) return null;

  return (
    <group>
      {premiumServices.map((service, index) => (
        <mesh
          key={service.title}
          ref={(mesh) => {
            meshRefs.current[index] = mesh;
          }}
          position={[0, index === 0 ? 0 : -4, index === 0 ? 2.6 : -4.2]}
        >
          <planeGeometry args={[5.35, 3.76, 18, 12]} />
          <meshBasicMaterial
            map={textures[index]}
            transparent
            opacity={index === 0 ? 1 : 0}
            toneMapped={false}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function WebGLFallback() {
  return (
    <div className={styles.fallbackGrid}>
      {premiumServices.map((service) => (
        <article className={styles.fallbackCard} key={service.title}>
          <small>{service.label}</small>
          <h3>{service.title}</h3>
          <p>{service.copy}</p>
          <span>{service.stack}</span>
        </article>
      ))}
    </div>
  );
}

export default function Services3DGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.45 });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    progressRef.current = latest;
  });

  useEffect(() => {
    setMounted(true);

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglSupported(Boolean(gl));
    } catch {
      setWebglSupported(false);
    }
  }, []);

  return (
    <section className={styles.section} id="services-3d" ref={sectionRef}>
      <div className={styles.stage}>
        {mounted && webglSupported ? (
          <Canvas camera={{ position: [0, 0, 10], fov: 44 }} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={1.4} />
            <GalleryScene progressRef={progressRef} />
          </Canvas>
        ) : (
          <WebGLFallback />
        )}

        <div className={styles.overlay}>
          <span>Premium service experience</span>
          <h2>One premium service card at a time.</h2>
          <p>
            Scroll slowly and each service moves into the same focused position, so the full card content stays readable before the next one arrives.
          </p>
        </div>

        <div className={styles.instructions}>
          <strong>Scroll the page to navigate</strong>
          <span>Cards change one by one</span>
        </div>
      </div>
    </section>
  );
}
