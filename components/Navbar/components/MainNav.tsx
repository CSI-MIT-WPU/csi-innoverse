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
      <div className="hidden items-center space-x-2 md:flex">
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
      <div className="flex items-center space-x-2 md:hidden">
        <Image
          src="/assets/csi-white-text.png"
          alt="CSI Logo"
          width={120}
          height={38}
          priority
        />
        <Image
          src="/assets/cap_logo.png"
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
          "hover:text-primary hidden text-sm font-semibold  transition-colors md:block",
          {
            "text-muted-foreground": pathname !== "/",
            "text-primary": pathname === "/",
          },
        )}
        passHref
      >
        Home
      </Link>
      <Link
        href="/forms"
        className={cn(
          "hover:text-primary hidden text-sm font-semibold  transition-colors md:block",
          {
            "text-muted-foreground": pathname !== "/forms",
            "text-primary": pathname === "/forms",
          },
        )}
        passHref
      >
        DSA Challenge
      </Link>
      <a
        href="https://chat.whatsapp.com/KBJJiKX7opo3CxWmh1pfDE"
        target="_blank"
        className={cn(
          "hover:text-primary text-muted-foreground hidden text-sm  font-semibold transition-colors md:block",
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
          "text-primary hidden text-xl font-bold transition-colors hover:underline md:flex",
        )}
      >
        Register Now
      </Link>
    </div>
  );
}
