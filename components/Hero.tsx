import { profile } from '@/data/profile'
import Reveal from './Reveal'

export default function Hero() {
  const { headline } = profile

  return (
    <div className="hero">
      <Reveal>
        <div className="tag">
          <span className="dot" />
          {profile.tagline}
        </div>

        <h1>
          {headline.line1}
          <br />
          {headline.prefix}
          <em>{headline.em}</em>
        </h1>

        <p className="lead">{profile.lead}</p>

        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">
            看看经历 <span>→</span>
          </a>
          <a
            className="btn btn-ghost"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span>↗</span>
          </a>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <aside className="card-me glass">
          <div className="avatar">{profile.name.charAt(0)}</div>
          <h3>{profile.name}</h3>
          <div className="meta">
            现居{profile.location} · {profile.status}
          </div>

          <div className="specs">
            {profile.specs.map((s) => (
              <div className="spec" key={s.label}>
                <span>{s.label}</span>
                <b>{s.value}</b>
              </div>
            ))}
          </div>

          <a
            className="gh"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile.githubLabel} ↗
          </a>
        </aside>
      </Reveal>
    </div>
  )
}
