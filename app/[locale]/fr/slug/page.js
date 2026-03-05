import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function ServiceFR({ params }) {
  const supabase = createClient()

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('locale', 'fr')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!service) notFound()

  const highlights = service?.content?.highlights || []
  const disclaimer = service?.content?.disclaimer

  return (
    <article style={{ maxWidth: 900 }}>
      <h1>{service.title}</h1>
      {service.excerpt ? <p>{service.excerpt}</p> : null}

      {highlights.length ? (
        <section style={{ marginTop: 18 }}>
          <h2>Points clés</h2>
          <ul>
            {highlights.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </section>
      ) : null}

      {disclaimer ? (
        <section style={{ marginTop: 18, padding: 12, border: '1px solid #eee', borderRadius: 12 }}>
          <strong>Important</strong>
          <div style={{ marginTop: 6 }}>{disclaimer}</div>
        </section>
      ) : null}
    </article>
  )
}