'use client'
import {useEffect,useState} from 'react'
import {useParams} from 'next/navigation'
import {useApp} from '@/lib/store'
export default function TaskPage(){const {id}=useParams<{id:string}>();const {s,d}=useApp();const t=s.tasks.find(x=>x.id===id)
const [now,setNow]=useState(Date.now());const [txt,st]=useState('');const [img,si]=useState<string>()
const pick=(f?:File)=>{if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const q=Math.min(1,900/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=im.width*q;c.height=im.height*q;c.getContext('2d')!.drawImage(im,0,0,c.width,c.height);si(c.toDataURL('image/jpeg',.7))};im.src=r.result as string};r.readAsDataURL(f)}
useEffect(()=>{const h=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(h)},[])
if(!t)return<p>Задание не найдено</p>
const run=s.active?.taskId===t.id;const sec=run?Math.floor((now-s.active!.startedAt)/1000):0
return<div className="max-w-2xl space-y-4"><h1 className="text-3xl font-black">{t.title}</h1>
<div className="card flex gap-4 flex-wrap"><b className="text-money text-2xl">{t.reward} ₽</b><span>⏱ ~{t.minutes} мин</span><span>{t.level}</span><span>{t.employer} ⭐ {t.rating.toFixed(1)}</span><span>👥 {t.taken} исполнителей</span></div>
<p>{t.desc}</p><h2 className="font-black text-xl">Что нужно сделать</h2><ol className="list-decimal pl-5 space-y-1">{t.steps.map(x=><li key={x}>{x}</li>)}</ol>
<h2 className="font-black text-xl">Важно</h2><p className="text-ink/60">Один исполнитель — одно выполнение. Ответы проверяет заказчик. Копии ответов отклоняются.</p>
{run?<div className="card space-y-3"><b>Задание выполняется · {String(Math.floor(sec/60)).padStart(2,'0')}:{String(sec%60).padStart(2,'0')}</b>
<textarea className="inp" rows={4} placeholder="Ваш ответ или ссылка" value={txt} onChange={e=>st(e.target.value)}/>
<label className="block"><span className="text-sm text-ink/60">{t.needShot?'Скриншот или фото (обязательно)':'Скриншот или фото (по желанию)'}</span><input type="file" accept="image/*" className="inp mt-1" onChange={e=>pick(e.target.files?.[0])}/></label>
{img&&<img src={img} alt="Предпросмотр" className="rounded-2xl max-h-48"/>}
<button className="btn btn-g w-full" disabled={!txt.trim()||(!!t.needShot&&!img)} onClick={()=>{d({t:'submit',text:txt,img});si(undefined)}}>Отправить результат</button></div>
:<button className="btn w-full !py-4" disabled={!!s.active} onClick={()=>d({t:'start',id:t.id})}>Начать задание</button>}<button className="text-sm text-ink/50 underline" onClick={()=>{const k=prompt('Жалоба на: задание / заказчика / исполнителя / выплату','задание');if(k)d({t:'complain',kind:k,text:t.title,taskId:t.id})}}>Пожаловаться</button></div>}
