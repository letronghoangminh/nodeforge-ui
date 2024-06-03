"use client";

import { Plus, RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Deployment } from "@/types";
import DataCard from "./data-card";


interface DeploymentClientProps {
  data: Deployment;
};

export const DeploymentClient: React.FC<DeploymentClientProps> = ({
  data
}) => {
  const router = useRouter();

  return (
    <> 
      <div className="flex items-center justify-between ">
        <Heading title={data.name} description={data.reason || ""} />
        <Button size={"icon"} onClick={() => router.refresh()}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <DataCard data={data} />
    </>
  );
};
