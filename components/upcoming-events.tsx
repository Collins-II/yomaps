"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventsData } from "@/data/demo_artists";
import Link from "next/link";


export default function UpcomingEvents() {

  return (
    <section className=" px-4 sm:px-6 py-20 overflow-x-hidden">
  <div className="mb-16 text-center">
    <h2 className="text-3xl font-extrabold sm:text-5xl">
      Upcoming <span className="text-indigo-400">Events</span>
    </h2>
    <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
      Stay tuned for our latest shows, festivals, and exclusive sessions.
    </p>
  </div>

  <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-12">
    {/* Banner */}
    <div className="w-full lg:w-1/3 h-64 sm:h-96 lg:h-[600px] rounded-3xl shadow-xl overflow-hidden relative">
      <Image
        src="/assets/images/yomaps-01.jpg"
        alt="Upcoming Events Banner"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    </div>

    {/* Scrollable Events List */}
    <div className="w-full lg:w-2/3 space-y-4 max-h-[800px] overflow-y-auto px-2 sm:px-4 pb-4 custom-scrollbar">
      <AnimatePresence initial={false}>
        {eventsData.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="group flex flex-col sm:flex-row sm:items-center justify-between border border-[0.5px] border-indigo-400 gap-4 bg-gradient-to-b from-black/20 via-black/10 to-black/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl hover:scale-[1.01] transform transition-all duration-300"
          >
            {/* Date */}
            <div className="flex flex-col items-start text-white/70 flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-400">
                {new Date(event.date).getDate()}
              </span>
              <span className="text-sm font-semibold">
                {new Date(event.date).toLocaleString("default", { month: "short" })}
              </span>
            </div>

            {/* Title & Location */}
            <div className="flex-1 flex flex-col items-start text-white/80 text-sm">
              <span className="text-lg sm:text-xl font-bold text-indigo-400">
                {event.title}
              </span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-indigo-400" />
                {event.location}
              </div>
            </div>

            {/* Button */}
            <Button className="rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 shadow-md">
              Tickets ({event.priceRange})
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="flex items-center justify-end">
          <Link href={`/events`}>
            <Button
              size="sm"
              variant="ghost"
              className="bg-transparent text-indigo-400 hover:text-black my-2"
             >
              More →
            </Button>
          </Link>
      </div>
    </div>
  </div>
</section>
  );
}
