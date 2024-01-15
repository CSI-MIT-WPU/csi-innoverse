"use client";
import Image from "next/image";
import svg from "@/public/assets/gr.svg";

export default function Hero2() {
  return (
    <div className="w-full h-full object-cover">
      <video
        className="w-full h-full object-cover gradient-mask-b-60"
        // style={{ maskImage: "url(/assets/gr.svg)" }}
        autoPlay
        muted
      >
        <source src="/assets/03.webm" type="video/webm" />
      </video>
      <div className="mask-gradient" />
      {/* <img src={svg} alt="something" /> */}
    </div>
  );
}
