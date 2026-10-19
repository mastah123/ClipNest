const SORT={new:(a,b)=>b.created-a.created,old:(a,b)=>a.created-b.created,az:(a,b)=>a.title.localeCompare(b.title,undefined,{sensitivity:'base'}),upd:(a,b)=>b.updated-a.updated,used:(a,b)=>(b.copies||0)-(a.copies||0)||b.created-a.created};
function vis(){const q=S.q.trim().toLowerCase();let a=D.filter(s=>!!s.trashed===S.trash);if(S.trash)return a.sort((x,y)=>y.trashed-x.trashed);
a=a.filter(s=>(S.f==='all'||S.f===s.type||(S.f==='fav'&&s.fav)||(S.f==='pin'&&s.pin))&&(!S.cat||s.category===S.cat)&&(!q||[s.title,s.content,s.desc||'',].join('\n').toLowerCase().includes(q)));return a.sort(SORT[S.sort])}
const FL={all:'All',url:'URL',code:'Code',command:'Command',prompt:'Prompt',email:'Email',text:'Text',fav:'Favorites',pin:'Pinned'};
function card(s){const m=T[s.type],tr=!!s.trashed,st=s.type==='url'?s.content.trim():m.l;
const bg=(s.fav||s.pin)?h('span',{class:'bg'},s.fav?h('span',{},I('star',13),h('span',{class:'so'},'Favorite')):null,s.pin?h('span',{},I('pin',13),h('span',{class:'so'},'Pinned')):null):null;
const body=[h('span',{class:'tile'},I(m.i,22)),h('span',{class:'tx'},h('span',{class:'tt'},s.title),h('span',{class:'ss'},st),bg)];
const main=tr?h('div',{class:'cm'},...body):h('button',{class:'cm',title:'Tap to copy','aria-label':'Copy “'+s.title+'”',onclick:()=>copy(s)},...body);
return h('article',{class:'cd'+(tr?' tr':''),style:'--tc:'+m.c},main,tr?h('div',{class:'ra'},h('button',{class:'btn',onclick:()=>restore(s)},'Restore'),h('button',{class:'btn dng',onclick:()=>purge(s)},'Delete forever')):h('button',{class:'ib ch','aria-label':'Details and options for “'+s.title+'”',onclick:()=>menu(s)},I('chev',18)))}
function renderList(){const L=$('#list');L.className=S.view;L.replaceChildren();const a=vis();$('#qc').hidden=!S.q;$('#sBtn').classList.toggle('act',!!S.q);$('#sBtn').setAttribute('aria-label',S.q?'Search (a search is active)':'Search');
{const g=S.view==='grid',v=$('#vT');v.replaceChildren(I(g?'grid':'list',24));v.setAttribute('aria-label',g?'Grid view. Switch to list view':'List view. Switch to grid view')}
if(!a.length){const live=D.filter(x=>!x.trashed).length;L.append(h('div',{class:'empty'},S.trash?'Trash is empty.':!live?'Nothing saved yet. Tap Paste to add your first snippet (you can also write one manually there).':'No snippets match. Try a different search or filter.',(!S.trash&&live)?h('p',{},h('button',{class:'btn',onclick:()=>{S.q='';S.f='all';S.cat='';$('#q').value='';refresh()}},'Clear search and filters')):null));return}
const pins=(!S.trash&&S.f!=='pin')?a.filter(s=>s.pin):[],rest=pins.length?a.filter(s=>!s.pin):a;
if(pins.length){L.append(h('h3',{class:'gh'},'Pinned'),...pins.map(card));if(rest.length)L.append(h('h3',{class:'gh'},'Everything else'))}L.append(...rest.map(card))}
function renderChips(){const live=D.filter(s=>!s.trashed),cnt=k=>live.filter(s=>k==='all'||s.type===k||(k==='fav'&&s.fav)||(k==='pin'&&s.pin)).length,ico={all:'grid',fav:'star',pin:'pin'};
$('#nTypes').replaceChildren(...[['all','All'],['pin','Pinned'],['fav','Favorites'],['url','URL'],['code','Code'],['command','Command'],['prompt','Prompt'],['email','Email'],['text','Text']].map(([k,l])=>{const on=!S.trash&&S.f===k;return h('button',{class:'ni'+(on?' on':''),'aria-current':on?'true':null,onclick:()=>{S.f=k;S.trash=false;closeNav();refresh()}},I(ico[k]||T[k].i,20),h('span',{},l),h('span',{class:'n'},String(cnt(k))))}));
const fs=folders(),PAL=['#3F5D83','#3d7f8f','#5a6fa8','#7b66a8','#4a86b8','#6b7f99'];
$('#nFold').replaceChildren(...(fs.length?fs.map(f=>{const sel=!S.trash&&S.cat===f,n=live.filter(s=>s.category===f).length,k=[...f].reduce((a,ch)=>a+ch.charCodeAt(0),0)%PAL.length;
return h('button',{class:'ni'+(sel?' on':''),style:'--tc:'+PAL[k],'aria-pressed':String(sel),onclick:()=>{S.cat=sel?'':f;S.trash=false;closeNav();refresh()}},h('span',{class:'fi sm'},I('folder',16)),h('span',{},f),h('span',{class:'n'},String(n)))}):[h('p',{class:'note',style:'padding:6px 14px'},'No folders yet. Tap Show all to create one.')]));
const t=$('#nTrash');t.replaceChildren(I('trash',20),h('span',{},'Trash'),h('span',{class:'n'},String(D.length-live.length)));t.className='ni'+(S.trash?' on':'');
const ch=[];if(!S.trash){if(S.f!=='all')ch.push([FL[S.f],()=>{S.f='all'}]);if(S.cat)ch.push(['Folder: '+S.cat,()=>{S.cat=''}])}
const af=$('#af');af.hidden=!ch.length;af.replaceChildren(...ch.map(([t,f])=>h('button',{class:'afc','aria-label':'Clear filter '+t,onclick:()=>{f();refresh()}},t,I('x',14))))}
function renderCtl(){const c=$('#ctl'),live=D.filter(x=>!x.trashed),nt=D.length-live.length;
$('#lt').hidden=!S.trash;$('#bSort').hidden=S.trash;
const cats=[...new Set(live.map(s=>s.category).filter(Boolean))].sort();
$('#cats').replaceChildren(...folders().map(x=>h('option',{value:x})));
if(S.trash){c.hidden=false;c.replaceChildren(h('button',{class:'btn',onclick:()=>{S.trash=false;refresh()}},'← Library'),h('button',{class:'btn dng',onclick:emptyTrash},'Empty Trash'),h('p',{class:'note'},'Items stay here until you delete them permanently.'));return}
const sel=(l,v,opts,f)=>{const e=h('select',{'aria-label':l,onchange:()=>f(e.value)},...opts.map(([k,t])=>h('option',{value:k},t)));e.value=v;return e};
c.replaceChildren();c.hidden=true}
const refresh=()=>{renderChips();renderCtl();renderList()};

function sortSheet(){const o=[['new','Newest'],['old','Oldest'],['az','A–Z'],['upd','Recently updated'],['used','Most copied']];show([h('h3',{},'Sort by'),...o.map(([k,l])=>h('button',{class:'btn mi'+(S.sort===k?' on':''),'aria-pressed':String(S.sort===k),onclick:()=>{S.sort=k;pref('sort',k);hide();renderList()}},(S.sort===k?'✓ ':'')+l)),h('div',{class:'row'},h('button',{class:'btn',onclick:hide},'Close'))])}
