'use client'
import {useApp} from '@/lib/store'
import {demoPayouts} from '@/lib/content'
export default function P(){const {s}=useApp()
const real=s.wds.filter(w=>w.status==='paid').map(w=>['#01**',w.amount,w.method,w.date] as const)
return<div className="max-w-xl space-y-4"><h1 className="text-3xl font-black">Последние выплаты</h1>
<p className="text-sm text-ink/60">Demo: записи примерные. Когда подключится реальная база, здесь будут настоящие выплаты (с замаскированными ID).</p>
<div className="card">{[...real,...demoPayouts].map((x,i)=><div key={i} className="flex justify-between py-2 border-b last:border-0"><span>{x[0]} · {x[2]}<br/><small className="text-ink/60">{x[3]}</small></span><b className="text-money">{x[1]} ₽</b></div>)}</div></div>}
