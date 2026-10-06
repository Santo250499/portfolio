import snapshot from './github-snapshot.json';
export type Repo={id:number;name:string;description:string|null;html_url:string;homepage:string|null;language:string|null;topics:string[];pushed_at:string;created_at:string;archived:boolean;fork:boolean;stargazers_count:number;open_issues_count:number;default_branch:string};
export type Activity={id:string;type:string;created_at:string;repo:string;action:string;merged:boolean;url:string};
export type GithubData={username:string;fetchedAt:string;repos:Repo[];events:Activity[]};
export const initialGithub:GithubData=snapshot;
export const editorial:Record<string,{title:string;category:string;summary:string;featured?:boolean;caseStudy?:string}>={
  'job-match-agent':{title:'AI Job Match Agent',category:'AI & APIs',summary:'A structured analysis API that compares résumés and job requirements with evidence, validation and transparent demo scoring.',featured:true,caseStudy:'/projects/ai-job-match-assistant/'},
  'ai-claim-amount-calculator':{title:'Claim Amount Calculator',category:'Automation',summary:'Turn pasted rows, spreadsheets or screenshots into classified payment statuses and exportable totals.',featured:true,caseStudy:'/projects/claim-amount-calculator/'},
  'm365-user-lifecycle':{title:'Microsoft 365 User Lifecycle',category:'IT Automation',summary:'PowerShell workflows for onboarding and offboarding users in Microsoft 365 and Entra ID. Lab project, tested with -WhatIf and Pester against fictional @contoso.com users; not used in production.',featured:true,caseStudy:'/projects/m365-user-lifecycle/'},
  'ai-job-application-assistant':{title:'AI Job Application Assistant',category:'AI Applications',summary:'A Streamlit application for résumé analysis, cover letters, LinkedIn messages and interview preparation.',caseStudy:'/projects/job-application-assistant/'},
  'ai-career-match-dashboard':{title:'Career Match Dashboard',category:'Web Development',summary:'An archived browser prototype that scores résumé and job-description overlap using keyword rules, rather than an LLM.'},
  'ai-learning-lab':{title:'AI Learning Lab',category:'Learning',summary:'Python and OpenAI exercises covering résumé analysis, chatbots, email writing and API practice.'},
  'Santo250499':{title:'GitHub Profile',category:'Profile',summary:'The profile README introducing my background, interests and development direction.'},
};
export function categoryFor(r:Repo){return editorial[r.name]?.category||(r.fork?'Forks':'Other projects')}
export function titleFor(r:Repo){return editorial[r.name]?.title||r.name.replaceAll('-',' ')}
export function safeUrl(value:string|null|undefined){try{const u=new URL(value||'');return u.protocol==='https:'||u.protocol==='http:'?u.href:null}catch{return null}}
export function repoUrl(r:Repo){return `https://github.com/${initialGithub.username}/${encodeURIComponent(r.name)}`}
export function dateLabel(date:string){return new Date(date).toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric',timeZone:'Australia/Brisbane'})}
export function activityLabel(e:Activity){if(e.type==='PushEvent')return 'Pushed code';if(e.type==='PullRequestEvent')return e.merged?'Merged a pull request':`${e.action||'Updated'} a pull request`;if(e.type==='CreateEvent')return 'Created a branch or repository';if(e.type==='IssuesEvent')return `${e.action||'Updated'} an issue`;if(e.type==='ReleaseEvent')return 'Published a release';if(e.type==='IssueCommentEvent')return 'Commented on a discussion';if(e.type==='DeleteEvent')return 'Deleted a branch or tag';return e.type.replace(/Event$/,'').replace(/([a-z])([A-Z])/g,'$1 $2')}
