'use strict';
const data=GAME_DATA,E=QuestionEngine,matrix=E.buildMatrix(data),$=id=>document.getElementById(id);
let level=1,number=0,round=null,locked=false,used=[],lastStyle=-1,errors=0,firstTry=0,missed=false,activeRewardId='pfau',rewardMode='random';
const rewardIds=['pfau','baum','knurpsel','rakete','blumenwiese','wundereiche','kinderzimmer','marsmission','baumhaus','unterwasserwelt','matschwiese'];
const rewardKey='verrueckt-gesucht-rewards-v1';
function loadRewards(){try{const obj=JSON.parse(localStorage.getItem(rewardKey)||'{}');return {used:Array.isArray(obj.used)?obj.used.filter(x=>rewardIds.includes(x)):[],finished:obj.finished&&typeof obj.finished==='object'?obj.finished:{}};}catch{return {used:[],finished:{}};}}
let rewardHistory=loadRewards();
function saveRewards(){try{localStorage.setItem(rewardKey,JSON.stringify(rewardHistory));}catch(e){console.warn('Fortschrittsbilder konnten nicht dauerhaft gespeichert werden.',e);}}
function availableRewards(){return rewardIds.filter(id=>!rewardHistory.used.includes(id));}
function refreshRewardPicker(){if(!availableRewards().length){rewardHistory.used=[];saveRewards();}const avail=availableRewards();$('rewardRemaining').textContent=`${avail.length} von ${rewardIds.length} Geschichten stehen bis zum nächsten Neustart der Auswahl noch bereit.`;for(const o of $('rewardChoice').options){o.disabled=!avail.includes(o.value);o.textContent=o.textContent.replace(/ ✓$/,'')+(avail.includes(o.value)?'':' ✓');}if(!avail.includes($('rewardChoice').value))$('rewardChoice').value=avail[0];}
function setRewardMode(mode){rewardMode=mode;$('rewardChoiceWrap').hidden=mode!=='manual';for(const [id,on] of [['rewardRandom',mode==='random'],['rewardManual',mode==='manual']]){const b=$(id);b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));}refreshRewardPicker();}
$('rewardRandom').onclick=()=>setRewardMode('random');$('rewardManual').onclick=()=>setRewardMode('manual');
function chooseRewardId(){refreshRewardPicker();const avail=availableRewards();return rewardMode==='manual'&&avail.includes($('rewardChoice').value)?$('rewardChoice').value:avail[Math.floor(Math.random()*avail.length)];}
function rememberReward(){if(!rewardHistory.used.includes(activeRewardId))rewardHistory.used.push(activeRewardId);rewardHistory.finished[activeRewardId]={html:reward.picture.outerHTML,date:new Date().toISOString()};saveRewards();}

