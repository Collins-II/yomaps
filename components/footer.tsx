"use client";
import React from "react";
import { FaSpotify, FaApple, FaYoutube, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-t from-black/90 to-black/50 py-12 text-white/80">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-wide text-white ">
                  Yo Maps Yo
          </Link>
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Olios Records. All rights reserved.
          </p>
        </div>

        {/* Streaming Platforms */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <p className="text-sm font-medium text-white/70">Listen on:</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-indigo-400 transition">
              <FaSpotify size={22} />
            </Link>
            <Link href="#" className="hover:text-indigo-400 transition">
              <FaApple size={22} />
            </Link>
            <Link href="#" className="hover:text-indigo-400 transition">
              <FaYoutube size={22} />
            </Link>
          </div>
        </div>

        {/* Quick Links & Socials */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-sm font-medium text-white/70">Quick Links:</p>
          <div className="flex gap-4">
            <Link className="hover:text-indigo-400 transition" href="#">Privacy</Link>
            <Link className="hover:text-indigo-400 transition" href="#">Terms</Link>
            <Link className="hover:text-indigo-400 transition" href="#">Contact</Link>
          </div>
          <div className="flex gap-3 mt-2">
            <Link href="#" className="hover:text-indigo-400 transition"><FaInstagram size={18} /></Link>
            <Link href="#" className="hover:text-indigo-400 transition"><FaTwitter size={18} /></Link>
            <Link href="#" className="hover:text-indigo-400 transition"><FaFacebook size={18} /></Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
