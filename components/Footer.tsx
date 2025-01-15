export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PERRIN</h3>
            <p className="text-gray-400">
              Leading research institution dedicated to generating policy solutions
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/research" className="text-gray-400 hover:text-white">Research</a></li>
              <li><a href="/experts" className="text-gray-400 hover:text-white">Experts</a></li>
              <li><a href="/events" className="text-gray-400 hover:text-white">Events</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Think Tank Street</li>
              <li>City, State 12345</li>
              <li>contact@perrin.org</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Perrin Think Tank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 