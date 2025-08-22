"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Calendar } from "lucide-react";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function HeroSection() {

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Background with spotlight gradient */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/yomaps-02.jpg" // Replace with Yo Maps promo image
          alt="Yo Maps Yo"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto grid max-w-7xl min-h-screen grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
        {/* LEFT — Artist Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block mb-4 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-md">
            Zambia • Afro-Pop • Global Sound
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Yo Maps Yo
            </span>
            <span className="block mt-2 text-white">
              The Voice of a Generation
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base md:text-lg text-white/80">
            Experience the journey of Zambia’s award-winning artist. 
            Stream the latest hits, watch unforgettable performances, 
            and join the movement shaping African music.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href={`/events`}>
            <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg font-semibold flex items-center gap-2">
               <Play className="w-5 h-5" /> Listen Now
            </Button>
             </Link>
            <Link href={'/videos'}> 
            <Button
              variant="destructive"
              className="rounded-xl border-white/20 text-white hover:bg-white hover:text-red-700 px-6 py-3 text-lg flex items-center gap-2"
            >
              <FaYoutube size={28} /> Watch Videos
            </Button>
            </Link>
            <Link href={'/events'}> 
            <Button
              variant="outline"
              className="rounded-xl text-white hover:text-black bg-transparent px-6 py-3 text-lg flex items-center gap-2"
            >  
              <Calendar className="w-5 h-5" /> Upcoming Shows
            </Button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT — Featured Track / Player */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col items-center md:items-end"
        >
          {/* Album Art */}
          <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/40">
            <Image
              src="/assets/images/yomaps-01.jpg" // replace with album cover
              alt="Featured Album"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
