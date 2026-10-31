/* FITBEAT STATIC REACTIONS — intentionally no sprite animation. */
(() => {
 const base='assets/reactions/';
 const files=['idle','ready','go','good','great','perfect','sad','miss','tired','encourage','keep-going','awesome','clear','victory','level-up','game-over','try-again','dont-give-up'];
 const cache={};
 files.forEach(n=>{const i=new Image();i.src=base+n+'.png';cache[n]=i;});
 const puppy=[...document.querySelectorAll('.puppy')];
 const dancer=document.getElementById('dancer');
 const feedback=document.getElementById('feedback');
 const score=document.getElementById('score');
 const combo=document.getElementById('combo');
 const result=document.querySelector('#results .puppy');
 let lastReaction='',timer;
 function show(img,name) {
   if(!img||!cache[name])return;
   img.src=cache[name].src;
   img.dataset.reaction=name;
   img.className='puppy static-puppy';
 }
 puppy.forEach(i=>show(i,i===result?'victory':'idle'));
 function react(name,delay=1100){
   if(!dancer)return;
   show(dancer,name);lastReaction=name;
   clearTimeout(timer);
   timer=setTimeout(()=>{show(dancer,'encourage');lastReaction='encourage';},delay);
 }
 function evaluate(){
   if(!feedback)return;
   const f=feedback.textContent.trim().toLowerCase();
   if(f.includes('perfect'))react('perfect',1100);
   else if(f.includes('good'))react('good',1100);
   else if(f.includes('miss'))react('sad',1300);
   else if(f.includes('ready'))react('ready',900);
 }
 if(feedback)new MutationObserver(evaluate).observe(feedback,{childList:true,characterData:true,subtree:true});
 const results=document.getElementById('results');
 if(results){
  new MutationObserver(()=>{
   if(!results.classList.contains('active'))return;
   const p=+(document.getElementById('perfect')?.textContent||0);
   const g=+(document.getElementById('good')?.textContent||0);
   const m=+(document.getElementById('miss')?.textContent||0);
   const total=p+g+m;
   show(result,total===0?'encourage':p/total>=.65?'victory':(p+g)/total>=.5?'clear':'dont-give-up');
  }).observe(results,{attributes:true,attributeFilter:['class']});
 }
 const home=document.querySelector('#home .puppy');
 if(home)show(home,'awesome');
 // The game changes .puppy classes for its old CSS animation.
 // Restore static cards without restarting any frame-based movement.
 if(dancer)new MutationObserver(()=>{
  if(!dancer.classList.contains('static-puppy'))dancer.className='puppy static-puppy';
 }).observe(dancer,{attributes:true,attributeFilter:['class']});
})();