const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
let activeCategory='all';
const search=document.querySelector('#product-search');
function filterProducts(){const query=search.value.trim().toLocaleLowerCase();let visible=0;document.querySelectorAll('[data-product-category]').forEach(card=>{const categoryMatch=activeCategory==='all'||card.dataset.productCategory===activeCategory;const queryMatch=!query||card.dataset.search.toLocaleLowerCase().includes(query);card.hidden=!(categoryMatch&&queryMatch);if(!card.hidden)visible++;});document.querySelector('#empty-products').hidden=visible!==0;document.querySelector('#product-count').textContent=visible+' beauty '+(visible===1?'category':'categories');}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{activeCategory=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button));});filterProducts();}));
search?.addEventListener('input',filterProducts);
document.querySelector('#reset-products')?.addEventListener('click',()=>{search.value='';activeCategory='all';document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter==='all';button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});filterProducts();});
const form=document.querySelector('#enquiry-form');
const category=document.querySelector('#service');
const dateInput=document.querySelector('#occasion-date');
const review=document.querySelector('#enquiry-review');
function syncEnquiry(){const isService=category.value==='Makeup service';document.querySelector('#service-date-field').hidden=!isService;dateInput.disabled=!isService;review.hidden=true;}
category?.addEventListener('change',syncEnquiry);
document.querySelectorAll('[data-enquiry]').forEach(link=>link.addEventListener('click',()=>{category.value=link.dataset.enquiry;const message=document.querySelector('#enquiry-message');message.value=link.dataset.product||'';syncEnquiry();}));
if(dateInput){const now=new Date();dateInput.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;}
form?.addEventListener('input',()=>{review.hidden=true;});
form?.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const selected=category.value;const name=document.querySelector('#enquiry-name').value.trim();const message=document.querySelector('#enquiry-message').value.trim();const isService=selected==='Makeup service';const parts=[`Hello BeauteFest!${name?' I’m '+name+'.':''}`,`I’d like to enquire about: ${selected}.`];if(isService&&dateInput.value){const date=new Date(dateInput.value+'T12:00:00');parts.push('Occasion date: '+date.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})+'.');}if(message)parts.push(message);parts.push(isService?'Please share availability and the next steps. Thank you!':'Please share current product availability, pricing and the next steps. Thank you!');const text=parts.join('\n\n');document.querySelector('#enquiry-preview').textContent=text;document.querySelector('#whatsapp-send').href='https://wa.me/919914193973?text='+encodeURIComponent(text);review.hidden=false;review.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});});
