import './globals.css'

export const metadata = {
  title: 'Dr Serge Chaussé | Dentiste & Formateur en Implantologie | Montréal',
  description: 'Dr Serge Chaussé, dentiste avec plus de 40 ans d\'expérience. Spécialiste en implants dentaires, CEREC, orthodontie. Formateur international en implantologie. Montréal et Saint-Jean-sur-Richelieu.',
  keywords: 'dentiste Montréal, Dr Serge Chaussé, implants dentaires, formation implantologie, CEREC, orthodontie, All-on-4, tutorat dentaire',
  authors: [{ name: 'Dr Serge Chaussé' }],
  openGraph: {
    title: 'Dr Serge Chaussé | Dentiste & Formateur en Implantologie',
    description: 'Plus de 40 ans d\'expertise en soins dentaires et formation en implantologie',
    url: 'https://www.dentiste.com',
    siteName: 'Dr Serge Chaussé',
    locale: 'fr_CA',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
