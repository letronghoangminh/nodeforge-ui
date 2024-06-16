"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { useRouter } from "next/navigation";
import CellData from "./cell-data";

export type DeploymentColumn = {
  id: string;
  name: string;
  status: string;
  type: string;
  repository: string;
  reason: string;
};


export const columns: ColumnDef<DeploymentColumn>[] = [

  {
    accessorKey: "name",
    header: "SERVICE NAME",
    cell: ({ row }) => <CellData data={row.original} id={"name"} />,
  },
  //   {
  //     accessorKey: "description",
  //     header: "Description",
  //   },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => <CellData data={row.original} id={"status"} />,
  },
  {
    accessorKey: "type",
    header: "TYPE",
    cell: ({ row }) => <CellData data={row.original} id={"type"} />,
  },
  {
    accessorKey: "repository",
    header: "REPOSITORY",    cell: ({ row }) => <CellData data={row.original} id={"repository"} />,
  },
//   {
//     accessorKey: "reason",
//     header: "REASON",
//   },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
