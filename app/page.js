import { redirect } from 'next/navigation'

export default function RootPage() {
  // Default language
  redirect('/fr')
}
