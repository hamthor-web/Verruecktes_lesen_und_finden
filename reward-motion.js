(function(root){
'use strict';
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function tween(update,duration,valid){return new Promise(resolve=>{let start;function frame(now){if(!valid()){resolve(false);return;}if(start===undefined)start=now;const amount=Math.min(1,(now-start)/duration);update(amount);if(amount<1)requestAnimationFrame(frame);else resolve(true);}requestAnimationFrame(frame);});}
async function reveal(element,valid){element.style.animation='none';element.style.transition='none';element.style.opacity='0';const done=await tween(alpha=>element.style.opacity=String(alpha),3000,valid);if(done)element.style.opacity='1';return done;}
async function imageFade(picture,outgoing,incoming,valid){
 try{await incoming.decode();}catch{return false;}if(!valid())return false;
 const rect=picture.getBoundingClientRect(),canvas=document.createElement('canvas');canvas.width=1000;canvas.height=Math.max(1,Math.round(1000*(rect.height/rect.width||1)));canvas.className='reward-canvas';canvas.setAttribute('role','img');canvas.setAttribute('aria-label',incoming.alt);picture.replaceChildren(canvas);
 const ctx=canvas.getContext('2d'),oldImage=outgoing&&outgoing.tagName==='IMG'?outgoing:null;
 function draw(image){const scale=Math.min(canvas.width/image.naturalWidth,canvas.height/image.naturalHeight),w=image.naturalWidth*scale,h=image.naturalHeight*scale;ctx.drawImage(image,(canvas.width-w)/2,(canvas.height-h)/2,w,h);}
 function paint(alpha){ctx.globalAlpha=1;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);if(oldImage)draw(oldImage);ctx.globalAlpha=alpha;draw(incoming);ctx.globalAlpha=1;}
 paint(0);if(!await tween(paint,3000,valid))return false;
 incoming.style.opacity='1';incoming.style.animation='none';incoming.style.transition='none';picture.replaceChildren(incoming);return true;
}
const phrases=['Richtig!','Klasse!','Toll!','So ist es!','Weiter so!','Gut entdeckt!'];let last=-1,lastStyle=-1,praiseDialog=null,generation=0;
function cancelPraise(){generation++;if(praiseDialog?.open)praiseDialog.close();}
async function praise(first,valid){
 const token=++generation;if(!praiseDialog){praiseDialog=document.createElement('dialog');praiseDialog.id='successDialog';praiseDialog.setAttribute('aria-live','polite');praiseDialog.addEventListener('cancel',event=>event.preventDefault());document.body.append(praiseDialog);}
 let next=first?0:Math.floor(Math.random()*phrases.length);if(!first&&next===last)next=(next+1)%phrases.length;last=next;
 let style=Math.floor(Math.random()*4);if(style===lastStyle)style=(style+1)%4;lastStyle=style;
 const word=document.createElement('div');word.className='success-word success-'+style;word.setAttribute('aria-label',phrases[next]);
 if(style===2){for(const [i,char] of [...phrases[next]].entries()){const letter=document.createElement('span');letter.textContent=char;letter.setAttribute('aria-hidden','true');letter.style.animationDelay=i*65+'ms';word.append(letter);}}else word.textContent=phrases[next];
 praiseDialog.replaceChildren(word);praiseDialog.showModal();const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 await pause((reduced?0:style===2?phrases[next].length*65+250:650)+1350);
 if(token!==generation||!valid()){if(token===generation&&praiseDialog.open)praiseDialog.close();return false;}praiseDialog.close();return true;
}
root.RewardMotion={pause,tween,reveal,imageFade,praise,cancelPraise};
})(globalThis);
