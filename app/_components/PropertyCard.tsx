import React from 'react'
import { Property } from '../types'
import Link from 'next/link'
import Image from 'next/image'
import { Bath, Bed, MapPin, Square } from 'lucide-react'

interface PropertyCardProps {
    property:Property
}
export default function PropertyCard({property}:PropertyCardProps) {

    

  return (
    <Link href={`/properties/${property._id}`}>
        <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer'>

            <div className="relative h-48 w-full">
                {property.images && property?.images?.length > 0 ? (
                <Image  alt='image' fill className='object-cover' src={property?.images[0]}/>
                ):(
                    <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                        <span className='text-gray-400 '>No Image</span>
                    </div>
                )}
                
            <div className="absolute top-4 left-4">
                <span className='bg-[#e04141] p-2 rounded-full text-white'>{property?.status}</span>
            </div>

            {property?.featured && (
                <div className="absolute top-4 right-4">
                    <span className="bg-yellow-500 p-2 rounded-full text-black">Featured</span>
                </div>
            )}
        </div>


        <div className="p-4">
            <div className="mb-2">
                <span className="text-2xl font-bold text-[#e04141]">{property?.price.toLocaleString("en-US")}$</span>
                {property?.status === "for-rent" && (
                    <span className="text-gray-600">/month</span>
                )}
            </div>


            <h3 className='text-lg font-semibold text-gray-900 mb-2'>{property.title}</h3>

            <div className="flex items-center text-gray-900 mb-3">
                <MapPin className='w-4 h-4 mr-1'/>
                <span className='text-sm'>{property?.city} , {property?.state}</span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center space-x-4 ">
                    <div className="flex items-center">
                        <Bed className='h-4 w-4 mr-1 '/>
                        <span className='text-sm'>{property.bedrooms}</span>
                    </div>

                    <div className="flex items-center">
                        <Bath className='h-4 w-4 mr-1 '/>
                        <span className='text-sm'>{property.bathrooms}</span>
                    </div>

                    <div className="flex items-center">
                        <Square className='h-4 w-4 mr-1 '/>
                        <span className='text-sm'>{property.area}</span>
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full capitalize">
                    {property.propertyType.replace("-", "")}
                </span>
            </div>
        </div>
            
        </div>
    </Link>
    
  )
}
