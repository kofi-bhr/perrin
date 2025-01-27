import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative text-bg border-t border-bg bg-fg z-1">
      <div className="h-full w-full noise before:-z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-serif opacity-80">
                PERRIN
              </h3>
              <p className="">
                Leading research institution dedicated to generating policy
                solutions
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 opacity-80">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/research"
                    className="hover:opacity-75 transition-opacity"
                  >
                    Research
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experts"
                    className="hover:opacity-75 transition-opacity"
                  >
                    Experts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="hover:opacity-75 transition-opacity"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:opacity-75 transition-opacity"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 opacity-80">Contact</h4>
              <ul className="space-y-2">
                <li>123 Think Tank Street</li>
                <li>City, State 12345</li>
                <li>contact@perrin.org</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>

            <div className="">
              <h4 className="text-lg font-semibold mb-4 opacity-80">
                Follow Us
              </h4>
              <div className="flex space-y-2 flex-col">
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Twitter
                </a>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  LinkedIn
                </a>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-bg/10 mt-8 pt-8 text-center text-bg/50">
            <p>
              &copy; {new Date().getFullYear()} Perrin Think Tank. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
