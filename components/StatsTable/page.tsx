"use client";
export const dynamic = "force-dynamic";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import Loader from "../Home/Loader";

interface StatsTableProps {
  data: any;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

export default function StatsTable({
  data,
  isSuccess,
  isLoading,
  isError,
  error,
}: StatsTableProps) {
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
