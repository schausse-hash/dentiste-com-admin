'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const params = useSearchParams();
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setMessage(err?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-bold">Connexion admin</h1>
        <p className="text-sm text-warm-gray mt-1">
          Accès réservé. Utilise ton compte Supabase Auth.
        </p>

        {params.get('error') === 'missing_env' && (
          <div className="mt-4 p-3 rounded bg-yellow-50 text-yellow-800 text-sm">
            Variables d’environnement Supabase manquantes. Configure NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.
          </div>
        )}

        {message && (
          <div className="mt-4 p-3 rounded bg-red-50 text-red-800 text-sm">{message}</div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            className="w-full rounded bg-charcoal text-cream py-2 font-semibold disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-xs text-warm-gray">
          Si tu n’as pas encore créé d’utilisateur: Supabase → Authentication → Users → Invite / Add user.
        </div>
      </div>
    </div>
  );
}
