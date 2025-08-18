"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import SectionHero from "@/components/section_hero";

interface Song {
  id: number;
  title: string;
  album: string;
  genre: string;
  year: number;
  duration: string;
  cover: string;
}

const songsData: Song[] = [
  { id: 1, title: "Track One", album: "Album A", genre: "Afrobeat", year: 2023, duration: "3:45", cover: "/assets/images/yomaps-01.jpg" },
  { id: 2, title: "Track Two", album: "Album A", genre: "Afrobeat", year: 2023, duration: "4:12", cover: "/assets/images/yomaps-01.jpg" },
  { id: 3, title: "Track Three", album: "Album B", genre: "R&B", year: 2024, duration: "3:58", cover: "/assets/images/yomaps-02.jpg" },
  { id: 4, title: "Track Four", album: "Album C", genre: "Hip-Hop", year: 2025, duration: "4:05", cover: "/assets/images/yomaps-03.jpg" },
  { id: 5, title: "Track Five", album: "Album C", genre: "Hip-Hop", year: 2025, duration: "3:50", cover: "/assets/images/yomaps-03.jpg" },
];

export default function MusicPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const albums = useMemo(() => Array.from(new Set(songsData.map(s => s.album))), []);

  const filteredSongs = useMemo(() => {
    return songsData.filter(song => {
      return (
        (!selectedAlbum || song.album === selectedAlbum) &&
        song.title.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [selectedAlbum, search]);

  return (
    <section className="pb-20 ">
      <SectionHero subtitle="Explore albums and tracks from Yo Maps Yo" />

      {/* Album Slider */}
      <div className="mx-auto grid max-w-7xl my-10 overflow-x-auto flex gap-6 cursor-grab snap-x snap-mandatory py-2">
        <motion.div className="flex gap-6" drag="x" dragConstraints={{ left: -500, right: 0 }} dragElastic={0.2}>
          {albums.map((album) => {
            const cover = songsData.find(s => s.album === album)?.cover;
            const isSelected = album === selectedAlbum;
            return (
              <motion.div
                key={album}
                className={`snap-start min-w-[200px] rounded-2xl overflow-hidden shadow-lg border-2 ${isSelected ? "border-indigo-400" : "border-transparent"} cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedAlbum(isSelected ? null : album)}
              >
                <div className="relative h-48 w-48">
                  {cover && <Image src={cover} alt={album} fill className="object-cover" />}
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-white font-bold">{album}</h3>
                  <p className="text-white/70 text-sm">{songsData.filter(s => s.album === album).length} tracks</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-black/50 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full max-w-md"
        />
      </div>

      {/* Songs Grid */}
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSongs.map(song => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <div className="relative h-56 w-full">
              <Image src={song.cover} alt={song.title} fill className="object-cover" />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-white font-bold text-lg line-clamp-2">{song.title}</h3>
              <p className="text-white/70 text-sm">{song.album} • {song.genre} • {song.year}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-white/80 text-sm">{song.duration}</span>
                <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-4 py-1">
                  <Play className="w-4 h-4 mr-1" /> Play
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredSongs.length === 0 && (
          <p className="text-center text-white/70 col-span-full">No songs found.</p>
        )}
      </div>
    </section>
  );
}
