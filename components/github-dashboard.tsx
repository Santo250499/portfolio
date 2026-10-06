'use client';

import Link from 'next/link';
import {useEffect,useState} from 'react';
import {ArrowUpRight,BookOpen,Code2,ExternalLink,FolderGit2,GitBranch,GitCommitHorizontal,RefreshCw,Search,Star,Activity as ActivityIcon,Archive,Layers3} from 'lucide-react';
import {initialGithub,editorial,categoryFor,titleFor,repoUrl,safeUrl,dateLabel,activityLabel,type Repo,type Activity} from '@/content/github';

async function request(path:string,signal:AbortSignal){
  const res=await fetch(`https://api.github.com${path}`,{signal,headers:{Accept:'application/vnd.github+json'}});
  if(!res.ok)throw new Error(`GitHub returned ${res.status}`);
  return res.json();
}
async function allRepositories(signal:AbortSignal):Promise<Repo[]>{
  const result:Repo[]=[];
  for(let page=1;;page++){
    const batch=await request(`/users/${initialGithub.username}/repos?per_page=100&sort=pushed&page=${page}`,signal);
    if(!Array.isArray(batch)||batch.some(r=>typeof r.id!=='number'||typeof r.name!=='string'||typeof r.pushed_at!=='string'))throw Error('Invalid repository response');
    result.push(...batch.map(r=>({...r,topics:Array.isArray(r.topics)?r.topics:[]})));
    if(batch.length<100)break;
  }
  return result;
}
async function publicActivity(signal:AbortSignal):Promise<Activity[]>{
  const raw=await request(`/users/${initialGithub.username}/events/public?per_page=100`,signal);
  if(!Array.isArray(raw))throw Error('Invalid activity response');
  return raw.filter(e=>e.id&&e.repo?.name&&e.created_at).map(e=>({id:e.id,type:e.type,created_at:e.created_at,repo:e.repo.name,action:e.payload?.action||'',merged:!!e.payload?.pull_request?.merged,url:e.payload?.pull_request?.html_url||e.payload?.issue?.html_url||`https://github.com/${e.repo.name}`}));
}

export function RepositoryCard({repo}:{repo:Repo}){
  const details=editorial[repo.name];const url=repoUrl(repo);const demo=safeUrl(repo.homepage);
  return <article className="work-card">
    <div className="work-card-top"><span className="repo-category">{categoryFor(repo)}</span><span className={`repo-state ${repo.archived?'is-archived':''}`}>{repo.archived?<Archive size={12}/>:<GitBranch size={12}/>} {repo.archived?'Archived':repo.fork?'Fork':'Source available'}</span></div>
    <h3><a href={url} target="_blank" rel="noreferrer">{titleFor(repo)}</a></h3>
    <p>{details?.summary||repo.description||'Source code and documentation are available on GitHub.'}</p>
    <div className="work-stack">{repo.language&&<span><i className={'language-dot '+repo.language.toLowerCase()}/>{repo.language}</span>}{repo.topics.filter(t=>t.toLowerCase()!==repo.language?.toLowerCase()).slice(0,3).map(t=><span key={t}>{t}</span>)}</div>
    <div className="repo-update"><GitCommitHorizontal size={15}/><span>Last push {dateLabel(repo.pushed_at)}</span>{repo.stargazers_count>0&&<span className="repo-stars"><Star size={13}/>{repo.stargazers_count}</span>}</div>
    <div className="work-card-links">{['job-match-agent','ai-claim-amount-calculator','ai-job-application-assistant'].includes(repo.name)&&<Link href={`/demos/#${repo.name==='job-match-agent'?'job-match':repo.name==='ai-claim-amount-calculator'?'claims':'application'}`}>Try preview</Link>}<a href={url} target="_blank" rel="noreferrer"><Code2 size={15}/> Source code</a><a href={`${url}#readme`} target="_blank" rel="noreferrer"><BookOpen size={15}/> README</a>{details?.caseStudy&&<Link href={details.caseStudy}>Case study</Link>}{demo&&<a href={demo} target="_blank" rel="noreferrer"><ExternalLink size={14}/> Website</a>}</div>
  </article>
}

