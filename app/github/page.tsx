import Link from 'next/link';
import {EngineeringEvidence} from '@/components/engineering-evidence';
import {PageIntro} from '@/components/ui';
import {GithubDashboard} from '@/components/github-dashboard';
import {pageMeta} from '@/content/metadata';
export const metadata=pageMeta('Work Dashboard | GitHub Projects & Progress','Explore every public GitHub repository by Md Tanvir Mannan, with recent development activity, technologies and direct source-code links.','/github/');
export default function GitHub(){return <div className="container page-bottom dashboard-page"><PageIntro kicker="MD TANVIR MANNAN / BUILDING IN PUBLIC" title="Work, in progress."><p>A transparent view of my projects, technologies and latest development activity. Explore the source. Follow the next iteration.</p></PageIntro><nav className="lab-jump" aria-label="Dashboard sections"><Link href="/demos/">Try the work</Link><a href="#engineering">Engineering & milestones</a><a href="#repositories">All repositories</a><Link href="/evaluation/">AI evaluation</Link></nav><EngineeringEvidence/><GithubDashboard/></div>}
