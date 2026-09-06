import { profile } from '@/data/profile'
import Reveal from './Reveal'

export default function Hero() {
  const { headline } = profile
  // 部署到 GitHub Pages 子路径 /whoami 时由 CI 注入；本地开发为空。
  // public/ 下的素材是裸的绝对路径，Next 不会自动加 basePath，必须手动拼。
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  return (
    <div className="hero">
      {/* 背景视频：poster 同时作为兜底背景图，视频没加载出来时页面不塌 */}
      <div
        className="hero-media"
        aria-hidden="true"
        style={{ backgroundImage: `url('${base}/hero-poster.jpg')` }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${base}/hero-poster.jpg`}
        >
          <source src={`${base}/hero.mp4`} type="video/mp4" />
        </video>
      </div>

      <div className="hero-inner">
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

        <Reveal delay={140}>
          <aside className="card-me glass">
            <div className="avatar">{profile.name.charAt(0)}</div>

            <div className="me-text">
              <h3>{profile.name}</h3>
              <div className="meta">
                现居{profile.location} · {profile.status}
              </div>
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

      <div className="scroll-hint" aria-hidden="true">
        <span>向下</span>
        <i />
      </div>
    </div>
  )
}
