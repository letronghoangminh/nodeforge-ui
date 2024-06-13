"use client";

import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { UserColumn, columns } from "./columns";


interface UserClientProps {
  data: UserColumn[];
};

export const UserClient: React.FC<UserClientProps> = ({
  data
}) => {
  const router = useRouter();


  return (
    <> 
      <div className="flex items-center justify-between ">
        <Heading title={`Users`} description={`Number of user ${data?.length}`} />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
