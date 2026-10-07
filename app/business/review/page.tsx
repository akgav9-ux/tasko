'use client'
import {useApp} from '@/lib/store'
export default function R(){const {s,d}=useApp()
const c=(k:string)=>s.subs.filter(x=>x.status===k).length
return<div className="space-y-4"><h1 className="text-3xl font-black">Проверка результатов</h1>
<div className="card">Одобрено {c('approved')} · На проверке {c('review')} · Исправление {c('fix')}</div>
{s.subs.map(x=><div key={x.id} className="card space-y-2"><b>Исполнитель {x.worker} · {x.title}</b><p className="text-ink/60">{x.text}</p>{x.img&&<img src={x.img} alt="Скриншот исполнителя" className="rounded-2xl max-h-64"/>}
{x.status==='review'||x.status==='fix'?<div className="flex gap-2 flex-wrap"><button className="btn btn-g !py-2" onClick={()=>d({t:'review',id:x.id,ok:true})}>Одобрить</button><button className="btn !py-2" onClick={()=>{const r=prompt('Причина отклонения');if(r?.trim())d({t:'review',id:x.id,ok:false,reason:r})}}>Отклонить</button>{x.status==='review'&&<button className="btn !py-2" onClick={()=>d({t:'fix',id:x.id})}>Запросить исправление</button>}</div>
:<div>{x.status==='approved'?'🟢 Одобрено':'🔴 Отклонено'+(x.reason?': '+x.reason:'')} · Оценка исполнителю: {[1,2,3,4,5].map(n=><button key={n} onClick={()=>d({t:'rate',id:x.id,stars:n})} className={(x.stars??0)>=n?'text-money':'text-ink/20'}>★</button>)}</div>}</div>)}</div>}
