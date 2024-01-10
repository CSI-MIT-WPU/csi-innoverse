const events = [
  {
    time: "1 February",
    event: "DSA Challenge",
    desc: "Elevate your coding skills as you delve into daily challenges focused on Data Structures and Algorithms. Join a vibrant community of learners and conquer coding hurdles",
  },
  {
    time: "22 February",
    event: "Attractions",
    desc: "Experience a day of innovation and inspiration at our event, showcasing groundbreaking startups, dynamic jamming sessions, a tech arcade, and impressive student projects. Join us for a diverse blend of creativity, technology, and collaboration, where live music and student achievements take center stage. Explore the future of tech and entrepreneurship in a vibrant atmosphere of ideas and excitement!",
  },
  {
    time: "22 February",
    event: "Seminar",
    desc: "Dive into the future of technology at our dynamic seminar – a transformative exploration of cutting-edge topics, fostering knowledge, collaboration, and actionable insights for innovation empowerment.",
  },
  {
    time: "22 February",
    event: "Startup Summit",
    desc: "Dive into the entrepreneurial arena at our Mock Shark Tank event by Worqhat! Join aspiring innovators as they pitch their business ideas, face tough questions, and navigate the thrilling waters of startup scrutiny. Be part of the excitement and witness the next wave of innovation unfold!",
  },
  {
    time: "23 February",
    event: "Coding Relay",
    desc: "Dive into the exhilarating world of coding with 'Coding Relay,' where tech enthusiasts unite for a thrilling event featuring a Tech Quiz, Debugging challenges, and Code exploration. Join us for an evening of collaborative learning and friendly competition in the heart of technology!",
  },
  {
    time: "23 February",
    event: "Public Speaking",
    desc: "Embark on a tech-filled journey as our expert speaker navigates the future of computer technology, unraveling the latest trends and innovations shaping our digital landscape.",
  },
  {
    time: "23 February",
    event: "Study Jams",
    desc: "Immerse yourself in our MERN Stack Study Jam, delving into the realms of MongoDB, Express.js, React, and Node.js. Uncover the intricacies of full-stack development through hands-on exercises, collaborative coding, and expert guidance. Elevate your skills and accelerate your journey in mastering the MERN stack. Join us for a transformative coding experience!",
  },
  {
    time: "24 February",
    event: "Meetups",
    desc: "Strengthen inter-chapter relations through socializing – a unique opportunity to connect, collaborate, and foster meaningful relationships. Join us for a chance to build stronger bonds and enhance the collective spirit of our community. Don't miss this invaluable occasion to forge connections that extend beyond chapters and make lasting memories together.",
  },
  {
    time: "24 February",
    event: "Alumni Interactions",
    desc: "Reconnect with former classmates and celebrate shared memories at our Alumni Interaction event. Join us for an evening of networking, reminiscing, and forging new connections. Embrace the opportunity to engage with accomplished alumni, sharing experiences and insights. Rediscover the bonds that transcend time and make lasting connections in our vibrant alumni community.",
  },
];

export default function Timeline() {
  return (
    <section className="my-12 px-12 md:px-32">
      <h3 className="text-3xl md:text-5xl  text-center font-bold text-primary">
        Timeline
      </h3>
      <ol className="relative border-s border-secondary my-10">
        {events.map(({ time, event, desc }) => (
          <li key={event} className="mb-10 ms-4">
            <div className="absolute w-4 h-4 rounded-full mt-1.5 -start-2 border border-primary bg-secondary-foreground"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              {time}
            </time>
            <h3 className="text-lg font-semibold text-primary">{event}</h3>
            <p className="mb-4 text-sm md:text-base font-normal text-gray-500">
              {desc}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
