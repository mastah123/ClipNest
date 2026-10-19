const SORT={new:(a,b)=>b.created-a.created,old:(a,b)=>a.created-b.created,az:(a,b)=>a.title.localeCompare(b.title,undefined,{sensitivity:'base'}),upd:(a,b)=>b.updated-a.updated,used:(a,b)=>(b.copies||0)-(a.copies||0)||b.created-a.created};
function vis(){const q=S.q.trim().toLowerCase();let a=D.filter(s=>!!s.trashed===S.trash);if(S.trash)return a.sort((x,y)=>y.trashed-x.trashed);
a=a.filter(s=>(S.f==='all'||S.f===s.type||(S.f==='fav'&&s.fav)||(S.f==='pin'&&s.pin))&&(!S.cat||s.category===S.cat)&&(!S.tag||s.tags.some(t=>t.toLowerCase()===S.tag.toLowerCase()))&&(!q||[s.title,s.content,s.desc||'',...s.tags].join('\n').toLowerCase().includes(q)));return a.sort(SORT[S.sort])}
const ib=(l,v,i,f)=>h('button',{class:'ib',title:l,'aria-label':l,'aria-pressed':v==null?null:String(!!v),onclick:f},I(i));
function card(s){const m=T[s.type],tr=!!s.trashed;
return h('article',{class:'cd',style:'--tc:'+m.c},
h('div',{class:'tp'},h('span',{class:'tile'},I(m.i)),h('span',{class:'sp'}),!tr&&ib('Favorite',s.fav,'star',()=>tog(s,'fav')),!tr&&ib('Pin',s.pin,'pin',()=>tog(s,'pin')),!tr&&ib('Copy “'+s.title+'”',null,'copy',()=>copy(s))),
h('h3',{},s.title),h('p',{class:'pv'},s.content.slice(0,160)),s.desc?h('p',{class:'ds'},s.desc):null,
(s.category||s.tags.length)?h('div',{class:'tgs'},s.category?h('span',{class:'tg cat'},s.category):null,...s.tags.slice(0,3).map(t=>h('span',{class:'tg'},'#'+t))):null,
h('div',{class:'mt'},h('span',{},m.l+' · '+fd(s.created)),tr?h('span',{class:'ra'},h('button',{class:'btn',onclick:()=>restore(s)},'Restore'),h('button',{class:'btn dng',onclick:()=>purge(s)},'Delete')):ib('More options for “'+s.title+'”',null,'more',()=>menu(s))))}
function renderList(){const L=$('#list');L.className=S.view;L.replaceChildren();const a=vis();$('#qc').hidden=!S.q;$('#sBtn').classList.toggle('act',!!S.q);$('#sBtn').setAttribute('aria-label',S.q?'Search (a search is active)':'Search');
{const g=S.view==='grid',v=$('#vT');v.replaceChildren(I(g?'grid':'list',24));v.setAttribute('aria-label',g?'Grid view. Switch to list view':'List view. Switch to grid view')}
if(!a.length){const live=D.filter(x=>!x.trashed).length;L.append(h('div',{class:'empty'},S.trash?'Trash is empty.':!live?'Nothing saved yet. Tap Paste to add your first snippet (you can also write one manually there).':'No snippets match. Try a different search or filter.',(!S.trash&&live)?h('p',{},h('button',{class:'btn',onclick:()=>{S.q='';S.f='all';S.cat='';S.tag='';$('#q').value='';refresh()}},'Clear search and filters')):null));return}
const pins=(!S.trash&&S.f!=='pin')?a.filter(s=>s.pin):[],rest=pins.length?a.filter(s=>!s.pin):a;
if(pins.length){L.append(h('h3',{class:'gh'},'Pinned'),...pins.map(card));if(rest.length)L.append(h('h3',{class:'gh'},'Everything else'))}L.append(...rest.map(card))}
function renderChips(){const c=$('#chips'),x=c.scrollLeft;c.hidden=S.trash;c.replaceChildren(...[['all','All'],['url','URL'],['code','Code'],['command','Command'],['prompt','Prompt'],['email','Email'],['text','Text'],['fav','Favorites'],['pin','Pinned']].map(([k,l])=>h('button',{class:'chip'+(S.f===k?' on':''),'aria-pressed':String(S.f===k),onclick:()=>{S.f=k;refresh()}},l)));c.scrollLeft=x}
function renderCtl(){const c=$('#ctl'),live=D.filter(x=>!x.trashed),nt=D.length-live.length;
$('#lt').textContent=S.trash?'Trash':'Your library';$('#bSort').hidden=S.trash;
const cats=[...new Set(live.map(s=>s.category).filter(Boolean))].sort(),tags=dd(live.flatMap(s=>s.tags)).sort();
$('#cats').replaceChildren(...cats.map(x=>h('option',{value:x})));
if(S.trash){c.replaceChildren(h('button',{class:'btn',onclick:()=>{S.trash=false;refresh()}},'← Library'),h('button',{class:'btn dng',onclick:emptyTrash},'Empty Trash'),h('p',{class:'note'},'Items stay here until you delete them permanently.'));return}
const sel=(l,v,opts,f)=>{const e=h('select',{'aria-label':l,onchange:()=>f(e.value)},...opts.map(([k,t])=>h('option',{value:k},t)));e.value=v;return e};
c.replaceChildren(
cats.length?sel('Category',S.cat,[['','All categories'],...cats.map(x=>[x,x])],v=>{S.cat=v;renderList()}):null,
tags.length?sel('Tag',S.tag,[['','All tags'],...tags.map(x=>[x,'#'+x])],v=>{S.tag=v;renderList()}):null,
h('button',{class:'btn',style:'min-height:40px;padding:6px 14px;font-size:14px',onclick:()=>{S.trash=true;refresh()}},'Trash'+(nt?` (${nt})`:'')))}
const refresh=()=>{renderChips();renderCtl();renderList()};

function sortSheet(){const o=[['new','Newest'],['old','Oldest'],['az','A–Z'],['upd','Recently updated'],['used','Most copied']];show([h('h3',{},'Sort by'),...o.map(([k,l])=>h('button',{class:'btn mi'+(S.sort===k?' on':''),'aria-pressed':String(S.sort===k),onclick:()=>{S.sort=k;hide();renderList()}},(S.sort===k?'✓ ':'')+l)),h('div',{class:'row'},h('button',{class:'btn',onclick:hide},'Close'))])}
