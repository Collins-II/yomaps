"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHero from "@/components/section_hero";
import { merchItems } from "@/data/demo_artists";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";


const categories = ["All", "Sneakers", "T-Shirts", "Caps", "Hoodies", "Accessories"];

export default function MerchPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? merchItems
      : merchItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <SectionHero subtitle="Official merchandise from the Yo Maps Yo brand" />
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 my-10 ">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            variant={selectedCategory === cat ? "default" : "outline"}
            className={`px-5 py-2 rounded-full transition-all ${
              selectedCategory === cat
                ? "bg-blue-500 text-white shadow-lg hover:text-white"
                : "text-white border-gray-700 bg-gray-800 hover:bg-gray-700 hover:text-neutral-300"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Merch Grid */}
      <motion.div
        layout
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 py-16"
      >
        {filteredItems.map((item) => (
          <motion.div
      key={item.id}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/60 hover:shadow-blue-500/30 hover:shadow-lg transition-all duration-500">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative w-full h-56 overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Badge 
            {item.isNew && (
              <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full shadow-md">
                New
              </span>
            )}*/}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-white text-lg font-semibold truncate">
              {item.name}
            </h3>
            <p className="text-blue-400 font-bold mt-1">{item.price}</p>

            <Button
              className="w-full mt-5 bg-blue-500 text-white hover:bg-blue-600 transition-all rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 pb-16 text-center"
      >
        <h2 className="text-2xl font-bold">Don’t Miss Out!</h2>
        <p className="text-gray-400 mt-2">
          Grab your exclusive Yo Maps Yo merch before it’s gone.
        </p>
        <Button className="mt-4 px-6 py-3 bg-amber-500 text-black font-semibold hover:bg-amber-600 rounded-full">
          Explore More
        </Button>
      </motion.div>
    </div>
  );
}
