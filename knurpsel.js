(function(root){
'use strict';
const stages=Array.from({length:11},(_,i)=>`assets/knurpsel/stufe-${String(i).padStart(2,'0')}.png`);
class View extends TreeReward.View {
 constructor(mount,counter,dialog,onFinish,art={kind:'knurpsel',name:'Knurpsel',stages,duration:1000}){super(art,mount,counter,dialog,onFinish);this.picture.className='reward-picture knurpsel-picture'+(art.kind==='rakete'?' rakete-picture':'');}
 image(stage){if(!this.art.stages[stage]){const empty=document.createElement('div');empty.className='knurpsel-frame rakete-empty';empty.textContent='?';empty.setAttribute('aria-label','Deine Rakete entsteht mit der ersten Lösung');return empty;}const image=document.createElement('img');image.className='knurpsel-frame';image.src=this.art.stages[stage];image.alt=stage===0?`${this.art.name} am Anfang`:`${this.art.name} nach ${stage} gelösten Aufgaben${this.art.descriptions?', '+this.art.descriptions[stage-1]:''}`;image.draggable=false;return image;}
 reset(){this.run++;this.busy=false;this.finished=false;this.close();this.state=new TreeReward.Progress(this.art.stages.slice(1).map((src,i)=>({src,stage:i+1})));this.picture.setAttribute('role','img');this.picture.setAttribute('tabindex','-1');this.picture.setAttribute('aria-label','Deine Fortschrittsfigur '+this.art.name);this.current=this.image(0);this.picture.replaceChildren(this.current);this.mount.append(this.picture);this.update();
  // Start loading every stage without changing the original artwork.
  this.preloaded=this.art.stages.map((_,i)=>this.image(i));
 }
 async award(taskId){
  if(this.busy||this.waiting)return false;
  const info=this.state.award(taskId);if(!info)return false;
  this.busy=true;const run=this.run;
  const title=document.getElementById('treeTitle'),button=document.getElementById('treeContinue');
  title.textContent=this.art.name+' verändert sich!';button.hidden=true;
  document.getElementById('treeLarge').append(this.picture);document.body.classList.add('treeOpen');this.dialog.showModal();
  const incoming=this.preloaded[info.stage];
  if(typeof incoming.decode==='function'){try{await incoming.decode();}catch(error){/* The browser can retry the normal image load. */}}
  if(run!==this.run)return false;
  const outgoing=this.current,reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  this.picture.append(incoming);if(this.art.stages[info.stage-1])outgoing.classList.add('knurpsel-leave');else outgoing.hidden=true;incoming.classList.add('knurpsel-enter');
  await new Promise(resolve=>setTimeout(resolve,reduced?20:this.art.duration+50));
  if(run!==this.run)return false;
  outgoing.remove();incoming.classList.remove('knurpsel-enter');this.current=incoming;
  this.update();this.busy=false;this.finished=this.state.complete;this.waiting=true;
  this.picture.setAttribute('role','button');this.picture.setAttribute('tabindex','0');this.picture.setAttribute('aria-label',this.art.name+(this.finished?' anschauen und Runde beenden':' anschauen und weiterspielen'));
  title.textContent=this.finished?(this.art.kind==='rakete'?'Super! Deine Rakete ist fertig!':'Super! Dein Knurpsel ist fertig!'):'Schau genau: Was hat sich verändert?';
  button.textContent=this.finished?'Runde beenden →':'Weiter →';button.hidden=false;button.focus();
  // No timer dismisses the picture: only the child's tap resolves the award.
  return await new Promise(resolve=>{this.dismissResolve=resolve;});
 }
}
root.KnurpselReward={stages,View};
})(globalThis);
