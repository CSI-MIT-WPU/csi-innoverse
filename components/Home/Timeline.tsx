import { Button } from "../ui/button";
import events from "./eventsData";
export default function Timeline() {
  return (
    <section className="my-12 px-12 md:px-32" id="eventList">
      <h3 className="text-3xl md:text-5xl  text-center font-bold text-primary">
        Timeline
      </h3>
      <ol className="relative border-s border-secondary my-10">
        {events.map(({ time, event, desc, registerLink }) => (
          <li key={event} className="mb-10 ms-4">
            <div className="absolute w-4 h-4 rounded-full mt-1.5 -start-2 border border-primary bg-secondary-foreground"></div>
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              {time}
            </time>
            <h3 className="text-lg font-semibold text-primary">{event}</h3>
            <div
              className="mb-4 text-sm md:text-base font-normal text-gray-500"
              dangerouslySetInnerHTML={{ __html: desc || "" }}
            />
            {registerLink && (
              <a href={registerLink} target="_blank">
                <Button variant="default">Register</Button>
              </a>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
