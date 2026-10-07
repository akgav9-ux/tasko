// Подпись пользовательской сессии (HMAC). Edge-совместимо: работает в middleware и в route handlers.
async function sig(m:string){const k=process.env.SESSION_SECRET;if(!k)return ''
const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(k),{name:'HMAC',hash:'SHA-256'},false,['sign'])
const b=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(m))
return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')}
export async function makeSession(uid:string){const m=uid+'.'+(Date.now()+7*864e5);return m+'.'+await sig(m)}
export async function readSession(t?:string){if(!t)return null;const p=t.split('.');if(p.length!==3)return null
const g=await sig(p[0]+'.'+p[1]);return g&&p[2]===g&&Number(p[1])>Date.now()?p[0]:null}
