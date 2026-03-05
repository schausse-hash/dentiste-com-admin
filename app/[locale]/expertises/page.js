import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function ExpertisesPage({ params }) {
  const locale = params?.locale === 'en' ? 'en' : 'fr'

  let services = []
  let errorMsg = null

  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('services')
      .select('id, locale, slug, title, excerpt, category, published, order')
      .eq('locale', locale)
      .eq('published', true)
      .order('order', { ascending: true })

    if (error) throw error
    services = data ?? []
  } catch (e) {
    // Most common cause on Vercel: missing env vars
    errorMsg = e?.message || String(e)
  }

  const t = locale === 'fr'
    ? {
        title: 'Expertises',
        intro: 'Chirurgie, réhabilitation, ATM et esthétique. Cliquez pour voir le détail.',
        missing: "Erreur de configuration (souvent: variables Supabase manquantes sur Vercel).",
      }
    : {
        title: 'Expertise',
        intro: 'Surgery, rehabilitation, TMJ and aesthetics. Click for details.',
        missing: 'Configuration error (often: missing Supabase env vars on Vercel).',
      }

  return (
    <main style={{maxWidth: 1100, margin: '0 auto', padding: '40px 20px'}}>
      <h1 style={{fontSize:42}}>{t.title}</h1>
      <p style={{opacity:.9, maxWidth: 820}}>{t.intro}</p>

      {errorMsg && (
        <div style={{marginTop:18, padding:14, borderRadius:12, border:'1px solid rgba(255,255,255,.2)'}}>
          <strong>{t.missing}</strong>
          <div style={{opacity:.9, marginTop:8, whiteSpace:'pre-wrap'}}>{errorMsg}</div>
        </div>
      )}

      <div style={{marginTop:22, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:14}}>
        {services.map((s) => (
          <Link
            key={s.id}
            href={`/${locale}/${s.slug}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid rgba(255,255,255,.15)',
              borderRadius: 16,
              padding: 16,
              display: 'block',
            }}
          >
            <div style={{fontWeight:700, fontSize:18}}>{s.title}</div>
            {s.excerpt && <div style={{opacity:.85, marginTop:8}}>{s.excerpt}</div>}
            <div style={{opacity:.6, marginTop:10}}>{s.category}</div>
          </Link>
        ))}

        {!errorMsg && services.length === 0 && (
          <div style={{opacity:.8}}>
            {locale === 'fr'
              ? "Aucune expertise publiée trouvée (table 'services')."
              : "No published expertise found (services table)."}
          </div>
        )}
      </div>
    </main>
  )
}
