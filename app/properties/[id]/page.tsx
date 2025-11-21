"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { Bath, Bed, Calendar, MapPin, Square } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ScheduleViewing from '@/app/_components/ScheduleViewing'
import { useUser } from '@clerk/nextjs'

export default function PropertiesDetailPage({ params }: { params: any }) {
  const property = useQuery(api.properties.getProperty, { id: params.id as any })
  const deleteProperty = useMutation(api.properties.deleteProperty)
  const router = useRouter()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { isSignedIn } = useUser()

  const handleDelete = async () => {
    try {
      await deleteProperty({ id: params.id as any })
      router.push("/properties")
    } catch (error) {
      console.error('Error deleting property', error)
      alert("Failed to delete property")
    }
  }

  return (
    <div className='max-w-6xl mx-auto px-4 md:px-6'>
      {/* Edit/Delete Buttons */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-end gap-4 mt-20 md:mt-25">
      {isSignedIn && (
        <Link href={`/properties/${property?._id}/edit`} className="w-full md:w-auto block">
          <Button className='bg-gray-600 w-full md:w-auto'>Edit</Button>
        </Link>
      )}
      <Button 
        onClick={() => {
          if(!isSignedIn){
            alert("You must be logged in to delete this property")
            return
          }
          handleDelete()
        }} 
        className='bg-red-600 w-full md:w-auto'
      >
        Delete
      </Button>
    </div>



      {/* Image Gallery */}
      <div className="mb-8 mt-8">
        {property?.images && property.images.length > 0 ? (
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full h-64 md:h-96 rounded overflow-hidden">
              <Image
                src={property.images[selectedImageIndex]}
                alt='Property Image'
                fill
                className="object-cover rounded"
              />
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto mt-2 pb-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className="flex-shrink-0"
                  >
                    <Image
                      src={image}
                      alt="Thumbnail"
                      width={80}
                      height={80}
                      className="object-cover w-20 h-20 md:w-32 md:h-32 rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <span className='text-gray-400'>No image available</span>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Address */}
          <div className='border gray-200 rounded-2xl p-2'>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 break-words">{property?.title}</h1>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin />
              <span className="break-words">{property?.address}, {property?.city}, {property?.state}, {property?.zipCode}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 mb-4">
              <p className='text-3xl font-bold text-red-600'>{property?.price} $</p>
              {property?.status === "for-rent" && <span className='text-gray-600'> / Month</span>}
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className='text-lg font-semibold mb-4'>Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bed className='text-gray-600 mx-auto mb-2' />
                <p className="text-xl font-semibold">{property?.bedrooms} Bedrooms</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bath className='text-gray-600 mx-auto mb-2' />
                <p className="text-xl font-semibold">{property?.bathrooms} Bathrooms</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Square className='text-gray-600 mx-auto mb-2' />
                <p className="text-xl font-semibold">{property?.area} Sq Ft</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Calendar className='text-gray-600 mx-auto mb-2' />
                <p className="text-xl font-semibold">{property?.propertyType} Type</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg border ">
            <h3 className='text-lg font-bold mb-2'>Description</h3>
            <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>{property?.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          {/* Contact Card */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className='font-bold text-lg mb-4'>Contact Information</h3>
            <div className="space-y-3 flex flex-col items-center justify-center">
              <Dialog>
                <DialogTrigger>
                  <Button className='w-full md:w-auto'>Contact Agent</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      <div className="flex items-center justify-center gap-4">
                        <Image width={50} height={50} className='rounded-full' src="/apple.png" alt='whatsapp' />
                        <a href="https://wa.me/201201302871" className='text-3xl break-words'>01201302871</a>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {property?._id && (
                <ScheduleViewing property={{
                  _id: property._id,
                  title: property.title
                }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
