"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { add, format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import SectionHero from "@/components/section_hero";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import dayjs from "dayjs";
import CalendarView from "@/components/calendar_view";
import EventCard from "@/components/event_card";
import { eventsData } from "@/data/demo_artists";

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  priceRange?: string;
  description: string;
  bannerImage: string;
}

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);



  const eventsByDay = useMemo(() => {
    const map: Record<string, Event[]> = {};
    eventsData.forEach(event => {
      const key = format(new Date(event.date), "yyyy-MM-dd");
      if (!map[key]) map[key] = [];
      map[key].push(event);
    });
    return map;
  }, []);


  return (
    <section className="pb-20 ">
    <SectionHero subtitle="Experience the latest shows, festivals, and exclusive sessions by Yo Maps Yo"/>
      {/* View Mode Toggle */}
      <div className="flex justify-center gap-4 my-12">
        <Button
          className={`rounded-full ${viewMode === "list" ? "bg-indigo-500 text-white" : "bg-white/10 text-white"}`}
          onClick={() => setViewMode("list")}
        >
          List View
        </Button>
        <Button
          className={`rounded-full ${viewMode === "calendar" ? "bg-indigo-500 text-white" : "bg-white/10 text-white"}`}
          onClick={() => setViewMode("calendar")}
        >
          Calendar View
        </Button>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <div className="px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {eventsData.map(event => (
              <EventCard event={event} key={event.id} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <CalendarView events={eventsData} />
      )}

      {/* Modal for Selected Day */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black/90 rounded-3xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">
                  Events on {format(selectedDay, "MMMM dd, yyyy")}
                </h3>
                <button
                  aria-label="close"
                  onClick={() => setSelectedDay(null)}
                  className="text-white hover:text-indigo-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {eventsByDay[format(selectedDay, "yyyy-MM-dd")]?.map(event => (
                  <div key={event.id} className="flex flex-col md:flex-row gap-4 bg-white/5 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
                    <div className="relative md:w-1/3 h-40 md:h-auto">
                      <Image src={event.bannerImage} alt={event.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-between p-4 md:w-2/3 gap-2">
                      <h4 className="text-lg font-bold text-white">{event.title}</h4>
                      <p className="text-white/70 text-sm">{event.description}</p>
                      <div className="flex items-center gap-4 text-white/80">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4 text-indigo-400" />
                          {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-indigo-400" />
                          {event.location}
                        </span>
                      </div>
                      <Button className="mt-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2">
                        Get Tickets ({event.priceRange})
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
