import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function Page({ params }) {

  const locale = params.locale
  const supabase = createClient()

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("locale", locale)
    .eq("published", true)
    .order("order", { ascending: true })

  return (
    <div style={{padding:40}}>
      <h1>Expertises</h1>

      {services?.map(service => (
        <div key={service.id} style={{marginBottom:20}}>
          <Link href={`/${locale}/${service.slug}`}>
            <h3>{service.title}</h3>
          </Link>

          <p>{service.excerpt}</p>
        </div>
      ))}
    </div>
  )
}