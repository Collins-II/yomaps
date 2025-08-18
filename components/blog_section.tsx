"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  slug: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Afro-Fusion in 2025",
    excerpt:
      "Afro-Fusion has taken the global stage with bold sounds and diverse rhythms. Here’s why it matters...",
    author: "Admin",
    date: "Aug 14, 2025",
    image: "/assets/images/event-01.jpg",
    slug: "afro-fusion-2025",
  },
  {
    id: 2,
    title: "Behind The Scenes: Olios Records",
    excerpt:
      "A deep dive into how we’re shaping the future of African music, artist growth, and global reach.",
    author: "Editor",
    date: "Aug 10, 2025",
    image: "/assets/images/stage-01.jpg",
    slug: "behind-the-scenes",
  },
  {
    id: 3,
    title: "Top 10 Tracks This Month",
    excerpt:
      "Check out the hottest tracks from Olios Records artists trending worldwide this month.",
    author: "Admin",
    date: "Aug 05, 2025",
    image: "/assets/images/olios-office.jpg",
    slug: "top-10-tracks",
  },
];

export default function BlogSection() {
  return (
    <section
      className="py-20 bg-gradient-to-b from-black via-neutral-950 to-black text-white"
      id="blog"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold">
          Latest <span className="text-indigo-400">Blog</span>
          </h2>
          <p className="text-neutral-400 mt-2">
            Stories, insights, and updates from Olios Records
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="overflow-hidden rounded-2xl bg-neutral-900 border border-indigo-600/40 shadow-lg hover:shadow-indigo-500/20 transition">
            <div className="md:flex">
              <div className="relative md:w-1/2 h-64 md:h-auto">
                <Image
                  src={posts[0].image}
                  alt={posts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {posts[0].title}
                  </h3>
                  <p className="text-neutral-400 mb-4">{posts[0].excerpt}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-neutral-500">
                    {posts[0].author} • {posts[0].date}
                  </span>
                  <Link href={`/blog/${posts[0].slug}`}>
                    <Button className="rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Recent Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition group">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h4 className="text-lg font-semibold mb-2 text-white">
                    {post.title}
                  </h4>
                  <p className="text-sm text-neutral-400 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      {post.author} • {post.date}
                    </span>
                    <Link href={`/blog/${post.slug}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-indigo-400 hover:text-indigo-300 "
                      >
                        Read →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
