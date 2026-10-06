import {PageIntro} from '@/components/ui';
import {ProjectCollection} from '@/components/projects';
import {GithubDashboard} from '@/components/github-dashboard';
import {pageMeta} from '@/content/metadata';
export const metadata=pageMeta('Projects | IT Automation, AI & Web','Explore IT automation, AI, Python, API and web projects plus enterprise IT work, with structured case studies and honest implementation evidence.','/projects/');
export default function Projects(){return <div className="container page-bottom"><PageIntro kicker="THE PROJECT COLLECTION" title="Practical work. Visible evidence."><p>Explore all my public repositories, then go deeper with project case studies and enterprise experience.</p></PageIntro><GithubDashboard collection/><section className="section"><div className="section-heading"><div><span className="eyebrow">CONTEXT & DECISIONS</span><h2>Selected case studies.</h2><p>The problems, implementation decisions and evidence behind the work.</p></div></div><ProjectCollection/></section></div>}
