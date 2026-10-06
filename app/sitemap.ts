import type {MetadataRoute} from 'next';
import {profile,navigation} from '@/content/profile';
import {projects} from '@/content/projects';
import {posts} from '@/content/editorial';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{if(!profile.siteUrl)return [];return [...navigation.map(n=>n[1]),'/seo/','/resume/','/evaluation/',...projects.map(p=>`/projects/${p.slug}/`),...posts.map(p=>`/blog/${p.slug}/`)].map(path=>({url:profile.siteUrl+path,changeFrequency:'monthly',priority:path==='/'?1:path==='/projects/'?.9:.7}))}
