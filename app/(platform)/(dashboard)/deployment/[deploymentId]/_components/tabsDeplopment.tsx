"use server";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectSeparator } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { LogItem } from "./log-item";
import EnvironmentForm from "./environment-form";
import Metrics from "./metrics";


interface TabsDeploymentProps {
  type: "BACKEND" | "FRONTEND";
  deploymentId: string;
}

const TabsDeployment = async ({ type, deploymentId }: TabsDeploymentProps) => {
  const session = await auth();

  let metrics: {
    cpu: number;
    memory: number;
  } = {
    cpu: 13.3,
    memory: 17.1,
  };

  const logs = await fetch(
    `https://api.nodeforge.site/api/deployment/${deploymentId}/logs`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.accessToken}`,
      },
    }
  ).then((res) => res.json());

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

  if (type === "BACKEND") {
    metrics = await fetch(
      `https://api.nodeforge.site/api/deployment/${deploymentId}/metrics`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.accessToken}`,
        },
      }
    ).then((res) => res.json());
  }

  console.log("metrics", metrics);
  console.log("logs", logs);
  console.log("environment", environment);

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
                <Metrics data={metrics} />
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
                {logs.map((log: {
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
            <EnvironmentForm data={environment} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsDeployment;
