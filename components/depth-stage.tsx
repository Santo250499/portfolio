'use client';

import {useRef, type PointerEvent, type ReactNode} from 'react';
import {BrainCircuit, Braces, Layers3} from 'lucide-react';

export function DepthStage({children}:{children:ReactNode}) {
  const stage=useRef<HTMLDivElement>(null);
  function move(event:PointerEvent<HTMLDivElement>){
    if(event.pointerType!=='mouse'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const rect=event.currentTarget.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width-.5;
    const y=(event.clientY-rect.top)/rect.height-.5;
    stage.current?.style.setProperty('--tilt-x',`${-y*7}deg`);
    stage.current?.style.setProperty('--tilt-y',`${x*9}deg`);
  }
  function reset(){stage.current?.style.setProperty('--tilt-x','0deg');stage.current?.style.setProperty('--tilt-y','0deg')}
  return <div className="depth-scene" onPointerMove={move} onPointerLeave={reset}>
    <div className="depth-stage" ref={stage}>
      <div className="depth-backplate" aria-hidden="true"/>
      <div className="depth-backplate second" aria-hidden="true"/>
      <div className="depth-main">{children}</div>
      <div className="floating-label label-ai"><BrainCircuit size={20}/><div><small>THE INTELLIGENCE</small><strong>AI & automation</strong></div></div>
      <div className="floating-label label-api"><Braces size={20}/><div><small>THE CONNECTION</small><strong>Python + APIs</strong></div></div>
      <div className="stage-caption"><Layers3 size={14}/><span>Ideas. Systems. Working solutions.</span></div>
    </div>
  </div>
}
