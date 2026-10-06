import Link from 'next/link';
import {initialGithub,editorial} from '@/content/github';
import {RepositoryCard} from './github-dashboard';
import {SectionHeading} from './ui';
export function FeaturedRepositories(){const selected=initialGithub.repos.filter(r=>editorial[r.name]?.featured);return <section className="container section featured-repositories"><SectionHeading kicker="CONNECTED TO GITHUB" title="Real projects. Open source." description="Explore the code, documentation and decisions behind my AI and automation work." href="/github/" label="Open work dashboard"/><div className="work-grid">{selected.map(r=><RepositoryCard key={r.id} repo={r}/>)}</div><div className="featured-foot"><span>{initialGithub.repos.length} public repositories connected · AI, automation and web development</span><Link href="/projects/#repositories">Browse all repositories</Link></div></section>}
