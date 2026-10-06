import {PageIntro} from '@/components/ui';
import {CertificationCard} from '@/components/editorial';
import {certifications} from '@/content/editorial';
import {CurrentlyBuilding} from '@/components/sections';
import {Award} from 'lucide-react';
import {pageMeta} from '@/content/metadata';
export const metadata=pageMeta('Certifications & Learning','CCNA (2023), CEH (2024), ACS membership and ongoing learning in enterprise technology, automation and AI.','/certifications/');
export default function Certifications(){return <div className="container page-bottom"><PageIntro kicker="CONTINUOUS LEARNING" title="Progress, backed by evidence."><p>Formal credentials sit alongside hands-on projects and professional experience.</p></PageIntro>{certifications.length?<div className="skills-grid">{certifications.map(c=><CertificationCard key={c.name} item={c}/>)}</div>:<div className="empty-state"><Award size={32}/><h3>Verified credentials will appear here.</h3><p>Certifications will be listed here.</p></div>}<section className="lab-card lab-section"><h2>Professional membership</h2><p>Australian Computer Society (ACS) member.</p></section><div className="spaced"><CurrentlyBuilding/></div></div>}
