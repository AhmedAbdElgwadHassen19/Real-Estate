"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Clock, CalendarDays, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Id } from "@/convex/_generated/dataModel";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useToast } from "./Toast";
import Link from "next/link";

interface ScheduleViewingProps {
  property: {
    _id: Id<"properties">;
    title: string;
  };
}

const availableTimes = [
  "10:00 AM","11:00 AM","12:00 PM",
  "1:00 PM","2:00 PM","3:00 PM",
  "4:00 PM","5:00 PM",
];

export default function ScheduleViewing({ property }: ScheduleViewingProps) {
  const { user, isSignedIn } = useUser();
  const { showToast } = useToast();
  const createViewing = useMutation(api.propertyViewings.createViewing);

  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const resetForm = () => {
    setDone(false);
    setSelectedDate(undefined);
    setSelectedTime("");
    setPhone("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      showToast("Please select a date and time", "error");
      return;
    }
    if (!user) {
      showToast("You must be logged in to schedule a viewing", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await createViewing({
        propertyId: property._id,
        propertyTitle: property.title,
        userEmail: user.emailAddresses?.[0]?.emailAddress ?? "",
        userName: user.fullName || user.firstName || "Unknown",
        userPhone: phone || undefined,
        viewingDate: format(selectedDate, "yyyy-MM-dd"),
        viewingTime: selectedTime,
        userId: user.id,
        message: message || undefined,
        createdAt: Date.now(),
      });
      setDone(true);
      showToast("Viewing scheduled successfully!", "success");
    } catch (error) {
      console.error("Error scheduling viewing:", error);
      showToast("Failed to schedule viewing. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => { resetForm(); setOpen(true); }}
        className="flex items-center gap-3 w-full px-4 py-3 border-2 border-[#e04141] text-[#e04141] rounded-xl hover:bg-[#e04141] hover:text-white transition-all duration-200 font-medium text-sm"
      >
        <CalendarDays className="w-5 h-5" />
        Schedule a Viewing
      </button>

      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
        <DialogContent className="max-w-md rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Schedule a Viewing</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {property.title}
            </DialogDescription>
          </DialogHeader>

          {/* Not signed in */}
          {!isSignedIn ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <CalendarDays className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">
                You need to be signed in to schedule a viewing.
              </p>
              <Link
                href="/sign-in"
                className="inline-block px-5 py-2.5 bg-[#e04141] text-white text-sm font-semibold rounded-xl hover:bg-[#c73636] transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : done ? (
            /* Success State */
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Viewing Scheduled!</h3>
              <p className="text-sm text-gray-500">
                We'll contact you soon to confirm your appointment for{" "}
                <span className="font-medium text-gray-700">
                  {selectedDate && format(selectedDate, "MMM d, yyyy")}
                </span>{" "}
                at <span className="font-medium text-gray-700">{selectedTime}</span>.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2.5 bg-[#e04141] text-white text-sm font-semibold rounded-xl hover:bg-[#c73636] transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-5 mt-1">
              {/* Calendar */}
              <div>
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Select Date
                </Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  className="rounded-xl border border-gray-200 mx-auto"
                />
              </div>

              {/* Time Slots */}
              <div>
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Select Time
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`flex flex-col items-center gap-0.5 p-2 rounded-xl border text-xs font-medium transition-all duration-200 ${
                        selectedTime === time
                          ? "bg-[#e04141] border-[#e04141] text-white shadow-md"
                          : "bg-white border-gray-200 text-gray-600 hover:border-[#e04141] hover:text-[#e04141]"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+20 xxx xxx xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-[#e04141] focus:ring-[#e04141]/20"
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Message{" "}
                  <span className="normal-case font-normal text-gray-400">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Any specific questions or requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-[#e04141] focus:ring-[#e04141]/20 resize-none"
                  rows={3}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!selectedDate || !selectedTime || isSubmitting}
                className="w-full py-3 bg-[#e04141] text-white font-semibold rounded-xl hover:bg-[#c73636] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <CalendarDays className="w-4 h-4" />
                    Confirm Viewing
                  </>
                )}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
