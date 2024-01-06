import StatsTable from "@/components/StatsTable/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full px-4 md:px-12">
      <div className="grid gap-4 grid-cols-2 my-10">
        <Card className="md:w-1/2 hover:border-slate-400 mx-auto">
          <Link
            href="/dsa-submission"
            className="font-bold text-xl hover:cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between  pb-1"></CardHeader>
            <CardContent className="text-center text-sm md:text-base">
              <div className="text-sm font-normal text-muted-foreground">
                Click here for
              </div>
              DSA Submission Form
            </CardContent>
          </Link>
        </Card>
        <Card className="md:w-1/2 hover:border-slate-400 mx-auto hover:cursor-pointer">
          <Link href="/rec-form" className="font-bold text-xl ">
            <CardHeader className="flex flex-row items-center justify-between  pb-1"></CardHeader>
            <CardContent className="text-center text-sm md:text-base">
              <div className="text-sm font-normal text-muted-foreground">
                Click here for
              </div>
              Recruitment Form
            </CardContent>
          </Link>
        </Card>
      </div>
      <hr />
      <h3 className="text-2xl font-bold mt-3">DSA Scores</h3>
      <StatsTable />
    </main>
  );
}
