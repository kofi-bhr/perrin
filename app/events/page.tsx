import { Metadata } from 'next'
import EventsPageClient from './EventsPageClient'

export const metadata: Metadata = {
  title: 'Events & Workshops | The Perrin Institution',
  description: 'Join The Perrin Institution for policy workshops, research seminars, and networking events. Connect with experts in AI policy, technology governance, and data-driven research.',
  keywords: 'policy events, research workshops, AI policy seminars, technology governance events, Perrin Institution events, UVA policy events',
  openGraph: {
    title: 'Events & Workshops | The Perrin Institution',
    description: 'Join us for policy workshops, research seminars, and networking events',
    url: 'https://perrininstitution.org/events',
    type: 'website',
  },
  alternates: {
    canonical: 'https://perrininstitution.org/events',
  },
}

export default function EventsPage() {
  return <EventsPageClient />
}