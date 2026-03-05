import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { signOut } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const supabase = createClient();

  const { data: pages, error } = await supabase
    .from('pages')
    .select('slug,title,updated_at')
    .order('slug', { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion du contenu</h1>
        <form action={signOut}>
          <button className="px-3 py-2 rounded bg-charcoal text-cream text-sm">Déconnexion</button>
        </form>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded bg-red-50 text-red-800 text-sm">
          Erreur Supabase: {error.message}
        </div>
      )}

      <div className="mt-6 grid gap-3">
        {(pages || []).map((p) => (
          <Link key={p.slug} href={`/admin/pages/${encodeURIComponent(p.slug)}`}
            className="block p-4 rounded border bg-white hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.title || p.slug}</div>
                <div className="text-xs text-warm-gray">/{p.slug}</div>
              </div>
              <div className="text-xs text-warm-gray">
                {p.updated_at ? new Date(p.updated_at).toLocaleString('fr-CA') : ''}
              </div>
            </div>
          </Link>
        ))}

        <div className="p-4 rounded border bg-white">
          <div className="font-semibold mb-2">Créer une nouvelle page</div>
          <Link className="underline text-sm" href="/admin/pages/nouvelle-page">
            Ouvrir l’éditeur avec un slug (ex: nouvelle-page)
          </Link>
          <div className="text-xs text-warm-gray mt-2">
            Astuce: remplace “nouvelle-page” dans l’URL par le slug voulu.
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 rounded bg-dental-50 border text-sm">
        <div className="font-semibold mb-1">Configuration Supabase</div>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Créer une table <code className="px-1 bg-white border rounded">pages</code> (voir <code className="px-1 bg-white border rounded">supabase.sql</code>).</li>
          <li>Activer RLS + politiques (incluses dans le fichier).</li>
          <li>Mettre <code className="px-1 bg-white border rounded">NEXT_PUBLIC_SUPABASE_URL</code> et <code className="px-1 bg-white border rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> dans <code className="px-1 bg-white border rounded">.env.local</code> (et sur Vercel).</li>
        </ol>
      </div>
    </div>
  );
}
