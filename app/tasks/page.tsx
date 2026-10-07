'use client'
import {useState,useEffect} from 'react'
import {useApp} from '@/lib/store'
import TaskCard from '@/components/TaskCard'
const C=['Все','Тестирование','Опросы','Проверка сайтов','Приложения','Фото','Локальные','Другое']
export default function Tasks(){const {s}=useApp();const [q,sq]=useState('');const [c,sc]=useState('Все');const [sort,ss]=useState('');const [ld,sl]=useState(true);useEffect(()=>{const h=setTimeout(()=>sl(false),400);return()=>clearTimeout(h)},[])
let l=s.tasks.filter(t=>(c==='Все'||t.cat===c)&&(t.title+t.desc).toLowerCase().includes(q.toLowerCase()))
if(sort==='price')l=[...l].sort((a,b)=>b.reward-a.reward);if(sort==='time')l=[...l].sort((a,b)=>a.minutes-b.minutes)
return<div><h1 className="text-3xl font-black mb-4">Задания</h1>
<div className="flex gap-3 flex-wrap"><input className="inp md:w-80" placeholder="Поиск" value={q} onChange={e=>sq(e.target.value)}/>
<select className="inp md:w-52" value={sort} onChange={e=>ss(e.target.value)}><option value="">Сортировка</option><option value="price">Дороже</option><option value="time">Быстрее</option></select></div>
<div className="flex gap-2 overflow-x-auto my-4">{C.map(x=><button key={x} onClick={()=>sc(x)} className={`px-4 py-2 rounded-full whitespace-nowrap ${c===x?'bg-ink text-white':'bg-white'}`}>{x}</button>)}</div>
<div className="grid md:grid-cols-3 gap-4">{ld?[1,2,3].map(i=><div key={i} className="card h-44 animate-pulse bg-soft"/>):l.map(t=><TaskCard key={t.id} t={t}/>)}</div>{!l.length&&<p className="text-ink/60">Ничего не найдено</p>}</div>}
