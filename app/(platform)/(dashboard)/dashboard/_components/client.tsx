"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DeploymentColumn, columns } from "./columns";


interface DeploymentClientProps {
  data: DeploymentColumn[];
};

export const DeploymentClient: React.FC<DeploymentClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <> 
      <div className="flex items-center justify-between ">
        <Heading title={`Dashboard`} description={`Number of deployment ${data?.length}`} />
        <Button onClick={() => router.push(`/subscription/add`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
