"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextRotate } from "./components/TextRotate";
import { cvUrl, siteConfig } from "./site-config";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  ["3+", "Years WordPress", "Hands-on WordPress, WooCommerce & Elementor Pro for international clients."],
  ["50+", "Projects Delivered", "Business, e-commerce, education, healthcare, tourism and custom WordPress builds."],
  ["20+", "Figma Builds", "Figma & PSD designs converted into responsive, editable WordPress websites."],
  ["6s→<2s", "Speed Result", "Load-time reductions through caching, image optimization, plugin audits and Core Web Vitals fixes."],
];

const services = [
  ["WordPress Website Development", "Editable Elementor Pro websites built from Figma, PSD, or reference designs with responsive layouts and clean handoff.", ["Elementor Pro", "ACF", "Responsive UI"]],
  ["WooCommerce Stores", "Product, checkout, payment and order-flow improvements for stores that need fewer bugs and better conversions.", ["Checkout", "Payments", "Products"]],
  ["Custom WordPress Features", "Booking flows, CPT dashboards, admin approval workflows, automated emails and PHP-based business logic.", ["PHP", "CPT", "Custom Plugin"]],
  ["Speed, QA & Maintenance", "Plugin audits, Core Web Vitals work, migrations, backups, bug fixes and live-site support for production WordPress websites.", ["WP Rocket", "LiteSpeed", "Cloudflare"]],
];

const proof = [
  { title: "Custom booking system", project: "Desert Safari Dubai", text: "Private/shared pricing logic, add-ons, AED totals, admin workflow and booking emails.", href: "/portfolio/desert-safari-dubai" },
  { title: "Healthcare conversion UX", project: "FastDocNow", text: "Trust-led healthcare pages, mobile-first service flow, booking CTAs and speed-focused setup.", href: "/portfolio/fastdocnow" },
  { title: "B2B service architecture", project: "Griffin Resources", text: "Clear service hierarchy, lead-generation structure and professional corporate presentation.", href: "/portfolio/griffin-resources" },
];

const workflow = [
  ["01", "Scope", "We define the goal, audience, pages, functionality, content needs and launch requirements."],
  ["02", "Build", "I create editable WordPress-style sections, responsive layouts, forms, CTAs and project-specific features."],
  ["03", "QA", "I test mobile, tablet, desktop, links, forms, content hierarchy, accessibility basics and loading behavior."],
  ["04", "Launch", "I prepare deployment, SEO basics, sitemap, metadata, post-launch checks and maintenance notes."],
];

