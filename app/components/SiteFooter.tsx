import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="site-footer-inner">
        <div>
          <span className="site-footer-kicker">Available for WordPress projects</span>
          <h2>Let&apos;s build a fast, editable website that works.</h2>
          <p>WordPress, Elementor Pro, WooCommerce, custom plugins, performance fixes, and business-specific functionality.</p>
        </div>
        <div className="site-footer-actions">
          <a href="mailto:adeeliqbalajum@gmail.com" className="btn btn-dark">✦ Email me</a>
          <Link href="/portfolio" className="btn btn-ghost">View portfolio</Link>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Muhammad Adeel Iqbal</span>
        <span>WordPress Developer · Elementor Pro · WooCommerce</span>
      </div>
    </footer>
  );
}
