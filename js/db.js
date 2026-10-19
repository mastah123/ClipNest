const openDB=()=>new Promise((res,rej)=>{const r=indexedDB.open('clipnest',1);r.onupgradeneeded=()=>r.result.createObjectStore('s',{keyPath:'id'});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const tx=(m,f)=>new Promise((res,rej)=>{const t=db.transaction('s',m),r=f(t.objectStore('s'));t.oncomplete=()=>res(r&&r.result);t.onerror=t.onabort=()=>rej(t.error)});
async function save(s){if(!mem){try{await tx('readwrite',o=>o.put(s))}catch(e){toast('Could not save: '+(e.message||e),1);return false}}const i=D.findIndex(x=>x.id===s.id);i<0?D.push(s):D[i]=s;return true}
async function remove(s){if(!mem){try{await tx('readwrite',o=>o.delete(s.id))}catch(e){toast('Could not delete: '+(e.message||e),1);return false}}D=D.filter(x=>x.id!==s.id);return true}
const uid=()=>crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);
const dd=a=>{const seen=new Set();return a.map(x=>String(x).trim()).filter(x=>x&&!seen.has(x.toLowerCase())&&seen.add(x.toLowerCase()))};
