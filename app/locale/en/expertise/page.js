import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function ExpertiseEN() {

  const supabase = createClient()

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('locale','en')
    .eq('published', true)
    .order('order')

  return (
    <div>
      <h1>Expertise</h1>

      {services?.map(service => (
        <div key={service.id} style={{marginBottom:20}}>
          <Link href={`/en/${service.slug}`}>
            <strong>{service.title}</strong>
          </Link>

          <p>{service.excerpt}</p>
        </div>
      ))}
    </div>
  )
}