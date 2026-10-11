(function(root){
'use strict';
const stages=Array.from({length:11},(_,i)=>`assets/knurpsel/stufe-${String(i).padStart(2,'0')}.png`);
class View extends TreeReward.View {
 constructor(mount,counter,dialog,onFinish){super({kind:'knurpsel'},mount,counter,dialog,onFinish);this.picture.className='reward-picture knurpsel-picture';}
 image(stage){const image=document.createElement('img');image.className='knurpsel-frame';image.src=stages[stage];image.alt=stage===0?'Knurpsel am Anfang':`Knurpsel nach ${stage} gelösten Aufgaben`;image.draggable=false;return image;}
 reset(){this.run++;this.busy=false;this.finished=false;this.close();this.state=new TreeReward.Progress(stages.slice(1).map((src,i)=>({src,stage:i+1})));this.picture.setAttribute('role','img');this.picture.setAttribute('tabindex','-1');this.picture.setAttribute('aria-label','Dein Fortschrittsmonster Knurpsel');this.current=this.image(0);this.picture.replaceChildren(this.current);this.mount.append(this.picture);this.update();
  // Start loading every stage without changing the original artwork.
  this.preloaded=stages.map((_,i)=>this.image(i));
 }
 async award(taskId){
  if(this.busy||this.waiting)return false;
  const info=this.state.award(taskId);if(!info)return false;
  this.busy=true;const run=this.run;
  const title=document.getElementById('treeTitle'),button=document.getElementById('treeContinue');
  title.textContent='Knurpsel verändert sich!';button.hidden=true;
  document.getElementById('treeLarge').append(this.picture);document.body.classList.add('treeOpen');this.dialog.showModal();
  const incoming=this.preloaded[info.stage];
  if(typeof incoming.decode==='function'){try{await incoming.decode();}catch(error){/* The browser can retry the normal image load. */}}
  if(run!==this.run)return false;
  const outgoing=this.current,reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  this.picture.append(incoming);outgoing.classList.add('knurpsel-leave');incoming.classList.add('knurpsel-enter');
  await new Promise(resolve=>setTimeout(resolve,reduced?20:1050));
  if(run!==this.run)return false;
  outgoing.remove();incoming.classList.remove('knurpsel-enter');this.current=incoming;
  this.update();this.busy=false;this.finished=this.state.complete;this.waiting=true;
  this.picture.setAttribute('role','button');this.picture.setAttribute('tabindex','0');this.picture.setAttribute('aria-label',this.finished?'Knurpsel anschauen und Runde beenden':'Knurpsel anschauen und weiterspielen');
  title.textContent=this.finished?'Super! Dein Knurpsel ist fertig!':'Schau genau: Was hat sich verändert?';
  button.textContent=this.finished?'Runde beenden →':'Weiter →';button.hidden=false;button.focus();
  // No timer dismisses the picture: only the child's tap resolves the award.
  return await new Promise(resolve=>{this.dismissResolve=resolve;});
 }
}
root.KnurpselReward={stages,View};
})(globalThis);
