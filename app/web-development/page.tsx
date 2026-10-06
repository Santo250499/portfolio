import {PageIntro,SectionHeading} from '@/components/ui';
import {ProjectCard} from '@/components/projects';
import {projects} from '@/content/projects';
import {pageMeta} from '@/content/metadata';
import {initialGithub} from '@/content/github';
import {RepositoryCard} from '@/components/github-dashboard';
import {WebSeo} from '@/components/sections';
export const metadata=pageMeta('Web Development Projects','Web development from personal projects: responsive sites and AI-connected tools built with React, Next.js, TypeScript and API integration.','/web-development/');
export default function Web(){return <div className="container page-bottom"><PageIntro kicker="WEB DEVELOPMENT" title="Where intelligent tools meet their users."><p>Useful applications need clear, accessible interfaces. Web development, which I do in my personal projects, connects my AI and automation work to the people who use it.</p></PageIntro><h2 className="sr-only">Web projects</h2><div className="work-grid spaced">{initialGithub.repos.filter(r=>r.name==='ai-career-match-dashboard').map(r=><RepositoryCard key={r.id} repo={r}/>)}</div><div className="project-grid">{projects.filter(p=>p.kind==='web').map(p=><ProjectCard key={p.slug} project={p}/>)}</div><section className="section"><SectionHeading kicker="APPLICATION DIRECTION" title="A practical place for AI." description="Areas I’m developing toward as the project portfolio grows."/><div className="idea-grid">{['AI-powered web applications','Website chatbots','API-connected dashboards','Automation portals','Internal business tools','SaaS-style applications'].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3></div>)}</div></section><WebSeo/></div>}
