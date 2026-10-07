'use client'
import {useState} from 'react'
import {useApp} from '@/lib/store'
export default function B(){const {s,d}=useApp();const [a,sa]=useState(500)
const pend=s.wds.filter(w=>w.status==='processing').reduce((x,w)=>x+w.amount,0);const av=s.balance-pend
return<div className="max-w-xl space-y-4"><h1 className="text-3xl font-black">Рекламный баланс</h1>
<div className="card"><div className="text-sm text-ink/60">Рекламный баланс</div><div className="text-4xl font-black">{s.ad} ₽</div><small className="text-ink/60">Эти средства тратятся только на публикацию заданий и не выводятся.</small></div>
<div className="card space-y-3"><h2 className="font-black">Пополнить</h2><input type="number" min={1} className="inp" value={a} onChange={e=>sa(Math.max(0,+e.target.value))}/>
<button className="btn btn-g w-full" disabled={a<1||a>av} onClick={()=>d({t:'transfer',amount:a})}>Перевести с основного баланса (доступно {av} ₽)</button>
<button className="btn w-full" disabled={a<1} onClick={()=>d({t:'topup',amount:a})}>Пополнить картой / СБП (demo)</button>
<small className="text-ink/60">Demo: оплата не подключена, пополнение картой просто увеличивает баланс.</small></div></div>}
