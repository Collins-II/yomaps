"use client";
import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { Play, Pause, Music, Headphones, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import { Track } from "@/data/types";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const usePlayCount = (trackId: number) => {
  const key = `olios:plays:${trackId}`;
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const existing = Number(localStorage.getItem(key) || 0);
    if (!Number.isNaN(existing)) setCount(existing);
  }, [key]);

  const increment = async () => {
    const next = count + 1;
    setCount(next);
    localStorage.setItem(key, String(next));
    try {
      await fetch("/api/plays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId, delta: 1 }),
      });
    } catch {}
  };

  return { count, increment };
};

interface PlayerProps {
  ref: RefObject<HTMLAudioElement>;
  track: Track;
  currentTrackId: number;
  playTrack: (id: number, src: string) => void;
  isPlaying: boolean;
}

const AudioPlayer = ({ ref, track , currentTrackId, playTrack, isPlaying}: PlayerProps) => {
// const [currentTrackId, setCurrentTrackId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState<number | undefined>(track.duration);
  const { count, increment } = usePlayCount(track.id);

  const [playCount, setPlayCount] = useState<number>(0)
  const key = `olios:plays:${track.id}`;

    useEffect(() => {
    const existing = Number(localStorage.getItem(key) || 0);
    if (!Number.isNaN(existing)) setPlayCount(existing);
  }, [key]);

 const newCount = () => {
  const next = playCount + 1;
    setPlayCount(next);
    localStorage.setItem(key, String(next));
 }

  useEffect(() => {
    const a = ref.current;
    
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      setCurrent(a.currentTime);
      if (currentTrackId === track.id && a.duration) setProgress(a.currentTime / a.duration);
    };
    const onLoaded = () => {
      if (currentTrackId === track.id && a.duration && !Number.isNaN(a.duration)) setDuration(a.duration);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setCurrent(0);
      increment();
    };
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("ended", onEnded);
    localStorage.getItem(key);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("ended", onEnded);
    };
  }, [increment, track.id, dispatch, currentTrackId, ref, key]);

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = ref.current;
    if (!a || !duration) return;
    const pct = Number(e.target.value);
    a.currentTime = pct * duration;
  };

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/70 via-neutral-900/70 to-zinc-900/70 text-white backdrop-blur-xl shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/5">
            {track.cover ? (
              <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center opacity-70">
                <Music className="h-6 w-6" />
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight truncate">{track.title}</CardTitle>
            <p className="text-sm text-white/70">{track.artist}</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-white/10 text-white/90 backdrop-blur">
          <Headphones className="mr-1 h-3.5 w-3.5" /> {playCount} plays
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button onClick={() => {playTrack(track.id, track.src); newCount();}} className="h-12 w-12 rounded-2xl shadow-lg">
            {currentTrackId === track.id && isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <div className="flex-1">
            <input
              aria-label="progress-range"
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={progress}
              disabled={currentTrackId !== track.id}
              onChange={onSeek}
              className="range accent-white w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-white/70">
              <span>{currentTrackId === track.id && formatTime(current)}</span>
              <span>
                <Clock className="mr-1 inline h-3 w-3" />
                {formatTime(duration ?? 0)}
              </span>
            </div>
          </div>
        </div>
        <audio ref={ref} src={track.src} preload="metadata" />
      </CardContent>
    </Card>
  );
}

export default AudioPlayer;
