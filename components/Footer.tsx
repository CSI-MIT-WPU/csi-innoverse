"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Footer() {
  const { toast } = useToast();
  const [textToCopy, setTextToCopy] = useState("+917715826500");

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      duration: 2000,
      description: "Copied to clipboard",
    });
  };

  return (
    <footer className="mt-auto h-fit mb-0 px-4 md:px-10 py-10">
      <div className="w-full flex flex-col px-10 justify-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Image
            className="col-span-1 my-auto hidden md:block"
            loading="lazy"
            src="/assets/csi-white-text.png"
            alt="CSI Logo"
            width={300}
            height={200}
          />
          <div className="md:pl-10 col-span-1 md:my-5">
            <p className="font-sans font-semibold text-lg mb-1">Queries</p>
            <div className="ont-sans text-sm text-muted-foreground">
              <span className="font-semibold"> Whatsapp:</span>
              <br />
              <span
                onClick={handleCopyToClipboard}
                className="hover:cursor-pointer hover:underline"
              >
                +917715826500
              </span>
            </div>
          </div>
          <div className="col-span-1 md:my-5">
            <p className="font-sans font-semibold text-lg mb-1">Address</p>
            <Link
              href=""
              className="font-sans text-sm hover:cursor-pointer hover:underline text-muted-foreground "
            >
              MIT World Peace University, Paud Rd, Kothrud, Pune, Maharashtra
              411038
            </Link>
          </div>
          <div className="md:my-5 col-span-1">
            <p className="font-sans font-semibold text-lg mb-1">Follow Us</p>
            <ul className="font-medium text-muted-foreground ">
              <li>
                <Link
                  className="hover:cursor-pointer hover:underline"
                  href="https://www.linkedin.com/company/computer-society-of-india-mitwpu-chapter/"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  className="hover:cursor-pointer hover:underline"
                  href="https://www.instagram.com/csimitwpu/"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-muted text-xs mt-3 font-medium md:text-base">
          <span>Designed By: </span> Computer Society of India MITWPU
        </div>
      </div>
    </footer>
  );
}
