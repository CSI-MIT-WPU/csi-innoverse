"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

export const columns: ColumnDef<Task>[] = [
  {
    id: "srNo",
    header: "",
    cell: ({ row }) => {
      const rank = row.index + 1;
      if (rank === 1) {
        return <FontAwesomeIcon icon={faMedal} style={{ color: "#ffd53d" }} />;
      } else if (rank === 2) {
        return <FontAwesomeIcon icon={faMedal} style={{ color: "#c2c2c2" }} />;
      } else if (rank === 3) {
        return <FontAwesomeIcon icon={faMedal} style={{ color: "#976802" }} />;
      } else {
        return null;
      }
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "points",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Points" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("points")}</div>,
    enableSorting: true,
    enableHiding: false,

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
