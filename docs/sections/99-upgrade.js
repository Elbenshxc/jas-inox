(()=>{'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const dialog=document.querySelector('#photo-dialog');let opener;
document.querySelectorAll('[data-full]').forEach(button=>button.addEventListener('click',()=>{opener=button;const img=dialog.querySelector('img');img.src=button.dataset.full;img.alt=button.querySelector('img').alt;dialog.querySelector('p').textContent=img.alt;dialog.showModal();}));
if(dialog){dialog.querySelector('.photo-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));}
const top=document.createElement('button');top.className='back-top';top.type='button';top.textContent='↑';top.setAttribute('aria-label','Volver al inicio');document.body.append(top);top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduce?'instant':'smooth'}));
const hero=document.querySelector('.hero-fig'),navs=[...document.querySelectorAll('.bar-mid a')];let scheduled=false;
function frame(){scheduled=false;top.classList.toggle('visible',scrollY>800);if(!reduce&&hero&&scrollY<innerHeight*1.4)hero.style.setProperty('--hero-shift',Math.min(scrollY*.07,60)+'px');}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(frame);}},{passive:true});frame();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navs.forEach(a=>a.classList.toggle('is-active',a.hash==='#'+entry.target.id));}}),{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));
document.querySelectorAll('.process-grid article').forEach((el,i)=>el.style.transitionDelay=(i*70)+'ms');
})();
