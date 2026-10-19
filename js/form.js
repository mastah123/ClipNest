const pasteName=()=>{const u=new Set(D.map(s=>s.title.trim().toLowerCase()));let i=1;while(u.has('paste-'+i))i++;return 'paste-'+i};
async function qp(){let t;try{t=await navigator.clipboard.readText()}catch{return form({title:pasteName()},{note:"Couldn't read the clipboard (permission denied or not supported here), so nothing was saved. Paste your text below.",qp:1})}
if(!t||!t.trim())return form({title:pasteName()},{note:'The clipboard has no text, so nothing was saved. Paste or type below.',qp:1});
const d=D.find(x=>!x.trashed&&x.content===t);if(d){const r=await ask(`This exact content is already saved as “${d.title}”. Open the existing snippet instead?`,'Open existing','Save anyway');if(r===null)return;if(r)return form(d)}
const type=detect(t),n=Date.now(),o={id:uid(),title:pasteName(),content:t,type,desc:'',category:'',created:n,updated:n,fav:false,pin:false,copies:0,trashed:null};
if(await save(o)){toast(`Saved as ${o.title} (${T[type].l})`);refresh()}}
function form(init={},o={}){
const s={type:'text',title:'',content:'',desc:'',category:'',...init},edit=!!s.id;let tt=edit||!!init.title,yt=edit||!!init.type,dirty=false;
const err=h('p',{class:'err',role:'alert'});
const ti=h('input',{maxlength:200}),co=h('textarea',{class:'ct',rows:8,spellcheck:'false',autocapitalize:'off'}),ty=h('select',{},...Object.entries(T).map(([k,m])=>h('option',{value:k},m.l))),de=h('input',{maxlength:300}),ca=h('input',{list:'cats',maxlength:60});
ti.value=s.title;co.value=s.content;ty.value=s.type;de.value=s.desc||'';ca.value=s.category||'';
const sync=()=>{const t=co.value,d=detect(t);if(!yt)ty.value=d;if(!tt)ti.value=t.trim()?sugg(t,ty.value):'';};
co.oninput=()=>{dirty=true;sync()};ti.oninput=()=>{tt=true;dirty=true};ty.onchange=()=>{yt=true;dirty=true;if(!tt)ti.value=sugg(co.value,ty.value)};[de,ca].forEach(e=>e.oninput=()=>dirty=true);
if(!edit)sync();
const mb=h('button',{class:'btn',onclick:()=>{co.value='';ti.value='';tt=false;yt=false;dirty=false;ty.value='text';mb.hidden=true;co.focus()}},'Write manually');
const cancel=async()=>{if(dirty&&(co.value||ti.value)){if(!await ask('Discard your unsaved changes?','Discard','Keep editing',1))return}hide()};
const doSave=async()=>{const c=co.value,t=ti.value.trim();
if(!c.trim()){err.textContent='Content is required.';co.focus();return}if(!t){err.textContent='Title is required.';ti.focus();return}
if(!edit&&!o.dup){const d=D.find(x=>!x.trashed&&x.content===c);if(d){const r=await ask(`This exact content is already saved as “${d.title}”. Open the existing snippet instead?`,'Open existing','Save anyway');if(r===null)return;if(r){hide();form(d);return}}}
const n=Date.now(),obj=edit?{...s}:{id:uid(),created:n,fav:false,pin:false,copies:0,trashed:null};
Object.assign(obj,{title:t,content:c,type:ty.value,desc:de.value.trim(),category:ca.value.trim(),updated:n});
if(await save(obj)){hide();toast(edit?'Changes saved':'Snippet saved');refresh()}};
const fl=(l,e)=>h('label',{class:'f'},h('span',{},l),e);
show([h('div',{class:'sh'},h('h3',{style:'margin:0'},edit?'Edit snippet':o.dup?'Duplicate snippet':'New snippet')),
h('div',{class:'sb'},o.note?h('p',{class:'note'},o.note):null,o.qp&&s.content?mb:null,fl('Content',co),fl('Title',ti),fl('Type',ty),fl('Description',de),fl('Folder',ca)),
h('div',{class:'sf'},err,h('div',{class:'row'},h('button',{class:'btn',onclick:cancel},'Cancel'),h('button',{class:'btn pri',onclick:doSave},'Save')))],cancel,'full');
(o.note&&!co.value?co:ti).focus()}
