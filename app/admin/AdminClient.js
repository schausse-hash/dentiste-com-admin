'use client'

import { useSearchParams } from 'next/navigation'

export default function AdminClient() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'dashboard' // exemple

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin</h1>
      <p>tab: <code>{tab}</code></p>
      {/* Mets ici TON UI admin (tout ce qui était dans app/admin/page.js) */}
    </div>
  )
}