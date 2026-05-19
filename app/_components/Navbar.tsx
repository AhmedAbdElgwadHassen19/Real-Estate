"use client";
import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Menu, X, Home, Building2 } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change / outside click
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/properties", label: "Properties", icon: Building2 },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-[#e04141] rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Real<span className="text-[#e04141]">Key</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:text-[#e04141] ${
                    scrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white/90"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {isLoaded && (
                <>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          scrolled ? "text-gray-700" : "text-white/90"
                        }`}
                      >
                        {user.firstName} {user.lastName}
                      </span>
                      <div className="ring-2 ring-[#e04141]/30 rounded-full">
                        <UserButton />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Link
                        href="/sign-in"
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          scrolled
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-white/90 hover:bg-white/10"
                        }`}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/sign-up"
                        className="px-4 py-2 text-sm font-semibold bg-[#e04141] text-white rounded-lg hover:bg-[#c73636] transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-[#e04141] rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Real<span className="text-[#e04141]">Key</span>
              </span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="p-4 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-[#e04141]/5 hover:text-[#e04141] transition-all duration-200"
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>

          {/* Drawer Auth */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50">
            {isLoaded && (
              <>
                {user ? (
                  <div className="flex items-center gap-3 px-2">
                    <div className="ring-2 ring-[#e04141]/30 rounded-full">
                      <UserButton />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className="w-full text-center px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setOpen(false)}
                      className="w-full text-center px-4 py-2.5 text-sm font-semibold bg-[#e04141] text-white rounded-xl hover:bg-[#c73636] transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
