import type { Metadata } from 'next'
import './globals.css'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.lead,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.lead,
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 无 JS 时兜底，保证 .reveal 内容可见 */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}
