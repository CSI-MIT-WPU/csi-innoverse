"use client";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Home/Loader";

export default function StatsTable() {
  // const tasks = await getTasks();
  const { data, isSuccess, isLoading, isError, error } = useQuery<any>({
    queryKey: ["pointsData"],
    queryFn: () => fetch("/api/dsa-submission").then((res) => res.json()),
  });

  isError && console.log(error);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 flex ">
        <div className="flex items-center justify-between space-y-2">
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        {isLoading && <Loader />}
        {isSuccess && <DataTable data={data} columns={columns} />}
      </div>
    </>
  );
}
