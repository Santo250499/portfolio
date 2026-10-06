import Link from 'next/link';
import {notFound} from 'next/navigation';
import {posts} from '@/content/editorial';
import {PageIntro} from '@/components/ui';
import {pageMeta} from '@/content/metadata';
export function generateStaticParams(){return posts.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=posts.find(p=>p.slug===slug);return p?pageMeta(p.title,p.summary,`/blog/${p.slug}/`):{title:'Note not found'}}
export default async function Post({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=posts.find(p=>p.slug===slug);if(!p)notFound();return <article className="container page-bottom"><Link className="back-link" href="/blog/">All notes / {p.category}</Link><PageIntro kicker={p.category} title={p.title}><p>{p.summary}</p></PageIntro><div className="prose article-prose">{p.sections.map(s=><section key={s.heading}><h2>{s.heading}</h2><p>{s.text}</p></section>)}<Link className="button secondary" href="/projects/ai-job-match-assistant/">Explore the current project</Link></div></article>}
