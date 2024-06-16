"use client";
import { Deployment } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Copy, Loader2, Pause, XCircle } from "lucide-react";
import RepositoryView from "./repository";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import axios from "axios";
import { headers } from "next/headers";
interface DataCardProps {
  data: Deployment;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const DataCard = ({ data }: DataCardProps) => {
  const { data: session, status } = useSession();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("copied to clipboard.");
  };

  const urlDomain = useMemo(() => {
    if(data.type === "FRONTEND"){
      return `https://${data.amplifyConfiguration?.subdomain}.nodeforge.site`
    }
    return `https://${data.ecsConfiguration?.subdomain}.nodeforge.site`
  },[data])

  const { data: checkData } = useQuery<{ status: number; data: any }>({
    queryKey: ["WEBSITE_STATUS", urlDomain],
    queryFn: async () => {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/api/getUrl`,
        {
          url: urlDomain,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.accessToken}`,
            ...corsHeaders,
          },
        }
      );
      return {
        status: response.status,
        data: response.data,
      };
    },
    refetchInterval: 10 * 1000,
  });

  const websiteStatus = useMemo(() => {
    console.log("checkData", checkData);
    if (!checkData) {
      return "INACTIVE";
    }
    if (checkData?.status >= 200 && checkData?.status < 300) {
      return "ACTIVE";
    }
    return "INACTIVE";
  }, [checkData]);




  return (
    <Card className="w-[1200px]">
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="">
        <div className="md:grid md:grid-cols-4 gap-8 pt-5">
          <div className="flex flex-col gap-2">
            <div className=" text-xl font-semibold text-gray-500">
              DEPLOYMENT STATUS
            </div>
            <div className="flex items-center">
              {data.status === "SUCCESS" ? (
                <CheckCircle className="mr-2 h-4 w-4 text-emerald-400" />
              ) : data.status === "PENDING" ? (
                <Pause className="mr-2 h-4 w-4 text-yellow-400" />
              ) : (
                <XCircle className="mr-2 h-4 w-4 text-red-400" />
              )}
              <span className=" text-lg font-medium text-emerald-400">
                {data.status}
              </span>{" "}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className=" text-xl font-semibold text-gray-500">
              WEBSITE STATUS
            </div>
            <div className="flex items-center">
              {websiteStatus === "ACTIVE" ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-400" />
                  <span className=" text-lg font-medium text-emerald-400">
                    {websiteStatus}
                  </span>
                </>
              ) : (
                <>
                  <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
                  <span className=" text-lg font-medium text-gray-500">
                    {websiteStatus}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className=" text-xl font-semibold text-gray-500">
              FRAMEWORK
            </div>
            <div className="flex items-center">
              <span className=" text-lg font-medium text-black">
                {data.framework}
              </span>{" "}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className=" text-xl font-semibold text-gray-500">DOMAIN</div>
            <div className="flex items-center">
              <span
                onClick={() =>
                  onCopy(
                    urlDomain
                  )
                }
                className=" text-xs font-medium text-black flex "
              >
                <Copy className="mr-2 h-4 w-4" />{" "}
                {urlDomain}
              </span>{" "}
            </div>
          </div>
        </div>
        <Separator className="mt-6" />
        <div className="flex py-6 space-x-4 text-sm h-full">
          <RepositoryView data={data.repository} />
          <Separator role={"grid"} orientation="vertical" className=" h-56" />
          {/* <AmplifyConfigurationView data={data.amplifyConfiguration} /> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
