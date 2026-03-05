import { getSiteSettings } from '@/lib/siteSettings'

export async function generateMetadata({ params }) {
  const locale = params.locale === 'en' ? 'en' : 'fr'
  const s = await getSiteSettings(locale)

  return {
    title: s.seo_title_default || s.site_name,
    description: s.seo_description_default || s.tagline,
    alternates: {
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
  }
}

export default async function LocaleLayout({ children, params }) {
  const locale = params.locale === 'en' ? 'en' : 'fr'
  const s = await getSiteSettings(locale)

  return (
    <html lang={locale}>
      <body>
        <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700 }}>{s.site_name}</div>
              <div style={{ opacity: 0.75, fontSize: 14 }}>{s.tagline}</div>
            </div>

            <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <a href={locale === 'fr' ? '/en' : '/fr'} style={{ textDecoration: 'underline' }}>
                {locale === 'fr' ? 'EN' : 'FR'}
              </a>
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
          {children}
        </main>

        <footer style={{ padding: 16, borderTop: '1px solid #eee', marginTop: 48 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', opacity: 0.8, fontSize: 14 }}>
            {locale === 'fr'
              ? 'Consultations et traitements offerts dans des cliniques partenaires, selon disponibilité et sur référence au besoin.'
              : 'Consultations and treatments are provided at partner clinics, subject to availability and referral when applicable.'}
          </div>
        </footer>
      </body>
    </html>
  )
}