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
import { CheckCircle, Copy, Pause, XCircle } from "lucide-react";
import RepositoryView from "./repository";
import AmplifyConfigurationView from "./amplifyConfiguretion";
import toast from "react-hot-toast";
interface DataCardProps {
  data: Deployment;
}

const DataCard = ({ data }: DataCardProps) => {

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('copied to clipboard.');
  }

  return (
    <Card className="w-[1200px]">
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="">
        <div className="md:grid md:grid-cols-4 gap-8 pt-5">
          <div className="flex flex-col gap-2">
            <div className=" text-xl font-semibold text-gray-500">ID</div>
            <div onClick={() => onCopy(data.id)} className="flex items-center">
              <Copy className="mr-2 h-4 w-4" />{" "}
              <span className=" text-lg font-medium text-black">{data.id}</span>{" "}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className=" text-xl font-semibold text-gray-500">DEPLOYMENT STATUS</div>
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
            <div className=" text-xl font-semibold text-gray-500">WEBSITE STATUS</div>
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
              <span onClick={() => onCopy(`https://${data.amplifyConfiguration?.subdomain}.nodeforge.site`)} className=" text-xs font-medium text-black flex ">
                <Copy className="mr-2 h-4 w-4" />{" "}
                {`https://${data.amplifyConfiguration?.subdomain}.nodeforge.site`}
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
