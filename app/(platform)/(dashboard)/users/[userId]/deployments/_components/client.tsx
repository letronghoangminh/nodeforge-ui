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
  name: string;
};

export const DeploymentClient: React.FC<DeploymentClientProps> = ({
  data,
  name
}) => {
  const params = useParams();
  const router = useRouter();


  return (
    <> 
      <div className="flex items-center justify-between ">
        <Heading title={`List Deployment of ${name}`} description={`Number of deployment ${data?.length}`} />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
