import {PageIntro} from '@/components/ui';
import {BlogCard} from '@/components/editorial';
import {posts} from '@/content/editorial';
import {pageMeta} from '@/content/metadata';
export const metadata=pageMeta('Notes on AI, Automation & Development','Notes on practical AI applications, the transition from enterprise IT to software development, and building useful technology.','/blog/');
export default function Blog(){return <div className="container page-bottom"><PageIntro kicker="NOTES FROM THE WORKBENCH" title="Thinking through the build."><p>Short notes on practical technology, learning in public and connecting enterprise experience with AI development.</p></PageIntro><div className="blog-grid">{posts.map(p=><BlogCard key={p.slug} post={p}/>)}</div></div>}
