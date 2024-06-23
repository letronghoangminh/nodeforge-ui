"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { useRouter } from "next/navigation";
import CellData from "./cell-data";

export type UserColumn = {
  id: number;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
};


export const columns: ColumnDef<UserColumn>[] = [

  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => <CellData data={row.original} id={"id"} />,
  },
  {
    accessorKey: "username",
    header: "USERNAME",
    cell: ({ row }) => <CellData data={row.original} id={"username"} />,
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => <CellData data={row.original} id={"name"} />,
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => <CellData data={row.original} id={"email"} />,
  },
  {
    accessorKey: "phoneNumber",
    header: "PHONE",    cell: ({ row }) => <CellData data={row.original} id={"phoneNumber"} />,
  },
  {
    accessorKey: "isVerified",
    header: "IS VERIFIED",    cell: ({ row }) => <CellData data={row.original} isBadge={true} id={"isVerified"} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
