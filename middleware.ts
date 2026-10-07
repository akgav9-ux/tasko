import {NextResponse,NextRequest} from 'next/server'
import {checkToken} from '@/lib/adminAuth'
import {readSession} from '@/lib/session'
export async function middleware(r:NextRequest){const p=r.nextUrl.pathname
if(p.startsWith('/tasko-admin')||p.startsWith('/api/admin')){
if(p==='/tasko-admin/login'||p==='/api/admin/login')return NextResponse.next()
if(await checkToken(r.cookies.get('tasko_admin')?.value))return NextResponse.next()
return p.startsWith('/api')?NextResponse.json({error:'unauthorized'},{status:401}):NextResponse.redirect(new URL('/',r.url))}
if(await readSession(r.cookies.get('tasko_session')?.value))return NextResponse.next()
return NextResponse.redirect(new URL('/login?next='+encodeURIComponent(p),r.url))}
export const config={matcher:['/tasko-admin/:path*','/api/admin/:path*','/dashboard','/withdraw','/profile','/referral','/my-tasks','/business/:path*']}
