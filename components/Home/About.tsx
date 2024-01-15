/* eslint-disable react/no-unescaped-entities */
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section className="flex flex-wrap mb-10">
      <h3 className="text-3xl md:text-5xl mx-auto font-bold text-primary">
        About Us
      </h3>
      <p className="text-center my-3 text-xs md:text-base text-muted-foreground">
        The Computer Society of India Student Chapter at MIT-WPU is a dynamic
        technical community. Our primary goal is to nurture both personal and
        professional growth through engaging projects and active involvement in
        social events. As a dedicated group, we strive to create an environment
        that encourages collaboration and skill development. Our members
        actively contribute to impactful projects and research papers enhancing
        their technical expertise. We believe in fostering a sense of community
        where individuals can thrive both academically and personally. Join us
        on this journey of innovation, learning, and social impact. Together, we
        shape the future of technology.
      </p>
      <h5 className="text-lg md:text-xl text-center mx-auto font-bold text-primary">
        CSI Presents Collaborate Socialize and Innovate
      </h5>
      <p className="text-center my-3 text-xs md:text-base text-muted-foreground">
        <span className="md:text-lg font-medium text-primary">
          CSI Innoverse{" "}
        </span>{" "}
        - Embark on a tech-filled journey at our event, featuring a Coding Relay
        with a Tech Quiz, Debugging challenges, and Code exploration. Engage in
        a transformative Seminar diving into cutting-edge technology topics.
        Immerse yourself in our Startup Summit's Mock Shark Tank, witnessing
        aspiring innovators pitch ideas to real-world investors. Elevate your
        skills in our MERN Stack Study Jam, exploring MongoDB, Express.js,
        React, and Node.js. Strengthen inter-chapter relations at our Meet Ups,
        fostering meaningful connections. Reconnect with alumni at our Alumni
        Interaction, celebrating shared memories and engaging with accomplished
        professionals. Don't miss attractions like the Startup Showcase, AR/VR
        experiences, and a Tech Arcade for a day of innovation and inspiration.
        Join us for an unforgettable blend of creativity, technology, and
        collaboration!
      </p>

      {/* <h4 className="text-2xl md:text-3xl mx-auto text-center font-bold text-primary mt-10">
        Our Sponsors
      </h4>
      <Card className={cn("w-fit mx-auto md:w-full min-w-80 mt-8")}>
        <CardContent className="grid gap-4">
          <div></div>
        </CardContent>
      </Card> */}
    </section>
  );
}
