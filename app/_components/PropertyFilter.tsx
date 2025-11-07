import React from 'react'
import {PropertyFilters as Filters} from "../types"

interface PropertyFiltersProps{
    Filters : Filters , 
    onFilterChange :(Filters : Filters) => void
}


export default function PropertyFilter({Filters , onFilterChange}:PropertyFiltersProps) {
    const handleFilterChange = (key : keyof Filters , value: any)=>{
        onFilterChange({
            ...Filters,
            [key]: value === "" || value === "all" ? undefined : value
        })
    }
    return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={Filters?.propertyType || "all"}
                onChange={(e) => handleFilterChange("propertyType", e.target.value)}>
                <option value="all">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
      
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={Filters?.status || "all"}
                onChange={(e) => handleFilterChange("status", e.target.value)}>
                <option value="all">All Status</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>
           
      
            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={Filters?.bedrooms || ""}
                onChange={(e) => handleFilterChange("bedrooms",e.target.value ? Number(e.target.value) : undefined)}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            
      
            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={Filters?.bathrooms || ""} onChange={(e) => handleFilterChange("bathrooms", e.target.value ? Number(e.target.value) : undefined)}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/*Min Price */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"> Min Price </label>
                <input type='number' placeholder='Min Price'
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={Filters?.minPrice || ""} onChange={(e) => handleFilterChange("minPrice", e.target.value ? Number(e.target.value) : undefined)}/>
            </div>

            {/* MaxPrice */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"> Max Price </label>
                <input type='number' placeholder='Max Price'
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={Filters?.maxPrice || ""} onChange={(e) => handleFilterChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)}/>
            </div>
      
          </div>
        </div>
      )
      
}
