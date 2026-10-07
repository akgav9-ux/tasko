'use client'
import Link from 'next/link'
import {usePathname,useRouter} from 'next/navigation'
import {useEffect,useRef,useState} from 'react'
import {useApp} from '@/lib/store'
import Logo from './Logo'
const NAV=[['/dashboard','🏠','Главная'],['/tasks','📋','Задания'],['/my-tasks','✅','Мои задания'],['/withdraw','👛','Баланс и вывод'],['/referral','👥','Рефералы'],['/payouts','⚡','Последние выплаты'],['/help','💬','Новости и помощь'],['/profile','⚙️','Профиль']]
const BIZ=[['/business/create-task','Создать задание'],['/business/review','Проверка результатов'],['/business/balance','Рекламный баланс']]
const BAR=[['/tasks','🔎','Задания'],['/my-tasks','📋','Мои'],['/business/create-task','+','Создать'],['/withdraw','💰','Деньги'],['/profile','👤','Профиль']]
const PUB=['/','/login','/register','/business']
type Me={name:string}|null|undefined
export default function Shell({children}:{children:React.ReactNode}){const p=usePathname();const r=useRouter();const {s}=useApp()
const [open,so]=useState(false);const [biz,sb]=useState(false);const [menu,sm2]=useState(false);const [me,sm]=useState<Me>(undefined);const [q,sq]=useState('');const ref=useRef<HTMLInputElement>(null)
useEffect(()=>{fetch('/api/auth/me').then(x=>x.json()).then(d=>sm(d.user)).catch(()=>sm(null))},[p])
useEffect(()=>{so(false);sm2(false);sb(p.startsWith('/business/'))},[p])
useEffect(()=>{const h=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();ref.current?.focus()}};addEventListener('keydown',h);return()=>removeEventListener('keydown',h)},[])
const logout=async()=>{await fetch('/api/auth/logout',{method:'POST'});location.href='/'}
const pub=PUB.includes(p)||p.startsWith('/tasko-admin')
const guest=me===null&&<><Link href="/login" className="text-sm">Войти</Link><Link href="/register" className="btn !py-1.5 !px-4 !text-sm">Регистрация</Link></>
if(pub)return<><header className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 py-4"><Logo/><div className="flex items-center gap-4 text-sm">{me&&<Link href="/dashboard" className="font-bold">Кабинет</Link>}{!me&&<Link href="/tasks">Задания</Link>}{guest}{me&&<button onClick={logout} className="underline">Выйти</button>}</div></header>
<main className="max-w-6xl mx-auto px-4 md:px-8 py-4">{children}</main></>
const fix=s.subs.filter(x=>x.status==='fix').length
const ad=(side:string)=><div className="hidden min-[1700px]:flex w-[220px] shrink-0 sticky top-20 h-[600px] rounded-2xl bg-blue-50 border border-dashed border-blue-200 text-blue-300 text-center items-center justify-center" aria-label={side}>Рекламное место</div>
const item=(h:string,i:string,n:string)=><Link key={h} href={h} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${p===h?'bg-blue-50 text-brand font-semibold':'hover:bg-soft'}`}><span className="w-6 text-center">{i}</span>{n}</Link>
return<><header className="sticky top-0 z-40 bg-white border-b border-[#e6ecf5] h-14 flex items-center gap-4 px-4"><button className="md:hidden text-2xl" aria-label="Меню" onClick={()=>so(!open)}>{open?'✕':'☰'}</button><Logo/>
<form className="hidden sm:flex flex-1 max-w-md mx-auto" onSubmit={e=>{e.preventDefault();r.push('/tasks?q='+encodeURIComponent(q))}}><input ref={ref} className="inp !py-2 !rounded-full !bg-soft" placeholder="Поиск заданий, категорий… (Ctrl+K)" value={q} onChange={e=>sq(e.target.value)}/></form>
<div className="ml-auto flex items-center gap-4">{guest}{me&&<><Link href="/my-tasks" aria-label="Уведомления" className="relative text-xl">🔔{fix>0&&<span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1.5">{fix}</span>}</Link>
<div className="relative"><button onClick={()=>sm2(!menu)} className="flex items-center gap-2 text-sm font-semibold"><span className="w-8 h-8 rounded-full bg-brand text-white grid place-items-center">{me.name[0]}</span><span className="hidden sm:inline">{me.name}</span>▾</button>
{menu&&<div className="absolute right-0 mt-2 w-40 card !p-2 text-sm"><Link href="/profile" className="block px-3 py-2 rounded-lg hover:bg-soft">Профиль</Link><button onClick={logout} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-soft">Выйти</button></div>}</div></>}</div></header>
<div className="mx-auto max-w-[1760px] flex gap-4 p-4">{ad('left')}
<div className="flex-1 flex gap-5 max-w-6xl mx-auto w-full min-w-0">
<aside className={`${open?'block':'hidden'} md:block fixed md:static inset-x-0 top-14 bottom-0 z-30 bg-milk p-4 pb-28 md:p-0 overflow-y-auto md:w-60 md:shrink-0 text-sm`}><div className="md:card md:!p-3 space-y-1">
{NAV.slice(0,3).map(([h,i,n])=>item(h,i,n))}
<button onClick={()=>sb(!biz)} className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-soft"><span className="w-6 text-center">📣</span>Заказчикам<span className="ml-auto text-ink/40">{biz?'▾':'▸'}</span></button>
{biz&&BIZ.map(([h,n])=><Link key={h} href={h} className={`block rounded-xl pl-12 pr-3 py-2 ${p===h?'bg-blue-50 text-brand font-semibold':'hover:bg-soft'}`}>{n}</Link>)}
{NAV.slice(3).map(([h,i,n])=>item(h,i,n))}</div>
<div className="card mt-4 bg-gradient-to-br from-blue-50 to-white"><b>👑 Больше заданий — выше доход!</b><p className="text-xs text-ink/60 my-2">Приглашайте друзей и получайте бонус до 10% от их заработка.</p><Link href="/referral" className="btn w-full !py-2">Пригласить</Link></div></aside>
<main className="flex-1 min-w-0">{children}</main></div>{ad('right')}</div>
<nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t flex justify-around items-end pb-1 pt-1">{BAR.map(([h,i,n])=>i==='+'?<Link key={h} href={h} aria-label={n} className="-mt-6 w-14 h-14 rounded-full bg-brand text-white grid place-items-center text-3xl font-black shadow-card">+</Link>:<Link key={h} href={h} className={`flex flex-col items-center text-[11px] px-2 py-1 ${p===h?'font-bold text-brand':'text-ink/50'}`}><span className="text-xl">{i}</span>{n}</Link>)}</nav></>}
