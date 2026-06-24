"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects, industryColour, Industry } from "./data";
import { ProjectMockup } from "../components/ProjectMockup";

const ALL = "All" as const;
type Filter = typeof ALL | Industry;
const FILTERS: Filter[] = [ALL, "Healthcare", "Tourism", "Tech", "Business", "Services", "Education", "Legal", "Finance", "Wellness"];

export default function PortfolioPage() {
  const [active, setActive] = useState<Filter>(ALL);

  const visible = useMemo(
    () => active === ALL ? projects : projects.filter((project) => project.industry === active),
    [active]
  );

  return (
    <div className="port-page port-page-fast">
      {/* HERO */}
      <header className="port-hero">
        <div className="port-hero-inner">
          <div className="eyebrow ph-anim">Selected work · 2023 – 2025</div>
          <h1 className="port-hero-h1 ph-anim">
            <span className="soft">19 projects.</span><br />Built for real clients.
          </h1>
          <p className="subline ph-anim">
            WordPress websites and WooCommerce stores delivered for clients across UAE, UK, USA, and Pakistan — from custom plugins to full Elementor builds.
          </p>
          <div className="ph-stats ph-anim">
            {[["19", "Projects"], ["4", "Countries"], ["3+", "Years"], ["50+", "Delivered"]].map(([value, label]) => (
              <div key={label} className="ph-stat">
                <strong>{value}</strong><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* FILTERS */}
      <div className="port-filters">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`filter-btn${active === filter ? " filter-btn--on" : ""}`}
            onClick={() => setActive(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="port-grid">
        {visible.map((project) => (
          <Link href={`/portfolio/${project.slug}`} className="proj-card" key={project.slug}>
            <div className="proj-mock">
              <ProjectMockup
                type={project.mockupType}
                bg={project.mockupBg}
                accent={project.mockupAccent}
                name={project.name}
              />
            </div>
            <div className="proj-info">
              <div className="proj-meta">
                <span className="proj-tag" style={{ background: industryColour[project.industry] + "22", color: industryColour[project.industry] }}>
                  {project.industry}
                </span>
                <span className="proj-loc">{project.location}</span>
                <span className="proj-loc">{project.year}</span>
              </div>
              <h3 className="proj-name">{project.name}</h3>
              <p className="proj-line">{project.tagline}</p>
              <div className="proj-cta">View case study <span>→</span></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
