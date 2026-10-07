import type { Config } from 'tailwindcss'
export default { content:['./app/**/*.tsx','./components/**/*.tsx'],
theme:{extend:{colors:{ink:'#101828',milk:'#f4f7fc',money:'#12b76a',soft:'#eef2f9',brand:'#2563eb'},boxShadow:{card:'0 2px 12px rgba(30,64,120,.06)'}}},plugins:[] } satisfies Config
