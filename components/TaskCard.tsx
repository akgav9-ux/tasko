import Link from 'next/link'
import {Task} from '@/lib/types'
export default function TaskCard({t}:{t:Task}){return<Link href={`/tasks/${t.id}`} className="card block">
<div className="flex justify-between items-start gap-2"><h3 className="font-bold text-lg">{t.title}</h3><span className="shrink-0 rounded-full bg-money/15 text-money font-black px-3 py-1">{t.reward} ₽</span></div><p className="text-sm text-ink/60 mt-1 line-clamp-2">{t.desc}</p>
<div className="flex gap-3 mt-3 text-sm items-center"><span className="rounded-full bg-soft px-3 py-1">⏱ ~{t.minutes} мин</span><span className="rounded-full bg-soft px-3 py-1">{t.level}</span>{t.needShot&&<span className="rounded-full bg-soft px-3 py-1">📷 скрин</span>}</div>
<div className="text-xs text-ink/60 mt-2">Осталось {t.seats-t.taken} из {t.seats} мест · ⭐ {t.rating.toFixed(1)} {t.employer}</div>
<span className="btn btn-g mt-3 w-full">Выполнить</span></Link>}
