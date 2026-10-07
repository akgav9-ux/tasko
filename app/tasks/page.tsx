'use client'
import {useEffect,useState} from 'react'
import {useApp} from '@/lib/store'
import TaskRow from '@/components/TaskRow'
const C=['Все','Тестирование','Опросы','Проверка сайтов','Приложения','Фото','Локальные','Другое']
const F=[['','Все'],['new','Новые'],['price','Высокая оплата'],['time','Быстрые']]
export default function Tasks(){const {s}=useApp();const [q,sq]=useState('');const [c,sc]=useState('Все');const [f,sf]=useState('');const [ld,sl]=useState(true)
useEffect(()=>{const p=new URLSearchParams(location.search);sq(p.get('q')||'');sc(p.get('cat')||'Все');sf(p.get('f')||'');const h=setTimeout(()=>sl(false),300);return()=>clearTimeout(h)},[])
let l=s.tasks.filter(t=>(c==='Все'||t.cat===c)&&(t.title+t.desc).toLowerCase().includes(q.toLowerCase()))
if(f==='new')l=l.filter(t=>t.taken<=t.seats/2);if(f==='price')l=[...l].sort((a,b)=>b.reward-a.reward);if(f==='time')l=[...l].sort((a,b)=>a.minutes-b.minutes)
return<div className="space-y-4"><h1 className="text-3xl font-black">Задания</h1>
<input className="inp" placeholder="Поиск по заданиям" value={q} onChange={e=>sq(e.target.value)}/>
<div className="flex gap-2 overflow-x-auto">{F.map(([k,n])=><button key={n} onClick={()=>sf(k)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${f===k?'bg-brand text-white':'bg-white border border-[#e6ecf5]'}`}>{n}</button>)}</div>
<div className="flex gap-2 overflow-x-auto">{C.map(x=><button key={x} onClick={()=>sc(x)} className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${c===x?'bg-ink text-white':'bg-soft'}`}>{x}</button>)}</div>
<div className="card !p-0">{ld?[1,2,3,4].map(i=><div key={i} className="h-16 m-3 rounded-xl bg-soft animate-pulse"/>):l.map(t=><TaskRow key={t.id} t={t}/>)}{!ld&&!l.length&&<p className="p-6 text-ink/60">Ничего не найдено</p>}</div></div>}
