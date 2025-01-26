import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-fg/75 border-t border-fg bg-bg">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-fg font-serif">
              PERRIN
            </h3>
            <p className="">
              Leading research institution dedicated to generating policy
              solutions
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-fg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/research"
                  className="text-fg/75 hover:text-accent transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/experts"
                  className="text-fg/75 hover:text-accent transition-colors"
                >
                  Experts
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-fg/75 hover:text-accent transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-fg/75 hover:text-accent transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-fg">Contact</h4>
            <ul className="space-y-2">
              <li>123 Think Tank Street</li>
              <li>City, State 12345</li>
              <li>contact@perrin.org</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-fg">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-fg/75 hover:text-accent transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-fg/75 hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-fg/75 hover:text-accent transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-fg/10 mt-8 pt-8 text-center text-fg/50">
          <p>
            &copy; {new Date().getFullYear()} Perrin Think Tank. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
