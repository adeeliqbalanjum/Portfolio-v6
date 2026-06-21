import Link from 'next/link';
import { projects } from './data';

export default function PortfolioPage() {
  return (
    <main className="section">
      <div className="container">
        <span className="eyebrow">Portfolio</span>
        <h1 className="section-title">Selected WordPress projects</h1>
        <p className="section-lead">Real business websites, travel pages, corporate builds, WooCommerce work, and custom WordPress functionality.</p>
        <div className="project-grid" style={{ marginTop: 34 }}>
          {projects.map((project) => (
            <Link className="project-card" href={'/portfolio/' + project.slug} key={project.slug}>
              <div>
                <img src={project.image} alt={project.name} />
                <small>{project.category}</small>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </div>
              <strong>View case study</strong>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
