"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const portraitDataUrl = 'https://avatars.githubusercontent.com/u/178131381?v=4';

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname === '/services' || pathname === '/services/') {
    return null;
  }

  return (
    <nav className="nav site-header" aria-label="Primary navigation">
      <Link className="nav-logo" href="/" aria-label="Muhammad Adeel Iqbal home">
        <img src={portraitDataUrl} alt="Adeel" />
      </Link>
      <Link href="/">Home</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/services">Services</Link>
      <Link href="/#about">About</Link>
      <Link href="/#projects">Projects</Link>
      <Link href="/#contact" className="nav-cta">Hire Me</Link>
    </nav>
  );
}
