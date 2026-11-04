const assert=require('assert'),fs=require('fs'),vm=require('vm');
class Node{
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.attrs={};this.style={setProperty(k,v){this[k]=v;}};this.hidden=false;this.open=false;this.className='';this.listeners={};this.naturalWidth=1000;this.naturalHeight=1000;this.classList={add:(...xs)=>{this.className=[...new Set([...this.className.split(' ').filter(Boolean),...xs])].join(' ');},remove:(...xs)=>{this.className=this.className.split(' ').filter(x=>!xs.includes(x)).join(' ');}};}
 append(...nodes){for(const n of nodes){n.remove();n.parent=this;this.children.push(n);}}remove(){if(this.parent){this.parent.children=this.parent.children.filter(n=>n!==this);this.parent=null;}}replaceChildren(...nodes){for(const n of [...this.children])n.remove();this.append(...nodes);}setAttribute(k,v){this.attrs[k]=v;}addEventListener(k,f){(this.listeners[k]??=[]).push(f);}showModal(){this.open=true;}close(){this.open=false;}focus(){}decode(){return Promise.resolve();}getBoundingClientRect(){return {width:340,height:340};}
 querySelectorAll(selector){const found=[];const test=n=>selector.startsWith('[data-si=')?String(n.dataset.si)===selector.match(/"([^"]+)"/)[1]:n.className.split(' ').includes(selector.slice(1));function walk(n){for(const child of n.children){if(test(child))found.push(child);walk(child);}}walk(this);return found;}querySelector(s){return this.querySelectorAll(s)[0]||null;}
 get outerHTML(){return '<'+this.tagName+' class="'+this.className+'"'+(this.src?' src="'+this.src+'"':'')+'>'+this.children.map(c=>c.outerHTML).join('')+'</'+this.tagName+'>';}
 getContext(){const log=[];contexts.push(log);return {globalAlpha:1,clearRect(){},fillRect(){},drawImage(image){log.push({alpha:this.globalAlpha,src:image.src});}};}
}
const contexts=[],ids={};for(const id of ['treeContinue','treeTitle','treeLarge','mount','counter','dialog'])ids[id]=new Node();const body=new Node(),jobs=[];let clock=0;const pauses=[];
const document={body,getElementById:id=>ids[id],createElement:tag=>new Node(tag)};
const scope={document,console,window:{matchMedia:()=>({matches:true})},setTimeout:(f,ms)=>{pauses.push(ms);jobs.push(()=>{clock+=ms;f();});},requestAnimationFrame:f=>jobs.push(()=>{clock+=750;f(clock);})};vm.createContext(scope);
for(const file of ['data.js','engine.js','pfau-art.js','tree-art.js','reward-motion.js','tree.js','pfau.js','knurpsel.js','rakete.js','blumenwiese.js','wundereiche.js','kinderzimmer.js','marsmission.js','baumhaus.js','unterwasserwelt.js','matschwiese.js'])vm.runInContext(fs.readFileSync(file,'utf8'),scope);
async function pump(until){for(let i=0;i<5000;i++){await new Promise(resolve=>setImmediate(resolve));if(until())return;if(jobs.length)jobs.shift()();}throw new Error('Controller blockiert.');}
(async()=>{
const types=[['Pfau',scope.PeacockReward,scope.PFAU_ART],['Baum',scope.TreeReward,scope.TREE_ART],...['KnurpselReward','RocketReward','FlowerReward','WonderOakReward','BedroomReward','MarsMissionReward','TreehouseReward','UnderwaterReward','MeadowReward'].map(n=>[n,scope[n]])];let awards=0;
for(const [name,api,art] of types){let finished=0;const view=art?new api.View(art,ids.mount,ids.counter,ids.dialog,()=>finished++):new api.View(ids.mount,ids.counter,ids.dialog,()=>finished++);view.reset();view.earnedFrames=[];
 for(let i=1;i<=10;i++){const pending=view.award(name+'-'+i);assert.equal(await view.award(name+'-'+i),false,'Doppelklick');await pump(()=>view.waiting);assert.equal(view.state.progress,i);assert.equal(view.earnedFrames.length,i);assert.equal(view.busy,false);assert.equal(ids.treeContinue.hidden,false);assert.equal(finished,0);ids.treeContinue.onclick();assert.equal(await pending,true);assert.equal(await view.award(name+'-'+i),false,'Bereits gelöste Aufgabe');awards++;}
 assert.equal(finished,1);assert.equal(view.state.complete,true);assert(!view.picture.outerHTML.includes('CANVAS'),'Galerie darf kein leeres Canvas speichern');
 const before=view.run;view.reset();const pending=view.award(name+'-abbruch');view.cancel();await pump(()=>jobs.length===0);assert.equal(await pending,false);assert(view.run>before);assert.equal(view.waiting,false);
}
assert(pauses.includes(2000));assert(contexts.length>=90);for(const log of contexts){assert(log.some(x=>x.alpha>0&&x.alpha<1),'Zwischenbilder fehlen');assert.equal(log.at(-1).alpha,1);}
console.log('OK: '+types.length+' Belohnungen, '+awards+' Treffer, Zwischenbilder, manuelles Weiter, Galeriedaten, Doppelklicks und Abbruch geprüft.');
})().catch(e=>{console.error(e);process.exitCode=1;});
