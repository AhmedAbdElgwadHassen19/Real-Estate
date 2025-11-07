"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import {  Clock} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { Id } from '@/convex/_generated/dataModel'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'

interface ScheduleViewingProps {
  property: {
    _id: Id<"properties">;
    title: string;
  };
}

export default function ScheduleViewing({property} : ScheduleViewingProps) {
    const {user} = useUser()
    const [successMessage , setSuccessMessage] =useState(false)
    const createViewing = useMutation(api.propertyViewings.createViewing)

    const [selectedTime , setSelectedTime] = useState("")
    const [phone , setPhone] = useState("")
    const [message , setMessage] = useState("")
    const [isSubmitting , setIsSubmitting] = useState(false)
    const [selectedDate , setSelectedDate] = useState<Date | undefined>(new Date())
    const availableTimes = ["10:00 AM" , "11:00 AM" , "12:00 PM" , "1:00 PM" , "2:00 PM" , "3:00 PM" , "4:00 PM" , "5:00 PM"]

    const isDateDisabled = (data: Date) => {
        const today = new Date()
        today.setHours(0,0,0,0)
        return data < today
    }


    const handleSubmit = async (e : React.FormEvent) =>{
        e.preventDefault()
        if(!selectedDate || !selectedTime) {
            alert("Please select date and time")
            return
        }

        if(!user){
            alert("You must be logged in to schedule a viewing")
            return
        }

        setIsSubmitting(true)

        try{
            await createViewing({
                propertyId: property?._id,
                propertyTitle:property?.title,
                userEmail: user?.emailAddresses?.[0]?.emailAddress,
                
                userName: user.fullName || user.firstName || 'Unknown',
                userPhone: phone,
                viewingDate: format(selectedDate, "yyyy-MM-dd"),
                viewingTime:selectedTime,
                userId:user.id,
                message : message,
                createdAt: Date.now()
            })
            setSuccessMessage(true)
            setTimeout(()=>{
                setSuccessMessage(false)
                setSelectedDate(undefined)
                setSelectedTime("")
                setPhone("")
                setMessage("")
            },2000)
        }catch (error){
            console.error("Error scheduling viewing: ", error)
            alert("There was an error scheduling your viewing. Please try again later.")
        }finally{
            setIsSubmitting(false)
        }
    }

  return (
    <div>
        <Dialog>
            <DialogTrigger><Button className='w-[200px]'>Schedule Meeting </Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogDescription>
                    Booking viewing for {property.title}
                </DialogDescription>


                </DialogHeader>
                {successMessage ? (
                    <div className="text-center py-8 ">
                        <h1>Viewing Scheduled</h1>
                        <p>We`ll contact you soon to confirm your appointment</p>
                    </div>
                ):(
                    <form className='space-y-6 ' onSubmit={handleSubmit}>

                        {/* Calendar */}
                    <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={isDateDisabled}
                    className="rounded-md border shadow-sm w-full"
                    />

                    {/* Time Selection  */}
                    <div className="space-y-2">
                        <div className="grig grid-cis-3 gap-2">
                            {availableTimes?.map((time) => (
                                <Button key={time} type='button' onClick={()=> setSelectedTime(time)} 
                                className = {`p-2 border rounded-lg  transition-colors  ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}>
                                <Clock className='inline mr-2 w-4 h-4 '/>
                                {time}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <Label className='my-2'>Phone</Label>
                        <Input id='phone' type='tel' value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                    </div>

                    {/* Massage */}
                    <div className="space-y-2">
                        <Label className='my-2'>Massage (Optional)</Label>
                        <Textarea id='massage'  value={message} onChange={(e)=>setMessage(e.target.value)} ></Textarea>
                    </div>

                    <Button type='submit' disabled={!selectedDate || !selectedTime}>{isSubmitting? "sending" : "Schedule Viewing"}  </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    </div>
  )
}
