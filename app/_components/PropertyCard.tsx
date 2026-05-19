import React from "react";
import { Property } from "../types";
import Link from "next/link";
import Image from "next/image";
import { Bath, Bed, MapPin, Maximize2, Star } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  "for-sale": { label: "For Sale", color: "bg-emerald-500" },
  "for-rent": { label: "For Rent", color: "bg-blue-500" },
  sold: { label: "Sold", color: "bg-gray-500" },
  rented: { label: "Rented", color: "bg-orange-500" },
};

const typeLabel: Record<string, string> = {
  house: "House",
  apartment: "Apartment",
  condo: "Condo",
  townhouse: "Town House",
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const status = statusConfig[property.status] ?? {
    label: property.status,
    color: "bg-gray-500",
  };

  return (
    <Link href={`/properties/${property._id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
          {property.images && property.images.length > 0 ? (
            <Image
              alt={property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              src={property.images[0]}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center gap-2">
              <MapPin className="w-8 h-8 text-gray-300" />
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`${status.color} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md`}
            >
              {status.label}
            </span>
          </div>

          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
                <Star className="w-3 h-3 fill-yellow-900" />
                Featured
              </span>
            </div>
          )}

          {/* Image count */}
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              +{property.images.length - 1} photos
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-bold text-[#e04141]">
              ${property.price.toLocaleString("en-US")}
            </span>
            {property.status === "for-rent" && (
              <span className="text-gray-400 text-sm">/month</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-[#e04141] transition-colors duration-200">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-500 mb-4">
            <MapPin className="w-3.5 h-3.5 mr-1 shrink-0 text-[#e04141]" />
            <span className="text-sm truncate">
              {property.city}, {property.state}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between">
              {/* Specs */}
              <div className="flex items-center gap-3 text-gray-500">
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span className="text-sm font-medium">{property.bedrooms}</span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span className="text-sm font-medium">{property.bathrooms}</span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{property.area} ft²</span>
                </div>
              </div>

              {/* Type */}
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full capitalize">
                {typeLabel[property.propertyType] ?? property.propertyType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
