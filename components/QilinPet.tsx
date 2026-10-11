'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

/**
 * 首屏 3D 小麒麟（真 GLB 模型，可拖动旋转）。
 *
 * 用 model-viewer 渲染：它内置 WebGL 相机控制，拖动即转、滚轮即缩放，
 * 不需要自己写 three.js 的轨道控制器。bundle 已下载到 public/本地加载，
 * 不走 CDN——GitHub Pages 在国内访问 Google CDN 不稳。
 *
 * 约束（design-spec.md 七、十）：
 * - 静态站是 output:'export'，模型放 public/ 走裸绝对路径，要手拼 basePath
 * - aria-hidden：纯装饰，不进无障碍树
 * - prefers-reduced-motion 下关掉自动旋转与入场
 * - 隐藏原生的「拖动提示」角标，改用自己的玻璃提示条
 */
export default function QilinPet() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const wrap = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  // 系统开了「减少动态效果」就不自动转，但保留手动拖动
  const [calm, setCalm] = useState(false)

  // 脚本加载完再挂模型；web component 升级失败就保持隐藏，不留空白
  useEffect(() => {
    setCalm(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    const check = () => {
      if (customElements.get('model-viewer')) setReady(true)
    }
    check()
    const t = setInterval(check, 200)
    const stop = setTimeout(() => clearInterval(t), 10000)
    return () => {
      clearInterval(t)
      clearTimeout(stop)
    }
  }, [])

  return (
    <>
      <Script src={`${base}/model-viewer.min.js`} strategy="afterInteractive" />

      <div
        ref={wrap}
        className={`pet3d${ready ? ' is-ready' : ''}`}
        aria-hidden="true"
      >
        <model-viewer
          className="pet3d-mv"
          src={`${base}/qilin.glb`}
          alt="一只可爱的薄荷绿小麒麟手办"
          camera-controls=""
          interaction-prompt="none"
          {...(calm
            ? {}
            : { 'auto-rotate': '', 'rotation-per-second': '18deg' })}
          camera-orbit="35deg 72deg 105%"
          shadow-intensity="0.5"
          shadow-softness="0.9"
          exposure="1.05"
          environment-image="neutral"
          interaction-prompt-style="none"
          touch-action="none"
        />

        {/* 拖动提示：model-viewer 自带的角标不符合这套设计的调性，自己写一个 */}
        <span className="pet3d-tip">拖动转一转</span>
      </div>
    </>
  )
}