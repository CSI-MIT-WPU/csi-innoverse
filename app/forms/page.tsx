/* eslint-disable react/no-unescaped-entities */
"use client";
export const dynamic = "force-dynamic";
import StatsTable from "@/components/StatsTable/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { getTodaysQuestion, TQuestion } from "./questionsData";
import { useEffect, useState } from "react";

interface qData {
  id: number;
  qNo: number;
  question: string;
  link: string;
}

export default function Home() {
  const [qData, setqData] = useState<TQuestion | null>();

  useEffect(() => {
    setqData(getTodaysQuestion());
  }, []);
  // console.log(qData);
  return (
    <main className="w-full px-4 md:px-12">
      <div className="grid gap-4 grid-cols-2 my-10">
        <Card className="md:w-3/4 hover:border-slate-400 mx-auto col-span-2 mb-8">
          <CardHeader className="pb-1 font-bold text-xl">
            Today's DSA Question
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row justify-between text-center text-sm md:text-base mt-4">
            <div className="text-sm font-normal text-muted-foreground">
              {qData === null ? (
                <div>Some error occured</div>
              ) : (
                <>
                  <p className="mb-1">
                    <span className="mr-2">
                      Question Number: {qData?.qNo.toString()}
                    </span>
                    {qData?.question}
                  </p>
                  <a
                    rel="noopener noreferrer"
                    href={qData?.link.toString()}
                    target="_blank"
                    className="font-semibold text-foreground hover:underline"
                  >
                    Click Here for question link
                  </a>
                </>
              )}
            </div>
            <div>
              <a href="https://chat.whatsapp.com/FpuL78HELIv4wLAcYwWOYf">
                <Button
                  variant="outline"
                  className="mt-4 md:mt-0 text-sm mb-2 mr-2"
                >
                  Join Whatsapp Group
                </Button>
              </a>
              <Link href="/forms/dsa-submission">
                <Button variant="outline" className="mt-4 md:mt-0 font-bold">
                  Submission Form
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <hr />
      <h3 className="text-2xl font-bold mt-3">DSA Scores</h3>
      <StatsTable />
    </main>
  );
}
