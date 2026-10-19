let tt;function toast(m,bad){const e=$('#toast');e.textContent=m;e.className=bad?'bad':'';e.hidden=false;clearTimeout(tt);tt=setTimeout(()=>e.hidden=true,bad?4000:2000)}
const dlg=$('#dlg'),dlg2=$('#dlg2');
dlg.addEventListener('cancel',e=>{if(dlg.onx){e.preventDefault();dlg.onx()}});
const show=(nodes,onx,cls)=>{dlg.onx=onx||null;dlg.className=cls||'';dlg.replaceChildren(...nodes);if(!dlg.open)dlg.showModal()};
const hide=()=>{dlg.onx=null;dlg.close()};
const ask=(msg,ok,no='Cancel',danger)=>new Promise(r=>{const d=v=>{dlg2.close();r(v)};dlg2.oncancel=e=>{e.preventDefault();d(null)};dlg2.replaceChildren(h('p',{class:'msg'},msg),h('div',{class:'row'},h('button',{class:'btn',onclick:()=>d(false)},no),h('button',{class:'btn pri'+(danger?' dng':''),onclick:()=>d(true)},ok)));dlg2.showModal()});
const fd=t=>new Date(t).toLocaleDateString(undefined,{month:'short',day:'numeric',year:new Date(t).getFullYear()===new Date().getFullYear()?undefined:'numeric'});
function theme(){const m=pref('mode')||'system',r=document.documentElement;r.dataset.theme=m==='dark'||(m==='system'&&matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light';r.dataset.pal=pref('pal')||'cream';const a=pref('accent');if(a){const n=parseInt(a.slice(1),16),l=(.299*(n>>16)+.587*(n>>8&255)+.114*(n&255))/255;r.style.setProperty('--ac',a);r.style.setProperty('--on',l>.6?'#1b1917':'#fff')}else{r.style.removeProperty('--ac');r.style.removeProperty('--on')}}
async function clip(t){try{await navigator.clipboard.writeText(t);return true}catch{}try{const a=h('textarea',{style:'position:fixed;opacity:0'});a.value=t;document.body.append(a);a.select();const r=document.execCommand('copy');a.remove();return r}catch{return false}}
async function copy(s){if(await clip(s.content)){s.copies=(s.copies||0)+1;await save(s);toast('Copied!');renderList()}else{const a=h('textarea',{rows:8,readonly:true,'aria-label':'Snippet content'});a.value=s.content;show([h('h3',{},'Copy manually'),h('p',{class:'msg'},"The browser blocked clipboard access, so nothing was copied. Select the text below and copy it yourself."),a,h('div',{class:'row'},h('button',{class:'btn pri',onclick:hide},'Done'))]);a.focus();a.select()}}
const upd=(s,c)=>save({...s,...c,updated:Date.now()});
const tog=async(s,k)=>{await upd(s,{[k]:!s[k]});refresh()};
async function trash(s){if(await upd(s,{trashed:Date.now()})){toast('Moved to Trash');refresh()}}
async function restore(s){if(await upd(s,{trashed:null})){toast('Restored');refresh()}}
async function purge(s){if(await ask(`Permanently delete “${s.title}”? This cannot be undone.`,'Delete forever','Cancel',1)){if(await remove(s)){toast('Deleted');refresh()}}}
async function emptyTrash(){const t=D.filter(x=>x.trashed);if(t.length&&await ask(`Permanently delete ${t.length} item(s) in Trash? This cannot be undone.`,'Empty Trash','Cancel',1)){for(const s of t)await remove(s);toast('Trash emptied');refresh()}}
function menu(s){const b=(t,f,c)=>h('button',{class:'btn mi '+(c||''),onclick:async()=>{hide();await f()}},t);
show([h('h3',{},s.title),b('Copy',()=>copy(s)),b('Edit',()=>form(s)),b('Duplicate',()=>form({...s,id:null,title:s.title+' (copy)'},{dup:1})),b(s.fav?'Remove from favorites':'Add to favorites',()=>tog(s,'fav')),b(s.pin?'Unpin':'Pin',()=>tog(s,'pin')),b('Move to Trash',()=>trash(s),'dng'),b('Close',()=>{})])}
