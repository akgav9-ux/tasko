import './globals.css'
import {Provider} from '@/lib/store'
import Shell from '@/components/Shell'
export const metadata={title:'TASKO — Сделал → получил',description:'Микрозадания от реальных компаний',manifest:'/manifest.webmanifest'}
export default function R({children}:{children:React.ReactNode}){return<html lang="ru"><body><Provider><Shell>{children}</Shell></Provider></body></html>}
