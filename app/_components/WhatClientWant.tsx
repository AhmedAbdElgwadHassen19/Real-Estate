import { Building, Fence, House, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    icon: House,
    title: "Houses",
    description:
      "Explore beautiful family homes in prestigious neighborhoods, featuring spacious layouts, private gardens, and elegant designs perfect for your family.",
    href: "/properties?type=house",
    label: "Browse Houses",
  },
  {
    icon: Building,
    title: "Apartments",
    description:
      "Discover luxury apartments in prime locations with stunning city views and modern amenities — from cozy studios to spacious penthouses.",
    href: "/properties?type=apartment",
    label: "Browse Apartments",
  },
  {
    icon: Fence,
    title: "Town Houses",
    description:
      "Experience the perfect blend of privacy and community in our elegant townhouses with spacious living areas and modern architectural designs.",
    href: "/properties?type=townhouse",
    label: "Browse Town Houses",
  },
];

export default function WhatClientWant() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          alt="Background"
          src="/house.jpg"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Find Your Match
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            What Are You Looking For?
          </h2>
          <p className="text-gray-300 text-base max-w-xl mx-auto">
            Whether you're buying, renting, or investing — we have the perfect
            property waiting for you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(({ icon: Icon, title, description, href, label }) => (
            <div
              key={title}
              className="group bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-[#e04141]/20 border border-[#e04141]/30 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#e04141]/30 transition-colors duration-300">
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                {description}
              </p>

              {/* CTA */}
              <Link
                href={href}
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#e04141] text-white text-sm font-semibold rounded-xl hover:bg-[#c73636] transition-all duration-200 w-fit group-hover:gap-3"
              >
                {label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
