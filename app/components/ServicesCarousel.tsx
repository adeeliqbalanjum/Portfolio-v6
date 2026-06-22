"use client";

import styles from "../services.module.css";

const services = [
  {
    label: "01 — BUILD",
    title: "Figma → WordPress",
    copy: "Pixel-perfect Elementor Pro builds from approved designs.",
    tag: "Editable UI",
    shape: "shapeOrange",
  },
  {
    label: "02 — REDESIGN",
    title: "Business Redesign",
    copy: "Modern layouts, stronger CTAs, and cleaner mobile UX.",
    tag: "Better conversion",
    shape: "shapePurple",
  },
  {
    label: "03 — STORE",
    title: "WooCommerce / Booking",
    copy: "Stores, booking flows, checkout fields, and pricing logic.",
    tag: "Revenue systems",
    shape: "shapeGreen",
  },
  {
    label: "04 — DEV",
    title: "Custom WP Plugin",
    copy: "ACF, CPTs, PHP snippets, dashboards, filters, and forms.",
    tag: "Custom logic",
    shape: "shapeDark",
  },
  {
    label: "05 — SPEED",
    title: "Speed Optimization",
    copy: "Performance cleanup, mobile fixes, plugin audit, and QA.",
    tag: "Fast experience",
    shape: "shapeGold",
  },
];

export default function ServicesCarousel() {
  return (
    <div className={styles.serviceShell}>
      <div className={`${styles.serviceShowcase} scroll-reveal`} aria-label="WordPress services showcase">
        <div className={`${styles.serviceBlob} ${styles.serviceBlobOrange}`} aria-hidden="true" />
        <div className={`${styles.serviceBlob} ${styles.serviceBlobPurple}`} aria-hidden="true" />
        <div className={`${styles.serviceBlob} ${styles.serviceBlobGreen}`} aria-hidden="true" />
        <div className={styles.serviceHaze} aria-hidden="true" />

        <div className={styles.serviceStrip}>
          {[0, 1].map((group) => (
            <div className={styles.serviceGroup} key={group} aria-hidden={group === 1}>
              {services.map((service) => (
                <article className={styles.serviceCard} key={`${group}-${service.title}`}>
                  <div className={styles.browserDots}><i /><i /><i /></div>
                  <div className={styles.serviceBody}>
                    <small>{service.label}</small>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <div className={`${styles.serviceShape} ${styles[service.shape as keyof typeof styles]}`} />
                    <span>{service.tag}</span>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.serviceFocusCard}>
          <span>Most requested</span>
          <h3>Premium WordPress builds that clients can actually manage.</h3>
          <p>Design, responsive development, custom logic, speed, QA, and clean handover.</p>
          <a href="#contact" className="btn btn-dark">Start a project →</a>
        </div>
      </div>

      <div className={`${styles.serviceProofRow} scroll-reveal`}>
        <span>Elementor Pro</span>
        <span>WooCommerce</span>
        <span>ACF / CPT</span>
        <span>PHP / JS</span>
        <span>Speed + QA</span>
      </div>

      <p className={styles.serviceMobileHint}>Swipe services →</p>
    </div>
  );
}
