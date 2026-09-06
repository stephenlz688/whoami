import { skillGroups } from '@/data/profile'
import Reveal from './Reveal'

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <Reveal>
        <div className="sec-head">
          <div className="sec-label">Skills</div>
          <h2>技术栈</h2>
        </div>
      </Reveal>

      <div className="grid-4">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 4) * 80}>
            <div className="tile glass">
              <div className="kicker">{g.kicker}</div>
              <h4>{g.title}</h4>
              <p>{g.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
