import Link from 'next/link'
import BackgroundOrbs from '@/components/BackgroundOrbs'
import { Fox } from '@/components/icons/Animals'

export default function NotFound() {
  return (
    <>
      <BackgroundOrbs />
      <main className="wrap nf">
        <Fox size={120} className="mascot mascot--center" />
        <h1>404</h1>
        <p className="lead">
          这只狐狸也没找到路。要不回首页，从头逛起？
        </p>
        <Link href="/" className="btn btn-primary">
          回到首页 <span>→</span>
        </Link>
      </main>
    </>
  )
}
