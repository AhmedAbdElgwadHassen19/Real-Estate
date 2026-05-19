"use client";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden w-full h-[750px]">
      {/* Background Image */}
      <Image
        width={1920}
        height={1080}
        src="/hero.jpg"
        alt="hero"
        className="object-cover w-full h-[750px]"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-[#e04141] rounded-full animate-pulse" />
          Your Trusted Real Estate Partner
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Find Your{" "}
          <span className="text-[#e04141] relative">
            Dream Home
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10 C75 2, 225 2, 298 10"
                stroke="#e04141"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
          We provide innovative solutions and premium services to help you buy,
          sell, or rent properties with confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/properties"
            className="flex items-center gap-2 px-8 py-3.5 bg-[#e04141] text-white font-semibold rounded-xl hover:bg-[#c73636] transition-all duration-200 shadow-lg hover:shadow-[#e04141]/30 hover:shadow-xl hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4" />
            Browse Properties
          </Link>

          {!user && (
            <Link
              href="/sign-up"
              className="flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-14 text-white">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#e04141]">500+</p>
            <p className="text-xs text-gray-400 mt-0.5">Properties Listed</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <p className="text-3xl font-bold text-[#e04141]">200+</p>
            <p className="text-xs text-gray-400 mt-0.5">Happy Clients</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <p className="text-3xl font-bold text-[#e04141]">50+</p>
            <p className="text-xs text-gray-400 mt-0.5">Cities Covered</p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
