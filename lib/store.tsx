'use client'
import {createContext,useContext,useEffect,useReducer,ReactNode} from 'react'
import {State,Task,Submission} from './types'
import {initial} from './data'
// Единая точка данных. При подключении backend заменяются только action-функции (API-вызовы).
type A={t:'load';s:State}|{t:'start';id:string}|{t:'submit';text:string;img?:string}|{t:'review';id:string;ok:boolean;reason?:string}|{t:'block';id:string}|{t:'closec';id:string}|{t:'withdraw';amount:number;method:'СБП'|'Карта';details:string}|{t:'wd';id:string;ok:boolean}|{t:'create';task:Task}|{t:'toast';m:string|null}|{t:'fix';id:string}|{t:'rate';id:string;stars:number}|{t:'complain';kind:string;text:string;taskId:string}|{t:'topup';amount:number}|{t:'transfer';amount:number}|{t:'reset'}
let n=100;const id=()=>'x'+n++
function red(s:State,a:A):State{
if(s.users.find(u=>u.id==='0147')?.blocked&&['start','submit','withdraw','create'].includes(a.t))return{...s,toast:'Аккаунт заблокирован'}
switch(a.t){
case 'load':return a.s
case 'reset':return initial
case 'toast':return{...s,toast:a.m}
case 'start':return{...s,active:{taskId:a.id,startedAt:Date.now()},toast:'Задание начато'}
case 'submit':{const t=s.tasks.find(x=>x.id===s.active?.taskId);if(!t)return s
const sub:Submission={id:id(),taskId:t.id,title:t.title,worker:'#0147',text:a.text,img:a.img,status:'review',reward:t.reward,flag:Date.now()-s.active!.startedAt<10000?'check':'ok'}
return{...s,active:null,subs:[sub,...s.subs],toast:'Результат отправлен на проверку'}}
case 'review':{const sub=s.subs.find(x=>x.id===a.id);if(!sub||(sub.status!=='review'&&sub.status!=='fix'))return s
return{...s,subs:s.subs.map(x=>x.id===a.id?{...x,status:a.ok?'approved':'rejected',reason:a.reason}:x),
balance:a.ok?s.balance+sub.reward:s.balance,ops:a.ok?[{id:id(),text:sub.title,amount:sub.reward},...s.ops]:s.ops,toast:a.ok?`+${sub.reward} ₽ исполнителю`:'Отклонено'}}
case 'withdraw':{const pend=s.wds.filter(w=>w.status==='processing').reduce((x,w)=>x+w.amount,0)
if(a.amount<100||a.amount>s.balance-pend||!a.details.trim())return{...s,toast:'Недостаточно средств или не указаны реквизиты'}
return{...s,wds:[{id:id(),amount:a.amount,method:a.method,details:a.details,status:'processing',date:new Date().toLocaleDateString('ru')},...s.wds],toast:'Заявка создана'}}
case 'wd':{const w=s.wds.find(x=>x.id===a.id);if(!w||w.status!=='processing')return s
if(a.ok&&s.balance<w.amount)return{...s,toast:'Баланс меньше суммы заявки'}
return{...s,wds:s.wds.map(x=>x.id===a.id?{...x,status:a.ok?'paid':'rejected'}:x),balance:a.ok?s.balance-w.amount:s.balance,toast:a.ok?'Отмечено как выплачено':'Заявка отклонена'}}
case 'fix':return{...s,subs:s.subs.map(x=>x.id===a.id?{...x,status:'fix'}:x),toast:'Запрошено исправление'}
case 'rate':return{...s,subs:s.subs.map(x=>x.id===a.id?{...x,stars:a.stars}:x),toast:'Оценка сохранена'}
case 'complain':return{...s,complaints:[{id:id(),kind:a.kind,text:a.text,taskId:a.taskId,status:'open'},...s.complaints],toast:'Жалоба отправлена'}
case 'block':return{...s,users:s.users.map(u=>u.id===a.id?{...u,blocked:!u.blocked}:u),toast:'Статус пользователя изменён'}
case 'closec':return{...s,complaints:s.complaints.map(c=>c.id===a.id?{...c,status:'closed'}:c)}
case 'topup':return{...s,ad:s.ad+a.amount,toast:'Рекламный баланс пополнен (demo)'}
case 'transfer':{const pend=s.wds.filter(w=>w.status==='processing').reduce((x,w)=>x+w.amount,0)
if(a.amount<1||a.amount>s.balance-pend)return{...s,toast:'Недостаточно средств'}
return{...s,balance:s.balance-a.amount,ad:s.ad+a.amount,toast:'Рекламный баланс пополнен'}}
case 'create':{const c=Math.round(a.task.reward*a.task.seats*1.15);if(s.ad<c)return{...s,toast:'Недостаточно средств на рекламном балансе'}
return{...s,ad:s.ad-c,tasks:[a.task,...s.tasks],toast:'Задание опубликовано (demo)'}}}}
const C=createContext<{s:State;d:(a:A)=>void}>(null as never)
export const useApp=()=>useContext(C)
export function Provider({children}:{children:ReactNode}){
const [s,d]=useReducer(red,initial)
useEffect(()=>{try{const r=localStorage.getItem('tasko');if(r)d({t:'load',s:{...initial,...JSON.parse(r)}})}catch{}},[])
useEffect(()=>{if(s!==initial)try{localStorage.setItem('tasko',JSON.stringify({...s,toast:null}))}catch{}},[s])
useEffect(()=>{if(s.toast){const h=setTimeout(()=>d({t:'toast',m:null}),2500);return()=>clearTimeout(h)}},[s.toast])
return <C.Provider value={{s,d}}>{children}{s.toast&&<div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 bg-ink text-white rounded-2xl px-5 py-3 shadow-card z-50">{s.toast}</div>}</C.Provider>}
