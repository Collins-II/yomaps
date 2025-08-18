"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Youtube } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
  subtitle : string;
}

export default function SectionHero({subtitle}: Props) {
  const pathname = usePathname();

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
      <div className="relative mx-auto grid max-w-7xl min-h-7/screen grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
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
              {pathname === "/music" ? "MUSIC" : pathname === "/videos" ? "VIDEOS" : pathname === "/events" ? "EVENTS":pathname === "/merch" ?  "MERCH" : "AWARDS & RECOGNITIONS"}
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base md:text-lg text-white/80">
            {subtitle}
          </p>

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
