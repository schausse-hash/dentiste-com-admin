import { createClient } from '@/lib/supabase/server'

export async function getSiteSettings(locale) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('locale', locale)
    .single()

  if (error) {
    // Fallback minimal si la table n’est pas encore seedée
    return {
      site_name: locale === 'fr'
        ? 'Dr Serge Chaussé, chirurgien-dentiste'
        : 'Dr Serge Chaussé, Dentist (Dental Surgeon)',
      tagline: '',
      seo_title_default: '',
      seo_description_default: '',
    }
  }

  return data
}