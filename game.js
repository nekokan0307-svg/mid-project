/* FITBEAT unified update: original art retained, five workout intensities,
   separate exercise phases, original beat soundtrack, elevated hit zone. */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const screens=[...document.querySelectorAll('.screen')];
const intensity=[
 {id:'light',name:'Light · เบา',bpm:80,duration:60,scene:0},
 {id:'moderate',name:'Moderate · ปานกลาง',bpm:110,duration:90,scene:1},
 {id:'vigorous',name:'Vigorous · หนัก',bpm:130,duration:120,scene:2},
 {id:'maximum',name:'Maximum · หนักมาก',bpm:150,duration:120,scene:2},
 {id:'interval',name:'Interval · หนักสลับเบา',bpm:150,duration:120,scene:2}
];
let phase='workout',mode=intensity[0],score=0,combo=0,maxCombo=0,perfect=0,good=0,miss=0;
let notes=[],elapsed=0,last=0,spawnAt=0,playing=false,paused=false,raf=0;
let ctx=null,master=null,musicTimer=null,nextBeat=0,step=0;
const TRAVEL=1.85,HIT=0.67;
const beatDuration=()=>60/currentBpm();
function currentBpm(){
 if(phase==='warmup')return Math.round(72+Math.min(1,elapsed/60)*18);
 if(phase==='cooldown')return Math.round(90-Math.min(1,elapsed/60)*18);
 if(mode.id==='interval')return Math.floor(elapsed/15)%2===0?150:80;
 return mode.bpm;
}
function audioReady(){
 try{
  if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;ctx=new AC();master=ctx.createGain();master.gain.value=.18;master.connect(ctx.destination)}
  if(ctx.state==='suspended')ctx.resume().catch(()=>{});
  return true;
 }catch(e){return false}
}
function synth(f,t,d=.1,v=.07,type='sine',end=0){
 if(!ctx)return;
 const o=ctx.createOscillator(),g=ctx.createGain();
 o.type=type;o.frequency.setValueAtTime(f,t);
 if(end)o.frequency.exponentialRampToValueAtTime(end,t+d);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.02);
}
const chords=[[261.63,329.63,392],[293.66,349.23,440],[329.63,392,493.88],[261.63,349.23,440]];
function playBeat(t,n){
 const s=n%8,bar=Math.floor(n/8),ch=chords[Math.floor(bar/2)%4];
 if(s===0||s===4)synth(130,t,.16,.32,'sine',48);
 if(s===2||s===6){synth(200,t,.07,.14,'triangle',110);synth(1200,t,.045,.025,'sawtooth',500)}
 synth(3200,t,.03,.028,'triangle',1900);
 if(s===0||s===4)synth(ch[0]/2,t,.22,.10,'triangle');
 if(s===0)ch.forEach((f,j)=>synth(f,t+j*.01,.27,.027));
 if(s===3||s===7)synth(ch[(bar+s)%3]*2,t,.12,.045);
}
function musicTick(){
 if(!playing||paused||!ctx||!$('sound')?.checked)return;
 if(nextBeat<ctx.currentTime-.2)nextBeat=ctx.currentTime+.04;
 while(nextBeat<ctx.currentTime+.12){
  playBeat(nextBeat,step++);
  nextBeat+=beatDuration()/2;
 }
}
function stopMusic(){if(musicTimer){clearInterval(musicTimer);musicTimer=null}}
function startMusic(){
 stopMusic();
 if(!audioReady())return;
 step=0;nextBeat=ctx.currentTime+.08;
 musicTimer=setInterval(musicTick,25);
}
function ping(f){if(!ctx||!$('sound')?.checked)return;synth(f,ctx.currentTime,.10,.045)}
function show(id){
 screens.forEach(s=>s.classList.toggle('active',s.id===id));
 if(id!=='game'){playing=false;cancelAnimationFrame(raf);stopMusic()}
}
document.querySelectorAll('[data-screen]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.screen)));
const levelGrid=document.querySelector('#levels .level-grid');
const section=document.getElementById('levels');
const heading=section?.querySelector('h2');
if(heading)heading.textContent='🌸 Choose Your Exercise 🌸';
if(levelGrid){
 const phaseBar=document.createElement('div');
 phaseBar.className='fb-phase-tabs';
 phaseBar.innerHTML='<button type="button" data-phase="warmup">🌤 Warm-up</button><button type="button" data-phase="workout">💪 Workout</button><button type="button" data-phase="cooldown">🌙 Cool-down</button>';
 levelGrid.before(phaseBar);
 const detail=document.createElement('p');detail.className='fb-phase-help';phaseBar.after(detail);
 function render(){
  phaseBar.querySelectorAll('button').forEach(b=>{b.classList.toggle('selected',b.dataset.phase===phase);b.setAttribute('aria-pressed',String(b.dataset.phase===phase))});
  if(phase==='workout'){
   detail.textContent='Choose workout intensity. BPM is music tempo, not a clinical intensity measure.';
   levelGrid.innerHTML=intensity.map((m,i)=>'<button class="level" type="button" data-mode="'+m.id+'"><img src="assets/'+['level1-spring.webp','level2-bakery.webp','level3-night.webp'][m.scene]+'" alt=""><b>'+m.name+'</b><span>'+(m.id==='interval'?'80 ↔ 150':m.bpm)+' BPM · '+m.duration+' sec</span></button>').join('');
  }else{
   const warm=phase==='warmup';
   detail.textContent=warm?'A gentle warm-up with gradually increasing tempo.':'A gentle cool-down with gradually decreasing tempo.';
   levelGrid.innerHTML='<button class="level fb-single" type="button" data-mode="phase"><img src="assets/'+(warm?'level1-spring.webp':'level2-bakery.webp')+'" alt=""><b>'+(warm?'🌤 Start Warm-up':'🌙 Start Cool-down')+'</b><span>'+(warm?'72 → 90':'90 → 72')+' BPM · 60 sec</span></button>';
  }
 }
 phaseBar.addEventListener('click',e=>{const b=e.target.closest('[data-phase]');if(!b)return;phase=b.dataset.phase;render()});
 levelGrid.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(!b)return;mode=intensity.find(m=>m.id===b.dataset.mode)||intensity[0];start()});
 render();
}
function reset(){
 score=combo=maxCombo=perfect=good=miss=0;notes=[];elapsed=0;spawnAt=.4;last=0;paused=false;
 $('target-lanes').querySelectorAll('.note').forEach(n=>n.remove());
 $('feedback').textContent='Ready? ♪';$('pause').textContent='Ⅱ';update();
}
function start(){
 reset();
 const scene=phase==='warmup'?0:phase==='cooldown'?1:mode.scene;
 $('game').dataset.level=String(scene);
 $('game').dataset.phase=phase;
 playing=true;show('game');playing=true;
 startMusic();
 raf=requestAnimationFrame(tick);
}
function duration(){return phase==='workout'?mode.duration:60}
function update(){
 $('score').textContent=score.toLocaleString();$('combo').textContent=combo;
 const remaining=Math.max(0,duration()-elapsed);
 $('timer').textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(Math.floor(remaining%60)).padStart(2,'0');
 $('progress').style.width=Math.min(100,elapsed/duration()*100)+'%';
}
function spawn(){
 const lane=Math.floor(Math.random()*4),el=document.createElement('div');
 el.className='note';el.innerHTML='<img src="assets/flower-'+lane+'.svg" alt="">';
 document.querySelectorAll('.lane')[lane].append(el);
 notes.push({lane,el,born:elapsed,hit:false});
}
function fail(n){
 if(n.hit)return;n.hit=true;n.el.remove();combo=0;miss++;$('feedback').textContent='MISS';update();
}
function tick(time){
 if(!playing)return;
 if(!last)last=time;
 const dt=Math.min(.05,(time-last)/1000);last=time;
 if(!paused){
  elapsed+=dt;
  while(elapsed>=spawnAt&&spawnAt<duration()-TRAVEL){
   spawn();
   spawnAt+=beatDuration()*1.5;
  }
  for(const n of notes){
   if(n.hit)continue;
   const p=(elapsed-n.born)/TRAVEL;
   // 67% of the lane is the physical hit zone; the scoring time is p=1.
   n.el.style.top='calc('+Math.max(0,Math.min(1.15,p))*HIT*100+'% - 17px)';
   if(p>1.22)fail(n);
  }
  notes=notes.filter(n=>!n.hit);
  update();
  if(elapsed>=duration()){finish();return}
 }
 raf=requestAnimationFrame(tick);
}
function move(lane){
 if(!playing||paused)return;
 const candidates=notes.filter(n=>!n.hit&&n.lane===lane).sort((a,b)=>Math.abs(elapsed-a.born-TRAVEL)-Math.abs(elapsed-b.born-TRAVEL));
 const n=candidates[0];
 if(!n){$('feedback').textContent='Keep moving!';return}
 const delta=Math.abs(elapsed-n.born-TRAVEL);
 if(delta>.40){$('feedback').textContent=elapsed-n.born<TRAVEL?'Too early!':'Too late!';return}
 n.hit=true;n.el.remove();combo++;maxCombo=Math.max(maxCombo,combo);
 if(delta<.16){perfect++;score+=100+Math.min(combo,20)*5;$('feedback').textContent='PERFECT! ✨';ping(750)}
 else{good++;score+=50+Math.min(combo,20)*2;$('feedback').textContent='GOOD! 🌸';ping(560)}
 update();
}
function finish(){
 playing=false;cancelAnimationFrame(raf);stopMusic();
 $('final-score').textContent=score.toLocaleString();$('perfect').textContent=perfect;
 $('good').textContent=good;$('miss').textContent=miss;$('max-combo').textContent=maxCombo;
 show('results');
}
document.addEventListener('keydown',e=>{
 const map={ArrowLeft:0,ArrowRight:1,ArrowUp:2,Space:3,' ':3};
 if(e.code==='Space'||e.key.startsWith('Arrow'))e.preventDefault();
 if(map[e.code]!==undefined)move(map[e.code]);else if(map[e.key]!==undefined)move(map[e.key]);
});
document.querySelectorAll('[data-move]').forEach(b=>b.addEventListener('click',()=>move(+b.dataset.move)));
$('pause').addEventListener('click',()=>{
 paused=!paused;$('pause').textContent=paused?'▶':'Ⅱ';last=0;
 if(ctx)nextBeat=ctx.currentTime+.07;
});
$('sound')?.addEventListener('change',()=>{if(ctx)nextBeat=ctx.currentTime+.07});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing&&!paused){paused=true;$('pause').textContent='▶';last=0}});
})();
