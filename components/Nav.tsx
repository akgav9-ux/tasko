'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useApp} from '@/lib/store'
const L=[['/tasks','Задания'],['/dashboard','Мои'],['/business/create-task','+'],['/withdraw','Деньги'],['/profile','Профиль']]
export default function Nav(){const p=usePathname();const {s}=useApp()
return<>
<header className="hidden md:flex items-center justify-between px-8 py-4 max-w-6xl mx-auto"><Link href="/" className="text-2xl font-black">TASKO</Link>
<nav className="flex gap-6 items-center">{[['/tasks','Задания'],['/dashboard','Кабинет'],['/payouts','Выплаты'],['/help','Помощь'],['/profile','Профиль'],['/business','Заказчикам']].map(([h,t])=><Link key={h} href={h} className={p.startsWith(h)?'font-bold':'text-ink/60'}>{t}</Link>)}
<Link href="/withdraw" className="btn btn-g !py-2">{s.balance} ₽</Link></nav></header>
<nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t flex justify-around py-2 z-40">{L.map(([h,t])=><Link key={h} href={h} className={`px-3 py-2 rounded-xl text-sm ${t==='+'?'bg-ink text-white font-bold':p.startsWith(h)?'font-bold':'text-ink/60'}`}>{t}</Link>)}</nav></>}
