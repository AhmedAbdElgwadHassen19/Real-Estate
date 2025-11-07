"use client";
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'
import PropertyCard from './PropertyCard';
import { ArrowBigRight } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedProperties() {
  const featuredProperties  = useQuery(api.properties.getFeatuedProperties)
     
  return (
    <div className='p-24 items-center mb-8 space-y-12'>
      <h2>FeaturedProperties</h2>
      {featuredProperties === undefined ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_ ,i )=>(
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
          ))}
        </div>
      ):featuredProperties.length === 0 ?(
        <div className="text-center py-12">
          <h3 className='text-lg font-semibold text-gray-600 mb-4'>No featuredProperties yet </h3>
          <Button>Add your property</Button>
        </div>
      ):(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties?.map((property)=> (
            <PropertyCard key={property._id} property={property}/>
          ))}
        </div>
      )}

      <div className="flex items-center justify-end">
        <Link href="properties"> <Button> See All <ArrowBigRight/></Button> </Link>
      </div>
      

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 py-12'>
        <div className="flex flex-col items-center shadow-lg h-[150px] bg-[#f9e0e0] justify-center rounded-lg">
          <h3 className='text-4xl font-bold text-[#e04141]'>500</h3>
          <p className="text-gray-600">properties Listed</p>
        </div>

        <div className="flex flex-col items-center shadow-lg h-[150px] bg-gray-100 justify-center rounded-lg">
          <h3 className='text-4xl font-bold text-green-700'>200+</h3>
          <p className="text-gray-600"> Happy Clients</p>
        </div>

        <div className="flex flex-col items-center shadow-lg h-[150px] bg-blue-100 justify-center rounded-lg">
          <h3 className='text-4xl font-bold text-blue'>50+</h3>
          <p className="text-gray-600">Cities Covered Listed</p>
        </div>
      </div>
    </div>
  )
}
