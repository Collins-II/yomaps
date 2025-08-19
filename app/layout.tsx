import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NextTopLoader from "nextjs-toploader";
import ReduxProvider from "@/lib/provider/redux_provider";
import Footer from "@/components/footer";
import GlobalAudioPlayer from "@/components/global_audio_player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yo Maps Yo",
  icons: {
    icon: "/assets/images/yomaps-02.jpg"
  },
  description: "Experience the journey of Zambia’s award-winning artist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(circle_at_10%_0%,#0b0f1a_0%,#05070d_60%,#05060a_100%)]`}
      > 
        <NextTopLoader color="#6366F1" showSpinner={false} />
        <ReduxProvider>
        <Navbar/>
        {children}
        <GlobalAudioPlayer /> {/* ✅ one single player */}
        <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
