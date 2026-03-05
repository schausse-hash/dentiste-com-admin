import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ServicePage({ params }) {
  const locale = params?.locale === 'en' ? 'en' : 'fr'
  const slug = params?.slug

  let service = null
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('locale', locale)
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error
    service = data
  } catch (e) {
    // If Supabase not configured, this will throw -> treat as not found
    service = null
  }

  if (!service) notFound()

  return (
    <main style={{maxWidth: 900, margin:'0 auto', padding:'40px 20px'}}>
      <h1 style={{fontSize:42}}>{service.title}</h1>
      {service.excerpt && <p style={{opacity:.9, fontSize:18}}>{service.excerpt}</p>}

      {/* content is jsonb – keep simple for now */}
      {service.content && (
        <pre style={{marginTop:20, padding:16, borderRadius:12, border:'1px solid rgba(255,255,255,.15)', overflowX:'auto'}}>
          {JSON.stringify(service.content, null, 2)}
        </pre>
      )}
    </main>
  )
}
