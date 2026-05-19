"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Plus, Building2, SearchX } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { PropertyFilters as Filters } from "../types";
import PropertyCard from "../_components/PropertyCard";
import PropertyFilter from "../_components/PropertyFilter";
import { useSearchParams } from "next/navigation";
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

function PropertiesPageContent() {
  const [filter, setFilter] = useState<Filters>({});
  const Properties = useQuery(api.properties.getProperties, filter);
  const { isSignedIn } = useUser();

  const searchParams = useSearchParams();
  const propertyType = searchParams.get("type");

  useEffect(() => {
    if (propertyType) {
      setFilter((prev) => ({ ...prev, propertyType }));
    }
  }, [propertyType]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[#e04141] font-semibold uppercase tracking-wider mb-1">
                Browse Listings
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                All Properties
              </h1>
              {Properties !== undefined && (
                <p className="text-gray-500 mt-1 text-sm">
                  {Properties.length} propert{Properties.length === 1 ? "y" : "ies"} found
                </p>
              )}
            </div>

            {isSignedIn && (
              <Link
                href="/properties/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e04141] text-white text-sm font-semibold rounded-xl hover:bg-[#c73636] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Property
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Filter */}
        <PropertyFilter Filters={filter} onFilterChange={setFilter} />

        {/* Results */}
        {Properties === undefined ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : Properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <SearchX className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              No properties found
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Try adjusting your filters or check back later for new listings.
            </p>
            <button
              onClick={() => setFilter({})}
              className="px-5 py-2 text-sm font-medium text-[#e04141] border border-[#e04141] rounded-xl hover:bg-[#e04141] hover:text-white transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 pt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <PropertiesPageContent />
    </Suspense>
  );
}
