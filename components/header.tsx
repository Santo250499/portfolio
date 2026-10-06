'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import {Code2,Menu,X,Sun,Moon} from 'lucide-react';
import {navigation,profile} from '@/content/profile';
export function Header(){const [open,setOpen]=useState(false);const [light,setLight]=useState(false);const path=usePathname();useEffect(()=>{setLight(document.documentElement.dataset.theme==='light')},[]);useEffect(()=>setOpen(false),[path]);function toggle(){const next=!light;setLight(next);document.documentElement.dataset.theme=next?'light':'dark';try{localStorage.setItem('portfolio-theme',next?'light':'dark')}catch{}}
return <header className="header"><div className="nav-wrap"><Link href="/" className="brand" aria-label="Portfolio home"><span className="brand-icon"><Code2 size={20}/></span><span>{profile.name||'portfolio'}<b className="blue">.</b><small>IT SUPPORT / SYSTEMS / AI</small></span></Link><nav aria-label="Main navigation" className={open?'nav-links open':'nav-links'}>{navigation.map(([label,href])=><Link key={href} href={href} aria-current={path===href?'page':undefined}>{label}</Link>)}</nav><div className="nav-actions"><button className="icon-button" onClick={toggle} aria-label={light?'Switch to dark mode':'Switch to light mode'}>{light?<Moon size={18}/>:<Sun size={18}/>}</button><button className="icon-button mobile-menu" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div></header>}
