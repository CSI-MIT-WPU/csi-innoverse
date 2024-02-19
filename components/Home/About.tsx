/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";

const imgUrls = [
  "https://csi-forms.s3.ap-south-1.amazonaws.com/worqhat_log.png",
  "https://csi-forms.s3.ap-south-1.amazonaws.com/aws_logo.png",
  "https://csi-forms.s3.ap-south-1.amazonaws.com/gcloud_dark_logo.png",
  "https://csi-forms.s3.ap-south-1.amazonaws.com/jetbrains_logo.png",
  "https://csi-forms.s3.ap-south-1.amazonaws.com/canva_logo.png",
  "https://csi-forms.s3.ap-south-1.amazonaws.com/toastmasters_logo.png",
];

const imgUrls2 = [
  "https://csi-forms.s3.ap-south-1.amazonaws.com/vit_logo.png",
  "https://csi-forms.s3.ap-south-1.amazonaws.com/coep_logo.png",
  // "https://csi-forms.s3.ap-south-1.amazonaws.com/dpu_logo.png",
  "https://csi-forms.s3.ap-south-1.amazonaws.com/dy_new_logo.png",
];

export default function About() {
  const pathname = usePathname();
  return (
    <>
      <div className="mx-auto mb-5 w-fit text-lg font-black underline underline-offset-2 md:hidden">
        <Link
          href={cn({
            "/#eventList": pathname !== "/",
            "#eventList": pathname === "/",
          })}
        >
          Register Now
        </Link>
      </div>
      <section className="mb-10 flex flex-wrap">
        <h3 className="text-primary mx-auto text-3xl font-bold md:text-5xl">
          About Us
        </h3>
        {/* <p className="text-center my-3 text-xs md:text-base text-muted-foreground">
          The Computer Society of India Student Chapter at MIT-WPU is a dynamic
          technical community. Our primary goal is to nurture both personal and
          professional growth through engaging projects and active involvement
          in social events. As a dedicated group, we strive to create an
          environment that encourages collaboration and skill development. Our
          members actively contribute to impactful projects and research papers
          enhancing their technical expertise. We believe in fostering a sense
          of community where individuals can thrive both academically and
          personally. Join us on this journey of innovation, learning, and
          social impact. Together, we shape the future of technology.
        </p>
        <h5 className="text-lg md:text-xl text-center mx-auto font-bold text-primary">
          CSI Presents Collaborate Socialize and Innovate
        </h5> */}
        <p className="text-muted-foreground my-3 text-center text-xs md:text-base">
          <span className="text-primary font-medium md:text-lg">
            CSI Innoverse{" "}
          </span>{" "}
          - Embark on a tech-filled journey at our event, featuring a Coding
          Relay with a Tech Quiz, Debugging challenges, and Code exploration.
          Engage in a transformative Seminar diving into cutting-edge technology
          topics. Immerse yourself in our Startup Summit's Mock Shark Tank,
          witnessing aspiring innovators pitch ideas to real-world investors.
          Elevate your skills in our MERN Stack Study Jam, exploring MongoDB,
          Express.js, React, and Node.js. Strengthen inter-chapter relations at
          our Meet Ups, fostering meaningful connections. Reconnect with alumni
          at our Alumni Interaction, celebrating shared memories and engaging
          with accomplished professionals. Don't miss attractions like the
          Startup Showcase, AR/VR experiences, and a Tech Arcade for a day of
          innovation and inspiration. Join us for an unforgettable blend of
          creativity, technology, and collaboration!
        </p>
        <div className="mx-auto">
          <h4 className="text-primary mx-auto mt-10 text-center text-2xl font-bold md:text-3xl">
            In Collaboration with CSI Chapters of
          </h4>
          <Card className={cn("mx-auto mt-8 w-fit min-w-80 md:w-fit")}>
            <CardContent className="mx-10 mb-4 mt-8 grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-3">
              {imgUrls2.map((img) => {
                return (
                  <img
                    className="mx-auto my-auto h-14 min-w-fit lg:h-20"
                    key={img}
                    src={img}
                    alt="college logos"
                  />
                );
              })}
            </CardContent>
          </Card>
          <h4 className="text-primary mx-auto mt-10 text-center text-2xl font-bold md:text-3xl">
            Our Resource Partners
          </h4>
          <Card
            className={cn("mx-auto mt-8 w-fit min-w-80 bg-white md:w-full")}
          >
            <CardContent className="mb-4 mt-8 grid grid-cols-2 gap-x-10 gap-y-5 md:grid-cols-3 lg:grid-cols-6">
              {imgUrls.map((img) => {
                return (
                  <img
                    className="mx-auto my-auto h-14 min-w-fit lg:h-20"
                    key={img}
                    src={img}
                    alt="brand logos"
                  />
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
