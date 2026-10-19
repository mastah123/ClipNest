async function qp(){let t='',n='';try{t=await navigator.clipboard.readText();if(!t.trim())n='The clipboard has no text. Paste or type below.'}catch{n="Couldn't read the clipboard (permission denied or not supported here), so nothing was captured. Paste your text below."}form({content:t},{note:n,qp:1})}
function form(init={},o={}){
const s={type:'text',title:'',content:'',desc:'',category:'',tags:[],...init},edit=!!s.id;let tt=edit||!!init.title,yt=edit||!!init.type,tags=[...s.tags],dirty=false;
const err=h('p',{class:'err',role:'alert'}),hint=h('p',{class:'hint'});
const ti=h('input',{maxlength:200}),co=h('textarea',{rows:6,spellcheck:'false',autocapitalize:'off'}),ty=h('select',{},...Object.entries(T).map(([k,m])=>h('option',{value:k},m.l))),de=h('input',{maxlength:300}),ca=h('input',{list:'cats',maxlength:60}),tg=h('input',{placeholder:'Add tag, press Enter',maxlength:40}),tl=h('div',{id:'tags'});
ti.value=s.title;co.value=s.content;ty.value=s.type;de.value=s.desc||'';ca.value=s.category||'';
const drawTags=()=>tl.replaceChildren(...tags.map(t=>h('span',{class:'tg'},t,h('button',{'aria-label':'Remove tag '+t,onclick:()=>{tags=tags.filter(x=>x!==t);dirty=true;drawTags()}},'×'))));
const addTag=()=>{const n=tg.value.split(',');tg.value='';if(n.some(x=>x.trim())){tags=dd([...tags,...n]);dirty=true;drawTags()}};
tg.onkeydown=e=>{if(e.key==='Enter'||e.key===','){e.preventDefault();addTag()}};
const sync=()=>{const t=co.value,d=detect(t);if(!yt)ty.value=d;if(!tt)ti.value=t.trim()?sugg(t,ty.value):'';hint.textContent=t.trim()&&!edit?`Detected: ${T[d].l}. This is only a suggestion — change type or title any time.`:''};
co.oninput=()=>{dirty=true;sync()};ti.oninput=()=>{tt=true;dirty=true};ty.onchange=()=>{yt=true;dirty=true;if(!tt)ti.value=sugg(co.value,ty.value)};[de,ca].forEach(e=>e.oninput=()=>dirty=true);
drawTags();if(!edit)sync();
const mb=h('button',{class:'btn',style:'margin-right:auto',onclick:()=>{co.value='';ti.value='';tt=false;yt=false;dirty=false;ty.value='text';hint.textContent='';mb.hidden=true;co.focus()}},'Write manually');
const cancel=async()=>{if(dirty&&(co.value||ti.value)){if(!await ask('Discard your unsaved changes?','Discard','Keep editing',1))return}hide()};
const doSave=async()=>{addTag();const c=co.value,t=ti.value.trim();
if(!c.trim()){err.textContent='Content is required.';co.focus();return}if(!t){err.textContent='Title is required.';ti.focus();return}
if(!edit&&!o.dup){const d=D.find(x=>!x.trashed&&x.content===c);if(d){const r=await ask(`This exact content is already saved as “${d.title}”. Open the existing snippet instead?`,'Open existing','Save anyway');if(r===null)return;if(r){hide();form(d);return}}}
const n=Date.now(),obj=edit?{...s}:{id:uid(),created:n,fav:false,pin:false,copies:0,trashed:null};
Object.assign(obj,{title:t,content:c,type:ty.value,desc:de.value.trim(),category:ca.value.trim(),tags,updated:n});
if(await save(obj)){hide();toast(edit?'Changes saved':'Snippet saved');refresh()}};
const fl=(l,e)=>h('label',{class:'f'},h('span',{},l),e);
show([h('h3',{},edit?'Edit snippet':o.dup?'Duplicate snippet':'New snippet'),o.note&&h('p',{class:'note'},o.note),fl('Content',co),hint,fl('Title',ti),fl('Type',ty),fl('Description (optional)',de),fl('Category (optional)',ca),fl('Tags',tg),tl,err,h('div',{class:'row'},o.qp&&s.content?mb:null,h('button',{class:'btn',onclick:cancel},'Cancel'),h('button',{class:'btn pri',onclick:doSave},'Save'))],cancel);
(o.note&&!co.value?co:ti).focus()}
