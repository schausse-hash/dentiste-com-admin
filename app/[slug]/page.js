import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function ServicePage({ params }) {

  const supabase = createClient()

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!service) {
    notFound()
  }

  return (
    <article style={{maxWidth:900}}>
      <h1>{service.title}</h1>

      <p>{service.excerpt}</p>

      {service.content && (
        <div style={{marginTop:20}}>
          {JSON.stringify(service.content)}
        </div>
      )}
    </article>
  )
}