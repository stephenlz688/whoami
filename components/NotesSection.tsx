import { notes } from '@/data/profile'
import { Bear } from './icons/Animals'
import Reveal from './Reveal'

export default function NotesSection() {
  return (
    <section id="notes" className="section">
      <Reveal>
        <div className="sec-head sec-head--mascot">
          <div>
            <div className="sec-label">Notes</div>
            <h2>技术笔记</h2>
            <p>做项目时想明白的事，我打算一篇篇写下来。选题在这儿，正在写。</p>
          </div>
          <Bear size={56} className="mascot" />
        </div>
      </Reveal>

      <div className="notes">
        {notes.map((n) => (
          <Reveal key={n.title}>
            <div className="note">
              <span className="t">{n.title}</span>
              <span className="state">{n.state}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
