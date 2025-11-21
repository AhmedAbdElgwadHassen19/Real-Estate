import { Button } from '@/components/ui/button'
import { Building, Fence, House } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function WhatClientWant() {
  return (
    <div className="relative w-full h-auto lg:h-[750px]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          alt="hero"
          src="/house.jpg"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center p-4 sm:p-10 lg:p-24">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-bold text-white mt-20 mb-10 text-center">
          What Are You Looking For
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full text-white">

          {/* House */}
          <div className="p-6 bg-black/70 rounded-lg flex flex-col items-center h-auto md:h-[350px] lg:h-[400px] text-center">
            <House className="w-[55px] h-[55px] md:w-[85px] md:h-[85px]" />
            <h3 className="my-3 text-xl md:text-2xl">Houses</h3>
            <p className="text-sm md:text-base">
              Explore beautiful family homes in prestigious neighborhoods, featuring spacious layouts, private gardens, and elegant designs. From charming townhouses to grand estates, each property offers privacy, comfort, and the perfect environment for your family to grow and thrive.
            </p>
            <Link href="/properties?type=house">
              <Button className="bg-[#e04141] mt-5">See All Houses</Button>
            </Link>
          </div>

          {/* Apartment */}
          <div className="p-6 bg-black/70 rounded-lg flex flex-col items-center h-auto md:h-[350px] lg:h-[400px] text-center">
            <Building className="w-[55px] h-[55px] md:w-[85px] md:h-[85px]" />
            <h3 className="my-3 text-xl md:text-2xl">Apartments</h3>
            <p className="text-sm md:text-base">
              Discover luxury apartments in prime locations with stunning city views and modern amenities. From cozy studios to spacious penthouses, find your perfect home with top-tier facilities including gyms, pools, and 24/7 security. Experience comfort and convenience in every detail.
            </p>
            <Link href="/properties?type=apartment">
              <Button className="bg-[#e04141] mt-5">See All Apartments</Button>
            </Link>
          </div>

          {/* Townhouse */}
          <div className="p-6 bg-black/70 rounded-lg flex flex-col items-center h-auto md:h-[350px] lg:h-[400px] text-center">
            <Fence className="w-[55px] h-[55px] md:w-[85px] md:h-[85px]" />
            <h3 className="my-3 text-xl md:text-2xl">Town House</h3>
            <p className="text-sm md:text-base">
              Experience the perfect blend of privacy and community in our elegant townhouses. These multi-level homes offer spacious living areas, private gardens, and modern architectural designs. Featuring 2-4 bedrooms, contemporary kitchens, and dedicated parking spaces
            </p>
            <Link href="/properties?type=townhouse">
              <Button className="bg-[#e04141] mt-5">See All Town Houses</Button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}

export default WhatClientWant
