import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <div className="flex md:hidden ml-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href="/"
              className={cn(
                " text-sm font-medium  hover:text-primary transition-colors",
                {
                  "text-muted-foreground": pathname !== "/",
                  "text-primary": pathname === "/",
                }
              )}
              passHref
            >
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="/forms"
              className={cn(
                "text-sm font-medium  hover:text-primary transition-colors",
                {
                  "text-muted-foreground": pathname !== "/forms",
                  "text-primary": pathname === "/forms",
                }
              )}
              passHref
            >
              DSA Challenge
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href="https://chat.whatsapp.com/KBJJiKX7opo3CxWmh1pfDE"
              target="_blank"
              className={cn(
                "text-sm font-medium  hover:text-primary transition-colors text-muted-foreground"
              )}
            >
              Join Whatsapp Group
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={cn({
                "/#eventList": pathname !== "/",
                "#eventList": pathname === "/",
              })}
              className={cn(
                "text-sm font-medium  hover:text-primary transition-colors text-muted-foreground"
              )}
            >
              Register Now
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
