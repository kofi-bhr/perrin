import { Metadata } from 'next'
import ExpertsPageClient from './ExpertsPageClient'

export const metadata: Metadata = {
  title: 'Expert Directory | The Perrin Institution',
  description: 'Connect with leading policy experts, researchers, and scholars at The Perrin Institution. Browse our comprehensive directory of professionals specializing in AI policy, technology governance, and data-driven research.',
  keywords: 'policy experts, research scholars, AI policy experts, technology governance, UVA experts, Perrin Institution experts',
  openGraph: {
    title: 'Expert Directory | The Perrin Institution',
    description: 'Connect with leading policy experts and researchers at The Perrin Institution',
    url: 'https://perrininstitution.org/experts',
    type: 'website',
  },
  alternates: {
    canonical: 'https://perrininstitution.org/experts',
  },
}

export default function ExpertsPage() {
  return <ExpertsPageClient />
}