"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import styles from "../services.module.css";

const services = [
  {
    label: "01 — BUILD",
    title: "Figma to WordPress Builds",
    copy: "Approved designs turned into responsive, editable Elementor Pro pages with clean spacing, reusable sections, and polished motion.",
    deliverable: "Elementor Pro pages, responsive setup, animations, reusable sections.",
    proof: "Pixel-perfect UI",
    fit: "Best for approved designs",
    icon: "↗",
  },
  {
    label: "02 — REDESIGN",
    title: "Business Website Redesign",
    copy: "Outdated WordPress websites rebuilt with stronger layout, better mobile UX, clearer CTAs, and a cleaner client-editable structure.",
    deliverable: "Homepage redesign, service pages, mobile fixes, CTA improvements.",
    proof: "Conversion-focused",
    fit: "Best for outdated sites",
    icon: "✦",
  },
  {
    label: "03 — STORE",
    title: "WooCommerce & Booking Systems",
    copy: "Stores, booking flows, product pages, checkout improvements, and custom pricing logic built around real business workflows.",
    deliverable: "WooCommerce setup, booking forms, checkout fields, payment flow setup.",
    proof: "Revenue workflows",
    fit: "Best for sales systems",
    icon: "AED",
  },
  {
    label: "04 — DEV",
    title: "Custom WordPress Development",
    copy: "Custom plugin features, ACF/CPT systems, PHP snippets, forms, filters, dashboards, and functionality normal plugins cannot handle.",
    deliverable: "Booking plugins, CPT templates, custom forms, admin tools, PHP/CSS/JS fixes.",
    proof: "Real functionality",
    fit: "Best for custom logic",
    icon: "{ }",
  },
  {
    label: "05 — OPTIMIZE",
    title: "Speed & Technical Fixes",
    copy: "Performance cleanup, mobile bug fixing, plugin conflict checks, Core Web Vitals improvements, and WordPress troubleshooting.",
    deliverable: "Cache setup, image optimization, layout fixes, plugin audit, technical QA.",
    proof: "Faster UX",
    fit: "Best for slow websites",
    icon: "⚡",
  },
];

export default function ServicesCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 90, damping: 28, mass: 0.35 });

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;

    if (!pin || !track) return undefined;

    const updateDistance = () => {
      const isDesktop = window.matchMedia("(min-width: 901px)").matches;
      const nextDistance = isDesktop ? Math.max(0, track.scrollWidth - pin.clientWidth) : 0;
      setDistance(nextDistance);
    };

    updateDistance();

    const resizeObserver = new ResizeObserver(updateDistance);
    resizeObserver.observe(pin);
    resizeObserver.observe(track);
    window.addEventListener("resize", updateDistance);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDistance);
    };
  }, []);

  return (
    <div className={styles.serviceShell} ref={rootRef}>
      <div className={styles.servicePin} ref={pinRef}>
        <motion.div className={styles.serviceTrack} ref={trackRef} style={{ x }}>
          <article className={`${styles.serviceFeature} ${styles.serviceSlide} scroll-reveal`}>
            <div className={styles.serviceFeatureCopy}>
              <span className={styles.serviceFeatureKicker}>Client-attracting offer stack</span>
              <h3>Design quality, WordPress functionality, and clean handover in one build.</h3>
              <p>
                This section now sells outcomes instead of only listing tools. It shows clients that you can handle the full website workflow: design conversion, responsive build, custom logic, speed, QA, and launch support.
              </p>
            </div>

            <div className={styles.serviceFeatureActions}>
              <div className={styles.serviceProofGrid}>
                <div className={styles.serviceProofPill}>Editable build <span>Elementor Pro</span></div>
                <div className={styles.serviceProofPill}>Custom logic <span>PHP / ACF / CPT</span></div>
                <div className={styles.serviceProofPill}>Launch ready <span>Speed + QA</span></div>
              </div>
              <a href="#contact" className="btn btn-dark">Start a project →</a>
            </div>
          </article>

          {services.map((service, index) => (
            <article className={`${styles.serviceCard} ${styles.serviceSlide} scroll-reveal`} key={service.title}>
              <div className={styles.serviceCardTop}>
                <small className={styles.serviceNumber}>{service.label}</small>
                <span className={styles.serviceProof}>{service.proof}</span>
              </div>

              <div className={styles.serviceCardBody}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>

                <div className={styles.serviceIncludes}>
                  <strong>Includes</strong>
                  <span>{service.deliverable}</span>
                </div>

                <span className={styles.serviceFit}>{service.fit} →</span>
              </div>

              <span className={styles.serviceCardIndex}>0{index + 1}</span>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
