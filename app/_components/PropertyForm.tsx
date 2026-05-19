"use client";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import React, { useState } from "react";
import { PropertyFormData } from "../types";
import {
  Upload, X, ImagePlus, Home, DollarSign, MapPin,
  Tag, Star, ChevronLeft, CheckCircle2, Circle,
  Bed, Bath, Maximize2, Building2, Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useToast } from "./Toast";

interface PropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  isEditing?: boolean;
  propertyId?: string;
}

type Step = "basic" | "details" | "location" | "images";

const steps: { id: Step; label: string; icon: React.ElementType }[] = [
  { id: "basic",   label: "Basic Info",  icon: Home       },
  { id: "details", label: "Details",     icon: Tag        },
  { id: "location",label: "Location",    icon: MapPin     },
  { id: "images",  label: "Images",      icon: ImagePlus  },
];

const inputClass =
  "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#e04141]/20 focus:border-[#e04141] transition-all duration-200";
const selectClass =
  "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#e04141]/20 focus:border-[#e04141] transition-all duration-200 appearance-none cursor-pointer";
const labelClass =
  "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

const statusColors: Record<string, string> = {
  "for-sale": "bg-emerald-500",
  "for-rent": "bg-blue-500",
  sold: "bg-gray-500",
  rented: "bg-orange-500",
};
const statusLabels: Record<string, string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  sold: "Sold",
  rented: "Rented",
};
const typeLabels: Record<string, string> = {
  house: "House", apartment: "Apartment", condo: "Condo", townhouse: "Town House",
};

