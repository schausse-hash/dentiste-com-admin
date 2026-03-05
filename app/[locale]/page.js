export default function Page({ params }) {

  const { locale } = params

  return (
    <div style={{padding:40}}>
      <h1>{locale === "fr" ? "Accueil" : "Home"}</h1>
    </div>
  )
}