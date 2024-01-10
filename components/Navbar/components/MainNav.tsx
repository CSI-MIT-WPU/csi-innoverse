"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
      <div className="flex items-center space-x-2">
        <Image
          src="/assets/csi-white-text.png"
          alt="CSI Logo"
          width={160}
          height={38}
          priority
        />
        {/* <div className="font-bold md:text-2xl text-foreground">CSI Forms</div> */}
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
        Recruitment Form
      </Link>
    </div>
  );
}
