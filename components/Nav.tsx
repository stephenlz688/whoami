'use client'

import { useEffect, useState } from 'react'
import { navLinks, profile } from '@/data/profile'

/** 所有需要高亮的锚点（含末尾的联系按钮） */
const SPY_IDS = [...navLinks.map((l) => l.href.slice(1)), 'contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  // 滚动后导航收紧：毛玻璃更实、加一道阴影
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setScrolled(window.scrollY > 16)
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

  // 区块高亮：只把视口中间那一条带当作判定区，同时只可能命中一个
  useEffect(() => {
    const els = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-in">
        <div className="logo">
          {profile.name} <span>{profile.nameEn}</span>
        </div>
        <div className="nav-links">
          {navLinks.slice(0, 2).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href.slice(1) ? 'active' : undefined}
            >
              {l.label}
            </a>
          ))}
          {navLinks.slice(2).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`hide-sm${active === l.href.slice(1) ? ' active' : ''}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`nav-cta${active === 'contact' ? ' active' : ''}`}
          >
            联系
          </a>
        </div>
      </div>
    </nav>
  )
}
