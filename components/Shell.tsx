'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect,useState} from 'react'
import {useApp} from '@/lib/store'
const G:[string,string,[string,string][]][]=[['👤','Мой аккаунт',[['/dashboard','Сводка'],['/profile','Профиль']]],['📋','Задания',[['/tasks','Все задания'],['/my-tasks','Мои задания']]],['📣','Заказчикам',[['/business/create-task','Создать задание'],['/business/review','Проверка результатов'],['/business/balance','Рекламный баланс']]],['👥','Рефералы',[['/referral','Мои рефералы']]],['💰','Финансы',[['/withdraw','Вывести средства'],['/payouts','Последние выплаты']]],['💬','Общение',[['/help','Новости и помощь']]]]
const BAR=[['/tasks','🔎','Задания'],['/my-tasks','📋','Мои'],['/business/create-task','+','Создать'],['/withdraw','💰','Деньги'],['/profile','👤','Профиль']]
const PUB=['/','/login','/register','/business']
export default function Shell({children}:{children:React.ReactNode}){const p=usePathname();const {s}=useApp();const [open,so]=useState(false);const [og,sg]=useState('');const [me,sm]=useState<{name:string}|null|undefined>(undefined)
useEffect(()=>{fetch('/api/auth/me').then(r=>r.json()).then(d=>sm(d.user)).catch(()=>sm(null))},[p])
useEffect(()=>{so(false);sg(G.find(g=>g[2].some(i=>i[0]===p))?.[1]??'')},[p])
const logout=async()=>{await fetch('/api/auth/logout',{method:'POST'});location.href='/'}
const pub=PUB.includes(p)||p.startsWith('/tasko-admin')
const user=me?<><span className="hidden sm:inline">{me.name}</span><button onClick={logout} className="underline">Выйти</button></>:me===null?<><Link href="/login">Войти</Link><Link href="/register" className="btn btn-g !py-1">Регистрация</Link></>:null
const logo=<Link href="/" className="font-black text-xl"><span className="text-money">TASK</span>O</Link>
if(pub)return<><header className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">{logo}<div className="flex items-center gap-4 text-sm">{me&&<Link href="/dashboard" className="font-bold">Кабинет</Link>}{!me&&<Link href="/tasks">Задания</Link>}{user}</div></header>
<main className="max-w-6xl mx-auto px-4 md:px-8 py-4">{children}</main></>
return<><header className="bg-ink/95 backdrop-blur text-white sticky top-0 z-40 flex items-center justify-between px-4 h-14"><div className="flex items-center gap-3"><button className="md:hidden text-2xl" aria-label="Меню" onClick={()=>so(!open)}>{open?'✕':'☰'}</button>{logo}</div><div className="flex items-center gap-4 text-sm">{user}</div></header>
<div className="max-w-6xl mx-auto md:flex gap-6 p-4"><aside className={`${open?'block':'hidden'} md:block fixed md:static inset-x-0 top-14 bottom-0 z-30 bg-milk p-4 pb-28 md:p-0 overflow-y-auto md:w-64 md:shrink-0`}>
<div className="rounded-3xl bg-gradient-to-br from-money to-emerald-300 p-4 mb-4 shadow-card"><div className="text-xs">Основной баланс</div><div className="text-3xl font-black">{s.balance} ₽</div><Link href="/withdraw" className="btn !py-2 w-full mt-2">Вывести</Link>
<div className="mt-3 pt-3 border-t border-black/10 flex justify-between items-center"><span><span className="text-xs block">Рекламный баланс</span><b>{s.ad} ₽</b></span><Link href="/business/balance" className="btn !py-1 !px-3 text-sm">Пополнить</Link></div></div>
{G.map(([i,t,l])=><div key={t} className="mb-1"><button onClick={()=>sg(og===t?'':t)} className="w-full flex justify-between items-center px-3 py-2 rounded-xl font-semibold hover:bg-soft"><span>{i} {t}</span><span className="text-ink/40">{og===t?'▾':'▸'}</span></button>
{og===t&&l.map(([h,n])=><Link key={h} href={h} className={`block rounded-xl pl-9 pr-3 py-2 ${p===h?'bg-ink text-white':'hover:bg-soft'}`}>{n}</Link>)}</div>)}</aside>
<main className="flex-1 min-w-0">{children}</main></div>
<nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t flex justify-around items-end pb-1 pt-1">{BAR.map(([h,i,n])=>i==='+'?<Link key={h} href={h} aria-label={n} className="-mt-6 w-14 h-14 rounded-full bg-money grid place-items-center text-3xl font-black shadow-card">+</Link>:<Link key={h} href={h} className={`flex flex-col items-center text-[11px] px-2 py-1 ${p===h?'font-bold text-ink':'text-ink/50'}`}><span className="text-xl">{i}</span>{n}</Link>)}</nav></>}
