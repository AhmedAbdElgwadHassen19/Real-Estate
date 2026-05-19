import React from "react";
import { Home, Key, Building2, TrendingUp, ShieldCheck, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Home,
    title: "Property Sales",
    description:
      "Find your dream home with our expert team guiding you through every step for a smooth, confident transaction.",
    href: "/properties?status=for-sale",
  },
  {
    icon: Key,
    title: "Property Rentals",
    description:
      "Discover a wide range of rental options tailored to your lifestyle, budget, and preferred location.",
    href: "/properties?status=for-rent",
  },
  {
    icon: Building2,
    title: "Property Management",
    description:
      "Let us handle the day-to-day management of your property, maximizing its value while minimizing your stress.",
    href: "/properties",
  },
  {
    icon: TrendingUp,
    title: "Smart Investments",
    description:
      "Unlock lucrative real estate investment opportunities with data-driven insights and expert market analysis.",
    href: "/properties",
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#e04141]/10 text-[#e04141] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <ShieldCheck className="w-4 h-4" />
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What We Do
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            Simplifying the journey of buying, selling, and renting properties.
            Our expert team provides comprehensive solutions tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-[#e04141]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#e04141]/10 group-hover:bg-[#e04141]/20 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#e04141]" />
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Link */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-[#e04141] text-sm font-semibold mt-5 group-hover:gap-2.5 transition-all duration-200"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm mb-5">
            <Users className="w-4 h-4" />
            Trusted by 1,000+ satisfied clients
          </div>
          <div className="block" />
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#e04141] text-white font-semibold rounded-xl hover:bg-[#c73636] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Browse All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
