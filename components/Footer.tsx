import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto h-fit mb-0 px-10 py-10">
      <div className="w-full flex flex-col px-10 justify-center">
        <div className="grid grid-cols-4">
          <Image
            className="col-span-1 my-auto"
            loading="lazy"
            src="/assets/csi-white-text.png"
            alt="CSI Logo"
            width={300}
            height={200}
          />
          <div className="col-span-1"></div>
          <div className="col-span-1 my-5">
            <p className="font-sans font-semibold text-lg mb-1">Address</p>
            <Link
              href=""
              className="font-sans text-sm hover:cursor-pointer hover:underline text-muted-foreground "
            >
              MIT World Peace University, Paud Rd, Kothrud, Pune, Maharashtra
              411038
            </Link>
          </div>
          <div className="mx-auto my-5">
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
        <div className="text-muted text-xs font-light md:text-base">
          <span>Designed By: </span> Computer Society of India MITWPU
        </div>
      </div>
    </footer>
  );
}
