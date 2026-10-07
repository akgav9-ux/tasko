'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useApp} from '@/lib/store'
import {Cat} from '@/lib/types'
const FEE=0.15
export default function Create(){const {s,d}=useApp();const r=useRouter()
const [f,sf]=useState({title:'',desc:'',cat:'Тестирование' as Cat,seats:10,reward:100,minutes:15,shot:true})
const set=(k:string,v:string|number|boolean)=>sf({...f,[k]:v})
const sum=f.seats*f.reward,fee=Math.round(sum*FEE)
return<div className="grid md:grid-cols-2 gap-6"><div className="space-y-3"><h1 className="text-3xl font-black">Новое задание</h1>
<input className="inp" placeholder="Название" value={f.title} onChange={e=>set('title',e.target.value)}/>
<select className="inp" value={f.cat} onChange={e=>set('cat',e.target.value)}>{['Тестирование','Опросы','Проверка сайтов','Приложения','Фото','Локальные','Другое'].map(x=><option key={x}>{x}</option>)}</select>
<textarea className="inp" rows={4} placeholder="Что должен сделать исполнитель" value={f.desc} onChange={e=>set('desc',e.target.value)}/>
<label className="flex gap-2 items-center"><input type="checkbox" checked={f.shot} onChange={e=>set('shot',e.target.checked)}/>Требовать скриншот или фото результата</label>
{(['seats','reward','minutes'] as const).map(k=><label key={k} className="block text-sm">{{seats:'Исполнителей',reward:'Вознаграждение, ₽',minutes:'Время, мин'}[k]}<input type="number" min={1} className="inp" value={f[k]} onChange={e=>set(k,Math.max(1,+e.target.value))}/></label>)}</div>
<div className="card h-fit space-y-2"><b>Предпросмотр</b><div className="bg-soft rounded-2xl p-3"><b>{f.title||'Название задания'}</b><div className="text-money font-bold">{f.reward} ₽ · ~{f.minutes} мин</div></div>
<div>{f.seats} × {f.reward} ₽ = {sum} ₽</div><div>Комиссия TASKO (15%): {fee} ₽</div><div className="text-2xl font-black">Итого: {sum+fee} ₽</div><div className={sum+fee>s.ad?'text-red-600 text-sm':'text-sm text-ink/60'}>Рекламный баланс: {s.ad} ₽{sum+fee>s.ad&&<> — не хватает. <a className="underline" href="/business/balance">Пополнить</a></>}</div>
<button className="btn btn-g w-full" disabled={!f.title.trim()||!f.desc.trim()||sum+fee>s.ad} onClick={()=>{d({t:'create',task:{id:'n'+Date.now(),title:f.title,cat:f.cat,desc:f.desc,reward:f.reward,minutes:f.minutes,level:'Легко',seats:f.seats,taken:0,needShot:f.shot,employer:'Ваша компания',rating:5,steps:['Прочитать описание',f.desc,'Отправить результат']}});r.push('/tasks')}}>Опубликовать задание</button></div></div>}
