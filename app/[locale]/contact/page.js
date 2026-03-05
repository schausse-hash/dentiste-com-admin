export default function Contact({ params }) {
  const locale = params?.locale === 'en' ? 'en' : 'fr'
  const t = locale === 'fr'
    ? {
        title: 'Contact',
        p1: "Ce site ne prend pas de rendez-vous en ligne.",
        p2: 'Pour une demande, écrivez-nous ou appelez.',
        phone: 'Téléphone',
        email: 'Courriel',
      }
    : {
        title: 'Contact',
        p1: 'No online booking on this website.',
        p2: 'For requests, email or call.',
        phone: 'Phone',
        email: 'Email',
      }

  return (
    <main style={{maxWidth: 900, margin:'0 auto', padding:'40px 20px'}}>
      <h1 style={{fontSize:42}}>{t.title}</h1>
      <p style={{opacity:.9}}>{t.p1}</p>
      <p style={{opacity:.9}}>{t.p2}</p>
      <div style={{marginTop:18, padding:16, borderRadius:12, border:'1px solid rgba(255,255,255,.15)'}}>
        <div><strong>{t.phone}:</strong> 514-521-4141</div>
        <div style={{marginTop:8}}><strong>{t.email}:</strong> info@dentiste.com</div>
      </div>
    </main>
  )
}
