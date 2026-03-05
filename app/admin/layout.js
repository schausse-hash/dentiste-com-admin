export const metadata = {
  title: 'Admin | dentiste.com',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <a href="/" className="text-sm underline">← Retour au site</a>
          <a href="/admin" className="font-semibold">Admin</a>
        </div>
        {children}
      </div>
    </div>
  );
}
