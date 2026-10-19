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
const getF=()=>{try{const a=JSON.parse(pref('folders')||'[]');return Array.isArray(a)?a.filter(x=>typeof x==='string'):[]}catch{return[]}};
const setF=a=>pref('folders',JSON.stringify(dd(a)));
const folders=()=>dd([...getF(),...D.filter(s=>s.category).map(s=>s.category)]).sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'}));
function menu(s){const m=T[s.type],b=(t,f,c)=>h('button',{class:'btn mi '+(c||''),onclick:async()=>{hide();await f()}},t);
const meta=[m.l,'Saved '+fd(s.created),s.copies?`Copied ${s.copies}×`:null,s.category?'Folder: '+s.category:null].filter(Boolean).join(' · ');
show([h('h3',{},s.title),h('p',{class:'note'},meta),s.desc?h('p',{class:'note'},s.desc):null,s.tags.length?h('p',{class:'note'},s.tags.map(t=>'#'+t).join(' ')):null,
h('pre',{class:'pre'},s.content.length>600?s.content.slice(0,600)+'…':s.content),
h('div',{class:'mg'},b('Copy',()=>copy(s)),b('Edit',()=>form(s)),b('Duplicate',()=>form({...s,id:null,title:s.title+' (copy)'},{dup:1})),b(s.fav?'Unfavorite':'Favorite',()=>tog(s,'fav')),b(s.pin?'Unpin':'Pin',()=>tog(s,'pin')),b('Move to Trash',()=>trash(s),'dng')),
h('div',{class:'row'},h('button',{class:'btn',onclick:hide},'Close'))])}
function filterSheet(){const live=D.filter(x=>!x.trashed),cnt=k=>live.filter(s=>k==='all'||s.type===k||(k==='fav'&&s.fav)||(k==='pin'&&s.pin)).length;
const ic={all:'grid',fav:'star',pin:'pin'};
show([h('h3',{},'Filter by type'),...Object.entries(FL).map(([k,l])=>h('button',{class:'btn mi fx'+(S.f===k?' on':''),'aria-pressed':String(S.f===k),onclick:()=>{S.f=k;hide();refresh()}},I(ic[k]||T[k].i,18),h('span',{},(S.f===k?'✓ ':'')+l+` (${cnt(k)})`))),h('div',{class:'row'},h('button',{class:'btn',onclick:hide},'Close'))])}
function foldersSheet(){const live=D.filter(x=>!x.trashed),nm=h('input',{placeholder:'New folder name',maxlength:40,'aria-label':'New folder name'});
const exists=(n,but)=>folders().some(f=>f.toLowerCase()===n.toLowerCase()&&f!==but);
const create=()=>{const n=nm.value.trim();if(!n)return toast('Enter a folder name.',1);if(exists(n))return toast('That folder already exists.',1);setF([...getF(),n]);toast('Folder created');refresh();foldersSheet()};
nm.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();create()}};
const row=f=>{const i=h('input',{maxlength:40,'aria-label':'Folder name'});i.value=f;const n=live.filter(s=>s.category===f).length;
return h('div',{class:'frow'},i,h('button',{class:'btn',onclick:()=>{S.cat=f;hide();refresh()}},`Open (${n})`),
h('button',{class:'btn',onclick:async()=>{const v=i.value.trim();if(!v||v===f)return;if(exists(v,f))return toast('That folder already exists.',1);for(const s of D.filter(x=>x.category===f))await save({...s,category:v,updated:Date.now()});setF([...getF().filter(x=>x!==f),v]);if(S.cat===f)S.cat=v;toast('Folder renamed');refresh();foldersSheet()}},'Rename'),
h('button',{class:'btn dng',onclick:async()=>{if(await ask(`Delete folder “${f}”? Its ${D.filter(s=>s.category===f).length} snippet(s) stay in your library with no folder.`,'Delete folder','Cancel',1)){for(const s of D.filter(x=>x.category===f))await save({...s,category:''});setF(getF().filter(x=>x!==f));if(S.cat===f)S.cat='';toast('Folder deleted');refresh();foldersSheet()}}},'Delete'))};
const fs=folders();
show([h('h3',{},'Folders'),h('div',{class:'ln'},nm,h('button',{class:'btn pri',onclick:create},'Create')),fs.length?null:h('p',{class:'note'},'No folders yet. Create one above, then choose it when saving a snippet.'),...fs.map(row),h('div',{class:'row'},S.cat?h('button',{class:'btn',onclick:()=>{S.cat='';hide();refresh()}},'Show all folders'):null,h('button',{class:'btn pri',onclick:hide},'Done'))])}
