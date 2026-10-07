'use client'
import {useState} from 'react'
import {useApp} from '@/lib/store'
const MIN=100
export default function W(){const {s,d}=useApp();const [a,sa]=useState(MIN);const [m,sm]=useState<'СБП'|'Карта'>('СБП');const [det,sd]=useState('')
const pend=s.wds.filter(w=>w.status==='processing').reduce((x,w)=>x+w.amount,0);const av=s.balance-pend;const ok=a>=MIN&&a<=av&&det.trim().length>3
return<div className="max-w-xl space-y-4"><h1 className="text-3xl font-black">Вывод</h1>
<div className="card">Баланс<div className="text-4xl font-black text-money">{s.balance} ₽</div><div className="text-sm">В заявках: {pend} ₽ · доступно для новой заявки: {av} ₽</div><small className="text-ink/60">Минимум: {MIN} ₽. Деньги списываются с баланса после того, как администратор вручную перевёл выплату.</small></div>
<input type="number" className="inp" value={a} onChange={e=>sa(+e.target.value)}/>
<div className="flex gap-2">{(['СБП','Карта'] as const).map(x=><button key={x} onClick={()=>sm(x)} className={`flex-1 rounded-2xl py-3 ${m===x?'bg-ink text-white':'bg-white'}`}>{x}</button>)}</div>
<input className="inp" placeholder={m==='СБП'?'Телефон для СБП':'Номер карты'} value={det} onChange={e=>sd(e.target.value)}/>
<button className="btn btn-g w-full" disabled={!ok} onClick={()=>d({t:'withdraw',amount:a,method:m,details:det})}>Вывести {a} ₽</button>
{!ok&&<p className="text-sm text-red-600">Сумма от {MIN} ₽, не больше доступного, нужны реквизиты</p>}
<div className="card"><h2 className="font-black mb-2">История выводов</h2>{s.wds.map(w=><div key={w.id} className="flex justify-between py-1"><span>{w.amount} ₽ · {w.method} · {w.date}</span><b>{{processing:'🟡 Обрабатывается',paid:'🟢 Выплачено',rejected:'🔴 Отклонено'}[w.status]}</b></div>)}</div></div>}
