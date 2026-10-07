'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
export default function L(){const r=useRouter();const [p,sp]=useState('');const [e,se]=useState(false)
const go=async()=>{const x=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:p})});x.ok?r.push('/tasko-admin'):se(true)}
return<div className="max-w-sm mx-auto mt-20 card space-y-3"><h1 className="text-xl font-black">Вход администратора</h1>
<input type="password" className="inp" placeholder="Пароль" value={p} onChange={ev=>sp(ev.target.value)} onKeyDown={ev=>ev.key==='Enter'&&go()}/>
{e&&<p className="text-sm text-red-600">Неверный пароль или не настроен .env.local</p>}<button className="btn w-full" onClick={go}>Войти</button></div>}
