"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHero from "@/components/section_hero";

interface Video {
  id: string;
  title: string;
  category: string;
  date: string;
}

const MRS="O_N7NhDjSAw"
const SOMONE="Cu7UZWeRccc"
const TRYAGAIN="q_3qGYZotyM"
const KONDWA="tTSPMQw-4Gk"
const BTSKONDWA="M8yxcdb5A5k"

const youtubeVideos: Video[] = [
  {
    id: MRS as string, // Example YouTube video ID
    title: "Mr & Mrs",
    category: "Music Video",
    date: "2025-02-01",
  },
  {
    id: SOMONE as string,
    title: "So Mone ft Tay Grin",
    category: "Music Video",
    date: "2025-03-15",
  },
  {
    id: KONDWA as string,
    title: "Kondwa",
    category: "Live Performance",
    date: "2025-04-10",
  },
  {
    id: BTSKONDWA as string,
    title: "Behind The Scenes - Kondwa",
    category: "Behind The Scenes",
    date: "2025-04-18",
  },
  {
    id: TRYAGAIN as string,
    title: "Try Again ft Abel Chungu",
    category: "Music Video",
    date: "2025-05-01",
  },
];

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => Array.from(new Set(youtubeVideos.map((v) => v.category))),
    []
  );

  const filteredVideos = useMemo(
    () =>
      youtubeVideos.filter(
        (video) => !selectedCategory || video.category === selectedCategory
      ),
    [selectedCategory]
  );

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <section className="pb-20">
      <SectionHero subtitle="Official YouTube music videos, live performances, and behind-the-scenes visuals" />

      {/* Featured Video Slider */}
      <div className="relative mb-12">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2 px-4"
        >
          {youtubeVideos.slice(0, 3).map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.05 }}
              className="snap-center w-[340px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg bg-black/40"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                className="w-full h-60"
                allowFullScreen
              />
              <div className="p-4">
                <h3 className="text-white font-bold text-lg">{video.title}</h3>
                <p className="text-white/70 text-sm">{video.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70"
        >
          ◀
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70"
        >
          ▶
        </button>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-4 my-10">
        <Button
          className={`rounded-full ${
            !selectedCategory
              ? "bg-indigo-500 text-white"
              : "bg-white/10 text-white"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            className={`rounded-full ${
              selectedCategory === category
                ? "bg-indigo-500 text-white"
                : "bg-white/10 text-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-zinc-900 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="relative w-full h-56">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-white font-bold text-lg line-clamp-2">
                {video.title}
              </h3>
              <p className="text-indigo-300 text-sm">{video.category}</p>
              <span className="text-white/60 text-xs">
                {new Date(video.date).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}

        {filteredVideos.length === 0 && (
          <p className="text-center text-white/70 col-span-full">
            No videos found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
