import type { Metadata } from "next";
import styles from "./ServicesPage.module.css";

export const metadata: Metadata = {
  title: "Services — Muhammad Adeel Iqbal",
  description:
    "WordPress services with Figma to WordPress builds, redesigns, WooCommerce, custom development, and speed fixes.",
};

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

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.pill}>Services vertical scroll</span>
          <h1>Services built for serious business websites</h1>
          <p>
            Premium WordPress services presented in the same Option 1 Stats Glow Glass style: blue/green glow,
            soft glass cards, clean white surfaces, and vertical sticky card flow.
          </p>
        </div>
      </section>

      <section className={styles.preview}>
        <div className={styles.previewInner}>
          <aside className={styles.previewHead}>
            <span className={styles.optionLabel}>Option 1 — recommended</span>
            <h2>Stats Glow Glass</h2>
            <p className={styles.previewDesc}>
              Blue/green glow, soft glass cards, clean white surfaces, and calm premium spacing matched to the current homepage.
            </p>
            <div className={styles.approvalNote}>
              <span>Background <b>Same blue/green glow</b></span>
              <span>Cards <b>White glass</b></span>
              <span>Best for <b>Current homepage match</b></span>
            </div>
          </aside>

          <div className={styles.stack} aria-label="WordPress services vertical scroll cards">
            {services.map((service) => (
              <article className={styles.serviceCard} key={service.title}>
                <div className={styles.cardTop}>
                  <small className={styles.num}>{service.label}</small>
                  <span className={styles.badge}>{service.proof}</span>
                </div>

                <div className={styles.cardCopy}>
                  <div className={styles.icon}>{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>

                  <div className={styles.includes}>
                    <strong>Includes</strong>
                    <span>{service.deliverable}</span>
                  </div>

                  <span className={styles.fit}>{service.fit} →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
