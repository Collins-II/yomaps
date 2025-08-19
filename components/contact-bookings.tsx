"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactBookings() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Your booking request has been submitted!");
    }, 2000);
  };

  return (
    <section id="contact" className="w-full bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SIDE - Contact Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Contact & Bookings
          </h2>
          <p className="text-gray-300 max-w-md">
            Get in touch with Olios Records for artist bookings, partnerships, and media inquiries.  
            We’ll respond within 24 hours.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-400 w-6 h-6" />
              <span>oliosrecords24@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-indigo-400 w-6 h-6" />
              <span>+260 970 000 000</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-indigo-400 w-6 h-6" />
              <span>Lusaka, Zambia</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - Booking Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gray-900/80 border border-gray-700 rounded-2xl shadow-lg backdrop-blur-md">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  placeholder="Your Full Name" 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  required 
                />
                <Input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  required 
                />
                <Input 
                  type="number" 
                  placeholder="Your Phone Number" 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  required 
                />
                <Input 
                  placeholder="Subject (e.g., Artist Booking)" 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  required 
                />
                <Textarea 
                  placeholder="Your Message / Booking Details..." 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 h-32"
                  required 
                />
                
                <Button 
                  type="submit" 
                  className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Booking Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </section>
  );
}
