import Link from "next/link";
import styles from "./ServicesSectionOptions.module.css";

const services = [
  {
    n: "01",
    icon: "EL",
    title: "Elementor Pro websites",
    short: "Editable, responsive websites built from Figma, screenshots, or brand direction.",
    detail: "For businesses that need a premium WordPress site they can still manage after launch.",
    deliverables: ["Landing pages", "Corporate websites", "Responsive templates"],
    proof: "Best for service businesses, consultants, healthcare, legal, and brand websites.",
    accent: "accentBlue",
  },
  {
    n: "02",
    icon: "WC",
    title: "WooCommerce stores",
    short: "Product pages, cart, checkout, payment setup, and order-flow improvements.",
    detail: "For stores that need a cleaner buying experience and fewer checkout problems.",
    deliverables: ["Product UX", "Checkout fixes", "Payment setup"],
    proof: "Best for product stores, service payments, digital products, and checkout cleanup.",
    accent: "accentPurple",
  },
  {
    n: "03",
    icon: "PL",
    title: "Custom WordPress plugins",
    short: "Business-specific logic when normal plugins cannot handle the workflow properly.",
    detail: "For booking forms, admin panels, pricing rules, shortcodes, and custom data flows.",
    deliverables: ["Booking systems", "Admin panels", "Shortcodes"],
    proof: "Best for custom booking, pricing, dashboards, forms, and approval workflows.",
    accent: "accentOrange",
  },
  {
    n: "04",
    icon: "SP",
    title: "Speed and UX optimization",
    short: "Performance cleanup for slow WordPress sites without breaking the design.",
    detail: "For websites that feel heavy, load slowly, or perform poorly on mobile devices.",
    deliverables: ["Cache setup", "Image optimization", "Core Web Vitals"],
    proof: "Best for slow WordPress websites, bloated plugins, weak mobile scores, and UX fixes.",
    accent: "accentGreen",
  },
  {
    n: "05",
    icon: "ACF",
    title: "Dynamic content systems",
    short: "ACF, CPTs, templates, directories, filters, maps, and content-managed sections.",
    detail: "For sites where clients need to manage repeated content without editing every page manually.",
    deliverables: ["ACF fields", "CPT templates", "Search filters"],
    proof: "Best for teams, workshops, directories, services, locations, and resource libraries.",
    accent: "accentBlack",
  },
];

