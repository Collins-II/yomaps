"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Trophy, Calendar } from "lucide-react";
import SectionHero from "@/components/section_hero";

interface Award {
  id: number;
  title: string;
  category: string;
  year: number;
  image: string;
  description: string;
}

const awards: Award[] = [
  {
    id: 1,
    title: "Best Male Artist",
    category: "Zambia Music Awards",
    year: 2023,
    image: "/images/awards/artist2023.jpg",
    description: "Recognized as the best male artist of the year in Zambia.",
  },
  {
    id: 2,
    title: "Song of the Year",
    category: "AFRIMA",
    year: 2022,
    image: "/images/awards/song2022.jpg",
    description: "Awarded for the hit single that topped African charts.",
  },
  {
    id: 3,
    title: "Album of the Year",
    category: "Zed Music Honors",
    year: 2021,
    image: "/images/awards/album2021.jpg",
    description: "Celebrated for delivering the most impactful album of the year.",
  },
];

const categories = ["All", "Zambia Music Awards", "AFRIMA", "Zed Music Honors"];

export default function AwardsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAwards =
    selectedCategory === "All"
      ? awards
      : awards.filter((award) => award.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-neutral-900 text-white py-16 px-6">
      <div className="">
        {/* Page Header */}
        <SectionHero subtitle="Celebrating Yo Maps Yo’s journey and the milestones achieved
            throughout his career"/>

        {/* Filters */}
        <div className="flex justify-center gap-4 flex-wrap my-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Awards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAwards.map((award, idx) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <Card className="overflow-hidden rounded-2xl shadow-xl bg-gray-900/60 border border-gray-700 hover:scale-105 transition">
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-52 object-cover"
                />
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-white" />
                    {award.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{award.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      {award.year}
                    </span>
                    <Badge className="bg-white text-black">
                      {award.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
