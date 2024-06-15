"use client";

import { Plus, RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Deployment } from "@/types";
import DataCard from "./data-card";
import { Skeleton } from "@/components/ui/skeleton";

interface DeploymentClientProps {
  data: Deployment;
}

export const DeploymentClient = ({ data }: DeploymentClientProps) => {
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

DeploymentClient.Skeleton = function DeploymentClientSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Loading" description="Loading" />
        <Skeleton className="w-4 h-4" />
      </div>
      <Separator />
      <Skeleton className=" h-[500px] W-full" />
    </>
  );
};
