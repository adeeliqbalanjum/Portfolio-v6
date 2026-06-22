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
  return (
    <div className={styles.serviceShell}>
      <div className={`${styles.serviceFeature} scroll-reveal`}>
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
      </div>

      <div className={`${styles.serviceCarousel} scroll-reveal`} aria-label="Client-focused WordPress services carousel">
        <div className={`${styles.serviceFade} ${styles.serviceFadeLeft}`} aria-hidden="true" />
        <div className={`${styles.serviceFade} ${styles.serviceFadeRight}`} aria-hidden="true" />

        <div className={styles.serviceTrack}>
          {[0, 1].map((group) => (
            <div className={styles.serviceGroup} key={group} aria-hidden={group === 1}>
              {services.map((service) => (
                <article className={styles.serviceCard} key={`${group}-${service.title}`}>
                  <div className={styles.serviceCardTop}>
                    <small className={styles.serviceNumber}>{service.label}</small>
                    <span className={styles.serviceProof}>{service.proof}</span>
                  </div>

                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>

                  <div className={styles.serviceIncludes}>
                    <strong>Includes</strong>
                    <span>{service.deliverable}</span>
                  </div>

                  <span className={styles.serviceFit}>{service.fit} →</span>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className={styles.serviceMobileHint}>Swipe services →</p>
    </div>
  );
}
