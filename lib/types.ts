export type Cat='Тестирование'|'Опросы'|'Проверка сайтов'|'Приложения'|'Фото'|'Локальные'|'Другое'
export interface Task{id:string;title:string;cat:Cat;desc:string;reward:number;minutes:number;level:'Легко'|'Средне'|'Сложно';seats:number;taken:number;employer:string;rating:number;steps:string[];needShot?:boolean}
export type SubStatus='review'|'approved'|'rejected'|'fix'
export interface Submission{id:string;taskId:string;title:string;worker:string;text:string;status:SubStatus;reward:number;flag:'ok'|'check'|'blocked';stars?:number;reason?:string;img?:string}
export interface Complaint{id:string;kind:string;text:string;taskId:string;status:'open'|'closed'}
export interface User{id:string;name:string;balance:number;done:number;rating:number;blocked:boolean;since:string}
export type WdStatus='processing'|'paid'|'rejected'
export interface Withdrawal{id:string;amount:number;method:'СБП'|'Карта';details:string;status:WdStatus;date:string}
export interface Op{id:string;text:string;amount:number}
export interface State{balance:number;tasks:Task[];active:{taskId:string;startedAt:number}|null;subs:Submission[];wds:Withdrawal[];ops:Op[];toast:string|null;complaints:Complaint[];users:User[];ad:number}
