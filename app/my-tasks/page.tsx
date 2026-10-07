'use client'
import {useState} from 'react'
import Link from 'next/link'
import {useApp} from '@/lib/store'
const TABS=[['start','Начатые'],['fix','Доработать'],['review','На проверке'],['hist','История']]
const L={review:'🟡 На проверке',approved:'🟢 Одобрено',rejected:'🔴 Отклонено',fix:'🟠 Доработать'}
export default function My(){const {s}=useApp();const [t,st]=useState('start')
const act=s.active?s.tasks.find(x=>x.id===s.active!.taskId):undefined
const subs=(k:string)=>s.subs.filter(x=>k==='hist'?x.status==='approved'||x.status==='rejected':x.status===k)
const n=(k:string)=>k==='start'?(act?1:0):subs(k).length
return<div className="space-y-4"><h1 className="text-3xl font-black">Мои задания</h1>
<div className="flex gap-2 overflow-x-auto">{TABS.map(([k,l])=><button key={k} onClick={()=>st(k)} className={`px-4 py-2 rounded-full whitespace-nowrap ${t===k?'bg-ink text-white':'bg-white'}`}>{l} <span className="opacity-60">{n(k)}</span></button>)}</div>
{t==='start'?(act?<Link href={`/tasks/${act.id}`} className="card block"><b>{act.title}</b><div className="text-money font-bold">{act.reward} ₽</div>Задание выполняется → продолжить</Link>:<div className="card text-ink/60">Нет начатых заданий. <Link className="underline" href="/tasks">Найти задания</Link></div>)
:subs(t).length?subs(t).map(x=><div key={x.id} className="card flex justify-between gap-2"><span><b>{x.title}</b><br/><small className="text-ink/60">{x.text}{x.reason&&' · Причина: '+x.reason}</small></span><span className="text-right"><b className="text-money">{x.reward} ₽</b><br/><small>{L[x.status]}</small></span></div>):<div className="card text-ink/60">Пусто</div>}</div>}
