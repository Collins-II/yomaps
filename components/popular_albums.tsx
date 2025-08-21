"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioPlayer from "./audio_player";

interface Track {
  id: number;
  title: string;
  duration: string;
  audioSrc: string;
}

interface Album {
  id: number;
  title: string;
  artist: string;
  coverImage: string;
  tracks: Track[];
}

export const albums: Album[] = [
  {
    id: 1,
    title: "My Hero",
    artist: "Yo Maps Yo",
    coverImage: "/assets/images/yomaps-02.jpg",
    tracks: [
      { id: 1, title: "My Hero", duration: "3:45", audioSrc: "/assets/audios/myhero.mp3" },
      { id: 2, title: "Mr & Mrs", duration: "4:05", audioSrc: "/assets/audios/mr&mrs.mp3" },
    ],
  },
  {
    id: 2,
    title: "So Mone",
    artist: "Yo Maps Yo",
    coverImage: "/assets/images/yomaps-03.jpg",
    tracks: [
      { id: 3, title: "So Mone ft Tay Grin", duration: "3:30", audioSrc: "/assets/audios/somone.mp3" },
      { id: 4, title: "Superman ft Omarion", duration: "4:10", audioSrc: "/assets/audios/superman.mp3"},
    ],
  },
  {
    id: 3,
    title: "Try Again",
    artist: "Yo Maps Yo",
    coverImage: "/assets/images/yomaps-01.jpg",
    tracks: [
      { id: 5, title: "Nga Te Ba Yahwe", duration: "3:55", audioSrc: "/assets/audios/bayahwe.mp3" },
      { id: 6, title: "Vibrations", duration: "4:20", audioSrc: "/assets/audios/confirmation.mp3" },
    ],
  },
];

export default function PopularAlbums() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentAlbum = albums[currentIndex];
  const [currentTrackId, setCurrentTrackId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

    const playTrack = (trackId: number, src: string) => {
    if (audioRef.current) {
      if (currentTrackId === trackId && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = src;
        audioRef.current.play();
        setCurrentTrackId(trackId);
        setIsPlaying(true);
      }
    }
  };

  const playAlbum = () => {
    if (currentAlbum.tracks.length > 0) {
      const firstTrack = currentAlbum.tracks[0];
      playTrack(firstTrack.id, firstTrack.audioSrc);
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    const handleEnded = () => setIsPlaying(false);
    audioEl?.addEventListener("ended", handleEnded);
    return () => audioEl?.removeEventListener("ended", handleEnded);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? albums.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === albums.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="mx-auto max-w-6xl  py-20 overflow-x-hidden">
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold">
          Popular <span className="text-indigo-400">Albums</span>
        </h2>
        <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
          Stream our top albums and enjoy the latest hits from Olios Records.
        </p>
      </div>

      {/* Main Album Player */}
      <div className="relative flex flex-col lg:flex-row items-center gap-8 px-4 sm:px-6">
        <div className="relative w-full lg:w-1/3 h-[300px] sm:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAlbum.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={currentAlbum.coverImage}
                alt={currentAlbum.title}
                fill
                className="object-cover object-center rounded-3xl"
              />
              <div className="absolute inset-0 bg-black/30 rounded-3xl" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            aria-label="nav-buttons"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 hover:bg-white/40 p-2 transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            aria-label="nav-buttons"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 hover:bg-white/40 p-2 transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Album Details */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {currentAlbum.title}
          </h3>
          <p className="text-indigo-400 font-medium">{currentAlbum.artist}</p>

           {/* Tracks */}
      <div className="space-y-2">
        {currentAlbum.tracks.map((track) => (
          <AudioPlayer
              key={track.id}
              ref={audioRef as RefObject<HTMLAudioElement>}
              playTrack={playTrack}
              currentTrackId={currentTrackId as number}
              isPlaying={isPlaying}
              track={{
                id: track.id,
                title: track.title,
                artist: "Yo Maps Yo",
                src: track.audioSrc,
                duration: Number(track.duration.split(":")[0]) * 60 + Number(track.duration.split(":")[1]), // convert mm:ss → seconds
              }}
            />
        ))}
      </div>

      {/* Play Album Button */}
      <Button
        onClick={playAlbum}
        className="mt-4 w-max rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2"
      >
        Play Album
      </Button>

           {/* Hidden Audio Player 
      <audio
        ref={audioRef}
        onEnded={() => {
          // Auto-play next track when one ends
          const currentIndex = currentAlbum.tracks.findIndex(
            (t) => t.id === currentTrackId
          );
          const nextTrack = currentAlbum.tracks[currentIndex + 1];
          if (nextTrack) {
            playTrack(nextTrack.id, nextTrack.audioSrc);
          } else {
            setIsPlaying(false);
            setCurrentTrackId(null);
          }
        }}
      />*/}
        </div>
      </div>

     {/* Thumbnail Album Slider */}
<div className="mt-12 flex gap-4 overflow-x-auto scrollbar-hide py-4 px-6">
  {albums.map((album, idx) => (
    <motion.div
      key={album.id}
      onClick={() => setCurrentIndex(idx)}
      className={`relative flex-shrink-0 w-36 h-36 sm:w-36 sm:h-36 rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-transform ${
        idx === currentIndex
          ? "scale-110 border-4 border-indigo-400"
          : "hover:scale-105"
      }`}
      whileHover={{ scale: 1.08 }}
    >
      <Image
        src={album.coverImage}
        alt={album.title}
        fill
        className="object-cover object-center"
      />

      {/* Animated Overlay for Current Album */}
      {idx === currentIndex && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Glowing Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-4 border-indigo-500"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: [0.6, 0.2, 0.6], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />

          {/* Animated Music Bars */}
          <div className="flex gap-1 absolute bottom-2">
            {[1, 2, 3, 4].map((bar) => (
              <motion.span
                key={bar}
                className="w-1 bg-indigo-400 rounded"
                initial={{ height: 4 }}
                animate={{
                  height: [8, 20, 12, 18, 10][bar % 5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  repeatType: "reverse",
                  delay: bar * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  ))}
</div>

    </section>
  );
}
