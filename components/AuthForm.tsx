'use client'
import {useState} from 'react'
import Link from 'next/link'
export default function AuthForm({mode}:{mode:'login'|'register'}){const reg=mode==='register'
const [f,sf]=useState({name:'',email:'',password:'',again:''});const [err,se]=useState('');const [ld,sl]=useState(false)
const set=(k:string,v:string)=>sf({...f,[k]:v})
const go=async()=>{se('');if(reg&&f.password!==f.again)return se('Пароли не совпадают')
sl(true);const r=await fetch('/api/auth/'+mode,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)});const d=await r.json().catch(()=>({}));sl(false)
if(!r.ok)return se(d.error||'Ошибка');const n=new URLSearchParams(location.search).get('next');location.href=n&&n.startsWith('/')?n:'/dashboard'}
return<div className="max-w-sm mx-auto mt-10 card space-y-3"><h1 className="text-2xl font-black">{reg?'Регистрация':'Вход'}</h1>
{reg&&<input className="inp" placeholder="Имя" value={f.name} onChange={e=>set('name',e.target.value)}/>}
<input type="email" className="inp" placeholder="Почта" value={f.email} onChange={e=>set('email',e.target.value)}/>
<input type="password" className="inp" placeholder="Пароль (от 8 символов)" value={f.password} onChange={e=>set('password',e.target.value)} onKeyDown={e=>e.key==='Enter'&&!reg&&go()}/>
{reg&&<input type="password" className="inp" placeholder="Повторите пароль" value={f.again} onChange={e=>set('again',e.target.value)}/>}
{err&&<p className="text-sm text-red-600">{err}</p>}
<button className="btn btn-g w-full" disabled={ld} onClick={go}>{ld?'...':reg?'Создать аккаунт':'Войти'}</button>
<p className="text-sm text-ink/60">{reg?<>Уже есть аккаунт? <Link className="underline" href="/login">Войти</Link></>:<>Нет аккаунта? <Link className="underline" href="/register">Регистрация</Link></>}</p></div>}
