"use client";
export const dynamic = "force-dynamic";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import Loader from "../Home/Loader";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function StatsTable() {
  const { data, isSuccess, isLoading, isError, error } = useQuery<any>({
    queryKey: ["pointsData"],
    queryFn: () => fetch("/api/scores-fetch").then((res) => res.json()),
    staleTime: 60,
    refetchInterval: 5 * 60 * 60,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  {
    isError && console.error(error);
  }

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 flex">
        {isLoading && <Loader />}{" "}
        {isSuccess && <DataTable data={data ?? []} columns={columns} />}
      </div>
    </>
  );
}
