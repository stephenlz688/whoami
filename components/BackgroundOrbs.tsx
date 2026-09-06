'use client'

import { useEffect, useRef } from 'react'

/**
 * 背景柔光。固定定位，blur(90px)，最多 4 个。
 *
 * 加了视差：滚动时各光斑以不同速度反向位移，让光真的「流动」起来。
 * 这是整套动效里最关键的一条——毛玻璃的质感来自背后透出的光，
 * 光会动，玻璃才像玻璃。
 *
 * 性能：requestAnimationFrame 节流 + translate3d 走 GPU 合成层，不触发重排。
 * prefers-reduced-motion 下完全不动。
 */

/** 4 个光斑的视差速度，正负代表方向 */
const SPEED = [0.06, -0.1, 0.08, -0.05]

export default function BackgroundOrbs() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0

    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const y = window.scrollY
      const orbs = el.children
      for (let i = 0; i < orbs.length; i += 1) {
        const node = orbs[i] as HTMLElement
        node.style.transform = `translate3d(0, ${(y * SPEED[i]).toFixed(2)}px, 0)`
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
    </div>
  )
}
