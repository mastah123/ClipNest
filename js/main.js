$('#sIc').append(I('search'));$('#qc').append(I('x'));$('#sBtn').append(I('search',22));$('#pIc').append(I('paste'));$('#bSort').append(I('sort',24));
$('#q').oninput=e=>{S.q=e.target.value;renderList()};
$('#qc').onclick=()=>{S.q='';$('#q').value='';renderList();$('#q').focus()};
$('#bQP').onclick=qp;$('#bAdd').onclick=()=>form();$('#bAdd').append(I('plus',26));$('#bSort').onclick=sortSheet;$('#vT').onclick=()=>{S.view=S.view==='grid'?'list':'grid';pref('view',S.view);renderList()};

matchMedia('(prefers-color-scheme:dark)').addEventListener('change',theme);
(async()=>{theme();try{db=await openDB();D=await tx('readonly',o=>o.getAll())}catch{mem=true;$('#warn').hidden=false}refresh()})();

/* v1.0.1 - search toggle + fixed header height */
$('#sBtn').onclick=()=>{const o=$('#sr').classList.toggle('open');$('#sBtn').setAttribute('aria-expanded',String(o));if(o)$('#q').focus()};
{const hd=$('#hd'),f=()=>document.documentElement.style.setProperty('--hd-h',hd.offsetHeight+'px');f();new ResizeObserver(f).observe(hd)}

/* v1.0.7 - right-side menu */
const nav=$('#nav'),mq=matchMedia('(max-width:899px)');
const syncNav=()=>{nav.inert=mq.matches&&!nav.classList.contains('open')};
function openNav(){nav.classList.add('open');$('#scrim').classList.add('open');$('#bMenu').setAttribute('aria-expanded','true');syncNav();$('#nClose').focus()}
function closeNav(){const was=nav.classList.contains('open');nav.classList.remove('open');$('#scrim').classList.remove('open');$('#bMenu').setAttribute('aria-expanded','false');syncNav();if(was)$('#bMenu').focus()}
$('#bMenu').append(I('menu',26));$('#nClose').append(I('x',22));$('#nSet').append(I('sliders',20),h('span',{},'Settings'));
$('#bMenu').onclick=openNav;$('#nClose').onclick=closeNav;$('#scrim').onclick=closeNav;
$('#nAll').onclick=()=>{closeNav();foldersSheet()};$('#nSet').onclick=()=>{closeNav();settings()};
$('#nTrash').onclick=()=>{closeNav();S.trash=true;S.q='';$('#q').value='';refresh();scrollTo(0,0)};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')&&!dlg.open)closeNav()});
mq.addEventListener('change',()=>{nav.classList.remove('open');$('#scrim').classList.remove('open');syncNav()});syncNav();
