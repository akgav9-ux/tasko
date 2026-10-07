'use client'
import Link from 'next/link'
import {useApp} from '@/lib/store'
import TaskCard from '@/components/TaskCard'
export default function Dash(){const {s}=useApp()
return<div className="space-y-6"><div className="card bg-ink text-white"><div className="text-5xl font-black">{s.balance} ₽</div><div className="text-white/60 mb-4">Доступно к выводу</div><Link href="/withdraw" className="btn btn-g">Вывести деньги</Link></div>
<div className="grid grid-cols-2 gap-4"><div className="card">Сегодня<br/><b className="text-2xl text-money">{s.ops.slice(0,3).reduce((a,o)=>a+o.amount,0)} ₽</b></div><div className="card">Выполнено<br/><b className="text-2xl">{s.subs.length} задан.</b></div></div>
<div className="card"><h2 className="font-black mb-2">Последние операции</h2>{s.ops.slice(0,6).map(o=><div key={o.id} className="flex justify-between py-1"><span>{o.text}</span><b className="text-money">+{o.amount} ₽</b></div>)}</div>
<div className="card"><h2 className="font-black mb-2">Мои выполнения</h2>{s.subs.map(x=><div key={x.id} className="flex justify-between py-1"><span>{x.title}{x.reason&&<small className="text-ink/60"> · {x.reason}</small>}</span><b>{{review:'🟡 На проверке',approved:'🟢 Одобрено',rejected:'🔴 Отклонено',fix:'🟠 Нужно исправить'}[x.status]}</b></div>)}</div>
<h2 className="font-black text-xl">Рекомендуемые</h2><div className="grid md:grid-cols-3 gap-4">{s.tasks.slice(0,3).map(t=><TaskCard key={t.id} t={t}/>)}</div></div>}
