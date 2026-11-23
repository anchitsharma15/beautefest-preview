const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu(){menu?.setAttribute('aria-expanded','false');nav?.classList.remove('open');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const videos = [...document.querySelectorAll('[data-motion]')];
videos.forEach(panel=>{
 const video=panel.querySelector('video'), button=panel.querySelector('button');
 let manuallyPaused=false;
 function load(){if(!video.getAttribute('src'))video.src=video.dataset.videoSrc;}
 function sync(){button.textContent=video.paused?'Play video':'Pause video';button.setAttribute('aria-label',video.paused?'Play background video':'Pause background video');}
 function play(){load();video.muted=true;video.play().catch(()=>sync());}
 button.addEventListener('click',()=>{if(video.paused){manuallyPaused=false;play();}else{manuallyPaused=true;video.pause();}});
 video.addEventListener('play',sync);video.addEventListener('pause',sync);
 video.addEventListener('error',()=>{panel.classList.add('error');button.hidden=true;});
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting&&!document.hidden&&!reduced.matches&&!navigator.connection?.saveData&&!manuallyPaused)play();else video.pause();});},{threshold:.15});
 observer.observe(panel);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(!reduced.matches&&!manuallyPaused&&panel.getBoundingClientRect().bottom>0&&panel.getBoundingClientRect().top<innerHeight)play();});
 reduced.addEventListener('change',()=>{if(reduced.matches)video.pause();});
});
const search=document.querySelector('#collection-search');
search?.addEventListener('input',()=>{const term=search.value.trim().toLowerCase();let count=0;document.querySelectorAll('[data-search]').forEach(card=>{const match=card.dataset.search.includes(term);card.hidden=!match;if(match)count++;});document.querySelector('#collection-empty').hidden=count>0;});
const form=document.querySelector('#enquiry-form');
if(form){
 const category=document.querySelector('#enquiry-category'), fields=document.querySelector('.occasion-fields'), date=document.querySelector('#enquiry-date'), review=document.querySelector('#enquiry-review');
 const requested=new URLSearchParams(location.search).get('service');
 if(requested){const option=[...category.options].find(o=>o.value===requested);if(option)category.value=requested;else if(/makeup/i.test(requested))category.value='Makeup consultation';}
 function update(){const makeup=/makeup|consultation/i.test(category.value)&&category.value!=='Makeup & cosmetics';fields.hidden=!makeup;fields.querySelectorAll('input').forEach(input=>input.disabled=!makeup);review.hidden=true;}
 const today=new Date();date.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
 category.addEventListener('change',update);form.addEventListener('input',()=>review.hidden=true);update();
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const lines=['Hello Beauté Fest!'];const name=document.querySelector('#enquiry-name').value.trim();if(name)lines.push('My name is '+name+'.');
  lines.push('I would like to enquire about: '+category.value+'.');
  if(!fields.hidden&&date.value)lines.push('Occasion date: '+new Date(date.value+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}));
  const venue=document.querySelector('#enquiry-location').value.trim();if(!fields.hidden&&venue)lines.push('Venue / getting-ready location: '+venue);
  const details=document.querySelector('#enquiry-details').value.trim();if(details)lines.push(details);
  lines.push(fields.hidden?'Please confirm availability and prices. Thank you!':'Please confirm availability, prices and package inclusions. Thank you!');
  const message=lines.join('\n\n');document.querySelector('#enquiry-message').textContent=message;document.querySelector('#enquiry-send').href='https://wa.me/919914193973?text='+encodeURIComponent(message);review.hidden=false;review.scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'nearest'});
 });
}
