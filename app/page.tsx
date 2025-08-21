"use client";
import React from "react";
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
      <BlogSection/>
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
