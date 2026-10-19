const CMD=/^(\$\s+)?(sudo|git|npm|npx|yarn|pnpm|cd|ls|cat|curl|wget|docker|kubectl|pip3?|python3?|node|ssh|scp|chmod|chown|mkdir|rm|mv|cp|brew|apt(-get)?|grep|echo|export|systemctl|tar|cargo|adb)\b/;
function detect(t){const s=t.trim();if(!s)return'text';
if(/^(https?:\/\/|www\.)[^\s]+$/i.test(s))return'url';
if(/^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i.test(s))return'email';
const L=s.split('\n').map(x=>x.trim()).filter(Boolean);
if(L.length<=6&&L.every(l=>CMD.test(l)&&(/\s-{1,2}\w|[\/|.~]|^\$ /.test(l)||/^(ls|cd|pwd)/.test(l))||/^(#|&&|\||\\)/.test(l))&&CMD.test(L[0]))return'command';
let c=0;if(/[{};]\s*$/m.test(s))c++;if(/=>|\bfunction\b|\bconst\b|\bdef\b|\bclass\b|\bimport\b.+\bfrom\b|<\/?[a-z][^>]*>|#include|\breturn\b/.test(s))c++;if(/^( {2,}|\t)\S/m.test(s))c++;if(/[=(){}\[\];]{3,}/.test(s))c++;
if(c>=2)return'code';
const w=s.split(/\s+/).length;
if((/^(you are|act as|write|create|generate|explain|summari[sz]e|build|draft|translate|give me|help me|imagine|pretend)\b/i.test(s)&&w>=8)||(/\byou are an?\b/i.test(s)&&s.length>60))return'prompt';
return'text'}
function sugg(t,type){const s=t.trim();if(type==='url'){try{return new URL(/^https?:/i.test(s)?s:'https://'+s).hostname.replace(/^www\./,'')}catch{}}
if(type==='email')return s.slice(0,80);
const l=s.split('\n').map(x=>x.trim()).find(x=>/\w/.test(x)&&!/^(#!|\/\/|\/\*|\*)/.test(x))||s.split('\n')[0].trim();
return l.length>50?l.slice(0,49).trimEnd()+'…':l}
