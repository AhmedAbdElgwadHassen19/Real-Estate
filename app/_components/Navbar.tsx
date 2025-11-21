"use client";
import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        bg-white shadow-md fixed top-0 z-50 border rounded-md
        transform -translate-x-1/2 left-1/2
        transition-all duration-400
        ${scrolled ? "w-full px-4" : "w-[80%]"}
        md:${scrolled ? "w-full" : "w-[80%]"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          RealEstate
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Menu */}
        <ul
          className={`
            md:flex gap-6 font-medium 
            absolute md:static bg-white left-0 w-full md:w-auto
            px-6 md:px-0 transition-all duration-300
            ${open ? "top-14" : "-top-96"}
          `}
        >
          <li>
            <Link
              href="/"
              className="block py-2 bg-gray-200 text-center p-3 border rounded-md hover:rounded-[5px] transition-all duration-300 hover:text-blue-600 hover:bg-gray-300 mb-3 md:mb-0"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/properties"
              className="block py-2 bg-gray-200 text-center p-3 border rounded-md hover:rounded-[5px] transition-all duration-300 hover:text-blue-600 hover:bg-gray-300"
            >
              ALL Property
            </Link>
          </li>

          {/* User Button + Name */}
          {user && (

          
          <li
            className="
              flex items-center gap-2 mt-3 md:mt-0 justify-center
              bg-gray-200 border p-2 rounded-md
              hover:bg-gray-300 transition-all duration-300 mb-3
            "
          >
            <UserButton />
            <span className="font-medium">
              {(user?.firstName || "") + " " + (user?.lastName || "")}
            </span>
          </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
