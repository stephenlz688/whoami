import type { NextConfig } from 'next'

// 部署到 GitHub Pages 子路径时由 CI 注入，例如 /whoami
// 本地开发不设置此变量，保持根路径，开发体验不受影响
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 全站为静态内容，导出纯 HTML/CSS/JS，不需要 Node 服务器
  output: 'export',

  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',

  // GitHub Pages 不会把 /whoami 自动解析到 /whoami.html
  // 加斜杠后 Next 会生成 /whoami/index.html 这类目录结构
  trailingSlash: true,

  // 静态托管下 Next 的图片优化服务不可用
  // 本项目全部插画都是内联 SVG，未使用 next/image，此处仅为保险
  images: { unoptimized: true },
}

export default nextConfig
