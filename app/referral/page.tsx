'use client'
import {useEffect,useState} from 'react'
const REF=10
const inv=[['Анна','#4821',640],['Игорь','#4784',210],['Мария','#4747',0]] as const
export default function R(){const [o,so]=useState('');const [c,sc]=useState(false);useEffect(()=>so(location.origin),[])
const link=`${o}/?ref=T0147`;const earn=inv.reduce((a,x)=>a+Math.round(x[2]*REF/100),0)
return<div className="max-w-xl space-y-4"><h1 className="text-3xl font-black">Пригласите друзей</h1>
<div className="card space-y-2"><p>Получайте {REF}% от заработка приглашённых после одобрения их заданий.</p>
<input readOnly className="inp" value={link}/><button className="btn btn-g w-full" onClick={()=>{navigator.clipboard?.writeText(link);sc(true)}}>{c?'Скопировано ✓':'Скопировать ссылку'}</button></div>
<div className="grid grid-cols-2 gap-3"><div className="card">Приглашено<br/><b className="text-2xl">{inv.length}</b></div><div className="card">Бонус<br/><b className="text-2xl text-money">{earn} ₽</b></div></div>
<div className="card">{inv.map(x=><div key={x[1]} className="flex justify-between py-1"><span>{x[0]} {x[1]}</span><span>{x[2]} ₽ заработал</span></div>)}</div>
<p className="text-sm text-ink/60">Demo: приглашённые примерные, бонус пока не зачисляется на баланс. Начисление подключается вместе с базой данных.</p></div>}
