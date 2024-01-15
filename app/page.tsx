"use client";
import About from "@/components/Home/About";
import Highlights from "@/components/Home/Highlights";
import Timeline from "@/components/Home/Timeline";
import Hero2 from "@/components/Home/Hero2";

export default function Home() {
  return (
    <main className="w-full">
      <Hero2 />
      <div className="w-full px-4 md:px-12">
        <About />
        <Highlights />
        <Timeline />
      </div>
    </main>
  );
}
