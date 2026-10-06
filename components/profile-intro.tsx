import Image from 'next/image';
import Link from 'next/link';
import {profile} from '@/content/profile';

export function ProfileIntro(){
  if(!profile.name&&!profile.photo)return null;
  return <section className="container personal-intro" aria-label="Meet the developer">
    {profile.photo&&<div className="portrait-frame"><Image src={profile.photo} alt={`Portrait of ${profile.name||'the portfolio owner'}`} width={640} height={800} sizes="(max-width: 760px) 90vw, 320px"/></div>}
    <div><div className="eyebrow">THE PERSON BEHIND THE PROJECTS</div><h2>{profile.name?`Hi, I’m ${profile.name}.`:'A practical approach to intelligent technology.'}</h2><p>{profile.title}</p>{profile.location&&<p className="profile-location">Based in {profile.location}</p>}<Link className="button secondary" href="/about/">More about me</Link></div>
  </section>
}
