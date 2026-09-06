import BackgroundOrbs from '@/components/BackgroundOrbs'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import FocusSection from '@/components/FocusSection'
import ExperienceSection from '@/components/ExperienceSection'
import SkillsSection from '@/components/SkillsSection'
import NotesSection from '@/components/NotesSection'
import AwardsSection from '@/components/AwardsSection'
import ContactSection from '@/components/ContactSection'
import SiteFooter from '@/components/SiteFooter'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'

export default function Home() {
  return (
    <>
      <BackgroundOrbs />
      <ScrollProgress />
      <Nav />
      <main>
        {/* 首屏单独放在 .wrap 之外：它要横向铺满整个视口，不受 1080px 容器限制。
            内容宽度由 Hero 内部的 .hero-inner 自己锁，跟下方区块保持对齐。 */}
        <Hero />
        <div className="wrap">
          <FocusSection />
          <ExperienceSection />
          <SkillsSection />
          <NotesSection />
          <AwardsSection />
          <ContactSection />
          <SiteFooter />
        </div>
      </main>
      <BackToTop />
    </>
  )
}
