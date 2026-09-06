'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'

/**
 * 光标跟随高光。
 *
 * 毛玻璃的美感来自「背后有光」，所以鼠标移上去时让高光跟着走，
 * 玻璃会显出厚度——这比单纯的上浮位移更贴材质。
 *
 * 关键：坐标写进 CSS 变量，不走 React state。
 * 否则每次 mousemove 都会触发重渲染，鼠标一动就卡。
 */
export default function Spotlight({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} className={`spotlight${className ? ' ' + className : ''}`} onMouseMove={handleMove}>
      {children}
    </div>
  )
}
