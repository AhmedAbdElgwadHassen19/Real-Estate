import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
    <>
    <div className="relative overflow-hidden w-full h-[750px]">
      <Image width={1200} height={1200}  src= "/hero.jpg" alt='hero' className=' object-cover  w-full h-[750px]' />

      <div className="absolute inset-0 bg-black/80"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className='text-5xl md:text-7xl font-bold mb-2 text-white'>Welcome to this  <span className='block text-[#e04141] mt-2'>Real Key </span></h1>

          <p className='text-xl md:text-2xl mb-8 text-gray-200'> We provide innovative solutions and premium services to help you achieve your goals and succeed in the world of Real Estate</p>
            <Button className='bg-[#e04141]'> Get Started Now</Button>
        </div>
      </div>
    </div>
    </>
  )
}
