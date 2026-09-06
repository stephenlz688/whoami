import { profile } from '@/data/profile'

export default function SiteFooter() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {profile.name} · {profile.location} · 用一点点耐心做成</p>
      <div className="socials">
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={`mailto:${profile.email}`}>邮箱</a>
      </div>
    </footer>
  )
}
