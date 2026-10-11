import type { Metadata } from 'next'
import './globals.css'
import { profile } from '@/data/profile'

// 部署到 GitHub Pages 子路径时由 CI 注入，本地开发为空串
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.lead,
  // 显式声明图标路径。
  // 注意：metadata.icons 里的相对路径不会自动补 basePath，必须给绝对 URL，
  // 否则子路径部署时会生成 href="/icon.svg"，在 /whoami/ 下依然 404。
  metadataBase: new URL(
    `https://stephenlz688.github.io${basePath}/`
  ),
  icons: {
    icon: [{ url: `${basePath}/icon.svg`, type: 'image/svg+xml' }],
  },
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
