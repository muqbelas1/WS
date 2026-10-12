(function(){
var root=document.getElementById('amq-cv-root');
if(!root)return;
var nav=document.getElementById('amq-nav'),burger=document.getElementById('amq-burger'),drawer=document.getElementById('amq-drawer'),overlay=document.getElementById('amq-overlay');
function setMenu(open){
burger.classList.toggle('amq-open',open);
drawer.classList.toggle('amq-show',open);
overlay.classList.toggle('amq-show',open);
burger.setAttribute('aria-expanded',open?'true':'false');
drawer.setAttribute('aria-hidden',open?'false':'true');
burger.setAttribute('aria-label',open?'Close menu':'Open menu');
}
burger.addEventListener('click',function(){setMenu(!drawer.classList.contains('amq-show'))});
overlay.addEventListener('click',function(){setMenu(false)});
drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
window.addEventListener('resize',function(){if(window.innerWidth>860)setMenu(false)});
function onScroll(){nav.classList.toggle('amq-scrolled',window.scrollY>10)}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
var els=root.querySelectorAll('.amq-rv');
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('amq-in');io.unobserve(x.target)}})},{threshold:.12});
els.forEach(function(el,i){el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
}else{els.forEach(function(el){el.classList.add('amq-in')})}
function count(el){
var to=parseFloat(el.getAttribute('data-amq-count')),dec=parseInt(el.getAttribute('data-amq-dec')||'0',10),t0=null,d=1600;
function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/d,1),e=1-Math.pow(1-p,3);el.textContent=(to*e).toFixed(dec);if(p<1)requestAnimationFrame(step)}
requestAnimationFrame(step);
}
var co=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){count(x.target);co.unobserve(x.target)}})},{threshold:.6});
root.querySelectorAll('[data-amq-count]').forEach(function(el){co.observe(el)});
var roles=['Senior IT Operations & Planning Specialist','Infrastructure & Systems','IT Service Delivery'],ri=0,ci=0,del=false,out=document.getElementById('amq-type');
function type(){
var w=roles[ri];
out.textContent=w.slice(0,ci);
if(!del&&ci<w.length){ci++;setTimeout(type,55)}
else if(!del){del=true;setTimeout(type,1800)}
else if(ci>0){ci--;setTimeout(type,28)}
else{del=false;ri=(ri+1)%roles.length;setTimeout(type,300)}
}
type();
var secs=['amq-home','amq-skills','amq-experience','amq-projects','amq-education'].map(function(id){return document.getElementById(id)});
var links=root.querySelectorAll('a.amq-link');
var so=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){links.forEach(function(l){l.classList.toggle('amq-active',l.getAttribute('href')==='#'+x.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(function(s){if(s)so.observe(s)});
})();