export default function PropertyForm({ initialData, isEditing = false, propertyId }: PropertyFormProps) {
  const [activeStep, setActiveStep] = useState<Step>("basic");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const createProperty = useMutation(api.properties.createProperty);
  const updateProperty = useMutation(api.properties.updateProperty);
  const { user } = useUser();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title:        initialData?.title        || "",
    description:  initialData?.description  || "",
    price:        initialData?.price        || 0,
    bedrooms:     initialData?.bedrooms     || 1,
    bathrooms:    initialData?.bathrooms    || 1,
    area:         initialData?.area         || 0,
    address:      initialData?.address      || "",
    city:         initialData?.city         || "",
    state:        initialData?.state        || "",
    zipCode:      initialData?.zipCode      || "",
    propertyType: initialData?.propertyTye  || "house",
    status:       initialData?.status       || "for-sale",
    images:       initialData?.images       || [],
    featured:     initialData?.featured     || false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "bedrooms", "bathrooms", "area"].includes(name) ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const removeImage = (index: number) =>
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditing && propertyId) {
        await updateProperty({ id: propertyId as any, ...formData });
        showToast("Property updated successfully!", "success");
      } else {
        await createProperty(formData);
        showToast("Property created successfully!", "success");
      }
      router.push("/properties");
    } catch (error) {
      console.error("Error saving property:", error);
      showToast("Failed to save property. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setIsUploading(true);
    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const data = new FormData();
        data.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: data });
        if (!res.ok) throw new Error("Upload failed");
        const { url } = await res.json();
        uploaded.push(url);
      }
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
      showToast(`${uploaded.length} image(s) uploaded`, "success");
    } catch {
      showToast("Failed to upload images. Please try again.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const stepComplete: Record<Step, boolean> = {
    basic:    !!(formData.title && formData.description),
    details:  !!(formData.price && formData.area),
    location: !!(formData.address && formData.city && formData.state && formData.zipCode),
    images:   formData.images.length > 0,
  };

  const completedCount = Object.values(stepComplete).filter(Boolean).length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between pt-16">
          <div className="flex items-center gap-4">
            <Link href="/properties" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#e04141] transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Properties
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-semibold text-gray-800">
              {isEditing ? "Edit Property" : "New Property"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-800">{completedCount}/{steps.length}</span> sections complete
              <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#e04141] rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="hidden lg:flex flex-col gap-3 w-64 shrink-0">

            {/* Steps Nav */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-3">Sections</p>
              <nav className="space-y-1">
                {steps.map(({ id, label, icon: Icon }) => {
                  const isActive = activeStep === id;
                  const isDone   = stepComplete[id];
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveStep(id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#e04141] text-white shadow-md shadow-[#e04141]/20"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1 text-left">{label}</span>
                      {isDone
                        ? <CheckCircle2 className={`w-4 h-4 shrink-0 ${isActive ? "text-white/70" : "text-emerald-500"}`} />
                        : <Circle className={`w-4 h-4 shrink-0 ${isActive ? "text-white/40" : "text-gray-200"}`} />
                      }
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Progress Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-500">Completion</p>
                <span className="text-sm font-bold text-[#e04141]">{progressPct}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#e04141] to-[#ff6b6b] rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">{completedCount} of {steps.length} sections filled</p>
            </div>

            {/* Live Preview Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                <Eye className="w-4 h-4 text-[#e04141]" />
                <p className="text-xs font-semibold text-gray-600">Live Preview</p>
              </div>
              <div className="relative h-28 bg-gray-100">
                {formData.images[0]
                  ? <Image src={formData.images[0]} alt="preview" fill className="object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><Building2 className="w-8 h-8 text-gray-300" /></div>
                }
                {formData.status && (
                  <span className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[formData.status]}`}>
                    {statusLabels[formData.status]}
                  </span>
                )}
              </div>
              <div className="p-3 space-y-1">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {formData.title || <span className="text-gray-300 font-normal">Property title...</span>}
                </p>
                {formData.price > 0 && (
                  <p className="text-sm font-bold text-[#e04141]">${formData.price.toLocaleString()}</p>
                )}
                {formData.city && (
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{formData.city}{formData.state ? `, ${formData.state}` : ""}
                  </p>
                )}
                <div className="flex items-center gap-2 pt-1">
                  {formData.bedrooms > 0 && <span className="flex items-center gap-1 text-xs text-gray-500"><Bed className="w-3 h-3" />{formData.bedrooms}</span>}
                  {formData.bathrooms > 0 && <span className="flex items-center gap-1 text-xs text-gray-500"><Bath className="w-3 h-3" />{formData.bathrooms}</span>}
                  {formData.area > 0 && <span className="flex items-center gap-1 text-xs text-gray-500"><Maximize2 className="w-3 h-3" />{formData.area}ft²</span>}
                </div>
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Mobile Step Tabs */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-1">
                {steps.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveStep(id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      activeStep === id ? "bg-[#e04141] text-white" : "bg-white border border-gray-200 text-gray-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    {stepComplete[id] && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>

              {/* ── STEP: BASIC INFO ── */}
              {activeStep === "basic" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                    <div className="w-8 h-8 bg-[#e04141]/10 rounded-lg flex items-center justify-center">
                      <Home className="w-4 h-4 text-[#e04141]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Basic Information</h3>
                      <p className="text-xs text-gray-400">Title and description of your property</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className={labelClass}>Property Title *</label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} required
                        placeholder="e.g. Modern 3-Bedroom Villa in New Cairo" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Description *</label>
                      <textarea name="description" value={formData.description} onChange={handleInputChange} required
                        rows={5} placeholder="Describe the property — features, condition, nearby amenities..."
                        className={`${inputClass} resize-none`} />
                      <p className="text-xs text-gray-400 mt-1">{formData.description.length} characters</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 flex justify-end">
                    <button type="button" onClick={() => setActiveStep("details")}
                      className="px-6 py-2.5 bg-[#e04141] text-white text-sm font-semibold rounded-xl hover:bg-[#c73636] transition-colors">
                      Next: Details →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP: DETAILS ── */}
              {activeStep === "details" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                    <div className="w-8 h-8 bg-[#e04141]/10 rounded-lg flex items-center justify-center">
                      <Tag className="w-4 h-4 text-[#e04141]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Pricing & Property Details</h3>
                      <p className="text-xs text-gray-400">Price, size, type and listing status</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-5">
                    {/* Price & Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Price (USD) *</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">$</span>
                          <input type="number" name="price" value={formData.price || ""} onChange={handleInputChange}
                            required min={0} placeholder="0" className={`${inputClass} pl-8`} />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Area *</label>
                        <div className="relative">
                          <input type="number" name="area" value={formData.area || ""} onChange={handleInputChange}
                            required min={0} placeholder="0" className={`${inputClass} pr-12`} />
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">ft²</span>
                        </div>
                      </div>
                    </div>

                    {/* Beds / Baths / Type / Status */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className={labelClass}>Bedrooms</label>
                        <SelectWrapper>
                          <select name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} className={selectClass}>
                            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </SelectWrapper>
                      </div>
                      <div>
                        <label className={labelClass}>Bathrooms</label>
                        <SelectWrapper>
                          <select name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} className={selectClass}>
                            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </SelectWrapper>
                      </div>
                      <div>
                        <label className={labelClass}>Type</label>
                        <SelectWrapper>
                          <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className={selectClass}>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="condo">Condo</option>
                            <option value="townhouse">Townhouse</option>
                          </select>
                        </SelectWrapper>
                      </div>
                      <div>
                        <label className={labelClass}>Status</label>
                        <SelectWrapper>
                          <select name="status" value={formData.status} onChange={handleInputChange} className={selectClass}>
                            <option value="for-sale">For Sale</option>
                            <option value="for-rent">For Rent</option>
                            <option value="sold">Sold</option>
                            <option value="rented">Rented</option>
                          </select>
                        </SelectWrapper>
                      </div>
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Featured Property</p>
                          <p className="text-xs text-gray-500">Show on homepage featured section</p>
                        </div>
                      </div>
                      <label className="relative cursor-pointer">
                        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleCheckboxChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#e04141] rounded-full transition-colors duration-200" />
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5" />
                      </label>
                    </div>
                  </div>
                  <div className="px-6 pb-6 flex justify-between">
                    <button type="button" onClick={() => setActiveStep("basic")}
                      className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      ← Back
                    </button>
                    <button type="button" onClick={() => setActiveStep("location")}
                      className="px-6 py-2.5 bg-[#e04141] text-white text-sm font-semibold rounded-xl hover:bg-[#c73636] transition-colors">
                      Next: Location →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP: LOCATION ── */}
              {activeStep === "location" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                    <div className="w-8 h-8 bg-[#e04141]/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-[#e04141]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Location</h3>
                      <p className="text-xs text-gray-400">Where is the property located?</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className={labelClass}>Street Address *</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange}
                        required placeholder="123 Main Street, Building 5" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className={labelClass}>City *</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange}
                          required placeholder="Cairo" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>State / Governorate *</label>
                        <input type="text" name="state" value={formData.state} onChange={handleInputChange}
                          required placeholder="Cairo" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>ZIP Code *</label>
                        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange}
                          required placeholder="11511" className={inputClass} />
                      </div>
                    </div>

                    {/* Location preview pill */}
                    {formData.city && (
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#e04141]/5 border border-[#e04141]/15 rounded-xl w-fit">
                        <MapPin className="w-4 h-4 text-[#e04141]" />
                        <span className="text-sm text-gray-700 font-medium">
                          {[formData.address, formData.city, formData.state, formData.zipCode].filter(Boolean).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="px-6 pb-6 flex justify-between">
                    <button type="button" onClick={() => setActiveStep("details")}
                      className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      ← Back
                    </button>
                    <button type="button" onClick={() => setActiveStep("images")}
                      className="px-6 py-2.5 bg-[#e04141] text-white text-sm font-semibold rounded-xl hover:bg-[#c73636] transition-colors">
                      Next: Images →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP: IMAGES ── */}
              {activeStep === "images" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                    <div className="w-8 h-8 bg-[#e04141]/10 rounded-lg flex items-center justify-center">
                      <ImagePlus className="w-4 h-4 text-[#e04141]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Property Images</h3>
                      <p className="text-xs text-gray-400">Upload photos — first image will be the cover</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Upload Zone */}
                    <label className="block cursor-pointer">
                      <div className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 ${
                        isUploading ? "border-[#e04141] bg-[#e04141]/5" : "border-gray-200 hover:border-[#e04141] hover:bg-[#e04141]/5"
                      }`}>
                        {isUploading ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-2 border-[#e04141]/30 border-t-[#e04141] rounded-full animate-spin" />
                            <p className="text-sm text-[#e04141] font-semibold">Uploading images...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 bg-[#e04141]/10 rounded-2xl flex items-center justify-center">
                              <Upload className="w-7 h-7 text-[#e04141]" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-700">Click to upload images</p>
                              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — up to 10MB each</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="hidden" />
                    </label>

                    {/* Image Grid */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {formData.images.map((url, i) => (
                          <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 shadow-sm">
                            <Image src={url} alt="Property" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <button type="button" onClick={() => removeImage(i)}
                                className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            {i === 0 && (
                              <div className="absolute top-2 left-2 bg-[#e04141] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                                Cover
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="px-6 pb-6 flex justify-between">
                    <button type="button" onClick={() => setActiveStep("location")}
                      className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      ← Back
                    </button>
                  </div>
                </div>
              )}

              {/* ── SUBMIT BAR ── */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between gap-4">
                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
                  <div className="flex gap-1">
                    {steps.map(({ id }) => (
                      <div key={id} className={`w-2 h-2 rounded-full transition-colors ${stepComplete[id] ? "bg-emerald-400" : "bg-gray-200"}`} />
                    ))}
                  </div>
                  {completedCount === steps.length
                    ? <span className="text-emerald-600 font-medium">All sections complete ✓</span>
                    : <span>{steps.length - completedCount} section(s) remaining</span>
                  }
                </div>
                <div className="flex items-center gap-3 ml-auto">
                  <Link href="/properties"
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    Cancel
                  </Link>
                  {user ? (
                    <button type="submit" disabled={isSubmitting}
                      className="flex items-center gap-2 px-7 py-2.5 bg-[#e04141] text-white text-sm font-semibold rounded-xl hover:bg-[#c73636] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                      {isSubmitting ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{isEditing ? "Updating..." : "Creating..."}</>
                      ) : (
                        isEditing ? "Update Property" : "Publish Property"
                      )}
                    </button>
                  ) : (
                    <Link href="/sign-in"
                      className="px-7 py-2.5 bg-[#e04141] text-white text-sm font-semibold rounded-xl hover:bg-[#c73636] transition-colors">
                      Sign in to continue
                    </Link>
                  )}
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
