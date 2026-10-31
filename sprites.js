/* Sprite animator: runs alongside existing game.js, no scoring changes. */
(()=>{const sequences={idle:9,'dance-left':9,'dance-right':9,reach:9,twist:4,cheer:6,miss:4};
const base='assets/sprites/';const imgs=[...document.querySelectorAll('.puppy')];
const state=new WeakMap();let last=0;
function render(now){if(now-last>105){last=now;for(const img of imgs){let s=state.get(img)||{kind:'',index:0};const c=img.classList;let kind=c.contains('dance-left')?'dance-left':c.contains('dance-right')?'dance-right':c.contains('reach')?'reach':c.contains('twist')?'twist':c.contains('miss')?'miss':c.contains('cheer')?'cheer':'idle';
if(kind!==s.kind){s.kind=kind;s.index=0}else s.index=(s.index+1)%sequences[kind];state.set(img,s);
const folder=kind==='dance-left'?'left':kind==='dance-right'?'right':kind==='reach'?'jump':kind==='cheer'?'perfect':kind;
const path=base+folder+'_'+String(s.index+1).padStart(2,'0')+'.png';if(img.getAttribute('src')!==path)img.setAttribute('src',path);img.dataset.sprite=kind;
}}requestAnimationFrame(render)}requestAnimationFrame(render);
})();
