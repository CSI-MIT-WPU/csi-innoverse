"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <div
      className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}
      {...props}
    >
      <div className="hidden md:flex items-center space-x-2">
        <Image
          src="/assets/csi-white-text.png"
          alt="CSI Logo"
          width={160}
          height={38}
          priority
        />
        <Image
          src="/assets/cap_logo.png"
          alt="CSI Logo"
          width={160}
          height={40}
          priority
          className="mt-2"
        />
      </div>
      <div className="flex md:hidden items-center space-x-2">
        <Image
          src="/assets/csi-white-text.png"
          alt="CSI Logo"
          width={120}
          height={38}
          priority
        />
        <Image
          src="/assets/capgemini-logo.png"
          alt="CSI Logo"
          width={120}
          height={40}
          priority
          className="mt-2"
        />
      </div>
      <Link
        href="/"
        className={cn(
          "hidden md:block text-sm font-semibold  hover:text-primary transition-colors",
          {
            "text-muted-foreground": pathname !== "/",
            "text-primary": pathname === "/",
          }
        )}
        passHref
      >
        Home
      </Link>
      <Link
        href="/forms"
        className={cn(
          "hidden md:block text-sm font-semibold  hover:text-primary transition-colors",
          {
            "text-muted-foreground": pathname !== "/forms",
            "text-primary": pathname === "/forms",
          }
        )}
        passHref
      >
        DSA Challenge
      </Link>
      <a
        href="https://chat.whatsapp.com/KBJJiKX7opo3CxWmh1pfDE"
        target="_blank"
        className={cn(
          "hidden md:block text-sm font-semibold  hover:text-primary transition-colors text-muted-foreground"
        )}
      >
        Join Whatsapp Group
      </a>
      <Link
        href={cn({
          "/#eventList": pathname !== "/",
          "#eventList": pathname === "/",
        })}
        className={cn(
          "hidden md:flex font-bold hover:underline transition-colors text-primary text-xl"
        )}
      >
        Register Now
      </Link>
    </div>
  );
}
