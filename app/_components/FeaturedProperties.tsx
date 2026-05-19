"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import PropertyCard from "./PropertyCard";
import { ArrowRight, Star, Plus } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded-lg w-1/3" />
        <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
        <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
        <div className="border-t border-gray-100 pt-3">
          <div className="h-4 bg-gray-200 rounded-lg w-2/3" />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProperties() {
  const featuredProperties = useQuery(api.properties.getFeaturedProperties);
  const { isSignedIn } = useUser();

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-[#e04141] fill-[#e04141]" />
            <span className="text-sm font-semibold text-[#e04141] uppercase tracking-wider">
              Hand-picked for you
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured Properties
          </h2>
          <p className="text-gray-500 mt-2 max-w-md">
            Explore our top-rated listings selected by our expert team.
          </p>
        </div>

        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#e04141] hover:gap-3 transition-all duration-200 shrink-0"
        >
          View all listings
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Cards */}
      {featuredProperties === undefined ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : featuredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Star className="w-10 h-10 text-gray-300 mb-3" />
          <h3 className="text-base font-semibold text-gray-600 mb-1">
            No featured properties yet
          </h3>
          <p className="text-sm text-gray-400 mb-5">
            Add a property and mark it as featured to show it here.
          </p>
          {isSignedIn && (
            <Link
              href="/properties/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e04141] text-white text-sm font-semibold rounded-xl hover:bg-[#c73636] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}
