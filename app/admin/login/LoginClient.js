'use client'

import { useSearchParams } from 'next/navigation'

export default function LoginClient() {
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/admin'

  // TODO: ton UI/login ici
  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Login</h1>
      <p>After login you will be redirected to: <code>{next}</code></p>
      {/* ton formulaire ici */}
    </div>
  )
}