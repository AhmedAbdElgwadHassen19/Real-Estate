import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function ConnectingPeople() {
  return (
    <div className="p-4 sm:p-8 md:p-12 lg:p-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-5">

      {/* الصورة */}
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
        <Image
          src="/house.jpg"
          alt="image"
          fill
          className="object-cover"
        />
      </div>

      {/* المحتوى */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] text-[#e04141] font-semibold">
          Connecting people with perfect homes is our passion.
        </h1>

        <p className="text-gray-600 mt-3 text-base sm:text-lg md:text-xl">
          With a genuine passion for helping people find their dream homes, we are
          dedicated to connecting buyers and sellers in the real estate market.
          Trust us to make your home buying or selling experience seamless and
          satisfying.
        </p>

        <Button className="mt-5">Read More</Button>
      </div>
    </div>
  )
}
