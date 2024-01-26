/* eslint-disable react/no-unescaped-entities */
import StatsTable from "@/components/StatsTable/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { getTodaysQuestion, TQuestion } from "./questionsData";

interface qData {
  id: number;
  qNo: number;
  question: string;
  link: string;
}

export default function Home() {
  const qData = getTodaysQuestion();
  console.log(qData);
  return (
    <main className="w-full px-4 md:px-12">
      <div className="grid gap-4 grid-cols-2 my-10">
        <Card className="md:w-3/4 hover:border-slate-400 mx-auto col-span-2 mb-8">
          <CardHeader className="pb-1 font-bold text-xl">
            Today's DSA Question
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row justify-between text-center text-sm md:text-base mt-4">
            <div className="text-sm font-normal text-muted-foreground">
              <p className="mb-1">
                {/* <span className="mr-2">{qData?.qNo.toString()}</span>
                {qData?.question} */}
                The first question will be revealed on 1st Feburary 2024
              </p>
              {/* <Link
                href={qData?.link.toString() || ""}
                className="font-semibold text-foreground hover:underline"
              >
                Link to Question
              </Link> */}
            </div>
            <Link href="/forms/dsa-submission">
              <Button variant="outline" className="mt-4 md:mt-0 font-bold">
                Submission Form
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <hr />
      <h3 className="text-2xl font-bold mt-3">DSA Scores</h3>
      <StatsTable />
    </main>
  );
}
