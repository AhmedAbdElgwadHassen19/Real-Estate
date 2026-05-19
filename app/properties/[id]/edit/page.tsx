"use client";
import PropertyForm from "@/app/_components/PropertyForm";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const [propertyId, setPropertyId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolved) => setPropertyId(resolved.id));
  }, [params]);

  const property = useQuery(
    api.properties.getProperty,
    propertyId ? { id: propertyId as any } : "skip"
  );

  if (!propertyId || property === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse" />
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-10 bg-gray-200 rounded-xl" />
            <div className="h-24 bg-gray-200 rounded-xl" />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded-xl" />
              <div className="h-10 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (property === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Property not found</h2>
          <Link href="/properties" className="inline-flex items-center gap-1.5 text-sm text-[#e04141] hover:underline">
            <ChevronLeft className="w-4 h-4" />
            Back to properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PropertyForm
      isEditing={true}
      initialData={property}
      propertyId={propertyId}
    />
  );
}
