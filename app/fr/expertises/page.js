import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Expertises | Dr Serge Chaussé — Dentiste Montréal',
  description: 'Chirurgie avancée, réhabilitation complète, douleurs ATM et esthétique au Botox. Dr Serge Chaussé, spécialiste à Montréal.',
}

const categoryColors = {
  'Chirurgie':        { bg: 'bg-dental-100', text: 'text-dental-700' },
  'Réhabilitation':   { bg: 'bg-accent-300/20', text: 'text-accent-600' },
  'ATM / Botox':      { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Botox esthétique': { bg: 'bg-pink-50', text: 'text-pink-700' },
}

export default async function ExpertisesPage() {
  let services = []

  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('services')
      .select('id, slug, title, excerpt, category, order')
      .eq('locale', 'fr')
      .eq('published', true)
      .order('order', { ascending: true })
    if (error) throw error
    services = data ?? []
  } catch (e) {
    services = []
  }

  // Grouper par catégorie
  const grouped = services.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <main className="bg-cream min-h-screen">

      {/* Header */}
      <div className="hero-gradient py-24 px-6">
        <div className="max-w-4xl mx-auto text-white">
          <Link href="/" className="text-white/60 hover:text-white text-sm mb-6 inline-block">
            ← Retour au site
          </Link>
          <div className="section-divider mb-6" />
          <h1 className="font-display text-5xl mb-4">Mes expertises</h1>
          <p className="text-white/80 text-xl max-w-2xl">
            Chirurgie avancée, réhabilitation complète, douleurs ATM et esthétique au Botox.
            Plus de 40 ans d'expérience à votre service.
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {services.length === 0 && (
          <p className="text-warm-gray text-center py-12">Contenu à venir.</p>
        )}

        {Object.entries(grouped).map(([category, items]) => {
          const colors = categoryColors[category] || { bg: 'bg-dental-100', text: 'text-dental-700' }
          return (
            <div key={category} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                  {category}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {items.map((s) => (
                  <Link
                    key={s.id}
                    href={`/fr/expertises/${s.slug}`}
                    className="card-hover bg-white rounded-2xl p-6 border border-gray-100 block group"
                  >
                    <div className="flex items-start justify-between">
                      <h2 className="font-display text-xl text-charcoal group-hover:text-dental-600 transition-colors">
                        {s.title}
                      </h2>
                      <CheckCircle2 className="w-5 h-5 text-dental-400 mt-1 flex-shrink-0" />
                    </div>
                    {s.excerpt && (
                      <p className="text-warm-gray text-sm mt-3 leading-relaxed">{s.excerpt}</p>
                    )}
                    <span className="inline-block mt-4 text-dental-600 text-sm font-medium group-hover:underline">
                      En savoir plus →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        {/* CTA */}
        <div className="mt-8 bg-dental-600 rounded-3xl p-8 text-white text-center">
          <h3 className="font-display text-2xl mb-3">Une question sur un traitement?</h3>
          <p className="text-white/80 mb-6">Contactez-moi pour une consultation gratuite.</p>
          <Link href="/#contact" className="btn-primary bg-white text-dental-700 hover:bg-accent-400">
            Me contacter
          </Link>
        </div>
      </div>
    </main>
  )
}
