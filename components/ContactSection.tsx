import { profile } from '@/data/profile'
import { Penguin } from './icons/Animals'
import Reveal from './Reveal'

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <Reveal>
        <div className="contact glass">
          <Penguin size={72} className="mascot mascot--center" />
          <h2>聊聊？</h2>
          <p>
            技术上的取舍、C++ 踩过的坑，或者只是一个还没想清楚的想法，都欢迎找我。
          </p>
          <div className="contact-links">
            <a className="mlink" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a
              className="mlink"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
