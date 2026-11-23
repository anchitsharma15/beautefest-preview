// Instagram is contacted only after the visitor chooses to load a video.
document.querySelectorAll('[data-load-reel]').forEach(button=>button.addEventListener('click',()=>{
 const panel=button.closest('[data-reel]');
 const code=panel.dataset.reel;
 if(!/^[A-Za-z0-9_-]+$/.test(code))return;
 const frame=document.createElement('iframe');
 frame.src='https://www.instagram.com/reel/'+code+'/embed/';
 frame.title='Instagram video from BeauteFest';
 frame.loading='lazy'; frame.allow='autoplay; encrypted-media; fullscreen; picture-in-picture';
 frame.referrerPolicy='strict-origin-when-cross-origin';
 panel.replaceChildren(frame);
}));
const makeupForm=document.querySelector('#makeup-form');
const makeupChoice=document.querySelector('#makeup-option');
const makeupDate=document.querySelector('#makeup-date');
const makeupReview=document.querySelector('#makeup-review');
if(makeupDate){const today=new Date();makeupDate.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');}
document.querySelectorAll('[data-package]').forEach(link=>link.addEventListener('click',()=>{makeupChoice.value=link.dataset.package;makeupReview.hidden=true;}));
makeupForm?.addEventListener('input',()=>{makeupReview.hidden=true;});
makeupForm?.addEventListener('submit',event=>{
 event.preventDefault();if(!makeupForm.reportValidity())return;
 const parts=['Hello BeauteFest!','I would like to enquire about: '+makeupChoice.value+'.'];
 if(makeupDate.value)parts.push('Occasion date: '+new Date(makeupDate.value+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})+'.');
 const location=document.querySelector('#makeup-location').value.trim();
 const detail=document.querySelector('#makeup-details').value.trim();
 if(location)parts.push('Getting-ready location: '+location);
 if(detail)parts.push(detail);
 parts.push('Please confirm availability, the price and package inclusions, including whether hairstyling, draping, lashes, a trial, travel or touch-ups are included. Thank you!');
 const message=parts.join('\n\n');document.querySelector('#makeup-preview').textContent=message;
 document.querySelector('#makeup-whatsapp').href='https://wa.me/919914193973?text='+encodeURIComponent(message);
 makeupReview.hidden=false;makeupReview.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
});
