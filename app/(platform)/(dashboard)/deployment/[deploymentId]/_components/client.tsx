"use client";

import { Plus, RefreshCcw, Trash } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Deployment } from "@/types";
import DataCard from "./data-card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DeploymentClientProps {
  data: Deployment;
}

export const DeploymentClient = ({ data }: DeploymentClientProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onConfirm = async () => {
    try {
      setLoading(true);
      // await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      await fetch("https://api.nodeforge.site/" + `api/deployment/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.accessToken}`,
      }
      })
      toast.success('deploy deleted.');
      router.back();
    } catch (error) {
      toast.error('deploy failed to delete.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <div className="flex items-center justify-between ">
        <Heading title={data.name} description={data.reason || ""} />
        <div className="flex gap-4 items-center" >
          <Button size={"icon"} onClick={() => window.location.reload()}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button size={"lg"} variant={"destructive"} onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" /> Delete
          </Button>
        </div>
        
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
