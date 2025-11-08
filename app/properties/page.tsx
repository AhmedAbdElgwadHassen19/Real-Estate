"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { ArrowBigRight } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
import {PropertyFilters as Filters} from "../types"
import PropertyCard from '../_components/PropertyCard'
import PropertyFilter from '../_components/PropertyFilter'
import { useSearchParams } from 'next/navigation'

function PropertiesPageContent () {

    const [filter , setFilter] = useState<Filters>({})
    const Properties  = useQuery(api.properties.getProperties, filter)

  const searchParams = useSearchParams()
  const propertyType = searchParams.get("type")

  useEffect(()=>{
    if(propertyType){
      setFilter((prev)=>({
        ...prev,
        propertyType: propertyType
      }))
    }
  },[propertyType])

    return (
        <div className='p-24 items-center mb-8 space-y-12'>
          <h2>All Properties</h2>
      
          <div className="flex items-center justify-end">
            <Link href="properties/new"> <Button> Add Property<ArrowBigRight/></Button> </Link>
          </div>

          <PropertyFilter Filters={filter} onFilterChange={setFilter}/>

          {Properties === undefined ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...Array(6)].map( (_ ,i )=>(
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
              ))}
            </div>
          ):Properties.length === 0 ?(
            <div className="text-center py-12">
              <h3 className='text-lg font-semibold text-gray-600 mb-4'>No Properties yet </h3>
              <Button>Add your property</Button>
            </div>
          ):(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Properties?.map((property)=> (
                <PropertyCard key={property._id} property={property}/>
              ))}
            </div>
          )}  
        </div>
      )
}

export default function page (){
  return(
    <>
      <Suspense fallback ={<div>Loading...</div>}>
        <PropertiesPageContent/>
      </Suspense>
    </>
  )
}