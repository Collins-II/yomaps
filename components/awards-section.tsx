"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface Award {
  year: string;
  title: string;
  organization: string;
  description: string;
}

const awards: Award[] = [
  {
    year: "2023",
    title: "Best Record Label",
    organization: "Zambia Music Awards",
    description: "Recognized for outstanding contributions to the local music industry.",
  },
  {
    year: "2022",
    title: "Top Streaming Artist",
    organization: "African Music Awards",
    description: "Awarded for achieving 10M+ streams across platforms.",
  },
  {
    year: "2021",
    title: "Innovative Music Project",
    organization: "Creative Arts Festival",
    description: "Honored for pushing boundaries in music production & artistry.",
  },
];

export default function AwardsSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-950 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
            Awards & Recognitions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Celebrating milestones and honors that highlight Olios Records’ journey in music excellence.
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-tr from-indigo-600/20 to-indigo-400/10 border border-indigo-500/20 shadow-lg hover:shadow-indigo-500/20 transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Trophy className="w-10 h-10 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-300">{award.title}</h3>
              <p className="text-sm text-gray-400">{award.organization}</p>
              <p className="mt-2 text-sm text-gray-300">{award.description}</p>
              <span className="mt-4 inline-block text-xs font-bold text-indigo-500 bg-indigo-500/20 rounded-full px-3 py-1">
                {award.year}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <Link href={`/awards`}>
            <Button
              size="sm"
              variant="ghost"
              className="bg-transparent text-indigo-400 hover:text-black my-2"
             >
              More →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
