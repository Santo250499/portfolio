export const sampleResume='Fictional candidate: Python developer with FastAPI, Git, SQL and customer support experience. Built REST APIs and documented automation workflows.';
export const sampleJob='Junior automation developer: Python, FastAPI, Git, Docker and Azure. Build REST APIs and support users.';
const skills=['Python','FastAPI','Git','SQL','Docker','Azure','REST APIs','automation','customer support','PowerShell','Microsoft 365'];
function contains(text:string,term:string){return new RegExp('(?:^|[^a-z0-9])'+term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[^a-z0-9])','i').test(text)}
export function matchPreview(resume:string,job:string){
 if(resume.trim().length<30||job.trim().length<30)throw Error('Please enter at least 30 characters in each document.');
 if(resume.trim().toLowerCase()===job.trim().toLowerCase())throw Error('Use different résumé and job-description text.');
 const required=skills.filter(s=>contains(job,s));
 const matched=required.filter(s=>contains(resume,s));
 return {required,matched,missing:required.filter(s=>!matched.includes(s)),coverage:required.length?Math.round(matched.length/required.length*100):null};
}
export function claimRows(text:string){
 if(!text.trim())throw Error('Enter at least one claim row.');
 if(text.length>20000)throw Error('This preview accepts up to 20,000 characters.');
 return text.split(/\r?\n/).map((source,index)=>{
  const s=source.toLowerCase();
  const amountMatch=s.match(/\$\s*(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d{1,2}))?(?![\d.])/);
  const cents=amountMatch?Number(amountMatch[1].replaceAll(',',''))*100+Number((amountMatch[2]||'').padEnd(2,'0')):0;
  const invalid=/\$\s*-|[-(]\s*\$/.test(s)||!Number.isSafeInteger(cents);
  const category=!s.trim()?'Blank row':invalid?'Review required':s.includes('no paid')?'Pending no paid amount':amountMatch&&/\bpaid\b/.test(s)?'Paid amount':amountMatch&&/\bpending\b/.test(s)?'Pending on amount':/\bpending\b/.test(s)?'Pending only':'Other / ignored';
  return {id:index+1,source,category,pending:category==='Pending on amount'?cents:0,paid:category==='Paid amount'?cents:0};
 });
}
export const sampleClaims='pending on $2,866.02\npaid $500.00\npending no paid amnt\npending\npending on $259.25';
export function money(cents:number){return (cents/100).toLocaleString('en-AU',{style:'currency',currency:'AUD'})}
export function downloadText(name:string,text:string,type='text/plain'){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
