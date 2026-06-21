import Link from 'next/link';
import { projects } from './portfolio/data';

const portraitUrl = 'https://avatars.githubusercontent.com/u/178131381?v=4';

const stats = [
  ['3+', 'Years WordPress'],
  ['50+', 'Projects Delivered'],
  ['20+', 'Figma Builds'],
  ['6s→1.8s', 'Speed Result'],
];

const services = [
  ['Elementor Pro Websites', 'Pixel-perfect, responsive, editable pages built from Figma, screenshots, or brand direction.'],
  ['WooCommerce Stores', 'Product pages, checkout improvements, payment setup, custom fields, and store speed cleanup.'],
  ['Custom WordPress Plugins', 'Booking systems, dashboards, forms, pricing logic, shortcodes, and admin tools.'],
  ['Speed & UX Optimization', 'Cache setup, image optimization, plugin audit, Core Web Vitals, and mobile performance fixes.'],
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">WordPress Developer · Elementor Pro · WooCommerce</span>
            <h1>Building premium <span className="gradient-text">WordPress websites</span></h1>
            <p>I build clean, responsive, fast WordPress and WooCommerce websites for business clients, including custom booking systems, Elementor layouts, and plugin-style features.</p>
            <div className="hero-actions">
              <a className="btn btn-dark" href="mailto:adeeliqbalajum@gmail.com">Let&apos;s talk</a>
              <Link className="btn btn-light" href="/portfolio">View portfolio</Link>
            </div>
            <div className="stats">
              {stats.map(([value, label]) => <div className="stat-card" key={label}><strong>{value}</strong><span>{label}</span></div>)}
            </div>
          </div>
          <div className="hero-card">
            <div className="portrait"><img src={portraitUrl} alt="Muhammad Adeel Iqbal" /></div>
            <div className="hero-card-caption"><strong>Muhammad Adeel Iqbal</strong><span>WordPress Developer from Pakistan, working with international clients.</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container about-grid">
          <div className="about-card dark">
            <h2>I&apos;m Muhammad Adeel Iqbal</h2>
            <p>I create websites that are editable, responsive, and built around real business goals. My work focuses on Elementor Pro, WooCommerce, ACF, custom PHP logic, forms, speed, and clean UI.</p>
          </div>
          <div className="about-card">
            <h2>What makes my work useful</h2>
            <p>I do not only create visual pages. I can also build custom booking flows, product-level settings, admin workflows, form logic, payment/email integrations, and speed improvements for WordPress websites.</p>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h2>Clear offers for business clients</h2>
          <p className="section-lead">Every service is packaged around what clients actually need: clean UI, responsive pages, working features, and measurable quality.</p>
          <div className="services-grid" style={{ marginTop: 28 }}>
            {services.map(([title, copy]) => <article className="service-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="container">
          <span className="eyebrow">Selected work</span>
          <h2>Projects I&apos;ve built and delivered</h2>
          <p className="section-lead">A focused selection of WordPress, WooCommerce, healthcare, corporate, and travel website projects.</p>
          <div className="project-grid" style={{ marginTop: 28 }}>
            {projects.slice(0, 6).map((project) => (
              <Link className="project-card" href={`/portfolio/${project.slug}`} key={project.slug}>
                <div>
                  <img src={project.image} alt={project.name} />
                  <small>{project.category}</small>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                </div>
                <strong>View case study →</strong>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 34 }}><Link className="btn btn-dark" href="/portfolio">View all projects</Link></div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="container contact-box">
          <span className="eyebrow">Available for projects</span>
          <h2 className="section-title">Need a WordPress build?</h2>
          <p>Send me the website goal, reference design, current URL, or plugin issue. I will help you plan the cleanest WordPress solution.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}><a className="btn btn-light" href="mailto:adeeliqbalajum@gmail.com">Email me</a><Link className="btn btn-light" href="/portfolio">See portfolio</Link></div>
        </div>
      </section>
    </main>
  );
}
