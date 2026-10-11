'use client'

import { useEffect, useRef } from 'react'

/**
 * 首屏 3D 小麒麟。
 *
 * 刻意不用 WebGL / three.js：这套设计全靠 backdrop-filter 和半透明叠色，
 * 塞一个重引擎进来性价比太低。这里用 CSS `transform-style: preserve-3d`
 * 拼几何体——每个部位是「正面 + 背面偏移」两层，转动时有真实视差，
 * 体积感来自厚度而不是光照。
 *
 * 约束（design-spec.md 七、九、十）：
 * - 几何只用圆和椭圆
 * - 深色 #3D4A57 只出现在眼睛
 * - 腮红统一 #EFA8B2
 * - 所有动效只用一个缓动曲线
 * - 鼠标坐标写 CSS 变量，不进 React state
 * - prefers-reduced-motion 下完全静止
 */
export default function QilinPet() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // 系统开了「减少动态效果」就别跟鼠标了
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const onMove = (e: PointerEvent) => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        // 归一化到 -1 ~ 1，限幅避免边缘处转过头
        const nx = (e.clientX / window.innerWidth - 0.5) * 2
        const ny = (e.clientY / window.innerHeight - 0.5) * 2
        const cx = Math.max(-1, Math.min(1, nx))
        const cy = Math.max(-1, Math.min(1, ny))
        el.style.setProperty('--px', cx.toFixed(3))
        el.style.setProperty('--py', cy.toFixed(3))
        ticking = false
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="pet" ref={ref} aria-hidden="true">
      <div className="pet-stage">
        <div className="pet-shadow" />
        <div className="pet-body">
          {/* 尾巴 */}
          <div className="q-tail">
            <i className="q-tail-a" />
            <i className="q-tail-b" />
          </div>

          {/* 四条腿 */}
          <div className="q-legs">
            <i className="q-leg q-leg-bl" />
            <i className="q-leg q-leg-fl" />
            <i className="q-leg q-leg-br" />
            <i className="q-leg q-leg-fr" />
          </div>

          {/* 躯干 */}
          <div className="q-torso">
            <i className="q-torso-back" />
            <i className="q-torso-belly" />
            <i className="q-torso-front" />
          </div>

          {/* 颈与鬃 */}
          <div className="q-neck">
            <i className="q-neck-back" />
            <i className="q-neck-front" />
          </div>
          <div className="q-mane">
            <i className="q-mane-back" />
            <i className="q-mane-front" />
          </div>

          {/* 头 */}
          <div className="q-head">
            <i className="q-ear q-ear-l" />
            <i className="q-ear q-ear-r" />
            <i className="q-horn q-horn-l" />
            <i className="q-horn q-horn-r" />
            <i className="q-skull-back" />
            <i className="q-skull">
              <b className="q-eye q-eye-l" />
              <b className="q-eye q-eye-r" />
              <b className="q-blush q-blush-l" />
              <b className="q-blush q-blush-r" />
              <b className="q-muzzle">
                <em className="q-nose" />
                <em className="q-mouth" />
              </b>
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}