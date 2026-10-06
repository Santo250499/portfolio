import type {Metadata} from 'next';
import Link from 'next/link';
import {Header} from '@/components/header';
import {profile} from '@/content/profile';
import './globals.css';
import './sections.css';
import './depth.css';
import './dashboard.css';
import './lab.css';
export const metadata:Metadata={metadataBase:profile.siteUrl?new URL(profile.siteUrl):undefined,title:{default:`${profile.name} | ${profile.title}`,template:'%s | Md Tanvir Mannan'},description:'Md Tanvir Mannan, Gold Coast: ICT Support Officer working across Microsoft 365, Intune, Windows Autopilot and Entra ID, building AI and automation tools with Python, FastAPI and PowerShell.',openGraph:{type:'website',locale:'en_AU',siteName:'Md Tanvir Mannan',title:`${profile.name} | ${profile.title}`,description:'Enterprise IT support and systems experience, plus AI and automation tools built in Python, FastAPI and PowerShell.'},twitter:{card:'summary'},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:"try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch{}"}}/></head><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><footer><div className="container footer-inner"><div><Link href="/" className="footer-brand">{profile.name||'portfolio'}<span className="blue">.</span></Link><p>Practical technology. Intelligent solutions.</p></div><div className="footer-links"><Link href="/projects/">Projects</Link><Link href="/about/">About</Link><Link href="/contact/">Contact</Link></div><small>Built with Next.js & TypeScript.<br/>Designed for people. Built to keep evolving.</small></div></footer></body></html>}