export function GithubDashboard({collection=false}:{collection?:boolean}){
  const [repos,setRepos]=useState<Repo[]>(initialGithub.repos);
  const [events,setEvents]=useState<Activity[]>(initialGithub.events);
  const [repoSync,setRepoSync]=useState(initialGithub.fetchedAt);
  const [eventSync,setEventSync]=useState(initialGithub.fetchedAt);
  const [loading,setLoading]=useState(false);
  const [live,setLive]=useState(false);
  const [notice,setNotice]=useState('');
  const [attempt,setAttempt]=useState(0);
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const [status,setStatus]=useState('All');
  const [sort,setSort]=useState('recent');
  useEffect(()=>{
    let active=true;const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),20000);
    setLoading(true);setNotice('');
    Promise.allSettled([allRepositories(controller.signal),publicActivity(controller.signal)]).then(([repoResult,eventResult])=>{
      if(!active)return;
      const now=new Date().toISOString();
      if(repoResult.status==='fulfilled'){setRepos(repoResult.value);setRepoSync(now);setLive(true)}
      if(eventResult.status==='fulfilled'){setEvents(eventResult.value);setEventSync(now)}
      const messages=[];
      if(repoResult.status==='rejected')messages.push('Live repositories are unavailable. Showing the last successful snapshot.');
      if(eventResult.status==='rejected')messages.push('Recent activity is showing its last successful snapshot.');
      setNotice(messages.join(' '));
    }).finally(()=>{clearTimeout(timer);if(active)setLoading(false)});
    return()=>{active=false;clearTimeout(timer);controller.abort()};
  },[attempt]);
  const categoryOptions=['All',...new Set(repos.map(categoryFor))];
  const needle=query.trim().toLowerCase();
  const filtered=repos.filter(r=>(category==='All'||categoryFor(r)===category)&&(status==='All'||(status==='Archived'?r.archived:status==='Forks'?r.fork:!r.archived&&!r.fork))&&(!needle||[r.name,titleFor(r),r.description,editorial[r.name]?.summary,r.language,...r.topics].filter(Boolean).join(' ').toLowerCase().includes(needle))).sort((a,b)=>sort==='name'?titleFor(a).localeCompare(titleFor(b)):sort==='stars'?b.stargazers_count-a.stargazers_count||Date.parse(b.pushed_at)-Date.parse(a.pushed_at):Date.parse(b.pushed_at)-Date.parse(a.pushed_at));
  const languages=Object.entries(repos.reduce<Record<string,number>>((acc,r)=>{if(r.language)acc[r.language]=(acc[r.language]||0)+1;return acc},{})).sort((a,b)=>b[1]-a[1]);
  const recent=repos.filter(r=>Date.parse(repoSync)-Date.parse(r.pushed_at)<=30*86400000&&Date.parse(repoSync)>=Date.parse(r.pushed_at));
  const sortedEvents=[...events].sort((a,b)=>Date.parse(b.created_at)-Date.parse(a.created_at));
  const weeks=Array.from({length:8},(_,index)=>{
    const end=Date.parse(eventSync)-(7-index)*7*86400000;
    const start=end-7*86400000;
    return {start,end,count:events.filter(e=>Date.parse(e.created_at)>start&&Date.parse(e.created_at)<=end).length};
  });
  const maxEvents=Math.max(1,...weeks.map(w=>w.count));
  return <div className="github-dashboard">
    <div className="sync-toolbar"><div><span className={'sync-badge '+(live?'live':'')}>{loading?'Refreshing':live?'GitHub connected':'Saved GitHub snapshot'}</span><span>Repositories checked {dateLabel(repoSync)}</span></div><button className="button secondary refresh-button" disabled={loading} onClick={()=>setAttempt(a=>a+1)}><RefreshCw size={14} className={loading?'spinning':''}/>{loading?'Updating…':'Refresh data'}</button></div>
    {notice&&<div className="data-notice" role="status">{notice} GitHub may be temporarily unavailable or rate-limited. <a href={`https://github.com/${initialGithub.username}?tab=repositories`} target="_blank" rel="noreferrer">Browse on GitHub</a></div>}
    {!collection&&<>
      <div className="dashboard-stats"><Metric icon={<FolderGit2 size={20}/>} value={repos.length} label="Public repositories" detail="Including archived projects & profile"/><Metric icon={<GitCommitHorizontal size={20}/>} value={recent.length} label="Pushed in the last 30 days" detail="Repository updates, not completed projects"/><Metric icon={<Code2 size={20}/>} value={languages.length} label="Primary languages" detail="Reported by GitHub per repository"/><Metric icon={<Archive size={20}/>} value={repos.filter(r=>r.archived).length} label="Archived repositories" detail="Preserved experiments and earlier work"/></div>
      <div className="dashboard-panels"><section className="dashboard-panel activity-chart"><div className="panel-heading"><div><span className="eyebrow">DEVELOPMENT ACTIVITY</span><h2>Small steps. Visible progress.</h2></div><ActivityIcon size={20}/></div><div className="activity-bars" role="img" aria-label={`Public events in eight successive seven-day periods, oldest to newest: ${weeks.map(w=>w.count).join(', ')}. Limited to the latest ${events.length} returned events.`}>{weeks.map((w,i)=><div className="activity-column" key={i}><span>{w.count}</span><div className="bar-track"><i style={{height:`${Math.max(w.count?5:0,w.count/maxEvents*100)}%`}}/></div><small>{new Date(w.end).toLocaleDateString('en-AU',{day:'numeric',month:'short',timeZone:'Australia/Brisbane'})}</small></div>)}</div><p className="chart-note">Latest {events.length} returned public events · rolling 8 weeks ending {dateLabel(eventSync)}. This is a limited activity sample, not a complete contribution or commit history.</p></section>
      <section className="dashboard-panel"><div className="panel-heading"><div><span className="eyebrow">TECHNOLOGY MIX</span><h2>What I’m building with.</h2></div><Layers3 size={20}/></div><div className="language-list">{languages.map(([language,count])=><div key={language}><div><span><i className={'language-dot '+language.toLowerCase()}/>{language}</span><strong>{count} {count===1?'repo':'repos'}</strong></div><div className="language-track"><i className={language.toLowerCase()} style={{width:`${count/Math.max(1,repos.length)*100}%`}}/></div></div>)}</div><p className="chart-note">Primary language per public repository; not a skill rating. {repos.filter(r=>!r.language).length} {repos.filter(r=>!r.language).length===1?'repository has':'repositories have'} no detected language.</p></section></div>
      <section className="dashboard-panel activity-feed"><div className="panel-heading"><div><span className="eyebrow">RECENT UPDATES</span><h2>From the development log.</h2></div><a href={`https://github.com/${initialGithub.username}`} target="_blank" rel="noreferrer" className="text-link">GitHub profile</a></div>{sortedEvents.length?<ol>{sortedEvents.slice(0,5).map(e=><li key={e.id}><GitCommitHorizontal size={19}/><div><a href={safeUrl(e.url)||`https://github.com/${initialGithub.username}`} target="_blank" rel="noreferrer">{activityLabel(e)}</a><span>{e.repo.split('/').pop()}</span></div><time dateTime={e.created_at}>{dateLabel(e.created_at)}</time></li>)}</ol>:<p>No public events were returned by GitHub. Repository updates remain visible below.</p>}</section>
    </>}
    <section className="repository-library" id="repositories"><div className="library-heading"><div><span className="eyebrow">EXPLORE THE SOURCE</span><h2>{collection?'All GitHub work.':'The project library.'}</h2><p>Applications, automation and experiments. Every public repository, in one place.</p></div><a href={`https://github.com/${initialGithub.username}?tab=repositories`} target="_blank" rel="noreferrer" className="text-link">View on GitHub <ExternalLink size={14}/></a></div>
      <div className="library-controls"><label className="project-search"><Search size={18}/><span className="sr-only">Search repositories</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects, tools or technologies…" type="search"/></label><label className="select-control">Status<select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Not archived</option><option>Archived</option><option>Forks</option></select></label><label className="select-control">Sort by<select value={sort} onChange={e=>setSort(e.target.value)}><option value="recent">Latest push</option><option value="name">Name</option><option value="stars">Stars</option></select></label></div>
      <div className="category-tabs" aria-label="Filter repositories by category">{categoryOptions.map(c=><button key={c} aria-pressed={c===category} onClick={()=>setCategory(c)}>{c}{c==='All'&&<span>{repos.length}</span>}</button>)}</div>
      <div className="library-count" aria-live="polite">Showing {filtered.length} of {repos.length} public repositories</div>
      {filtered.length?<div className="work-grid">{filtered.map(r=><RepositoryCard key={r.id} repo={r}/>)}</div>:<div className="empty-state"><Search size={28}/><h3>No matching repositories.</h3><p>Try another term or clear the filters to see all the work.</p><button className="button secondary" onClick={()=>{setQuery('');setCategory('All');setStatus('All')}}>Clear filters</button></div>}
    </section>
  </div>
}
function Metric({icon,value,label,detail}:{icon:React.ReactNode;value:number;label:string;detail:string}){return <article className="dashboard-metric"><div>{icon}<span>{label}</span></div><strong>{value}</strong><p>{detail}</p></article>}
