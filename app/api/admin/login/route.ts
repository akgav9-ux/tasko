import {NextResponse} from 'next/server'
import {makeToken} from '@/lib/adminAuth'
export async function POST(req:Request){const {password}=await req.json().catch(()=>({password:''}));const pw=process.env.ADMIN_PASSWORD
if(!pw||!process.env.ADMIN_SECRET||password!==pw)return NextResponse.json({ok:false},{status:401})
const res=NextResponse.json({ok:true})
res.cookies.set('tasko_admin',await makeToken(),{httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',path:'/',maxAge:8*3600})
return res}
