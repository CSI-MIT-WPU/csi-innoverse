"use client";
import About from "@/components/Home/About";
import Highlights from "@/components/Home/Highlights";
import Timeline from "@/components/Home/Timeline";
import dynamic from "next/dynamic";
import Loader from "@/components/Home/Loader";

const Hero = dynamic(() => import("@/components/Home/Hero"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <div className="w-full px-4 md:px-12">
        <About />
        <Highlights />
        <Timeline />
      </div>
    </main>
  );
}
