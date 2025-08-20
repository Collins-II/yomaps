"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "./event_card";
import { eventsData } from "@/data/demo_artists";

interface Event {
  id: number;
  title: string;
  date: string;
  price: number;
  location: string;
  bannerImage: string;
  description?: string;
}


export default function UpcomingEvents() {
  const minPrice=20;
  const maxPrice=80;

  return (
    <section className="mx-auto max-w-6xl px-2 py-20">
      {/* Heading */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-extrabold sm:text-5xl">
          Upcoming <span className="text-indigo-400">Events</span>
        </h2>
        <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
          Stay tuned for our latest shows, festivals, and exclusive sessions.
        </p>
      </div>

      {/* Layout: Banner + Scrollable List */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Banner */}
        <div className="w-full lg:w-1/3 h-[300px] sm:h-[400px] lg:h-[600px] rounded-3xl shadow-xl overflow-hidden relative">
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
        <div className="w-full lg:w-2/3 space-y-4 max-h-[600px] overflow-y-auto px-4 pb-4 custom-scrollbar">
          <AnimatePresence initial={false}>
            {eventsData.map((event) => (
              <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col lg:flex-row items-start lg:items-center border border-[0.5px] border-indigo-400 gap-6 bg-gradient-to-b from-black/20 via-black/10 to-black/20 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-102 transform transition-all duration-300"
                  >
              
                    {/* Event Info */}
                    <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between items-center px-6 py-3 gap-4">
                       
                       {/* <p className="text-white/70 mt-2 line-clamp-3">{event.description}</p>
              
                         Date & Location */}
                        <div className="flex flex-col items-start gap-4 text-white/80 text-sm">
                            <div className="flex flex-col items-start text-white/70 flex-shrink-0">
                              <span className="text-2xl md:text-3xl font-bold text-indigo-400">
                                {new Date(event.date).getDate()}
                              </span>
                              <span className="text-sm md:text-md font-semibold">
                                {new Date(event.date).toLocaleString("default", { month: "short" })}
                              </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-start text-white/80 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="flex flex-col items-start text-white/70 flex-shrink-0">
                              <span className="text-xl md:text-1xl font-bold text-indigo-400">
                                {event.title}
                              </span>
                          </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-5 h-5 text-indigo-400" />
                            {event.location}
                          </div>
                        </div>
              
                      {/* Action Button */}
                      <Button className="mt-4 self-start rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-6 py-2 transition-all shadow-md">
                        Tickets ({event.priceRange})
                      </Button>
                    </div>
                  </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
