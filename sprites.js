/* FITBEAT smooth sprites v2 — consistent frame scale, preloading, gentler timing. */
(() => {
  const counts = {idle:9,left:9,right:9,jump:9,twist:4,perfect:6,good:4,miss:4};
  const base = 'assets/sprites/';
  const cache = {};
  for (const [kind,n] of Object.entries(counts)) {
    cache[kind] = [];
    for(let i=1;i<=n;i++){
      const im=new Image();
      im.src=`${base}${kind}_${String(i).padStart(2,'0')}.png`;
      cache[kind].push(im);
    }
  }
  const actors = [...document.querySelectorAll('.puppy')];
  const states = new WeakMap();
  const map = {'dance-left':'left','dance-right':'right','reach':'jump','twist':'twist','cheer':'perfect','miss':'miss','idle':'idle'};
  function tick(t){
    for(const img of actors){
      const cls=img.classList;
      const action=['dance-left','dance-right','reach','twist','miss','cheer'].find(k=>cls.contains(k))||'idle';
      const kind=map[action];
      let st=states.get(img);
      if(!st || st.kind!==kind){st={kind,start:t,index:-1};states.set(img,st);}
      const frameMs=kind==='idle'?175:kind==='miss'?220:145;
      const idx=Math.floor((t-st.start)/frameMs)%counts[kind];
      if(idx!==st.index){
        const next=cache[kind][idx];
        if(next.complete && next.naturalWidth) img.src=next.src;
        st.index=idx;
      }
      img.dataset.sprite=kind;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
