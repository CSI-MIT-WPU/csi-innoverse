"use client";
import Image from "next/image";
import { MainNav } from "./components/MainNav";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
// import { ModeToggle } from "./components/ModeToggle";
import MobileNav from "./components/MobileNav";

export function Navbar() {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      controls.start({
        y: scrollTop > 0 ? 0 : 0,
        boxShadow: scrollTop > 0 ? "0 2px 4px rgba(255, 255, 255, 0.1)" : "0",
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <motion.nav
      className="flex bg-background h-16 items-center px-4 md:px-10 sticky top-0 z-10"
      animate={controls}
    >
      <MainNav className="mr-6" />
      <div className="ml-auto flex items-center space-x-4">
        {/* <ModeToggle /> */}
        <Image
          src="/assets/mitwpu-logo.png"
          alt="MITWPU Logo"
          width={45}
          height={40}
          className="hidden md:block"
        />
      </div>
      <MobileNav />
    </motion.nav>
  );
}
