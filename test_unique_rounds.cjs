const assert=require('assert');require('./data.js');const E=require('./engine.js'),d=GAME_DATA,m=E.buildMatrix(d);let seed=1447;const rng=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);let count=0;
for(let sample=0;sample<4;sample++)for(let group=0;group<=20;group++)for(let level=1;level<=3;level++)for(const size of [6,9,12]){
 const rounds=E.planRound(d,m,{level,size,group,maximum:10},rng);assert.equal(rounds.length,group?6:10,'Rundenlänge');assert.equal(new Set(rounds.map(r=>r.answer)).size,rounds.length,'Zielbild wiederholt');assert.equal(new Set(rounds.map(r=>E.searchKey(r.question))).size,rounds.length,'Suchbedingung wiederholt');for(const round of rounds){assert(E.valid(round.question,round.deck));assert.equal(round.deck.length,size);}count++;
}
const usedTargets=d.cards.map(c=>c.id);assert.throws(()=>E.makeRound(d,m,{level:1,size:6,usedTargets}));
assert(!JSON.stringify(d.groups[0]).includes('braune Nase'));for(const n of [5,6])assert.equal(d.cards.find(c=>c.id==='VG-01-0'+n).attributes.Nasen,'1 schwarze und 1 gelbe');
console.log('OK: '+count+' vollständige Runden ohne doppelte Zielbilder oder Suchbedingungen, Erschöpfung und Nasentexte geprüft.');
