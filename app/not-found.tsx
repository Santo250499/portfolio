import Link from 'next/link';
export default function NotFound(){return <div className="container empty-state"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>This path hasn’t been built.</h1><p>Head back to the project collection to explore the work.</p><Link className="button primary" href="/projects/">View projects</Link></div>}
