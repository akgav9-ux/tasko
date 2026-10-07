import Link from 'next/link'
export default function B(){return<div className="space-y-6"><h1 className="text-4xl font-black">Нужны реальные люди для выполнения задач?</h1><p className="text-ink/60">Размещайте задания и получайте результаты от подходящих исполнителей.</p>
<Link href="/business/create-task" className="btn btn-g">Создать задание</Link>
<div className="flex gap-3"><Link href="/business/review" className="btn">Проверка результатов</Link><Link href="/business/balance" className="btn">Баланс</Link></div>
<p className="text-sm text-ink/60">Правила: запрещены задания на мошенничество, накрутку отзывов, фальшивые документы, спам и обход ограничений сервисов.</p>
<div className="grid md:grid-cols-3 gap-4">{['Протестировать приложение','Проверить сайт','Провести опрос','Проверить товар','Сделать фото','Собрать обратную связь','Провести исследование'].map(x=><div key={x} className="card">{x}</div>)}</div></div>}
