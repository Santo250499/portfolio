import type {Metadata} from 'next';
import {profile} from './profile';
export function pageMeta(title:string,description:string,path:string):Metadata{return {title,description,alternates:profile.siteUrl?{canonical:path}:undefined,openGraph:{title,description,url:profile.siteUrl?path:undefined,type:'website'},twitter:{card:'summary',title,description}}}
export function schema(value:Record<string,unknown>){return JSON.stringify(value).replace(/</g,'\\u003c')}
