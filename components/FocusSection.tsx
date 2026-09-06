import { focusItems } from '@/data/profile'
import { ANIMALS } from './icons/Animals'
import Reveal from './Reveal'

export default function FocusSection() {
  return (
    <section id="about" className="section">
      <Reveal>
        <div className="sec-head">
          <div className="sec-label">Focus</div>
          <h2>我做哪一类事</h2>
          <p>从协议设计到界面实现，中间那几层我都能自己走完。</p>
        </div>
      </Reveal>

      <div className="grid-3">
        {focusItems.map((item, i) => {
          const Icon = ANIMALS[item.icon]
          return (
            <Reveal key={item.title} delay={(i % 3) * 80}>
              <div className="tile glass">
                <Icon size={44} className="animal" />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
