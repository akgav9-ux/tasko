import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import crypto from 'crypto'
import {makeSession,readSession} from '@/lib/session'
import {findByEmail,findById,createUser} from '@/lib/db'
import type {U} from '@/lib/db'
const hash=(p:string,s:string)=>crypto.scryptSync(p,s,64).toString('hex')
const fails=new Map<string,{n:number;t:number}>()
const bad=(m:string,s=400)=>NextResponse.json({error:m},{status:s})
const ok=async(u:U)=>{const r=NextResponse.json({ok:true,user:{id:u.id,name:u.name,email:u.email}})
r.cookies.set('tasko_session',await makeSession(u.id),{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:7*86400});return r}
type P={params:{action:string}}
export async function GET(_:Request,{params}:P){if(params.action!=='me')return bad('not found',404)
try{const id=await readSession(cookies().get('tasko_session')?.value);const u=id?await findById(id):undefined
return NextResponse.json({user:u&&!u.blocked?{id:u.id,name:u.name,email:u.email}:null})}catch{return NextResponse.json({user:null})}}
export async function POST(req:Request,{params}:P){
if(!process.env.SESSION_SECRET)return bad('Сервер не настроен: добавьте SESSION_SECRET',500)
if(params.action==='logout'){const r=NextResponse.json({ok:true});r.cookies.delete('tasko_session');return r}
const b=await req.json().catch(()=>({}));const email=String(b.email||'').trim().toLowerCase();const pw=String(b.password||'')
if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return bad('Некорректная почта')
try{
if(params.action==='register'){const name=String(b.name||'').trim().slice(0,40)
if(name.length<2)return bad('Введите имя');if(pw.length<8)return bad('Пароль минимум 8 символов')
if(await findByEmail(email))return bad('Эта почта уже зарегистрирована',409)
const salt=crypto.randomBytes(16).toString('hex');const u:U={id:crypto.randomUUID(),email,name,salt,hash:hash(pw,salt),role:'user',blocked:false,createdAt:new Date().toISOString()}
await createUser(u);return ok(u)}
if(params.action==='login'){const f=fails.get(email);if(f&&f.n>=5&&Date.now()-f.t<15*60000)return bad('Слишком много попыток, подождите 15 минут',429)
const u=await findByEmail(email);const good=!!u&&crypto.timingSafeEqual(Buffer.from(hash(pw,u.salt),'hex'),Buffer.from(u.hash,'hex'))
if(!u||!good){fails.set(email,{n:(f?.n||0)+1,t:Date.now()});return bad('Неверная почта или пароль',401)}
if(u.blocked)return bad('Аккаунт заблокирован',403);fails.delete(email);return ok(u)}
}catch{return bad('Ошибка хранилища. Проверьте SUPABASE_URL и SUPABASE_SERVICE_KEY',500)}
return bad('not found',404)}
