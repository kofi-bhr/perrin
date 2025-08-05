import { Metadata } from 'next'
import NewsPageClient from './NewsPageClient'

export const metadata: Metadata = {
  title: 'News & Research | The Perrin Institution',
  description: 'Stay updated with the latest policy research, analysis, and insights from The Perrin Institution. Explore articles on AI policy, technology governance, and data-driven research from our expert team.',
  keywords: 'policy news, research articles, AI policy research, technology governance news, Perrin Institution research, policy analysis',
  openGraph: {
    title: 'News & Research | The Perrin Institution',
    description: 'Latest policy research and insights from The Perrin Institution',
    url: 'https://perrininstitution.org/news',
    type: 'website',
  },
  alternates: {
    canonical: 'https://perrininstitution.org/news',
  },
}

export default function News() {
  return <NewsPageClient />
}