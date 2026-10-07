// Подпись сессии администратора (HMAC). Работает и в middleware (Edge), и в route handlers.
async function sig(msg:string){const k=process.env.ADMIN_SECRET;if(!k)return ''
const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(k),{name:'HMAC',hash:'SHA-256'},false,['sign'])
const b=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(msg))
return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')}
export async function makeToken(){const exp=String(Date.now()+8*3600*1000);return exp+'.'+await sig(exp)}
export async function checkToken(t?:string){if(!t)return false;const [exp,s]=t.split('.');const good=await sig(exp)
return !!good&&s===good&&Number(exp)>Date.now()}
