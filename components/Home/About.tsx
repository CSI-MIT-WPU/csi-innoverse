import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  return (
    <section className="flex flex-wrap mb-10">
      <h3 className="text-3xl md:text-5xl mx-auto font-bold text-primary">
        About Us
      </h3>
      <p className="text-center my-3 text-xs md:text-base text-muted-foreground">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias nam,
        quod aliquid dolor eos porro obcaecati error, aliquam architecto natus
        delectus perferendis, voluptatibus qui voluptate. Atque esse, veritatis
        dolorum tempore eum qui. Repellat quis aspernatur veniam harum minus
        iste expedita perspiciatis unde commodi, reprehenderit natus, ipsum
        blanditiis aliquid. Distinctio numquam obcaecati quia in eos earum
        eveniet maiores quas nostrum! Modi, reprehenderit! Suscipit ipsam rem
        soluta odit nesciunt nemo praesentium. Vel quis sint quod ad corporis
        asperiores voluptatibus consectetur hic praesentium eum repellendus
        cumque dignissimos obcaecati, ducimus illum nulla necessitatibus
        corrupti fuga cum suscipit minus commodi explicabo. Perferendis ipsa
        earum error.
      </p>

      <h4 className="text-2xl md:text-3xl mx-auto text-center font-bold text-primary mt-10">
        Our Sponsors
      </h4>
      <Card className={cn("w-fit mx-auto md:w-full min-w-80 mt-8")}>
        <CardContent className="grid gap-4">
          <div></div>
        </CardContent>
      </Card>
    </section>
  );
}
