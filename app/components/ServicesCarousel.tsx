"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../services.module.css";

gsap.registerPlugin(ScrollTrigger);

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
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const pin = pinRef.current;
      const track = trackRef.current;

      if (!pin || !track) return undefined;

      const getDistance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 0.65}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <style>{`
        #services {
          position: relative;
          overflow-x: clip;
          overflow-y: visible;
          isolation: isolate;
          background:
            radial-gradient(circle at 0% 0%, rgba(125, 211, 252, .30), transparent 42%),
            radial-gradient(circle at 100% 0%, rgba(134, 239, 172, .30), transparent 44%),
            radial-gradient(circle at 50% 100%, rgba(255, 255, 255, .58), transparent 54%),
            linear-gradient(135deg, rgba(255, 255, 255, .48), rgba(255, 255, 255, .22));
          border-top: 1px solid rgba(255, 255, 255, .55);
          border-bottom: 1px solid rgba(255, 255, 255, .55);
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        @supports not (overflow: clip) {
          #services {
            overflow-x: hidden;
            overflow-y: visible;
          }
        }

        #services::-webkit-scrollbar,
        #services *::-webkit-scrollbar {
          display: none;
        }

        #services::before {
          content: "";
          position: absolute;
          inset: -18% -8% -12%;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 8% 8%, rgba(125, 211, 252, .28), transparent 45%),
            radial-gradient(circle at 92% 12%, rgba(134, 239, 172, .25), transparent 42%),
            radial-gradient(circle at 50% 90%, rgba(255, 255, 255, .55), transparent 52%);
          filter: blur(10px);
        }

        #services > .container {
          position: relative;
          z-index: 1;
          overflow: visible;
        }
      `}</style>

      <div className={styles.serviceShell}>
        <div className={styles.servicePin} ref={pinRef}>
          <div className={styles.serviceTrack} ref={trackRef}>
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
          </div>
        </div>
      </div>
    </>
  );
}
