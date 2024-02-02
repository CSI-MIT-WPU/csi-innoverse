"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Home/Loader";
import { useEffect, useRef, useState } from "react";

export default function StatsTable() {
  // const tasks = await getTasks();
  // const data = useRef({});
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("/api/scores-fetch")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((jsonData) => {
  //       data.current = jsonData;
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching data:', err);
  //       setIsLoading(false);
  //     });
  // }, []);
  const [data, setData] = useState<
    { name: string; email: string; points: number }[] | null
  >(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch("/api/scores-fetch")
      .then((res) => res.json())
      .then((responseData) => {
        setData(responseData);
        setIsSuccess(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);
  // const { data, isSuccess, isLoading, isError, error } = useQuery<any>({
  //   queryKey: ["pointsData"],
  //   queryFn: () => fetch("/api/scores-fetch").then((res) => res.json()),
  // });

  {
    isError && console.log(error);
  }

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 flex ">
        <div className="flex items-center justify-between space-y-2">
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        {isLoading && <Loader />}{" "}
        {isSuccess && <DataTable data={data ?? []} columns={columns} />}
      </div>
    </>
  );
}
