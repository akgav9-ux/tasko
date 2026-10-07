import type { Config } from 'tailwindcss'
export default { content:['./app/**/*.tsx','./components/**/*.tsx'],
theme:{extend:{colors:{ink:'#16181d',milk:'#faf9f6',money:'#16c25a',soft:'#f1f1ee'},borderRadius:{'3xl':'1.75rem'},boxShadow:{card:'0 8px 30px rgba(0,0,0,.06)'}}},plugins:[] } satisfies Config
