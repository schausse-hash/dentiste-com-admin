'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function upsertPage(formData) {
  const slug = String(formData.get('slug') || '').trim();
  const title = String(formData.get('title') || '').trim();
  const content_md = String(formData.get('content_md') || '');
  if (!slug) throw new Error('Slug manquant');

  const supabase = createClient();

  const { error } = await supabase
    .from('pages')
    .upsert({ slug, title, content_md }, { onConflict: 'slug' });

  if (error) throw new Error(error.message);

  redirect(`/admin/pages/${encodeURIComponent(slug)}?saved=1`);
}
