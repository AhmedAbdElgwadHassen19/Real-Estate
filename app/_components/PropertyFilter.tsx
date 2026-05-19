"use client";
import React from "react";
import { PropertyFilters as Filters } from "../types";
import { SlidersHorizontal, X } from "lucide-react";

interface PropertyFiltersProps {
  Filters: Filters;
  onFilterChange: (Filters: Filters) => void;
}

const selectClass =
  "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e04141]/30 focus:border-[#e04141] transition-all duration-200 appearance-none cursor-pointer";

const inputClass =
  "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e04141]/30 focus:border-[#e04141] transition-all duration-200";

const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

export default function PropertyFilter({
  Filters,
  onFilterChange,
}: PropertyFiltersProps) {
  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFilterChange({
      ...Filters,
      [key]: value === "" || value === "all" ? undefined : value,
    });
  };

  const hasActiveFilters = Object.values(Filters).some(
    (v) => v !== undefined && v !== ""
  );

  const clearFilters = () => onFilterChange({});

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#e04141]" />
          <span className="text-sm font-semibold text-gray-700">Filters</span>
          {hasActiveFilters && (
            <span className="bg-[#e04141] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#e04141] transition-colors duration-200"
          >
            <X className="w-3.5 h-3.5" />
            Clear all
          </button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Property Type */}
        <div>
          <label className={labelClass}>Type</label>
          <div className="relative">
            <select
              className={selectClass}
              value={Filters?.propertyType || "all"}
              onChange={(e) => handleFilterChange("propertyType", e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className={labelClass}>Status</label>
          <div className="relative">
            <select
              className={selectClass}
              value={Filters?.status || "all"}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className={labelClass}>Bedrooms</label>
          <div className="relative">
            <select
              className={selectClass}
              value={Filters?.bedrooms || ""}
              onChange={(e) =>
                handleFilterChange(
                  "bedrooms",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className={labelClass}>Bathrooms</label>
          <div className="relative">
            <select
              className={selectClass}
              value={Filters?.bathrooms || ""}
              onChange={(e) =>
                handleFilterChange(
                  "bathrooms",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Min Price */}
        <div>
          <label className={labelClass}>Min Price</label>
          <input
            type="number"
            placeholder="$ Min"
            className={inputClass}
            value={Filters?.minPrice || ""}
            onChange={(e) =>
              handleFilterChange(
                "minPrice",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>

        {/* Max Price */}
        <div>
          <label className={labelClass}>Max Price</label>
          <input
            type="number"
            placeholder="$ Max"
            className={inputClass}
            value={Filters?.maxPrice || ""}
            onChange={(e) =>
              handleFilterChange(
                "maxPrice",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
