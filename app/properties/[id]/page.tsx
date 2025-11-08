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

export default function PropertiesDetailPage({ params }: { params: any }) {

  const property = useQuery(api.properties.getProperty, {id: params.id as any } )
  const deleteProperty = useMutation(api.properties.deleteProperty)
  const router = useRouter()
  const [selectedImageIndex , setSelectedImageIndex] = useState(0)

    const handleDelete = async ()=>{
      try{
        await deleteProperty({id: params.id as any})
        router.push("/properties")
      }catch (error){
        console.error('Error deleting property' , error)
        alert("Failed to delete property")
      }
    }

  return (
    <div className='max-w-6xl mx-auto'>
      <div className="flex items-center justify-end gap-4 mt-10">
          <Link href={`/properties/${property?._id}/edit`}>
            <Button className='bg-gray-600'>Edit</Button>
          </Link>
          <Button onClick={handleDelete} className='bg-red-600'>Delete</Button>
      </div>
      

      {/* image Gallery */}

      <div className="mb-8">
        {property?.images && property?.images.length > 0 ? (
          <div className="space-y-4">
            {/* Min image */}
            <div className="relative h-96 w-full mt-10">
              <Image  width={1000} height={700}className='object-cove h-[300px]' src={property?.images[selectedImageIndex]} alt='image'/>
            </div>

            { property?.images.length > 1 && (
              
              <div className="flex space-x-2 overflow-x-auto">
                {property?.images?.map((image , index)=>(
                  <button onClick={()=> setSelectedImageIndex(index)}>
                  <Image width={800} height={500} alt ="image" className='object-cover w-[200px] h-[200px]' src={image}/>
                  </button>
                ))}
              </div>
            )}
          </div>
        ):(
          <span className='text-gray-400'>No image available</span>
        )}
      </div>

      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2"> {property?.title} </h1>
            <div className="flex items-center">
              <MapPin/> 
              <span>{property?.address} , {property?.city} , {property?.state} , {property?.zipCode}</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <p className='text-3xl font-bold text-red-600'>{property?.price} $</p>
              {property?.status === "for-rent" && <span className='text-gray-600'> / Month</span>}
            </div>
          </div>

          {/* property Details */}
            <div className="bg-white p-6 rounded-lg border">
              <h2>property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">

              <div className="text-center p-3 bg-gray-50 rounded-lg mb-2">
                <Bed className='text-gray-600 mx-auto mb-2'/>
                <p className="text-xl font-semibold">{property?.bedrooms} Bedrooms</p>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg mb-2">
                <Bath className='text-gray-600 mx-auto mb-2'/>
                <p className="text-xl font-semibold">{property?.bathrooms} Bathrooms</p>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg mb-2">
                <Square className='text-gray-600 mx-auto mb-2'/>
                <p className="text-xl font-semibold">{property?.area} Sq Ft </p>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg mb-2">
                <Calendar className='text-gray-600 mx-auto mb-2'/>
                <p className="text-xl font-semibold">{property?.propertyType} Type </p>
              </div>

              </div>
            </div>

          {/* Description  */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className='text-lg font-bold'>Description</h3>
              <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>{property?.description}</p>
            </div>

        </div>

        {/* SlidBar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className='font-bold text-lg'>Contact Information</h3>
            <div className="space-y-3 mt-5 flex flex-col items-center justify-center">

              <Dialog>
                <DialogTrigger> <Button className='w-[200px]'>Contact Agent</Button> </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      <div className="flex items-center justify-center  gap-4">
                        <Image width={50} height={100} className='rounded-full' src="/apple.png" alt='whatsapp'/>
                        <a href="https://wa.me/201201302871" className='text-3xl '>01201302871</a>
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
