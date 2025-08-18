"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  title: string;
  date: string;
  price: number;
  location: string;
  bannerImage: string;
  description?: string;
}

const eventsData: Event[] = [
  {
    id: 1,
    title: "Olios Summer Festival",
    date: "August 25, 2025",
    price: 60,
    location: "Lusaka, Zambia",
    bannerImage: "/assets/images/yomaps-01.jpg",
    description:
      "A night of unforgettable performances featuring Olios Records’ top artists.",
  },
  {
    id: 2,
    title: "Album Release Party",
    date: "September 10, 2025",
    price: 60,
    location: "Johannesburg, South Africa",
    bannerImage: "/assets/images/yomaps-01.jpg",
    description:
      "Celebrate the launch of our highly anticipated new release.",
  },
  {
    id: 3,
    title: "Live Studio Session",
    date: "October 3, 2025",
    price: 60,
    location: "Cape Town, South Africa",
    bannerImage: "/assets/images/yomaps-01.jpg",
    description:
      "Exclusive behind-the-scenes live recording experience.",
  },
];

export default function UpcomingEvents() {
  const minPrice=20;
  const maxPrice=80;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
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
        <div className="w-full lg:w-2/3 space-y-4 max-h-[600px] overflow-y-auto pr-2 pb-4 custom-scrollbar">
          <AnimatePresence initial={false}>
            {eventsData.map((event, idx) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group flex flex-col md:flex-row items-start sm:items-center gap-4
                           rounded-2xl border px-4 py-3 shadow-sm
                           bg-white/10 backdrop-blur-lg
                           hover:shadow-md hover:bg-white/20 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative h-24 w-full sm:h-20 sm:w-20 flex-shrink-0 rounded-xl overflow-hidden ring-1 ring-white/20">
                  <Image
                    src={event.bannerImage}
                    alt={event.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Content */}
<div className="flex flex-col sm:flex-row sm:items-start items-center sm:justify-start gap-3 w-full">
  {/* Left: Date */}
  <div className="flex flex-col items-start text-white/70 flex-shrink-0">
    <span className="text-2xl font-bold text-indigo-400">
      {new Date(event.date).getDate()}
    </span>
    <span className="text-sm font-semibold">
      {new Date(event.date).toLocaleString("default", { month: "short" })}
    </span>
  </div>

  {/* Middle: Title & Location */}
  <div className="flex flex-col text-left flex-1 text-white/80 gap-1">
    <span className="text-sm sm:text-base font-bold line-clamp-2">
      {event.title}
    </span>
    <span className="inline-flex items-center gap-1 text-xs sm:text-sm">
      <MapPin className="h-4 w-4 text-indigo-400" />
      {event.location}
    </span>
  </div>
<p className="text-indigo-300 font-light text-md"></p>
  {/* Right: Price & CTA */}
<div className="flex flex-col sm:items-end items-center gap-2 mt-2 sm:mt-0">
  <p className="text-indigo-300 font-light text-md">
    {minPrice && maxPrice
      ? `${minPrice}-${maxPrice} ZMW`
      : event.price
      ? `${event.price} ZMW`
      : "TBA"}
  </p>

  <Button className="rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-3 py-1">
    Get Tickets
  </Button>
</div>

  </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
