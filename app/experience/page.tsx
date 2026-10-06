import {PageIntro} from '@/components/ui';
import {experience} from '@/content/editorial';
import {projects} from '@/content/projects';
import {ProjectCard} from '@/components/projects';
import {pageMeta} from '@/content/metadata';
export const metadata=pageMeta('Enterprise IT Experience','Enterprise ICT support across Microsoft 365, identity and endpoints, supporting an environment of 2,200+ users and 20+ sites.','/experience/');
export default function Experience(){return <div className="container page-bottom"><PageIntro kicker="THE PROFESSIONAL FOUNDATION" title="Experience that grounds the ambition."><p>3.5+ years in IT support across Microsoft 365, identity, endpoints and networking. This experience also shapes my automation and AI work.</p></PageIntro>{experience.map(e=><article className="experience-detail" key={e.title}><div><span className="status-label">{e.period}</span><h2>{e.title}</h2><p>{e.employer}</p></div><div><p>{e.summary}</p><ul className="check-list">{e.responsibilities.map(r=><li key={r}>{r}</li>)}</ul></div></article>)}<div className="section-heading"><h2>Selected enterprise work.</h2></div><div className="project-grid">{projects.filter(p=>p.kind==='enterprise').map(p=><ProjectCard key={p.slug} project={p}/>)}</div></div>}
