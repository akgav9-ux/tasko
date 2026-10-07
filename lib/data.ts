import {users} from './users'
import type {Task,Cat,State} from './types'
const T:[string,Cat,number,number][]=[['Протестировать мобильное приложение','Приложения',250,25],['Опрос о новом продукте','Опросы',80,10],['Проверка работы сайта','Проверка сайтов',100,15],['Сфотографировать витрину','Фото',120,15],['Тест регистрации в сервисе','Тестирование',150,20],['Оценить интерфейс доставки','Приложения',180,20],['Опрос о привычках покупок','Опросы',60,8],['Проверить цену в магазине','Локальные',90,20],['Найти ошибки на лендинге','Проверка сайтов',140,18],['Записать отзыв-фидбек','Другое',70,10]]
const E=['Лента Pro','Nova Bank','Заря','ПростоДоставка','Кофемания+']
export const tasks:Task[]=Array.from({length:20},(_,i)=>{const [t,c,r,m]=T[i%10];const s=20+(i%4)*10
return{id:String(i+1),title:t+(i>=10?' №2':''),cat:c,desc:'Короткое задание от реальной компании. Выполните шаги и отправьте результат.',reward:r+(i>=10?10:0),minutes:m,level:(['Легко','Средне','Сложно'] as const)[i%3],seats:s,taken:s-5-(i%9),employer:E[i%5],rating:4+((i*7)%10)/10,steps:['Открыть ссылку или приложение','Выполнить 3 действия','Ответить на вопросы','Приложить скриншот','Отправить результат']}})
export const initial:State={balance:147,ad:2000,tasks,active:null,toast:null,complaints:[],users,
subs:[{id:'s1',taskId:'1',title:'Тест приложения',worker:'#4821',text:'Всё работает, скриншот приложен.',status:'review',reward:150,flag:'ok'},{id:'s2',taskId:'2',title:'Опрос',worker:'#3377',text:'Ответы по пунктам 1–5.',status:'review',reward:80,flag:'check'}],
wds:[{id:'w1',amount:500,method:'СБП',details:'+7 900 ••• 12-34',status:'paid',date:'01.10.2026'},{id:'w2',amount:250,method:'Карта',details:'**** 4821',status:'paid',date:'20.09.2026'},{id:'w3',amount:100,method:'СБП',details:'+7 900 ••• 12-34',status:'processing',date:'05.10.2026'}],
ops:[{id:'o1',text:'Тест приложения',amount:150},{id:'o2',text:'Опрос',amount:80},{id:'o3',text:'Проверка сайта',amount:17}]}
