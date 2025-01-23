import heroHome from '@/public/uva-stock-1.jpg'
import heroResearch from '@/public/uva-stock-2.webp'
import heroEvents from '@/public/uva-stock-3.jpg'
import heroFellows from '@/public/uva-stock-4.jpg'
import finnJarvi from '@/public/IMG_5133.jpg'

// Add any other commonly used images here
export const images = {
  heroHome,
  heroResearch,
  heroEvents,
  heroFellows,
  founders: {
    cash: heroResearch,
    finn: finnJarvi
  },
  defaultProfile: heroResearch,
  events: {
    featured: heroHome, // You might want a specific image for featured events
  }
} 