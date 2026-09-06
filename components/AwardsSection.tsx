import { awards } from '@/data/profile'
import Reveal from './Reveal'

export default function AwardsSection() {
  return (
    <section id="awards" className="section">
      <Reveal>
        <div className="sec-head">
          <div className="sec-label">Awards</div>
          <h2>竞赛与荣誉</h2>
        </div>
      </Reveal>

      <Reveal>
        <div className="awards glass">
          <div className="aw-list">
            {awards.map((a) => (
              <div className="aw" key={a.name}>
                <b>{a.name}</b>
                <span>{a.level}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
