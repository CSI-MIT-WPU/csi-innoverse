"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import Loader from "../Home/Loader";
import { useEffect, useState } from "react";

export default function StatsTable() {
  const [data, setData] = useState<
    { name: string; email: string; points: number }[] | null
  >(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch("/api/scores-fetch", {
      headers: {
        "Cache-Control": "no-store",
        cache: "no-store",
      },
    })
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
