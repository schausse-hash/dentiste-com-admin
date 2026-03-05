import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Markdown from '@/app/_components/Markdown';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const supabase = createClient();
  const { data } = await supabase
    .from('pages')
    .select('title')
    .eq('slug', params.slug)
    .maybeSingle();

  const title = data?.title ? `${data.title} | Dr Serge Chaussé` : `/${params.slug} | Dr Serge Chaussé`;
  return { title };
}

export default async function PublicPage({ params }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('pages')
    .select('slug,title,content_md,updated_at')
    .eq('slug', params.slug)
    .maybeSingle();

  if (error) {
    // fail closed as 404 to avoid leaking
    return notFound();
  }
  if (!data) return notFound();

  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-sm underline">← Accueil</Link>
          <Link href="/admin" className="text-sm underline">Admin</Link>
        </div>

        <h1 className="text-3xl font-bold">{data.title || data.slug}</h1>
        {data.updated_at && (
          <div className="text-xs text-warm-gray mt-2">
            Mis à jour : {new Date(data.updated_at).toLocaleDateString('fr-CA')}
          </div>
        )}

        <div className="mt-8">
          <Markdown>{data.content_md || ''}</Markdown>
        </div>
      </div>
    </main>
  );
}
