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
      <main className="wrap">
        <Hero />
        <FocusSection />
        <ExperienceSection />
        <SkillsSection />
        <NotesSection />
        <AwardsSection />
        <ContactSection />
        <SiteFooter />
      </main>
      <BackToTop />
    </>
  )
}
