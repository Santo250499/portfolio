import {PageIntro} from '@/components/ui';
import {DemoLab} from '@/components/demo-lab';
import {pageMeta} from '@/content/metadata';
export const metadata=pageMeta('Interactive Project Previews','Try browser-based previews of job matching, claim totals and an application workflow with fictional sample inputs.','/demos/');
export default function Demos(){return <div className="container page-bottom"><PageIntro kicker="EXPLORE / TRY / UNDERSTAND" title="A small lab. Real interactions."><p>Explore three project workflows with fictional sample data. These lightweight previews run in your browser; the repositories contain the full applications.</p></PageIntro><nav className="lab-jump" aria-label="Choose a preview"><a href="#job-match">Job matching</a><a href="#claims">Claim amounts</a><a href="#application">Application drafts</a></nav><DemoLab/></div>}
