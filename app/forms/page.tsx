/* eslint-disable react/no-unescaped-entities */
"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import StatsTable from "@/components/StatsTable/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { getTodaysQuestion, TQuestion } from "./questionsData";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [qData, setqData] = useState<TQuestion | null>();
  useEffect(() => {
    setqData(getTodaysQuestion());
  }, []);

  const { data, isSuccess, isLoading, isError, error } = useQuery<any>({
    queryKey: ["pointsData"],
    queryFn: () => fetch("/api/scores-fetch").then((res) => res.json()),
    staleTime: 0,
  });

  // console.log(qData);
  return (
    <main className="w-full px-4 md:px-12">
      <h1 className="mt-10 text-center font-mono text-xl font-bold md:text-2xl">
        CSI MIT-WPU DSA Challenge
      </h1>
      <p className="text-muted-foreground mt-1 text-center text-sm font-light">
        In Collaboration with
        <br /> Career Development Centre, MIT-WPU
      </p>
      <div className="my-10 grid grid-cols-2 gap-4">
        <Card className="col-span-2 mx-auto mb-8 hover:border-slate-400 md:w-3/4">
          <CardHeader className="pb-6 text-center text-xl font-bold">
            DSA Challenge has ended. Thank you for participating.
          </CardHeader>
          <CardContent className="mt-4 flex flex-col justify-between text-center text-sm md:flex-row md:text-base">
            <div className="text-muted-foreground mx-auto w-fit text-center text-sm font-normal">
              Winners will be soon announced
            </div>
          </CardContent>
        </Card>
      </div>
      <hr />
      <h3 className="mt-3 text-2xl font-bold">DSA Scores</h3>
      <StatsTable
        data={data}
        error={error}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
      />
    </main>
  );
}
