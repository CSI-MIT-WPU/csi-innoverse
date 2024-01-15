"use client";
import About from "@/components/Home/About";
import Highlights from "@/components/Home/Highlights";
import Timeline from "@/components/Home/Timeline";
import dynamic from "next/dynamic";
import Loader from "@/components/Home/Loader";
import Hero2 from "@/components/Home/Hero2";

const Hero = dynamic(() => import("@/components/Home/Hero"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Home() {
  return (
    <main className="w-full">
      {/* <Hero /> */}
      <Hero2 />
      <div className="w-full px-4 md:px-12">
        <About />
        <Highlights />
        <Timeline />
      </div>
    </main>
  );
}
