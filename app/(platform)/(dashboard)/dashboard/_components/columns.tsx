"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

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
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "SERVICE NAME",
  },
  //   {
  //     accessorKey: "description",
  //     header: "Description",
  //   },
  {
    accessorKey: "status",
    header: "STATUS",
  },
  {
    accessorKey: "type",
    header: "TYPE",
  },
  {
    accessorKey: "repository",
    header: "REPOSITORY",
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
