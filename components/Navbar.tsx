"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // for hamburger
  const pathname = usePathname();

  const isTransparentPage = ["/", "/employee-panel", "/admin"].includes(
    pathname
  );

  useEffect(() => {
    // Check login status and admin status
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(!!token);
    setIsAdmin(email === "employee@perrin.org");
  }, [isTransparentPage]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Research", href: "/research" },
    { name: "Fellows", href: "/experts" },
    { name: "Events", href: "/events" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 text-fg py-6 text-xl font-light border-b border-fg bg-bg`}
    >
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center h-full w-full pr-12">
            <Link href="/" className="flex items-center">
              <Image
                src="/ui/logo.png"
                width={135}
                height={48}
                alt="PERRIN Logo"
              />
            </Link>

            <div className="hidden lg:flex items-center space-x-24 ml-auto">
              {navigation.map((item, index) => (
                <Link
                  href={item.href}
                  className={`hover:text-accent transition-all border-b-2 border-bg/0 hover:border-accent ${
                    item.href === pathname ? "font-medium" : ""
                  }`}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}

              {isLoggedIn && (
                <Link
                  href="/employee-panel"
                  className={`font-medium hover:text-accent transition-colors`}
                >
                  Employee Panel
                </Link>
              )}
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`font-medium hover:text-accent transition-colors ${
                    pathname === "/admin" ? "border-b-2 border-accent" : ""
                  }`}
                >
                  Admin Panel
                </Link>
              )}

              {isLoggedIn ? (
                <button
                  onClick={handleSignOut}
                  className={`px-4 py-2 transition-colors text-nowrap`}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/auth/signin"
                  className={`px-4 py-2 text-nowrap bg-accent/75 text-bg hover:bg-accent transition-colors w-fit`}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
          <div className="lg:hidden ml-auto">
            <button
              className="text-fg focus:outline-hidden flex justify-center items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="bg-bg top-24 absolute xl:hidden text-fg py-6 text-xl font-light border-y border-fg w-full left-0">
              <div className="flex flex-col space-y-4 px-4">
                {navigation.map((item, index) => (
                  <Link
                    href={item.href}
                    className={`hover:text-accent transition-all ${
                      item.href === pathname ? "font-medium" : ""
                    }`}
                    key={index}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {isLoggedIn && (
                  <Link
                    href="/employee-panel"
                    className={`font-medium hover:text-accent transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    Employee Panel
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`font-medium hover:text-accent transition-colors ${
                      pathname === "/admin" ? "border-b-2 border-accent" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className={`px-4 py-2 text-nowrap bg-accent/75 text-bg hover:bg-accent transition-colors w-fit`}
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/auth/signin"
                    className={`px-4 py-2 text-nowrap bg-accent/75 text-bg hover:bg-accent transition-colors w-fit`}
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>{" "}
    </nav>
  );
}
