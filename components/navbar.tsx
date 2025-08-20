"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Music", href: "/music" },
    { label: "Videos", href: "/videos" },
    { label: "Events", href: "/events" },
    { label: "Merch", href: "/merch" },
  ];

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-black/95 shadow-xl backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-wide text-white">
          Yo Maps Yo
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollLink(e, item.href)}
                className={`relative px-2 py-1 text-sm md:text-base font-semibold transition-all ${
                  isActive
                    ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:bg-indigo-500 after:rounded-full after:scale-x-100 after:origin-center"
                    : "text-white/70 hover:text-white hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:right-0 hover:after:h-1 hover:after:bg-indigo-500 hover:after:rounded-full hover:after:scale-x-100 hover:after:origin-center"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Button asChild className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 text-sm md:text-base font-semibold">
            <Link href="#contact">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden ">
              
          <Sheet>
            <SheetTrigger aria-label="Open Menu">
              <Menu className="h-6 w-6 text-white" />
            </SheetTrigger>
            <SheetContent side="right" className=" bg-black text-white p-6">
              {/* Background with spotlight gradient */}
              
              <nav className="flex flex-col gap-6 mt-12">
                 {/* Logo */}
                <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-wide text-white ">
                  Yo Maps Yo
                </Link>
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => handleScrollLink(e, item.href)}
                        className={`relative px-2 py-1 text-1xl font-semibold transition-all ${
                          isActive
                            ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:bg-indigo-500 after:rounded-full after:scale-x-100 after:origin-center"
                            : "text-white/70 hover:text-white hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:right-0 hover:after:h-1 hover:after:bg-indigo-500 hover:after:rounded-full hover:after:scale-x-100 hover:after:origin-center"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <Button asChild className="mt-4 w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg font-semibold">
                  <Link href="#contact">Book Now</Link>
                </Button>

                
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
