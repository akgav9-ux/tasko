'use client'
import Link from 'next/link'
import {useApp} from '@/lib/store'
export default function Home(){const {s}=useApp()
return<div className="space-y-12">
<section className="grid md:grid-cols-2 gap-8 items-center py-6">
<div><div className="text-sm font-bold text-money">Сделал → получил.</div><h1 className="text-4xl md:text-6xl font-black mt-2">TASKO<br/>Выполняй задания. Получай деньги.</h1>
<p className="mt-4 text-ink/60">Небольшие задания от реальных компаний. Выбирай подходящие, выполняй и получай вознаграждение.</p>
<div className="flex gap-3 mt-6 flex-wrap"><Link href="/tasks" className="btn btn-g">Найти задания</Link><Link href="/business/create-task" className="btn">Разместить задание</Link></div></div>
<div className="card space-y-3"><div className="text-3xl font-black">💰 {s.balance} ₽</div><div className="text-sm text-ink/60 -mt-2">доступно к выводу</div>
{s.tasks.slice(0,3).map(t=><Link key={t.id} href={`/tasks/${t.id}`} className="flex justify-between bg-soft rounded-2xl p-3"><span>{t.title}<br/><small className="text-ink/60">{t.minutes} минут</small></span><b className="text-money">+{t.reward} ₽</b></Link>)}</div></section>
<section className="card flex justify-between items-center flex-wrap gap-2"><span>Смотрите, как проходят выплаты</span><Link href="/payouts" className="btn">Последние выплаты</Link></section>
<section><h2 className="text-2xl font-black mb-4">Как это работает</h2><div className="grid md:grid-cols-3 gap-4">{['Найди задание','Выполни','Получи деньги'].map((x,i)=><div key={x} className="card"><div className="text-money font-black text-3xl">{i+1}</div>{x}</div>)}</div></section>
<section className="card bg-ink text-white"><h2 className="text-2xl font-black">Нужны реальные люди?</h2><p className="text-white/70 my-2">Получите обратную связь, тестирование и выполнение задач от пользователей.</p><Link href="/business/create-task" className="btn btn-g">Создать задание</Link></section></div>}
