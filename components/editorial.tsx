import Link from 'next/link';
import {BookOpen,Award} from 'lucide-react';
import type {Post,Certification} from '@/content/editorial';
export function BlogCard({post}:{post:Post}){return <article className="blog-card"><BookOpen size={24}/><span className="status-label">{post.category}</span><h2><Link href={'/blog/'+post.slug+'/'}>{post.title}</Link></h2><p>{post.summary}</p><Link className="text-link" href={'/blog/'+post.slug+'/'}>Read the note</Link></article>}
export function CertificationCard({item}:{item:Certification}){return <article className="skill-card"><Award/><h3>{item.name}</h3><p>{item.issuer} · {item.date}</p>{item.url&&<a className="text-link" href={item.url} target="_blank" rel="noreferrer">Verify credential</a>}</article>}
