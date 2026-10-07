import {User} from './types'
const N=['Анна','Игорь','Мария','Олег','Света','Дмитрий','Ольга','Павел','Елена','Артём']
export const users:User[]=[{id:'0147',name:'Вы (demo)',balance:0,done:127,rating:4.9,blocked:false,since:'12.03.2026'},...N.map((name,i)=>({id:String(4821-i*37),name,balance:(i*83)%400,done:20+i*13,rating:4+((i*3)%10)/10,blocked:false,since:`0${i+1}.0${(i%8)+1}.2026`}))]