for(const g of data.groups){const o=document.createElement('option');o.value=g.number;o.textContent=g.motif;$('group').append(o);}
for(const id of ['VG-01-01','VG-03-05','VG-10-03']){const c=data.cards.find(c=>c.id===id),im=document.createElement('img');im.src=c.image;im.alt='';$('sample').append(im);}
document.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=Number(b.dataset.level);document.querySelectorAll('[data-level]').forEach(x=>{const yes=x===b;x.classList.toggle('selected',yes);x.setAttribute('aria-pressed',String(yes));});});
let reward=new PeacockReward.View(PFAU_ART,$('treeMount'),$('treeCounter'),$('treeDialog'),finish);
function finish(){rememberReward();$('result').textContent=`${firstTry} Aufgaben hast du beim ersten Versuch gefunden.`;show('finish');}
const names=['','Einfach','Etwas schwieriger','Ganz schwierig'];
function show(name){document.body.classList.toggle('playing',name==='play');if(name!=='play')reward.cancel();for(const id of ['setup','play','finish','gallery'])$(id).hidden=id!==name;$('settingsButton').hidden=name==='setup';window.scrollTo({top:0,behavior:'instant'});}
function start(){reward.cancel();activeRewardId=chooseRewardId();$('treeContinue').textContent='Weiter →';reward=activeRewardId==='blumenwiese'?new FlowerReward.View($('treeMount'),$('treeCounter'),$('treeDialog'),finish):activeRewardId==='wundereiche'?new WonderOakReward.View($('treeMount'),$('treeCounter'),$('treeDialog'),finish):activeRewardId==='kinderzimmer'?new BedroomReward.View($('treeMount'),$('treeCounter'),$('treeDialog'),finish):activeRewardId==='marsmission'?new MarsMissionReward.View($('treeMount'),$('treeCounter'),$('treeDialog'),finish):activeRewardId==='baumhaus'?new TreehouseReward.View($('treeMount'),$('treeCounter'),$('treeDialog'),finish):activeRewardId==='unterwasserwelt'?new UnderwaterReward.View($('treeMount'),$('treeCounter'),$('treeDialog'),finish):activeRewardId==='matschwiese'?new MeadowReward.View($('treeMount'),$('treeCounter'),$('treeDialog'),finish):activeRewardId==='rakete'?new RocketReward.View($('treeMount'),$('treeCounter'),$('treeDialog'),finish):activeRewardId==='knurpsel'?new KnurpselReward.View($('treeMount'),$('treeCounter'),$('treeDialog'),finish):activeRewardId==='baum'?new TreeReward.View(TREE_ART,$('treeMount'),$('treeCounter'),$('treeDialog'),finish):new PeacockReward.View(PFAU_ART,$('treeMount'),$('treeCounter'),$('treeDialog'),finish);$('treeMount').replaceChildren();number=0;used=[];errors=0;firstTry=0;reward.reset();show('play');nextRound();}
function nextRound(){number++;locked=false;missed=false;$('next').hidden=true;$('feedback').textContent='Tippe auf das passende Bild.';
 try{round=E.makeRound(data,matrix,{level,group:$('group').value,size:$('size').value,used});}catch(err){$('feedback').textContent=err.message;return;}
 used.push(round.question.id);let style=Math.floor(Math.random()*7);if(style===lastStyle)style=(style+1)%7;lastStyle=style;
 $('question').textContent=round.question.variants[style];$('levelLabel').textContent=names[level];$('progressText').textContent=`Aufgabe ${number} von 10`;$('progressBar').style.width=`${(number-1)*10}%`;
 const board=$('board');board.replaceChildren();board.classList.toggle('many',Number($('size').value)>6);board.dataset.size=$('size').value;
 for(const c of round.deck){const box=document.createElement('div');box.className='card';box.dataset.id=c.id;const answer=document.createElement('button');answer.className='answer';answer.setAttribute('aria-label',`${c.motif}, Bild ${round.deck.indexOf(c)+1}`);const im=document.createElement('img');im.src=c.image;im.alt='';answer.append(im);answer.onclick=()=>choose(c,box);const zoom=document.createElement('button');zoom.className='zoomButton';zoom.textContent='⌕';zoom.setAttribute('aria-label',`${c.motif} vergrößern`);zoom.onclick=()=>openZoom(c);box.append(answer,zoom);board.append(box);}
 fitBoard();if(window.requestAnimationFrame)window.requestAnimationFrame(fitBoard);
 $('question').focus({preventScroll:true});
}
async function choose(c,box){if(locked)return;if(c.id===round.answer){locked=true;box.classList.add('correct');if(!missed)firstTry++;$('feedback').textContent='Richtig! Du hast genau hingesehen.';$('next').textContent=number===10?'Runde beenden →':'Nächste Aufgabe →';document.querySelectorAll('.answer').forEach(b=>b.setAttribute('aria-disabled','true'));const completed=await reward.award(round.question.id);if(completed&&number<10){nextRound();window.scrollTo({top:0,behavior:'instant'});}$('progressBar').style.width=`${reward.state.progress*10}%`;}else{missed=true;errors++;box.classList.remove('wrong');void box.offsetWidth;box.classList.add('wrong');$('feedback').textContent=level===3?'Schau noch einmal: Was wird ausgeschlossen?':'Schau noch einmal auf die Merkmale in der Frage.';setTimeout(()=>box.classList.remove('wrong'),450);}}
function openZoom(c){$('zoomImage').src=c.image;$('zoomImage').alt=c.motif;$('zoomLabel').textContent=c.motif;$('zoom').showModal();document.body.classList.add('zoomOpen');}
$('zoom').addEventListener('close',()=>document.body.classList.remove('zoomOpen'));$('closeZoom').onclick=()=>$('zoom').close();$('zoom').onclick=e=>{if(e.target===$('zoom'))$('zoom').close();};
$('start').onclick=start;$('again').onclick=start;$('choose').onclick=()=>show('setup');$('settingsButton').onclick=()=>show('setup');$('home').onclick=e=>{e.preventDefault();show('setup');};$('next').onclick=()=>{if(number===10){finish();}else{nextRound();window.scrollTo({top:0,behavior:'instant'});}};
$('downloadMatrix').onclick=()=>{const blob=new Blob([JSON.stringify({project:'Verrückt gesucht!',cardCount:120,questionCount:matrix.length,questions:matrix},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Verrueckt_gesucht_Fragenmatrix.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};

function fitBoard(){
 const board=$('board');if($('play').hidden||typeof board.getBoundingClientRect!=='function')return;
 const landscape=window.matchMedia('(orientation: landscape)').matches,size=Number(board.dataset.size||6);
 const columns=size===6?2:size===9?3:landscape?4:3,rows=Math.ceil(size/columns);
 const rect=board.getBoundingClientRect(),gap=10,viewport=window.visualViewport?.height||window.innerHeight;
 const rowHeight=Math.floor((viewport-rect.top-16-gap*(rows-1))/rows);
 const columnWidth=Math.floor((rect.width-gap*(columns-1))/columns);
 board.style.setProperty('--card-image-height',Math.max(72,Math.min(320,columnWidth-16,rowHeight-16))+'px');
}
window.addEventListener?.('resize',fitBoard);
window.visualViewport?.addEventListener('resize',fitBoard);

// Completed artwork gallery: snapshots preserve the exact random feather/slot layout of a finished round.
function openGallery(){reward.cancel();renderGallery();show('gallery');}
function renderGallery(){const grid=$('galleryGrid');grid.replaceChildren();for(const opt of $('rewardChoice').options){const id=opt.value,entry=rewardHistory.finished[id],card=document.createElement('button');card.type='button';card.className='gallery-tile';card.disabled=!entry;const picture=document.createElement('div');picture.className='gallery-thumb';if(entry){const parsed=document.createElement('div');parsed.innerHTML=entry.html;const scene=parsed.firstElementChild;if(scene){scene.removeAttribute('role');scene.removeAttribute('tabindex');picture.append(scene);}}else{const q=document.createElement('span');q.textContent='?';picture.append(q);}const label=document.createElement('strong');label.textContent=opt.textContent.replace(/ ✓$/,'');const status=document.createElement('small');status.textContent=entry?'Noch einmal ansehen':'Noch nicht entdeckt';card.append(picture,label,status);card.onclick=()=>showGalleryPicture(id,label.textContent);grid.append(card);}}
function showGalleryPicture(id,name){const entry=rewardHistory.finished[id];if(!entry)return;$('galleryTitle').textContent=name;$('galleryPicture').innerHTML=entry.html;const picture=$('galleryPicture').firstElementChild;if(picture){picture.removeAttribute('role');picture.removeAttribute('tabindex');picture.onclick=null;picture.querySelectorAll('.reward-flight,.pfau-flight,.knurpsel-enter,.knurpsel-leave').forEach(node=>{node.classList.remove('reward-flight','pfau-flight','knurpsel-enter','knurpsel-leave');node.style.animation='none';});}$('galleryDialog').showModal();}
$('openGallery').onclick=openGallery;$('closeGallery').onclick=()=>show('setup');$('galleryClose').onclick=()=>$('galleryDialog').close();$('galleryDialog').onclick=e=>{if(e.target===$('galleryDialog'))$('galleryDialog').close();};
setRewardMode('random');
