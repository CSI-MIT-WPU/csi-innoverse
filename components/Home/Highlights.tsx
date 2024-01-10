import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const competitions = [
  {
    title: "Hackathon",
    description: "1 hour ago",
  },
  {
    title: "Coding Relay",
    description: "1 hour ago",
  },
  {
    title: "Public Speaking",
    description: "2 hours ago",
  },
  {
    title: "21 Days DSA Challenge",
    description: "2 hours ago",
  },
];

const meetups = [
  {
    title: "Study Jams",
    description: "1 hour ago",
  },
  {
    title: "Meetups",
    description: "1 hour ago",
  },
  {
    title: "Alumni Interactions",
    description: "1 hour ago",
  },
];

const attractions = [
  {
    title: "Startup Showcase",
    description: "1 hour ago",
  },
  {
    title: "AR/VR Experience Center",
    description: "1 hour ago",
  },
  {
    title: "Tech Arcade",
    description: "1 hour ago",
  },
  {
    title: "Student Protoype Showcase",
    description: "1 hour ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export default function Highlights({ className, ...props }: CardProps) {
  return (
    <section className="my-12">
      <h3 className="text-2xl md:text-5xl  text-center font-bold text-primary">
        Highlights
      </h3>
      <div className="grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-3 my-10">
        <Card
          className={cn("w-fit mx-auto md:w-full min-w-80", className)}
          {...props}
        >
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary underline-offset-4 underline">
              Competitions & Challenges
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {competitions.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 text-secondary-foreground"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card
          className={cn("w-fit mx-auto md:w-full min-w-80", className)}
          {...props}
        >
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary underline-offset-4 underline">
              Meetups
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {meetups.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card
          className={cn("w-fit mx-auto md:w-full min-w-80", className)}
          {...props}
        >
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-primary underline-offset-4 underline">
              Attractions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {attractions.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
