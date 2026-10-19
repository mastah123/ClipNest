$('#logo').append(I('clip',30));$('#sIc').append(I('search'));$('#qc').append(I('x'));$('#sBtn').append(I('search',22));$('#pIc').append(I('paste'));$('#bSet').append(I('sliders',26));$('#bAdd').append(I('plus',24));$('#vG').append(I('grid',24));$('#vL').append(I('list',24));
$('#q').oninput=e=>{S.q=e.target.value;renderList()};
$('#qc').onclick=()=>{S.q='';$('#q').value='';renderList();$('#q').focus()};
$('#bQP').onclick=qp;$('#bAdd').onclick=()=>form();$('#bSet').onclick=settings;
$('#vG').onclick=()=>{S.view='grid';pref('view','grid');renderList()};$('#vL').onclick=()=>{S.view='list';pref('view','list');renderList()};
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',theme);
(async()=>{theme();try{db=await openDB();D=await tx('readonly',o=>o.getAll())}catch{mem=true;$('#warn').hidden=false}refresh()})();

/* v1.0.1 - search toggle + fixed header height */
$('#sBtn').onclick=()=>{const o=$('#sr').classList.toggle('open');$('#sBtn').setAttribute('aria-expanded',String(o));if(o)$('#q').focus()};
{const hd=$('#hd'),f=()=>document.documentElement.style.setProperty('--hd-h',hd.offsetHeight+'px');f();new ResizeObserver(f).observe(hd)}
