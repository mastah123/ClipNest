function settings(){
const y=(dlg.querySelector('.sb')||{}).scrollTop||0;
const seg=(opts,cur,cb)=>h('div',{class:'seg',role:'group'},...opts.map(([v,l])=>h('button',{class:'btn'+(cur===v?' on':''),'aria-pressed':String(cur===v),onclick:()=>{cb(v);settings()}},l)));
const fi=h('input',{type:'file',accept:'.json,application/json',hidden:true,'aria-label':'Choose backup file',onchange:async e=>{const f=e.target.files[0];e.target.value='';if(f)imp(await f.text())}});
const exp=()=>{try{const a=h('a',{href:URL.createObjectURL(new Blob([json()],{type:'application/json'})),download:'clipnest-backup-'+new Date().toISOString().slice(0,10)+'.json'});document.body.append(a);a.click();a.remove();toast('Export started. Check your Downloads.')}catch{toast('Export failed.',1)}};
const card=(...k)=>h('div',{class:'scard'},...k);
show([h('div',{class:'sh'},h('h3',{style:'margin:0'},'Settings'),h('button',{class:'btn pri',onclick:hide},'Done')),h('div',{class:'sb'},
h('h4',{},'Appearance'),card(seg([['system','System'],['light','Light'],['dark','Dark']],pref('mode')||'system',v=>{pref('mode',v);theme()})),
h('h4',{},'Data'),card(h('div',{class:'dg'},h('button',{class:'btn',onclick:exp},I('download',18),'Export'),h('button',{class:'btn',onclick:()=>fi.click()},I('upload',18),'Import'),fi),h('p',{class:'wn'},'Data lives only in this browser. Clearing site data or changing device can erase it, so export regularly.')),
h('h4',{},'About'),card(h('img',{src:'logo.svg',alt:'',width:72,height:72}),h('div',{class:'an'},'ClipNest'),h('span',{class:'av'},'Version '+VER),h('p',{class:'at'},TAG),h('p',{class:'ad'},'A local-first snippet manager for the text you reuse.'),h('div',{class:'bxs'},h('span',{class:'bx'},I('check',14),'On this device'),h('span',{class:'bx'},I('check',14),'No account')))
)],null,'full');{const b=dlg.querySelector('.sb');if(b)b.scrollTop=y}}
