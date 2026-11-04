// Exercise the actual app together with all controllers, using the same deterministic DOM harness.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
let harness=fs.readFileSync('test_all_rewards.cjs','utf8').split('(async()=>{')[0];
harness=harness.replace("const assert=require('assert'),fs=require('fs'),vm=require('vm');",'');
harness+='\nglobalThis.testHarness={Node,contexts,ids,body,jobs,pauses,document,scope,pump};';
const host={require,console,setImmediate,fs,vm,assert};vm.createContext(host);vm.runInContext(harness,host);
const {Node,ids,body,document,scope,pump}=host.testHarness;
Node.prototype.classToggle=function(name,yes){this.classList[yes?'add':'remove'](name);};
for(const [,id] of fs.readFileSync('index.html','utf8').matchAll(/id="([^"]+)"/g)){ids[id]??=new Node();body.append(ids[id]);}
const levels=[1,2,3].map(value=>{const n=new Node('button');n.dataset.level=String(value);return n;});
document.querySelectorAll=selector=>selector==='[data-level]'?levels:body.querySelectorAll(selector);
for(const node of [body,...Object.values(ids),...levels])node.classList.toggle=(name,yes)=>node.classToggle(name,yes);
ids.rewardChoice.options=['pfau','baum','knurpsel','rakete','blumenwiese','wundereiche','kinderzimmer','marsmission','baumhaus','unterwasserwelt','matschwiese'].map(value=>Object.assign(new Node('option'),{value,textContent:value}));
ids.rewardChoice.value='pfau';ids.size.value='6';
const context=vm.createContext(scope); // scope is already a VM context; createContext is idempotent.
context.localStorage={getItem:()=>null,setItem(){}};context.window.scrollTo=()=>{};context.window.innerHeight=800;
vm.runInContext(fs.readFileSync('app.js','utf8'),context);const get=code=>vm.runInContext(code,context);
(async()=>{
for(const [index,opt] of ids.rewardChoice.options.entries()){
 ids.rewardManual.onclick();ids.rewardChoice.value=opt.value;get('level='+(index%3+1));get('start()');const pictures=new Set(),keys=new Set();
 for(let step=1;step<=10;step++){
  const target=get('round.answer'),key=get('E.searchKey(round.question)');assert(!pictures.has(target));assert(!keys.has(key));pictures.add(target);keys.add(key);
  if(step===1){await get("choose(round.deck.find(c=>c.id!==round.answer),$('board').children.find(b=>b.dataset.id!==round.answer))");assert.equal(get('reward.state.progress'),0);}
  const pending=get("choose(round.deck.find(c=>c.id===round.answer),$('board').children.find(b=>b.dataset.id===round.answer))");
  await pump(()=>get('reward.waiting'));assert.equal(get('reward.state.progress'),step);assert.equal(get('number'),step);ids.treeContinue.onclick();await pending;
 }
 assert.equal(ids.finish.hidden,false);assert.equal(get('rewardHistory.finished[activeRewardId].frames.length'),11);assert.equal(get('firstTry'),9);
}
assert(!fs.readFileSync('app.js','utf8').includes("$('group')"));assert(!fs.readFileSync('index.html','utf8').includes('id="group"'));
console.log('OK: elf vollständige App-Runden, Erfolgstext vor Belohnung, Fehlversuch, eindeutige Ziele/Suchbedingungen und je elf Galerieframes.');
})().catch(e=>{console.error(e);process.exitCode=1;});
