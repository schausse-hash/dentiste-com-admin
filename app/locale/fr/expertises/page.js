import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function ExpertisesFR() {

  const supabase = createClient()

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('locale','fr')
    .eq('published', true)
    .order('order', { ascending: true })

  return (
    <div>
      <h1>Expertises</h1>

      {services?.map(service => (
        <div key={service.id} style={{marginBottom:20}}>
          <Link href={`/fr/${service.slug}`}>
            <strong>{service.title}</strong>
          </Link>

          <p>{service.excerpt}</p>
        </div>
      ))}
    </div>
  )
}