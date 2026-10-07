'use client'
import {useState} from 'react'
import {useApp} from '@/lib/store'
const TABS=['💰 Выплаты','⚠️ Жалобы','👥 Пользователи','📋 Задания','📊 Финансы']
const WS={processing:'🟡 Ожидает',paid:'🟢 Выплачено',rejected:'🔴 Отклонено'}
export default function Admin(){const {s,d}=useApp();const [t,st]=useState(0);const [q,sq]=useState('')
const sum=(a:{amount:number}[])=>a.reduce((x,w)=>x+w.amount,0)
const pend=s.wds.filter(w=>w.status==='processing'),paid=s.wds.filter(w=>w.status==='paid')
const bal=(id:string,b:number)=>id==='0147'?s.balance:b
const total=s.users.reduce((x,u)=>x+bal(u.id,u.balance),0)
return<div className="space-y-4"><div className="flex justify-between items-center"><h1 className="text-2xl font-black">TASKO · Администратор</h1>
<button className="btn !py-2" onClick={async()=>{await fetch('/api/admin/logout',{method:'POST'});location.href='/'}}>Выйти</button></div>
<div className="flex gap-2 overflow-x-auto">{TABS.map((x,i)=><button key={x} onClick={()=>st(i)} className={`px-4 py-2 rounded-full whitespace-nowrap ${t===i?'bg-ink text-white':'bg-white'}`}>{x}</button>)}</div>
{t===0&&<div className="card">{s.wds.map(w=><div key={w.id} className="flex justify-between items-center gap-2 py-2 border-b last:border-0"><span><b>{w.amount} ₽</b> · #0147 · {w.method}: {w.details??'—'}<br/><small className="text-ink/60">{w.date} · {WS[w.status]}</small></span>
{w.status==='processing'&&<span className="flex gap-2"><button className="btn btn-g !py-2" onClick={()=>d({t:'wd',id:w.id,ok:true})}>Выплачено</button><button className="btn !py-2" onClick={()=>d({t:'wd',id:w.id,ok:false})}>Отклонить</button></span>}</div>)}</div>}
{t===1&&<div className="space-y-3">{!s.complaints.length&&<div className="card text-ink/60">Жалоб нет</div>}{s.complaints.map(c=>{const k=s.tasks.find(x=>x.id===c.taskId);const n=s.subs.filter(x=>x.taskId===c.taskId)
return<div key={c.id} className="card space-y-2"><b>{c.kind}</b> · {(c.status??'open')==='open'?'🟡 Открыта':'🟢 Закрыта'}<div className="text-sm text-ink/60">Задание: {k?.title??'—'} · заказчик: {k?.employer??'—'} · выполнений: {n.length}{n[0]&&` · «${n[0].text}»`}</div>
<div className="flex gap-2 flex-wrap"><button className="btn !py-2" onClick={()=>d({t:'closec',id:c.id})}>Закрыть</button><select className="inp !w-auto !py-2" value="" onChange={e=>e.target.value&&d({t:'block',id:e.target.value})}><option value="">Заблокировать…</option>{s.users.filter(u=>!u.blocked).map(u=><option key={u.id} value={u.id}>{u.name} #{u.id}</option>)}</select></div></div>})}</div>}
{t===2&&<div className="card"><input className="inp mb-2" placeholder="Поиск по имени или ID" value={q} onChange={e=>sq(e.target.value)}/>{s.users.filter(u=>(u.name+u.id).toLowerCase().includes(q.toLowerCase())).map(u=><div key={u.id} className="flex justify-between items-center gap-2 py-2 border-b last:border-0"><span>{u.name} #{u.id}<br/><small className="text-ink/60">с {u.since} · {bal(u.id,u.balance)} ₽ · {u.done} выполн. · {u.blocked?'🔴 blocked':'🟢 active'}</small></span><button className="btn !py-2" onClick={()=>d({t:'block',id:u.id})}>{u.blocked?'Разблокировать':'Заблокировать'}</button></div>)}</div>}
{t===3&&<div className="card">{s.tasks.map(k=><div key={k.id} className="flex justify-between py-2 border-b last:border-0"><span>{k.title}<br/><small className="text-ink/60">{k.employer} · {k.reward} ₽ × {k.seats} = {k.reward*k.seats} ₽</small></span><b>{k.taken>=k.seats?'закрыто':'активно'}</b></div>)}</div>}
{t===4&&<div className="grid grid-cols-2 md:grid-cols-3 gap-3">{[['На балансах',total+' ₽'],['Ожидает выплаты',sum(pend)+' ₽'],['Выплачено',sum(paid)+' ₽'],['Пользователей',s.users.length],['Заданий',s.tasks.length],['Выполнений',s.subs.length]].map(([a,b])=><div key={a} className="card">{a}<br/><b className="text-xl">{b}</b></div>)}</div>}</div>}