const contactServices = ["website", "WooCommerce store", "redesign", "custom plugin"];

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", service: "WordPress website", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry: ${formState.service}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\nService: ${formState.service}\n\nProject details:\n${formState.message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setFormStatus("success");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".ha-pill", { y: -20, opacity: 0, duration: 0.55 })
        .from(".ha-h1", { y: 48, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".ha-sub", { y: 28, opacity: 0, duration: 0.7 }, "-=0.52")
        .from(".ha-actions", { y: 20, opacity: 0, duration: 0.6 }, "-=0.44")
        .from(".ha-showcase", { y: 36, opacity: 0, duration: 0.8, scale: 0.98 }, "-=0.48");

      document.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((item) => {
        gsap.from(item, { y: 28, opacity: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%" } });
      });

      ScrollTrigger.refresh();
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>
      <div className="noise" />
      <section className="hero flow-section" id="home" />

      <section className="section grey flow-section stats-showcase-section" id="about">
        <div className="container stats-layout flow-inner">
          <aside className="about-card">
            <div>
              <h2>I&apos;m Muhammad Adeel Iqbal</h2>
              <p>A WordPress Developer focused on Elementor Pro builds, WooCommerce stores, custom WordPress features, website maintenance and performance optimization for real business projects.</p>
            </div>
            <a href={`mailto:${siteConfig.email}`} className="about-button"><span className="about-button-text">Work with me</span><span className="mini-avatar"><img src="https://avatars.githubusercontent.com/u/178131381?v=4" alt="Adeel" loading="lazy" decoding="async" /></span></a>
          </aside>
          <div className="stats-grid">
            {stats.map(([value, label, text]) => <div className="stat" key={value}><div className="stat-top"><strong>{value}</strong><span>{label}</span></div><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section services-section flow-section" id="services">
        <div className="container flow-inner">
          <div className="section-heading section-heading-split">
            <div><div className="eyebrow">Services</div><h2>WordPress services clients actually hire for.</h2></div>
            <p>I am positioning the portfolio around complete development work, not only performance optimization: builds, redesigns, WooCommerce, custom logic, fixes, launch and maintenance.</p>
          </div>
          <div className="service-grid">
            {services.map(([title, text, tags]) => <article className="service-card scroll-reveal" key={title as string}><h3>{title}</h3><p>{text}</p><div className="service-tags">{(tags as string[]).map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}
          </div>
        </div>
      </section>

      <section className="section proof-section flow-section" id="proof">
        <div className="container proof-layout flow-inner">
          <div className="proof-copy">
            <div className="eyebrow">Project proof</div>
            <h2>Case studies with WordPress logic, not just screenshots.</h2>
            <p>Each featured project explains the problem, what I built, the stack used and the result: bookings, trust, leads, speed or maintainability.</p>
            <div className="proof-actions"><Link href="/portfolio" className="btn btn-dark">View all case studies</Link><a href={cvUrl} className="btn btn-ghost">View CV</a></div>
          </div>
          <div className="proof-cards">
            {proof.map((item) => <Link href={item.href} className="proof-card scroll-reveal" key={item.project}><span>{item.title}</span><strong>{item.project}</strong><p>{item.text}</p><em>Open case study →</em></Link>)}
          </div>
        </div>
      </section>

      <section className="section flow-section" id="projects" />

      <section className="section workflow-section flow-section" id="workflow">
        <div className="container flow-inner">
          <div className="section-heading section-heading-split"><div><div className="eyebrow">Workflow</div><h2>A clear process from scope to launch.</h2></div><p>This keeps the project controlled, reduces rework and gives clients confidence before development starts.</p></div>
          <div className="workflow-grid">{workflow.map(([number, title, text]) => <article className="workflow-card scroll-reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="section flow-section portfolio-section" id="process" />
      <section className="section grey flow-section portfolio-section" id="trust" />

      <section className="section grey flow-section" id="contact">
        <div className="container projects-head flow-inner">
          <div className="eyebrow contact-anim">Let&apos;s build together</div>
          <h2 className="contact-anim contact-h2">Have a WordPress <span className="contact-rotate"><TextRotate texts={contactServices} interval={2400} /></span> ready to build?</h2>
          <p className="subline contact-anim" style={{ maxWidth: 600, margin: "16px auto 0" }}>Share your project type, goals, timeline and current website if you have one. This form opens a pre-filled email so it works reliably on free GitHub Pages hosting.</p>

          <div className="contact-direct-grid contact-anim" aria-label="Direct contact options">
            <a href={`mailto:${siteConfig.email}`}><strong>Email</strong><span>{siteConfig.email}</span></a>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"><strong>WhatsApp</strong><span>{siteConfig.phone}</span></a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"><strong>LinkedIn</strong><span>/in/adeelatwork</span></a>
            <a href={cvUrl}><strong>CV</strong><span>View resume page</span></a>
          </div>

          <form className="contact-form contact-anim" onSubmit={handleSubmit} noValidate>
            <div className="contact-row">
              <div className="contact-field"><label htmlFor="cf-name">Name</label><input id="cf-name" type="text" className="contact-input" placeholder="Your name" value={formState.name} required onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))} /></div>
              <div className="contact-field"><label htmlFor="cf-email">Email</label><input id="cf-email" type="email" className="contact-input" placeholder="you@example.com" value={formState.email} required onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))} /></div>
            </div>
            <div className="contact-field"><label htmlFor="cf-service">Project type</label><select id="cf-service" className="contact-input" value={formState.service} onChange={(e) => setFormState((s) => ({ ...s, service: e.target.value }))}><option>WordPress website</option><option>Elementor Pro redesign</option><option>WooCommerce store</option><option>Custom WordPress plugin</option><option>Speed / maintenance</option></select></div>
            <div className="contact-field"><label htmlFor="cf-message">Message</label><textarea id="cf-message" className="contact-textarea" placeholder="Tell me about your project — website type, goals, timeline, budget…" value={formState.message} required onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))} /></div>
            {formStatus === "success" && <p className="contact-form-status success">Your email app should open with a pre-filled message. You can also email me directly at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>}
            <div className="contact-actions"><button type="submit" className="btn btn-dark">✦ Open email draft</button><a className="btn btn-ghost" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
          </form>
        </div>
      </section>
    </main>
  );
}
