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
    <main className="w-full px-12">
      <div className="grid gap-4 md:grid-cols-2 my-10">
        <Card className="w-1/2 hover:border-slate-400 mx-auto">
          <CardHeader className="flex flex-row items-center justify-between  pb-1"></CardHeader>
          <CardContent className="text-center">
            <Link
              href="/dsa-submission"
              className="font-bold text-xl hover:cursor-pointer"
            >
              <div className="text-sm font-normal text-muted-foreground">
                Click here for
              </div>
              DSA Submission Form
            </Link>
          </CardContent>
        </Card>
        <Card className="w-1/2 hover:border-slate-400 mx-auto hover:cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between  pb-1"></CardHeader>
          <Link href="/rec-form" className="font-bold text-xl ">
            <CardContent className="text-center">
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
