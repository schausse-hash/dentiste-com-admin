import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Phone, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = params
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('services')
      .select('title, excerpt')
      .eq('locale', 'fr')
      .eq('slug', slug)
      .single()
    if (data) {
      return {
        title: `${data.title} | Dr Serge Chaussé — Montréal`,
        description: data.excerpt || `${data.title} — Dr Serge Chaussé, spécialiste à Montréal.`,
      }
    }
  } catch {}
  return {}
}

export default async function ExpertisePage({ params }) {
  const { slug } = params

  let service = null
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('locale', 'fr')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    if (error) throw error
    service = data
  } catch {
    service = null
  }

  if (!service) notFound()

  return (
    <main className="bg-cream min-h-screen">

      {/* Header avec gradient identique au site */}
      <div className="hero-gradient py-24 px-6">
        <div className="max-w-3xl mx-auto text-white">
          <Link href="/fr/expertises" className="text-white/60 hover:text-white text-sm mb-6 inline-block">
            ← Retour aux expertises
          </Link>
          <div className="section-divider mb-6" />
          {service.category && (
            <span className="text-accent-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              {service.category}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-5xl mb-4">{service.title}</h1>
          {service.excerpt && (
            <p className="text-white/80 text-xl leading-relaxed">{service.excerpt}</p>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {service.content_md ? (
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            {/* Rendu Markdown manuel simple — pas de dépendance extra */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-charcoal
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-warm-gray prose-p:leading-relaxed
                prose-li:text-warm-gray
                prose-strong:text-charcoal
                prose-a:text-dental-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(service.content_md) }}
            />
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
            <CheckCircle2 className="w-12 h-12 text-dental-400 mx-auto mb-4" />
            <p className="text-warm-gray">Contenu détaillé à venir.</p>
          </div>
        )}

        {/* CTA contact */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <div className="bg-dental-600 rounded-2xl p-6 text-white">
            <h3 className="font-display text-xl mb-2">Questions?</h3>
            <p className="text-white/80 text-sm mb-4">
              Appelez-moi pour discuter de votre situation.
            </p>
            <a
              href="tel:5145214141"
              className="inline-flex items-center gap-2 btn-primary bg-white text-dental-700 hover:bg-accent-400 py-3 px-6"
            >
              <Phone className="w-4 h-4" /> 514.521.4141
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-display text-xl mb-2 text-charcoal">Consultation gratuite</h3>
            <p className="text-warm-gray text-sm mb-4">
              Prenez rendez-vous pour une évaluation personnalisée.
            </p>
            <Link
              href="/#contact"
              className="inline-block btn-outline text-sm py-3 px-6"
            >
              Formulaire de contact
            </Link>
          </div>
        </div>

        {/* Retour */}
        <div className="mt-8 text-center">
          <Link href="/fr/expertises" className="text-warm-gray hover:text-dental-600 text-sm">
            ← Voir toutes les expertises
          </Link>
        </div>
      </div>
    </main>
  )
}

// Convertisseur Markdown → HTML minimal (pas de dépendance)
function markdownToHtml(md) {
  return md
    // Titres
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Gras et italique
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Listes
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // Liens
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    // Paragraphes
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hula])(.+)$/gm, (m) => m.trim() ? m : '')
    .replace(/^(.+[^>])$/gm, (m) => {
      if (m.startsWith('<')) return m
      return `<p>${m}</p>`
    })
    // Nettoyage
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[hul])/g, '$1')
    .replace(/(<\/[hul][^>]*>)<\/p>/g, '$1')
}
