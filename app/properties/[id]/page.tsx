"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
  Bath,
  Bed,
  Calendar,
  MapPin,
  Maximize2,
  Star,
  Share2,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ScheduleViewing from "@/app/_components/ScheduleViewing";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/app/_components/Toast";

const typeLabel: Record<string, string> = {
  house: "House",
  apartment: "Apartment",
  condo: "Condo",
  townhouse: "Town House",
};

const statusConfig: Record<string, { label: string; color: string }> = {
  "for-sale": { label: "For Sale", color: "bg-emerald-500" },
  "for-rent": { label: "For Rent", color: "bg-blue-500" },
  sold: { label: "Sold", color: "bg-gray-500" },
  rented: { label: "Rented", color: "bg-orange-500" },
};

export default function PropertiesDetailPage({ params }: { params: any }) {
  const property = useQuery(api.properties.getProperty, { id: params.id as any });
  const deleteProperty = useMutation(api.properties.deleteProperty);
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isSignedIn } = useUser();
  const { showToast } = useToast();

  const status = property ? (statusConfig[property.status] ?? { label: property.status, color: "bg-gray-500" }) : null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProperty({ id: params.id as any });
      showToast("Property deleted successfully", "success");
      router.push("/properties");
    } catch (error) {
      console.error("Error deleting property", error);
      showToast("Failed to delete property. Please try again.", "error");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied to clipboard!", "success");
  };

  const prevImage = () =>
    setSelectedImageIndex((i) =>
      i === 0 ? (property?.images?.length ?? 1) - 1 : i - 1
    );
  const nextImage = () =>
    setSelectedImageIndex((i) =>
      i === (property?.images?.length ?? 1) - 1 ? 0 : i + 1
    );

  // Loading skeleton
  if (property === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 animate-pulse">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
          <div className="h-96 bg-gray-200 rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-gray-200 rounded-lg w-3/4" />
              <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
              <div className="h-32 bg-gray-200 rounded-xl" />
            </div>
            <div className="h-64 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (property === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Property not found</h2>
          <Link href="/properties" className="text-[#e04141] hover:underline text-sm">
            ← Back to properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link
            href="/properties"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#e04141] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to listings
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            {isSignedIn && (
              <>
                <Link
                  href={`/properties/${property._id}/edit`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          {property.images && property.images.length > 0 ? (
            <div className="space-y-3">
              {/* Main Image */}
              <div className="relative w-full h-72 md:h-[480px] rounded-2xl overflow-hidden bg-gray-100 group">
                <Image
                  src={property.images[selectedImageIndex]}
                  alt="Property Image"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {status && (
                    <span className={`${status.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow`}>
                      {status.label}
                    </span>
                  )}
                  {property.featured && (
                    <span className="flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2.5 py-1.5 rounded-full shadow">
                      <Star className="w-3 h-3 fill-yellow-900" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                  {selectedImageIndex + 1} / {property.images.length}
                </div>

                {/* Nav arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-200 ${
                        selectedImageIndex === index
                          ? "ring-2 ring-[#e04141] ring-offset-2"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={image} alt="Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-72 bg-gray-100 rounded-2xl flex items-center justify-center">
              <p className="text-gray-400">No images available</p>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title & Price */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {property.title}
                </h1>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full capitalize">
                  {typeLabel[property.propertyType] ?? property.propertyType}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin className="w-4 h-4 text-[#e04141] shrink-0" />
                <span className="text-sm">
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#e04141]">
                  ${property.price.toLocaleString("en-US")}
                </span>
                {property.status === "for-rent" && (
                  <span className="text-gray-400 text-sm">/ month</span>
                )}
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Bed, label: "Bedrooms", value: property.bedrooms },
                  { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                  { icon: Maximize2, label: "Area", value: `${property.area} ft²` },
                  { icon: Calendar, label: "Type", value: typeLabel[property.propertyType] ?? property.propertyType },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#e04141]/10 rounded-xl flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-[#e04141]" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">{value}</span>
                    <span className="text-xs text-gray-400 mt-0.5">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">
                {property.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-28">
              <h3 className="font-semibold text-gray-900 mb-4">Interested in this property?</h3>

              <div className="space-y-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/201201302871"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>

                {/* Call */}
                <a
                  href="tel:+201201302871"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"
                >
                  <Phone className="w-5 h-5" />
                  +20 120 130 2871
                </a>

                {/* Schedule */}
                {property._id && (
                  <ScheduleViewing
                    property={{ _id: property._id, title: property.title }}
                  />
                )}
              </div>

              {/* Quick info */}
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className={`text-xs font-semibold text-white px-2.5 py-1 rounded-full ${status?.color}`}>
                    {status?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Property ID</span>
                  <span className="text-gray-600 font-mono text-xs truncate max-w-[120px]">
                    {property._id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <DialogTitle className="text-center text-lg">Delete Property?</DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-500">
              This will permanently delete{" "}
              <span className="font-semibold text-gray-700">"{property.title}"</span>.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setShowDeleteDialog(false)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                "Yes, Delete"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
