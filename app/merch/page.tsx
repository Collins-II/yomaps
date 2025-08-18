"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHero from "@/components/section_hero";

interface MerchItem {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const merchItems: MerchItem[] = [
  {
    id: 1,
    name: "Signature Sneakers",
    price: "$120",
    image: "/assets/merch/sneakers.jpg",
    category: "Sneakers",
  },
  {
    id: 2,
    name: "Classic T-Shirt",
    price: "$40",
    image: "/assets/merch/tshirt.jpg",
    category: "T-Shirts",
  },
  {
    id: 3,
    name: "Logo Cap",
    price: "$25",
    image: "/assets/merch/cap-01.jpg",
    category: "Caps",
  },
  {
    id: 4,
    name: "Limited Edition Hoodie",
    price: "$75",
    image: "/assets/merch/hoodie.jpg",
    category: "Hoodies",
  },
  {
    id: 5,
    name: "Wristband",
    price: "$10",
    image: "/assets/merch/wristband.jpg",
    category: "Accessories",
  },
];

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:shadow-2xl transition-all">
              <CardContent className="p-0">
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white text-xl font-semibold">{item.name}</h3>
                  <p className="text-blue-400 font-bold mt-1">{item.price}</p>
                  <Button className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600">
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
