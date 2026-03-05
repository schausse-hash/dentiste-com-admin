import { Suspense } from 'react'
import AdminClient from './AdminClient'

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <AdminClient />
    </Suspense>
  )
}