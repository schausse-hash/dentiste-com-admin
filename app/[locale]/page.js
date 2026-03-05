import Link from 'next/link'

const copy = {
  fr: {
    badge: "Plus de 40 ans d’expérience",
    h1a: 'Votre sourire,',
    h1b: 'mon expertise',
    intro: "Chirurgien-dentiste & formateur international. Chirurgie avancée, réhabilitation complète, douleurs ATM et esthétique au Botox.",
    cta1: 'Me contacter',
    cta2: 'Voir mes expertises',
    title: 'Dr Serge Chaussé',
    subtitle: 'Chirurgien-dentiste (Dental Surgeon)',
    note: "Aucun rendez-vous en ligne sur ce site. Pour une demande, utilisez le formulaire de contact.",
  },
  en: {
    badge: '40+ years of experience',
    h1a: 'Your smile,',
    h1b: 'my expertise',
    intro: 'Dental surgeon & international instructor. Advanced surgery, full-mouth rehabilitation, TMJ pain management, and cosmetic Botox.',
    cta1: 'Contact me',
    cta2: 'View expertise',
    title: 'Dr Serge Chaussé',
    subtitle: 'Dental Surgeon',
    note: 'No online booking on this website. For requests, please use the contact form.',
  },
}

export default function Home({ params }) {
  const locale = params?.locale === 'en' ? 'en' : 'fr'
  const t = copy[locale]

  return (
    <main style={{maxWidth: 1100, margin: '0 auto', padding: '48px 20px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:16, flexWrap:'wrap'}}>
        <div>
          <div style={{display:'inline-flex', gap:8, alignItems:'center', padding:'6px 10px', border:'1px solid rgba(255,255,255,.15)', borderRadius:999}}>
            <span style={{opacity:.9}}>{t.badge}</span>
          </div>
          <h1 style={{marginTop:18, fontSize:56, lineHeight:1.05}}>
            {t.h1a} <span style={{opacity:.9}}>{t.h1b}</span>
          </h1>
          <p style={{marginTop:14, maxWidth:720, opacity:.9, fontSize:18}}>{t.intro}</p>
          <p style={{marginTop:12, maxWidth:720, opacity:.8}}>{t.note}</p>
          <div style={{display:'flex', gap:12, marginTop:22, flexWrap:'wrap'}}>
            <Link href={`/${locale}/contact`} style={{padding:'10px 14px', borderRadius:10, background:'#2f7d53', color:'white', textDecoration:'none'}}>
              {t.cta1}
            </Link>
            <Link href={`/${locale}/expertises`} style={{padding:'10px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,.2)', color:'white', textDecoration:'none'}}>
              {t.cta2}
            </Link>
          </div>
        </div>

        <div style={{minWidth: 280}}>
          <div style={{padding:18, border:'1px solid rgba(255,255,255,.15)', borderRadius:18}}>
            <div style={{fontSize:18, fontWeight:700}}>{t.title}</div>
            <div style={{opacity:.9, marginTop:4}}>{t.subtitle}</div>
            <div style={{marginTop:14, display:'flex', gap:10}}>
              <Link href={'/fr'} style={{textDecoration:'none', color:'white', opacity: locale==='fr'?1:.7}}>FR</Link>
              <span style={{opacity:.4}}>|</span>
              <Link href={'/en'} style={{textDecoration:'none', color:'white', opacity: locale==='en'?1:.7}}>EN</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
