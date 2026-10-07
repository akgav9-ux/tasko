'use client'
import {useState} from 'react'
import {news,faq,topics} from '@/lib/content'
type T=[string,string,number]
export default function H(){const [t,st]=useState(0);const [o,so]=useState(-1);const [ts,sts]=useState<T[]>(topics.map(x=>[...x] as T));const [a,sa]=useState('');const [b,sb]=useState('')
return<div className="max-w-2xl space-y-4"><h1 className="text-3xl font-black">Помощь</h1>
<div className="flex gap-2">{['Новости','FAQ','Форум'].map((x,i)=><button key={x} onClick={()=>st(i)} className={`px-4 py-2 rounded-full ${t===i?'bg-ink text-white':'bg-white'}`}>{x}</button>)}</div>
{t===0&&news.map(n=><div key={n[1]} className="card"><small className="text-ink/60">{n[0]}</small><h2 className="font-bold">{n[1]}</h2><p className="text-ink/70">{n[2]}</p></div>)}
{t===1&&faq.map((f,i)=><div key={f[0]} className="card cursor-pointer" onClick={()=>so(o===i?-1:i)}><b>{f[0]}</b>{o===i&&<p className="mt-2 text-ink/70">{f[1]}</p>}</div>)}
{t===2&&<><div className="card space-y-2"><input className="inp" placeholder="Тема" value={a} onChange={e=>sa(e.target.value)}/><textarea className="inp" rows={3} placeholder="Сообщение" value={b} onChange={e=>sb(e.target.value)}/>
<button className="btn" disabled={!a.trim()||!b.trim()} onClick={()=>{sts([[a,b,0],...ts]);sa('');sb('')}}>Создать тему</button></div>
{ts.map((x,i)=><div key={i} className="card"><b>{x[0]}</b><p className="text-ink/70">{x[1]}</p><small className="text-ink/60">Ответов: {x[2]}</small></div>)}
<p className="text-sm text-ink/60">Demo: темы хранятся только на этой странице и пропадут при обновлении.</p></>}</div>}
