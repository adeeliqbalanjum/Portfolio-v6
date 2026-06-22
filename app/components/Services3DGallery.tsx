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
  dark.addColorStop(0.45, "#121212");
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
  glowB.addColorStop(0, "rgba(255,255,255,.20)");
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

  ctx.strokeStyle = `${service.accent}58`;
  ctx.lineWidth = 2;
  for (let i = 0; i < 12; i += 1) {
    const offset = i * 122;
    ctx.beginPath();
    ctx.moveTo(70 + offset, 70);
    ctx.lineTo(-220 + offset, 848);
    ctx.stroke();
  }

  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = service.accent;
  ctx.font = "950 290px Arial, sans-serif";
  ctx.fillText(`0${index + 1}`, 820, 780);
  ctx.restore();

  ctx.fillStyle = "rgba(255,255,255,.10)";
  drawRoundRect(ctx, 94, 94, 270, 62, 31);
  ctx.fill();
  ctx.fillStyle = service.accent;
  ctx.font = "800 28px Arial, sans-serif";
  ctx.fillText(service.label, 124, 136);

  ctx.fillStyle = "rgba(255,255,255,.94)";
  ctx.font = "950 98px Arial, sans-serif";
  wrapText(ctx, service.title, 94, 322, 790, 100);

  ctx.fillStyle = "rgba(255,255,255,.68)";
  ctx.font = "600 34px Arial, sans-serif";
  wrapText(ctx, service.copy, 100, 586, 780, 48);

  ctx.fillStyle = "rgba(255,255,255,.12)";
  drawRoundRect(ctx, 94, 738, 620, 78, 39);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.84)";
  ctx.font = "800 30px Arial, sans-serif";
  ctx.fillText(service.stack, 128, 789);

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

  useFrame(() => {
    const activeStep = progressRef.current * (premiumServices.length - 1);

    premiumServices.forEach((_, index) => {
      const mesh = meshRefs.current[index];
      if (!mesh) return;

      const local = index - activeStep;
      const distanceFromActive = Math.abs(local);
      const visibility = THREE.MathUtils.clamp(1.08 - distanceFromActive * 0.56, 0, 1);
      const focus = THREE.MathUtils.clamp(1 - distanceFromActive, 0, 1);

      mesh.position.x = 0.82 + local * 0.16;
      mesh.position.y = -local * 2.38;
      mesh.position.z = 1.45 - distanceFromActive * 1.55;
      mesh.rotation.x = THREE.MathUtils.clamp(local * -0.09, -0.16, 0.16);
      mesh.rotation.y = THREE.MathUtils.clamp(local * 0.11, -0.18, 0.18);
      mesh.rotation.z = 0;
      mesh.scale.setScalar(THREE.MathUtils.lerp(0.86, 1.08, focus));

      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = visibility;
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
          position={[0.82, -index * 2.38, 1.45 - index * 1.55]}
        >
          <planeGeometry args={[5.7, 4.0, 18, 12]} />
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
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 85, damping: 32, mass: 0.42 });

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
          <Canvas camera={{ position: [0, 0, 10], fov: 46 }} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={1.4} />
            <GalleryScene progressRef={progressRef} />
          </Canvas>
        ) : (
          <WebGLFallback />
        )}

        <div className={styles.overlay}>
          <span>Premium service experience</span>
          <h2>Services built for serious business websites.</h2>
          <p>Scroll slowly. Each card moves up into the same focused position, one service at a time.</p>
        </div>

        <div className={styles.instructions}>
          <strong>Scroll to change cards</strong>
          <span>One service card at a time</span>
        </div>
      </div>
    </section>
  );
}
