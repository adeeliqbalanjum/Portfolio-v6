import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhammad Adeel Iqbal — WordPress Developer',
  description: 'WordPress, WooCommerce, Elementor Pro, custom plugins, and performance-focused websites.',
};

function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-logo" href="/">MA</Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/">Home</Link>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/#about">About</Link>
        <Link href="/#services">Services</Link>
        <Link href="/#contact" className="nav-cta">Hire Me</Link>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Muhammad Adeel Iqbal</strong>
        <p>WordPress Developer · Elementor Pro · WooCommerce · Custom Plugins</p>
      </div>
      <a href="mailto:adeeliqbalajum@gmail.com">adeeliqbalajum@gmail.com</a>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
