import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <Image
          src="/assets/csi-logo.png"
          alt="CSI Logo"
          width={38}
          height={38}
        />
        <div className="font-bold md:text-2xl text-sky-950">CSI Forms</div>
      </div>
      <Link
        href="/"
        className="hidden md:block text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/dsa-submission"
        className="hidden md:block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        DSA Submit
      </Link>
    </div>
  );
}