function Tags({ items }: { items: string[] }) {
  return <div className={styles.deliverables}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function MockWindow() {
  return (
    <div className={styles.mockWindow}>
      <div className={styles.mockBar}><i /><i /><i /></div>
      <div className={styles.mockBody}><span /><span /><span /></div>
    </div>
  );
}

function OptionOne() {
  return (
    <section className={styles.option}>
      <div className={styles.optionBadge}>Option 01 · Dark intro + 2x2 service grid</div>
      <div className={styles.splitGrid}>
        <aside className={styles.darkIntro}>
          <span className={styles.pill}>Recommended homepage version</span>
          <h2>WordPress builds that combine clean design with real functionality.</h2>
          <p>I help businesses launch, redesign, optimize, and extend WordPress websites using Elementor Pro, WooCommerce, ACF, custom PHP, and performance-focused development.</p>
          <Link href="/portfolio" className={styles.cta}>View related work →</Link>
        </aside>
        <div className={styles.splitCards}>
          {services.slice(0, 4).map((service) => (
            <article className={`${styles.serviceCard} ${styles[service.accent]}`} key={service.title}>
              <div className={styles.serviceTop}><span className={styles.index}>{service.n}</span><span className={styles.icon}>{service.icon}</span></div>
              <h3>{service.title}</h3>
              <p>{service.short}</p>
              <Tags items={service.deliverables} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OptionTwo() {
  return (
    <section className={styles.option}>
      <div className={styles.optionBadge}>Option 02 · SaaS-style bento services</div>
      <div className={styles.bentoIntro}>
        <div className={styles.glassCard}>
          <span className={styles.pill}>Services</span>
          <h2>Useful WordPress services for business websites that need to work.</h2>
          <p>This layout feels modern and productized. It makes your services look like a premium system instead of simple cards.</p>
        </div>
        <div className={styles.bentoMini}>
          <span><strong>5</strong> core offers</span>
          <span><strong>WP</strong> native stack</span>
          <span><strong>UX</strong> conversion aware</span>
        </div>
      </div>
      <div className={styles.bentoGrid}>
        {services.map((service) => (
          <article className={`${styles.bentoPanel} ${styles[service.accent]}`} key={service.title}>
            <div className={styles.cardTop}><span className={styles.index}>{service.n}</span><span className={styles.icon}>{service.icon}</span></div>
            <h3>{service.title}</h3>
            <p>{service.detail}</p>
            <Tags items={service.deliverables} />
            <MockWindow />
          </article>
        ))}
      </div>
    </section>
  );
}

function OptionThree() {
  return (
    <section className={styles.option}>
      <div className={styles.optionBadge}>Option 03 · Technical timeline layout</div>
      <div className={styles.horizontalHeader}>
        <div>
          <span className={styles.pill}>Build capabilities</span>
          <h2>From page build to custom WordPress system.</h2>
        </div>
        <p>This version is strong when you want clients to understand exactly what each service solves.</p>
      </div>
      <div className={styles.timeline}>
        {services.map((service) => (
          <article className={styles.timelineCard} key={service.title}>
            <span className={styles.timelineNumber}>{service.n}</span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.short}</p>
              <Tags items={service.deliverables} />
            </div>
            <div className={styles.timelineProof}>{service.proof}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OptionFour() {
  return (
    <section className={styles.option}>
      <div className={styles.optionBadge}>Option 04 · Horizontal premium cards</div>
      <div className={styles.horizontalHeader}>
        <div>
          <span className={styles.pill}>Swipe / scroll services</span>
          <h2>Clean cards with large service titles.</h2>
        </div>
        <p>This feels editorial and premium. It is useful if you want a lighter section with less vertical height.</p>
      </div>
      <div className={styles.horizontalTrack}>
        {services.map((service) => (
          <article className={`${styles.compactCard} ${styles[service.accent]}`} key={service.title}>
            <div>
              <div className={styles.cardTop}><span className={styles.index}>{service.n}</span><span className={styles.icon}>{service.icon}</span></div>
              <h3>{service.title}</h3>
              <p>{service.short}</p>
            </div>
            <Tags items={service.deliverables} />
          </article>
        ))}
      </div>
    </section>
  );
}

function OptionFive() {
  return (
    <section className={styles.option}>
      <div className={styles.optionBadge}>Option 05 · Productized service packages</div>
      <div className={styles.pricingGrid}>
        <aside className={styles.pricingIntro}>
          <span className={styles.pill}>Offer structure</span>
          <h2>Service packages that are easier for clients to buy.</h2>
          <p>This version is best for conversion because it groups your work into clear business outcomes.</p>
        </aside>
        {[
          { name: "Launch", services: [services[0], services[4]], lines: ["New business website", "Editable pages", "ACF/CPT structure"] },
          { name: "Sell", services: [services[1]], lines: ["WooCommerce setup", "Checkout UX", "Payment flow"] },
          { name: "Extend", services: [services[2], services[3]], lines: ["Custom plugin logic", "Speed cleanup", "Technical fixes"] },
        ].map((pack) => (
          <article className={styles.priceCard} key={pack.name}>
            <span className={styles.pill}>{pack.name}</span>
            <strong>{pack.name}</strong>
            <p>{pack.services.map((service) => service.title).join(" + ")}</p>
            <div className={styles.priceList}>{pack.lines.map((line) => <span key={line}>• {line}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ServicesSectionOptionsPage() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>← Back home</Link>
      <header className={styles.header}>
        <span className={styles.badge}>Services section preview options</span>
        <h1>Five better layouts <span>for your services section</span></h1>
        <p>Each option uses improved service copy, stronger hierarchy, cleaner spacing, and a different layout direction so we can choose the best one before pushing it to the homepage.</p>
      </header>
      <div className={styles.stack}>
        <OptionOne />
        <OptionTwo />
        <OptionThree />
        <OptionFour />
        <OptionFive />
      </div>
    </main>
  );
}
