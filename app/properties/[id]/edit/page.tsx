"use client"
import PropertyForm from '@/app/_components/PropertyForm'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'

export default function page({params}: {params : Promise < {id : string}> }) {

    const [propertyId ,setPropertyId] = useState < string | null > (null)

    useEffect (()=>{
        params.then((resolvedParams)=>{
            setPropertyId(resolvedParams.id)
        })
    },[[params]])

    const property = useQuery(api.properties.getProperty , propertyId ? {id : propertyId as any} : "skip")
    if(!propertyId){
        return <div>Loading...</div>
    }

    if(property === undefined){
        return <div>Loading Property...</div>
    }
    if(property === null){
        return <div>Property not found</div>
    }

  return (
    <div>
        <PropertyForm isEditing = {true} initialData = {property} propertyId = {propertyId}/>
    </div>
  )
}