'use client'
import {useApp} from '@/lib/store'
const LV=[['Новичок',0],['Активный',1000],['Профи',2000],['Эксперт',5000]] as const
export default function P(){const {s}=useApp();const ok=s.subs.filter(x=>x.status==='approved').length
const xp=1240+ok*50;const i=LV.findLastIndex(l=>xp>=l[1]);const next=LV[i+1]?.[1]??xp;const pct=Math.min(100,Math.round(xp/next*100))
const A=[['🏆','Первое задание',true],['💰','Первые 1 000 ₽',true],['🔥','7 дней активности',false],['⭐','100 успешных заданий',127+ok>=100]] as const
return<div className="max-w-2xl space-y-4"><div className="card flex gap-4 items-center"><div className="w-16 h-16 rounded-full bg-money grid place-items-center text-2xl font-black">И</div><div><h1 className="text-2xl font-black">Исполнитель #0147</h1><div className="text-sm text-ink/60">⭐ 4.9 · с 12.03.2026</div></div></div>
<div className="card"><b>{LV[i][0]}</b> · XP {xp} / {next}<div className="h-3 bg-soft rounded-full mt-2 overflow-hidden"><div className="h-full bg-money transition-all duration-700" style={{width:pct+'%'}}/></div></div>
<div className="grid grid-cols-2 gap-3">{[['Выполнено',127+ok],['Успешно','98%'],['Заработано','18 430 ₽'],['Средний заработок','145 ₽']].map(([a,b])=><div key={a} className="card">{a}<br/><b className="text-xl">{b}</b></div>)}</div>
<a href="/referral" className="card block">👥 Пригласить друзей → реферальная программа</a>
<div className="grid grid-cols-2 gap-3">{A.map(([e,t,on])=><div key={t} className={`card ${on?'':'opacity-40'}`}>{e} {t}</div>)}</div></div>}
