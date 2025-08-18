"use client";
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Music, Headphones, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import { Track } from "@/data/types";

const usePlayCount = (trackId: string) => {
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
    // Best-effort server persist (optional)
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

function AudioPlayer({ track }: { track: Track }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState<number | undefined>(track.duration);
  const { count, increment } = usePlayCount(track.id);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
    } else {
      a.pause();
    }
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      setCurrent(a.currentTime);
      if (a.duration) setProgress(a.currentTime / a.duration);
    };
    const onLoaded = () => {
      if (a.duration && !Number.isNaN(a.duration)) setDuration(a.duration);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setCurrent(0);
      increment(); // count a full listen
    };
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("ended", onEnded);
    };
  }, [increment]);

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const pct = Number(e.target.value);
    a.currentTime = pct * duration;
  };

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/70 via-neutral-900/70 to-zinc-900/70 text-white backdrop-blur-xl shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(255,255,255,0.06),transparent)]" />
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/5">
            {track.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center opacity-70">
                <Music className="h-6 w-6" />
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">
              {track.title}
            </CardTitle>
            <p className="text-sm text-white/70">{track.artist}</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-white/10 text-white/90 backdrop-blur">
          <Headphones className="mr-1 h-3.5 w-3.5" /> {count} plays
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button onClick={toggle} className="h-12 w-12 rounded-2xl shadow-lg">
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <div className="flex-1">
            <input
              aria-label="progress-range"
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={progress}
              onChange={onSeek}
              className="range accent-white w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-white/70">
              <span>{formatTime(current)}</span>
              <span><Clock className="mr-1 inline h-3 w-3" />{formatTime(duration ?? 0)}</span>
            </div>
          </div>
        </div>
        <audio ref={audioRef} src={track.src} preload="metadata" />
      </CardContent>
    </Card>
  );
}

export default AudioPlayer;
