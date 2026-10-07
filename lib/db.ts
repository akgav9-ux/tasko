// Хранилище пользователей. Есть SUPABASE_URL → Supabase (PostgREST, без доп. пакетов), нет → локальный файл .data/users.json.
import fs from 'fs'
import path from 'path'
export type U={id:string;email:string;name:string;hash:string;salt:string;role:'user';blocked:boolean;createdAt:string}
const URL_=process.env.SUPABASE_URL,KEY=process.env.SUPABASE_SERVICE_KEY
const F=path.join(process.cwd(),'.data','users.json')
const load=():U[]=>{try{return JSON.parse(fs.readFileSync(F,'utf8'))}catch{return[]}}
const save=(u:U[])=>{fs.mkdirSync(path.dirname(F),{recursive:true});fs.writeFileSync(F,JSON.stringify(u,null,1))}
const sb=async(q:string,init?:RequestInit)=>{const r=await fetch(`${URL_}/rest/v1/users${q}`,{...init,cache:'no-store',headers:{apikey:KEY!,Authorization:`Bearer ${KEY}`,'Content-Type':'application/json',Prefer:'return=representation'}})
if(!r.ok)throw new Error(await r.text());return r.json()}
const row=(r:any):U=>({id:r.id,email:r.email,name:r.name,hash:r.hash,salt:r.salt,role:'user',blocked:r.blocked,createdAt:r.created_at})
export async function findByEmail(e:string){if(!URL_)return load().find(x=>x.email===e);const r=await sb(`?email=eq.${encodeURIComponent(e)}&limit=1`);return r[0]?row(r[0]):undefined}
export async function findById(id:string){if(!URL_)return load().find(x=>x.id===id);const r=await sb(`?id=eq.${encodeURIComponent(id)}&limit=1`);return r[0]?row(r[0]):undefined}
export async function createUser(u:U){if(!URL_){save([...load(),u]);return}
await sb('',{method:'POST',body:JSON.stringify({id:u.id,email:u.email,name:u.name,hash:u.hash,salt:u.salt,role:u.role,blocked:u.blocked})})}
