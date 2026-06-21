import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '../data';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <main className="case-wrap">
      <div className="case-hero">
        <Link className="back-link" href="/portfolio">Back to portfolio</Link>
        <article className="case-card">
          <span className="case-meta">{project.category}</span>
          <h1>{project.name}</h1>
          <p>{project.summary}</p>
          <div className="hero-actions">
            {project.url ? <a className="btn btn-dark" href={project.url} target="_blank" rel="noopener noreferrer">View live site</a> : null}
            <Link className="btn btn-light" href="/portfolio">All projects</Link>
          </div>
        </article>
        <div className="case-grid">
          <div className="case-shot"><img src={project.image} alt={project.name} /></div>
          <div className="case-card">
            <h2>Challenge</h2><p>{project.challenge}</p>
            <h2>Solution</h2><p>{project.solution}</p>
            <h2>Result</h2><p>{project.result}</p>
            <div className="hero-actions">{project.tech.map((item) => <span className="btn btn-light" key={item}>{item}</span>)}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
