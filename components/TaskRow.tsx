import Link from 'next/link'
import {Task} from '@/lib/types'
import {CAT} from '@/lib/cats'
export default function TaskRow({t}:{t:Task}){const c=CAT[t.cat];const n={Легко:1,Средне:2,Сложно:3}[t.level]
return<Link href={`/tasks/${t.id}`} className="flex items-center gap-3 px-4 py-3 border-b border-[#eef2f9] last:border-0 hover:bg-blue-50/50 transition">
<span className={`w-10 h-10 rounded-xl grid place-items-center text-xl shrink-0 ${c.bg}`}>{c.e}</span>
<span className="flex-1 min-w-0"><span className={`inline-block text-xs rounded px-2 mr-2 ${c.bg} ${c.tx}`}>{t.cat}</span><b className="block md:inline">{t.title}</b>
<span className="block text-xs text-ink/50 truncate">{t.desc} · осталось {t.seats-t.taken}{t.needShot?' · 📷 скрин':''}</span></span>
<span className="hidden md:block text-xs text-ink/60 w-28">⏱ ~{t.minutes} мин<br/>{'●'.repeat(n)}{'○'.repeat(3-n)} {t.level}</span>
<b className="text-money w-20 text-right">{t.reward.toFixed(2).replace('.',',')} ₽</b>
<span className="btn !py-2 !px-4 !text-sm hidden sm:inline-flex">Выполнить →</span></Link>}
