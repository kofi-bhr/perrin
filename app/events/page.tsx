'use client'
import Image from 'next/image'

const FEATURED_EVENTS = [
  {
    id: 1,
    title: "Democracy Initiative: Global Leadership Forum",
    date: "March 20, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Rotunda Dome Room",
    category: "Leadership",
    image: "/uva-stock-1.jpg",
    description: "Join distinguished faculty and international leaders for a critical discussion on global governance and democratic institutions.",
    speaker: "Hon. Condoleezza Rice, Former U.S. Secretary of State"
  },
  {
    id: 2,
    title: "Public Policy & Economic Development Symposium",
    date: "March 25, 2024",
    time: "10:00 AM - 3:00 PM",
    location: "McIntire School of Commerce",
    category: "Policy",
    image: "/uva-stock-1.jpg",
    description: "A comprehensive symposium examining the intersection of public policy and economic development in the modern era.",
    speaker: "Dr. James Wilson, Dean of Public Policy"
  },
  {
    id: 3,
    title: "Future of Higher Education Summit",
    date: "April 5, 2024",
    time: "1:00 PM - 5:00 PM",
    location: "Darden School of Business",
    category: "Education",
    image: "/uva-stock-1.jpg",
    description: "Exploring innovative approaches to higher education in a rapidly evolving global landscape.",
    speaker: "President Jim Ryan, University of Virginia"
  }
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Updated with new image */}
      <section className="relative h-[50vh] flex items-center">
        <Image
          src="/uva-stock-3.jpg"
          alt="UVA campus events"
          fill
          className="object-cover brightness-[0.75]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-blue-400 font-semibold tracking-wider uppercase bg-black/30 px-4 py-2 backdrop-blur-sm">
              Events & Programs
            </span>
            <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
              Distinguished Events at<br />The University of Virginia
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-3xl">
              Join us for thought-provoking discussions, innovative research presentations, and transformative policy dialogues.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden bg-white shadow-xl rounded-lg">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/uva-stock-1.jpg"
                  alt="Featured event"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12">
                <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">
                  Featured Event
                </span>
                <h2 className="mt-4 text-3xl font-bold text-gray-900">
                  {FEATURED_EVENTS[0].title}
                </h2>
                <p className="mt-4 text-gray-600">
                  {FEATURED_EVENTS[0].description}
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {FEATURED_EVENTS[0].date} | {FEATURED_EVENTS[0].time}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {FEATURED_EVENTS[0].location}
                  </div>
                </div>
                <button className="mt-8 bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 
                  transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900">Upcoming Events</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Explore our calendar of distinguished speakers, academic symposiums, and policy forums.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_EVENTS.map((event) => (
              <div 
                key={event.id}
                className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm font-medium bg-blue-600 px-3 py-1">
                      {event.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 
                    transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-gray-600 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 font-medium 
              hover:bg-blue-600 hover:text-white transition-colors">
              View All Events
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 