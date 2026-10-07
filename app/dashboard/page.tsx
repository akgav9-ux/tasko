'use client'
import {useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useApp} from '@/lib/store'
import TaskRow from '@/components/TaskRow'
import {CAT} from '@/lib/cats'
import type {Cat} from '@/lib/types'
const money=(n:number)=>n.toFixed(2).replace('.',',')+' ₽'
const CH=[['','Все'],['new','Новые'],['price','Высокая оплата'],['time','Быстрые']]
export default function Dash(){const {s}=useApp();const r=useRouter();const [q,sq]=useState('')
const act=s.active?s.tasks.find(t=>t.id===s.active!.taskId)?.reward??0:0
const work=s.subs.filter(x=>x.status==='review'||x.status==='fix').reduce((a,x)=>a+x.reward,0)+act
const today=s.ops.slice(0,3).reduce((a,o)=>a+o.amount,0)
const cats=Object.keys(CAT) as Cat[]
return<div className="space-y-5">
<div className="rounded-2xl bg-gradient-to-r from-blue-50 to-blue-200 p-6 flex justify-between items-center"><div><h1 className="text-2xl md:text-3xl font-black">Добро пожаловать в TASKO! 👋</h1><p className="text-ink/60 mt-2 max-w-sm">Выполняйте задания, проходите опросы, тестирования и зарабатывайте деньги.</p></div><div className="hidden sm:block text-6xl">💻📱</div></div>
<div className="grid md:grid-cols-3 gap-4">
<div className="card flex items-center gap-3"><span className="w-12 h-12 rounded-xl bg-brand text-white grid place-items-center text-xl">👛</span><span className="flex-1"><small className="text-ink/60">Доступно</small><b className="block text-xl">{money(s.balance)}</b></span><Link href="/withdraw" className="btn btn-g !py-2">Вывести</Link></div>
<div className="card flex items-center gap-3"><span className="w-12 h-12 rounded-xl bg-blue-100 grid place-items-center text-xl">⏳</span><span><small className="text-ink/60">В работе</small><b className="block text-xl">{money(work)}</b></span></div>
<div className="card flex items-center gap-3"><span className="w-12 h-12 rounded-xl bg-green-100 grid place-items-center text-xl">📈</span><span><small className="text-ink/60">Заработано сегодня</small><b className="block text-xl">{money(today)}</b></span></div></div>
<h2 className="text-xl font-black">Найти задание</h2>
<form className="flex gap-2" onSubmit={e=>{e.preventDefault();r.push('/tasks?q='+encodeURIComponent(q))}}><input className="inp" placeholder="Например: тестирование, опрос, фото…" value={q} onChange={e=>sq(e.target.value)}/><button className="btn">Найти</button></form>
<div className="flex gap-2 overflow-x-auto">{CH.map(([f,n],i)=><Link key={n} href={'/tasks'+(f?'?f='+f:'')} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${i===0?'bg-brand text-white':'bg-white border border-[#e6ecf5]'}`}>{n}</Link>)}</div>
<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">{cats.map(c=><Link key={c} href={'/tasks?cat='+encodeURIComponent(c)} className={`rounded-2xl p-3 ${CAT[c].bg} hover:-translate-y-0.5 transition`}><div className="text-2xl">{CAT[c].e}</div><b className="block text-sm mt-1">{c}</b><small className="text-ink/60">{s.tasks.filter(t=>t.cat===c).length} заданий</small></Link>)}</div>
<div className="flex justify-between items-center"><h2 className="text-xl font-black">Рекомендуемые задания</h2><Link href="/tasks" className="text-brand text-sm">Смотреть все →</Link></div>
<div className="card !p-0">{s.tasks.slice(0,5).map(t=><TaskRow key={t.id} t={t}/>)}</div>
<div className="card grid sm:grid-cols-3 gap-4 text-sm">{[['📅','Задания каждый день','Новые задания от компаний'],['⚡','Выплаты по заявке','СБП или карта, обрабатывает администратор'],['📱','Работа с телефона','Удобно в любом месте']].map(([i,a,b])=><div key={a} className="flex gap-3 items-center"><span className="text-2xl">{i}</span><span><b>{a}</b><br/><small className="text-ink/60">{b}</small></span></div>)}</div></div>}
