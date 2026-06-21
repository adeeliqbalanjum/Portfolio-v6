import Link from 'next/link';

export function SiteHeader() {
  return (
    <nav className="nav site-header" aria-label="Primary navigation">
      <Link className="nav-logo" href="/" aria-label="Muhammad Adeel Iqbal home">MA</Link>
      <Link href="/">Home</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/#about">About</Link>
      <Link href="/#projects">Projects</Link>
      <Link href="/#contact" className="nav-cta">Hire Me</Link>
    </nav>
  );
}
