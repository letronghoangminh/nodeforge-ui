"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectSeparator } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { LogItem } from "./log-item";
import EnvironmentForm from "./environment-form";
import Metrics from "./metrics";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";


interface TabsDeploymentProps {
  type: "BACKEND" | "FRONTEND";
  deploymentId: string;
}

const TabsDeployment = ({ type, deploymentId }: TabsDeploymentProps) => {
  const { data: session, status } = useSession();



  

  let metrics:any = []

  const {data: logs} = useQuery<{timestamp: string, message: string}[]>({
    queryKey: ["logs", deploymentId],
    queryFn: () =>  fetch(
        `https://api.nodeforge.site/api/deployment/${deploymentId}/logs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.accessToken}`,
          },
        }
      ).then((res) => res.json()),
    enabled: status === "authenticated"
  });

  console.log(logs)

  const {data: environment} = useQuery<any[]>({
    queryKey: ["environment", deploymentId],
    queryFn: async () => {
      const environment = await fetch(
        `https://api.nodeforge.site/api/deployment/${deploymentId}/environment`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.accessToken}`,
          },
        }
      ).then((res) => res.json());
      return environment
    },
    enabled: status === "authenticated"
  });

  const {data: dataMetrics} = useQuery<{cpu: number, memory: number}[]>({
    queryKey: ["metrics", deploymentId],
    queryFn: async () => {
      const metrics = await fetch(
        `https://api.nodeforge.site/api/deployment/${deploymentId}/metrics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.accessToken}`,
          },
        }
      ).then((res) => res.json());
      return metrics
    },
    enabled: type === "BACKEND" && status === "authenticated" 
  });




  if(status === "loading") {
    return (
      <div className="w-[1200px] flex flex-col gap-4" >
        <Skeleton  className=" w-full h-[40px]" />
        <Skeleton  className=" w-full h-[150px]" />
      </div>
    )
  }

  return (
    <Tabs
      defaultValue={type === "BACKEND" ? "metrics" : "logs"}
      className="w-[1200px]"
    >
      <TabsList
        className={cn(
          "grid w-full ",
          type === "FRONTEND" && "grid-cols-2",
          type === "BACKEND" && "grid-cols-3"
        )}
      >
        {type === "BACKEND" && (
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        )}
        <TabsTrigger value="logs">Logs</TabsTrigger>
        <TabsTrigger value="environment">Environment</TabsTrigger>
      </TabsList>
      <TabsContent value="metrics">
        <Card>
          <CardHeader>
            <CardTitle>Metrics</CardTitle>
            <CardDescription>
              Metrics description
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-around">
                <Metrics data={metrics || []} />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="logs">
        <Card>
          <CardHeader>
            <CardTitle>Logs</CardTitle>
            <CardDescription>Logs Description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ScrollArea className="h-72 w-full rounded-md border">
              <div className="p-4">
                {(logs || []).map((log: {
                    timestamp: string;
                    message: string;
                }) => (
                  <div className="w-full" key={log.timestamp} >
                    <LogItem data={log} />
                    <SelectSeparator className="my-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="environment">
        <Card>
          <CardHeader>
            <CardTitle>Environment</CardTitle>
            <CardDescription>
              Set environment-specific config and secrets (such as API keys),
              then read those values from your code.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <EnvironmentForm data={environment || []} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsDeployment;
