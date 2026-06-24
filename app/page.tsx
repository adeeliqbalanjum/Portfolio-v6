"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextRotate } from "./components/TextRotate";

gsap.registerPlugin(ScrollTrigger);

// ─── shared constants ──────────────────────────────────────────────────────
const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

const stats = [
  ["3+",      "Years WordPress",    "Hands-on WordPress, WooCommerce & Elementor Pro for international clients."],
  ["50+",     "Projects Delivered", "Business, e-commerce, education & custom WordPress builds delivered."],
  ["20+",     "Figma Builds",       "Figma & PSD designs converted into responsive, pixel-perfect WordPress sites."],
  ["6s→1.8s", "Speed Result",       "Load-time cuts via cache, image optimisation, plugin auditing & Core Web Vitals."],
];

const contactServices = ["website", "WooCommerce store", "redesign", "custom plugin"];

// ─── page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  // TODO: Replace YOUR_FORM_ID with your real Formspree form ID.
  // Free at https://formspree.io — create a form and paste the 8-char ID below.
  const FORMSPREE_ID = "YOUR_FORM_ID";

  const [formState,  setFormState]  = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  // ── GSAP animations ──────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance — elements live inside HomeHeroOptionB (portalled into #home)
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".ha-pill",     { y: -20, opacity: 0, duration: 0.55 })
        .from(".ha-h1",       { y: 48,  opacity: 0, duration: 0.80 }, "-=0.30")
        .from(".ha-sub",      { y: 28,  opacity: 0, duration: 0.70 }, "-=0.52")
        .from(".ha-actions",  { y: 20,  opacity: 0, duration: 0.60 }, "-=0.44")
        .from(".ha-showcase", { y: 36,  opacity: 0, duration: 0.80, scale: 0.98 }, "-=0.48");

      // Flow-section tilt-on-scroll for all non-hero sections
      document.querySelectorAll<HTMLElement>(
        ".flow-section:not(.hero):not(.stats-showcase-section) .flow-inner"
      ).forEach((inner) => {
        gsap.fromTo(
          inner,
          { rotationZ: 4, rotationX: 1.5, opacity: 0.55, transformOrigin: "bottom left" },
          {
            rotationZ: 0, rotationX: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: { trigger: inner.parentElement, start: "top 88%", end: "top 22%", scrub: 0.7 },
          }
        );
      });

      // About card slide-in
      gsap.from(".about-card", {
        x: -40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".about-card", start: "top 82%" },
      });

      // Stat cards staggered entrance / exit
      const statCards = gsap.utils.toArray<HTMLElement>(".stats-showcase-section .stat");
      if (statCards.length) {
        gsap.set(statCards, { y: 58, scale: 0.96, opacity: 0, filter: "blur(2px)", transformOrigin: "center bottom", force3D: true });
        ScrollTrigger.batch(statCards, {
          start: "top 86%",
          once: false,
          onEnter:     (batch) => gsap.to(batch, { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.72, ease: "power3.out", stagger: 0.16, overwrite: true, clearProps: "transform,filter" }),
          onLeaveBack: (batch) => gsap.to(batch, { y: 46, scale: 0.97, opacity: 0, filter: "blur(2px)", duration: 0.38, ease: "power2.out", stagger: 0.08, overwrite: true }),
        });
      }

      // Contact section entrance
      gsap.from(".contact-anim", {
        y: 28, opacity: 0, duration: 0.70, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: "#contact", start: "top 78%" },
      });

      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // ── Intersection observer for .scroll-reveal elements ───────────────────
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ────────────────────────────────────────────────────────────────────────
  return (
    <main ref={mainRef}>
      <div className="noise" />

      {/* ── HERO — HomeHeroOptionBMount portals HomeHeroOptionB into this shell ── */}
      <section className="hero flow-section" id="home" />

      {/* ── ABOUT & STATS ────────────────────────────────────────────────────── */}
      <section className="section grey flow-section stats-showcase-section" id="about">
        <div className="container stats-layout flow-inner">
          <aside className="about-card">
            <div>
              <h2>I&apos;m Muhammad Adeel Iqbal</h2>
              <p>
                A WordPress Developer specialising in building, redesigning, and improving
                websites for international clients in UAE, UK, and USA — Elementor Pro,
                WooCommerce stores, custom plugins, and Figma-to-WordPress builds.
              </p>
            </div>
            <a href="mailto:adeeliqbalajum@gmail.com" className="about-button">
              <span className="about-button-text">Work with me</span>
              <span className="mini-avatar"><img src={portraitDataUrl} alt="Adeel" loading="lazy" decoding="async" /></span>
            </a>
          </aside>

          <div className="stats-grid">
            {stats.map(([value, label, text]) => (
              <div className="stat" key={value as string}>
                <div className="stat-top"><strong>{value}</strong><span>{label}</span></div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD STACK — HomeBuildStackMount inserts a div after #about ──────── */}

      {/* ── PROJECTS — HomeDigitalistsWorkMount portals into this shell ────────── */}
      <section className="section flow-section" id="projects" />

      {/* ── PROCESS — HomeProcessOrbitMount portals into this shell ─────────────── */}
      <section className="section flow-section portfolio-section" id="process" />

      {/* ── TESTIMONIALS — HomeTestimonialsMount portals into this shell ─────────── */}
      <section className="section grey flow-section portfolio-section" id="trust" />

      {/* ── CONTACT ──────────────────────────────────────────────────────────────── */}
      <section className="section grey flow-section" id="contact">
        <div className="container projects-head flow-inner">
          <div className="eyebrow contact-anim">Let&apos;s build together</div>
          <h2 className="contact-anim contact-h2">
            Have a WordPress{" "}
            <span className="contact-rotate">
              <TextRotate texts={contactServices} interval={2400} />
            </span>{" "}
            ready to build?
          </h2>
          <p className="subline contact-anim" style={{ maxWidth: 520, margin: "16px auto 0" }}>
            Whether you need a new site, a redesign, a WooCommerce store, or a custom plugin —
            send a message and I&apos;ll respond within a few hours.
          </p>

          <form className="contact-form contact-anim" onSubmit={handleSubmit} noValidate>
            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="cf-name">Name</label>
                <input
                  id="cf-name" type="text" className="contact-input"
                  placeholder="Your name" value={formState.name} required
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                />
              </div>
              <div className="contact-field">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email" type="email" className="contact-input"
                  placeholder="you@example.com" value={formState.email} required
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message" className="contact-textarea"
                placeholder="Tell me about your project — type of site, goals, timeline, budget…"
                value={formState.message} required
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
              />
            </div>

            {formStatus === "success" && (
              <p className="contact-form-status success">
                ✓ Message sent — I&apos;ll reply within a few hours.
              </p>
            )}
            {formStatus === "error" && (
              <p className="contact-form-status error">
                Something went wrong. Email me directly at{" "}
                <a href="mailto:adeeliqbalajum@gmail.com">adeeliqbalajum@gmail.com</a>
              </p>
            )}

            <div className="contact-actions">
              <button
                type="submit" className="btn btn-dark"
                disabled={formStatus === "sending"}
              >
                {formStatus === "sending" ? "Sending…" : "✦ Send message"}
              </button>
              <a
                className="btn btn-ghost"
                href="https://linkedin.com/in/adeelatwork/"
                target="_blank" rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
