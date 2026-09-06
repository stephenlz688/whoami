'use client'

import { useEffect, useState } from 'react'

/**
 * 顶部阅读进度条。Butterfly 用 pace.js 做这个，这里用 scaleX 自己实现。
 *
 * 用 transform 而不是 width——width 每帧都会触发重排，scaleX 只走合成层。
 */
export default function ScrollProgress() {
  const [ratio, setRatio] = useState(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setRatio(max > 0 ? Math.min(1, doc.scrollTop / max) : 0)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress-bar" style={{ transform: `scaleX(${ratio})` }} />
    </div>
  )
}
