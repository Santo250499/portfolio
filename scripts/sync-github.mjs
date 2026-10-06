import {writeFile,mkdir} from 'node:fs/promises';
const username='Santo250499';
const headers={Accept:'application/vnd.github+json','User-Agent':'Tanvir-Portfolio'};
async function get(url){const r=await fetch(url,{headers,signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error(`GitHub ${r.status}`);return r.json()}
const repos=[];
for(let page=1;;page++){const batch=await get(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&page=${page}`);repos.push(...batch);if(batch.length<100)break;}
const events=await get(`https://api.github.com/users/${username}/events/public?per_page=100`);
const snapshot={username,fetchedAt:new Date().toISOString(),repos:repos.map(r=>({id:r.id,name:r.name,description:r.description,html_url:r.html_url,homepage:r.homepage,language:r.language,topics:r.topics||[],pushed_at:r.pushed_at,created_at:r.created_at,archived:r.archived,fork:r.fork,stargazers_count:r.stargazers_count,open_issues_count:r.open_issues_count,default_branch:r.default_branch})),events:events.map(e=>({id:e.id,type:e.type,created_at:e.created_at,repo:e.repo.name,action:e.payload?.action||'',merged:!!e.payload?.pull_request?.merged,url:e.payload?.pull_request?.html_url||e.payload?.issue?.html_url||`https://github.com/${e.repo.name}`}))};
await mkdir('content',{recursive:true});await writeFile('content/github-snapshot.json',JSON.stringify(snapshot,null,2)+'\n');console.log(`Saved ${repos.length} repositories and ${events.length} public events.`);
