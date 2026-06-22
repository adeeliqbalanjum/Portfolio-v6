"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

function HomeHeroOptionB() {
  return (
    <div className="home-hero-b">
      <div className="home-hero-b-shader" aria-hidden="true">
        <span className="home-hero-b-orb home-hero-b-orb-blue" />
        <span className="home-hero-b-orb home-hero-b-orb-green" />
        <span className="home-hero-b-orb home-hero-b-orb-purple" />
        <span className="home-hero-b-edge" />
      </div>

      <div className="home-hero-b-inner">
        <div className="home-hero-b-status ha-pill">
          <strong>Available</strong> for new projects — UAE · UK · USA
        </div>

        <h1 className="home-hero-b-title ha-h1">
          <span>WordPress developer</span>{" "}
          building fast, high&#8209;impact websites
        </h1>

        <p className="home-hero-b-subline ha-sub">
          I build and redesign WordPress &amp; WooCommerce websites for businesses in the UAE, UK, and USA — from Figma to pixel-perfect, conversion-ready sites.
        </p>

        <div className="home-hero-b-actions ha-actions">
          <a className="home-hero-b-btn home-hero-b-btn-dark" href="mailto:adeeliqbalajum@gmail.com">✦ Let&apos;s talk</a>
          <a className="home-hero-b-btn home-hero-b-btn-ghost" href="#projects">Browse work</a>
        </div>

        <div className="home-hero-b-showcase ha-showcase" aria-label="Portfolio preview">
          <div className="home-hero-b-haze" />
          <div className="home-hero-b-portrait">
            <img src={portraitDataUrl} alt="Muhammad Adeel Iqbal" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeHeroOptionBMount() {
  const pathname = usePathname();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) {
      setTarget(null);
      return;
    }

    hero.classList.add("home-hero-option-b-mounted");
    setTarget(hero);

    return () => {
      hero.classList.remove("home-hero-option-b-mounted");
      setTarget(null);
    };
  }, [pathname]);

  if (!target) return null;

  return createPortal(<HomeHeroOptionB />, target);
}
