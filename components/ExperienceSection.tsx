import { experiences, profile } from '@/data/profile'
import Reveal from './Reveal'
import Spotlight from './Spotlight'

export default function ExperienceSection() {
  return (
    <section id="work" className="section">
      <Reveal>
        <div className="sec-head">
          <div className="sec-label">Experience</div>
          <h2>项目与实习</h2>
          <p>两段实打实的经历，都写得出细节。</p>
        </div>
      </Reveal>

      <div className="grid-work">
        {experiences.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 80}>
            <Spotlight className="work glass">
              <div className="thumb" style={{ background: item.gradient }}>
                <span className="chip">{item.chip}</span>
              </div>
              <div className="work-body">
                <h4>{item.title}</h4>
                <div className="role">{item.role}</div>
                <p>{item.desc}</p>
                <div className="work-year">{item.period}</div>
              </div>
            </Spotlight>
          </Reveal>
        ))}

        <Reveal delay={160}>
          <article className="cta-card glass">
            <h4>代码都在这儿</h4>
            <p>更多练手项目、课程作业和正在写的东西，放在 GitHub 上。</p>
            <a
              className="go"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              去 GitHub 看看 ↗
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
