"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {  Youtube, ChevronRight, Sparkles} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Track } from "@/data/types";
import AudioPlayer from "@/components/audio_player";
import ArtistsGrid from "@/components/ui/artist_grid";
import VideoGallery from "@/components/ui/video_gallery";
import Image from "next/image";
import Navbar from "@/components/navbar";
import UpcomingEvents from "@/components/upcoming-events";
import PopularAlbums from "@/components/popular_albums";
import BlogSection from "@/components/blog_section";
import AwardsSection from "@/components/awards-section";
import ContactBookings from "@/components/contact-bookings";
import HeroSection from "@/components/hero";

export default function Home() {

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_0%,#0b0f1a_0%,#05070d_60%,#05060a_100%)] text-white">
     <HeroSection />
      
      <AwardsSection />
      <UpcomingEvents />
      <PopularAlbums/>
      {/*<BlogSection/>
       CONTENT TABS 
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <Tabs defaultValue="releases" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="releases">Releases</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="releases" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <AudioPlayer
                track={{
                  id: "olios-demo-002",
                  title: "Neon Drift (Demo)",
                  artist: "Nyx",
                  src: "https://cdn.pixabay.com/download/audio/2021/10/26/audio_1945d6fbfe.mp3?filename=drift-113507.mp3",
                  cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
                }}
              />
              <AudioPlayer
                track={{
                  id: "olios-demo-003",
                  title: "Dust & Gold (Demo)",
                  artist: "Zito",
                  src: "https://cdn.pixabay.com/download/audio/2021/11/09/audio_fa1a8aeaa7.mp3?filename=goldn-113901.mp3",
                  cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="mb-4 flex items-center gap-2 text-white/70">
              <Youtube className="h-4 w-4" />
              <span className="text-sm">Streaming via YouTube embeds. Stats shown when API proxy is configured.</span>
            </div>
            <VideoGallery videoIds={videoIds} />
          </TabsContent>
        </Tabs>
      </section>*/}
      <ContactBookings />

      {/* -------- OPTIONAL API ROUTES (paste into files) --------

      1) /app/api/youtube/route.ts  — YouTube stats proxy

      import { NextResponse } from "next/server";

      // Requires env: YOUTUBE_API_KEY
      export async function GET(req: Request) {
        const { searchParams } = new URL(req.url);
        const ids = searchParams.getAll("id");
        if (!ids.length) return NextResponse.json([], { status: 200 });
        const key = process.env.YOUTUBE_API_KEY;
        if (!key) return NextResponse.json([], { status: 200 });
        const API = "https://www.googleapis.com/youtube/v3/videos";
        const url = `${API}?part=snippet,statistics&id=${ids.join(",")}&key=${key}`;
        const r = await fetch(url);
        const json = await r.json();
        const out = (json.items || []).map((it: any) => ({
          videoId: it.id,
          title: it.snippet?.title,
          channelTitle: it.snippet?.channelTitle,
          publishedAt: it.snippet?.publishedAt,
          viewCount: Number(it.statistics?.viewCount || 0),
          likeCount: Number(it.statistics?.likeCount || 0),
          commentCount: Number(it.statistics?.commentCount || 0),
        }));
        return NextResponse.json(out);
      }

      2) /app/api/plays/route.ts — persist play counts (example: in-memory)

      import { NextResponse } from "next/server";

      // NOTE: replace with DB (Mongo, Postgres). This resets on redeploy.
      const store = new Map<string, number>();

      export async function POST(req: Request) {
        const body = await req.json();
        const id = String(body.trackId || "");
        const delta = Number(body.delta || 0);
        const prev = store.get(id) || 0;
        store.set(id, prev + delta);
        return NextResponse.json({ id, plays: store.get(id) || 0 });
      }

      export async function GET(req: Request) {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("trackId");
        return NextResponse.json({ id, plays: (id && store.get(id)) || 0 });
      }

      ----------------------------------------------------------- */}
    </div>
  );
}
