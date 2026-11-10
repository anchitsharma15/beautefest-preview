const products=[
{id:'lip',name:'Swiss Beauty Pure Lustre',category:'Makeup',label:'LIP COLOUR',description:'Discover your next signature lip.',detail:'Swiss Beauty Pure Lustre lip colours, photographed at Beauté Fest. Ask our team about current shades, availability and prices.',image:'makeup-products.jpg',alt:'Swiss Beauty Pure Lustre lipstick display at Beauté Fest'},
{id:'skin',name:'Skincare essentials',category:'Skincare',label:'SKINCARE',description:'Cleansers, serums and moisturizers.',detail:'Explore the skincare selection at Beauté Fest, including cleansers, serums and moisturizers. Share the product or brand you’re looking for and our team will confirm what is currently available.',image:'skincare-products.jpg',alt:'Skincare selection shared by Beauté Fest'},
{id:'fragrance',name:'The fragrance edit',category:'Fragrances',label:'FRAGRANCES',description:'Find a scent that feels like you.',detail:'Explore everyday scents and occasion fragrances at Beauté Fest. Message us with your preferred product or scent to confirm the current range and pricing.',image:'fragrance-products.jpg',alt:'Fragrance selection shared by Beauté Fest'}
];
const list=document.querySelector('#products');
let currentFilter='All';
const search=document.querySelector('#beauty-search');
const sort=document.querySelector('#product-sort');
const searchTerms={lip:'lip lipstick lips swiss beauty pure lustre colour makeup cosmetics',skin:'skin skincare serum cleanser moisturiser moisturizer face care daily ritual',fragrance:'fragrance fragrances perfume perfumes scent scents body spray'};
function whatsapp(p){return 'https://wa.me/919914193973?text='+encodeURIComponent('Hi Beauté Fest! I’m interested in '+p.name+' ('+p.label.toLowerCase()+'). Could you share available products, shades and prices?');}
function matchesCategory(p,filter){return filter==='All'||p.category===filter||(filter==='Lips'&&p.id==='lip');}
function render(){
 const query=search.value.trim().toLowerCase();
 let visible=products.filter(p=>matchesCategory(p,currentFilter)&&(!query||query.split(/\s+/).every(word=>(p.name+' '+p.description+' '+searchTerms[p.id]).toLowerCase().includes(word))));
 if(sort.value==='az')visible.sort((a,b)=>a.name.localeCompare(b.name));
 if(sort.value==='za')visible.sort((a,b)=>b.name.localeCompare(a.name));
 list.innerHTML=visible.map(p=>`<article class="product"><button class="product-picture" data-product="${p.id}" aria-label="View ${p.label.toLowerCase()} details"><img class="product-real-photo" src="assets/${p.image}" alt="${p.alt}" loading="lazy"><span class="badge">FROM OUR STORE</span><span class="product-plus">Quick view +</span></button><p class="product-category">BEAUTÉ FEST · ${p.label}</p><h3>${p.name}</h3><p class="product-description">${p.description}</p><p class="product-price">Ask for price <small>On WhatsApp</small></p><a class="product-enquire" href="${whatsapp(p)}" target="_blank" rel="noopener">Enquire on WhatsApp <span>↗</span></a></article>`).join('');
 document.querySelector('#result-count').textContent=visible.length+' beauty '+(visible.length===1?'discovery':'discoveries')+(query?' for “'+search.value.trim()+'”':'');
 document.querySelector('#empty-state').hidden=visible.length>0;
 document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b.dataset.filter===currentFilter;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',selected);});
 document.querySelectorAll('nav [data-nav-filter]').forEach(a=>a.classList.toggle('active',a.dataset.navFilter===currentFilter));
}
function selectCategory(filter){currentFilter=filter;search.value='';render();}
render();
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>selectCategory(b.dataset.filter)));
document.querySelectorAll('[data-nav-filter]').forEach(a=>a.addEventListener('click',()=>selectCategory(a.dataset.navFilter)));
search.addEventListener('input',()=>{currentFilter='All';render();});
document.querySelector('.search').addEventListener('submit',e=>{e.preventDefault();render();document.querySelector('#collection').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
sort.addEventListener('change',render);
document.querySelector('#reset-search').addEventListener('click',()=>{sort.value='featured';selectCategory('All');search.focus();});
const dialog=document.querySelector('#product-dialog');
list.addEventListener('click',e=>{const button=e.target.closest('[data-product]');if(!button)return;const p=products.find(p=>p.id===button.dataset.product);document.querySelector('#detail-name').textContent=p.name;document.querySelector('#detail-category').textContent=p.label;document.querySelector('#detail-description').textContent=p.detail;document.querySelector('#detail-whatsapp').href=whatsapp(p);document.querySelector('#detail-image').src='assets/'+p.image;document.querySelector('#detail-image').alt=p.alt;dialog.showModal();document.body.style.overflow='hidden';});
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.style.overflow='');
dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
const toggle=document.querySelector('.menu-toggle');
function setMenu(open){toggle.setAttribute('aria-expanded',open);toggle.setAttribute('aria-label',open?'Close menu':'Open menu');document.querySelector('nav').classList.toggle('open',open);toggle.textContent=open?'×':'☰';}
toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.querySelector('#year').textContent=new Date().getFullYear();
