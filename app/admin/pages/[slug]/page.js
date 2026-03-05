import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { upsertPage } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function EditPage({ params, searchParams }) {
  const slug = params.slug;
  const supabase = createClient();

  const { data } = await supabase
    .from('pages')
    .select('slug,title,content_md')
    .eq('slug', slug)
    .maybeSingle();

  const saved = searchParams?.saved === '1';

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Édition : /{slug}</h1>
          <p className="text-sm text-warm-gray mt-1">
            Contenu en Markdown. Les pages publiques correspondantes peuvent être mappées à ce slug.
          </p>
        </div>
        <Link className="underline text-sm" href="/admin">← Retour</Link>
      </div>

      {saved && (
        <div className="mt-4 p-3 rounded bg-dental-50 border text-sm">
          Enregistré ✅
        </div>
      )}

      <form action={upsertPage} className="mt-6 space-y-4">
        <input type="hidden" name="slug" value={slug} />

        <div>
          <label className="block text-sm font-medium">Titre (optionnel)</label>
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            name="title"
            defaultValue={data?.title || ''}
            placeholder="Ex: Implants dentaires"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contenu (Markdown)</label>
          <textarea
            className="mt-1 w-full border rounded px-3 py-2 font-mono text-sm min-h-[420px]"
            name="content_md"
            defaultValue={data?.content_md || ''}
            placeholder={"# Titre\n\nTexte...\n\n## Sous-titre\n- puce"}
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded bg-charcoal text-cream font-semibold">
            Enregistrer
          </button>
          <Link
            className="text-sm underline"
            href={`/${encodeURIComponent(slug)}`}
            target="_blank"
          >
            Voir la page publique ↗
          </Link>
        </div>

        <div className="text-xs text-warm-gray">
          Note: sur Vercel, pense à configurer les variables d’environnement Supabase.
        </div>
      </form>
    </div>
  );
}
