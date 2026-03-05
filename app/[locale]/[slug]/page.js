import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function Page({ params }) {

  const { locale, slug } = params
  const supabase = createClient()

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("locale", locale)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!service) {
    notFound()
  }

  return (
    <div style={{padding:40}}>
      <h1>{service.title}</h1>
      <p>{service.excerpt}</p>
    </div>
  )
}