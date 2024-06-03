"use client";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface AmplifyConfigurationProps {
  data: any;
}

const AmplifyConfigurationView = ({ data }: AmplifyConfigurationProps) => {

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('copied to clipboard.');
      }

  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="text-xl font-semibold text-gray-700">Amplify Configuration</div>
      <div className="flex-1 md:grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className=" text-sm font-semibold text-gray-500">ID</div>
          <div onClick={() => onCopy(data.id)} className="flex items-center">
            <Copy className="mr-2 h-4 w-4" />{" "}
            <span className=" text-xs font-medium text-black">
              {data?.id}
            </span>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className=" text-sm font-semibold text-gray-500">appId</div>
          <div className="flex items-center">
            <Copy onClick={() => onCopy(data?.appId)} className="mr-2 h-4 w-4" />{" "}
            <span className=" text-xs font-medium text-black">
              {data?.appId}
            </span>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className=" text-sm font-semibold text-gray-500">environmentId</div>
          <div className="flex items-center">
            <Copy onClick={() => onCopy(data?.environmentId)} className="mr-2 h-4 w-4" />{" "}
            <span className=" text-xs font-medium text-black truncate max-w-[200px]">
              {data?.environmentId}
            </span>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className=" text-sm font-semibold text-gray-500">SUBDOMAIN</div>
          <div className="flex items-center">
            <span className="text-xs font-medium text-black">
              {data?.subdomain}
            </span>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className=" text-sm font-semibold text-gray-500">webhookUrl</div>
          <div className="flex items-center">
            <span className="text-xs font-medium text-black">
              {data?.webhookUrl || "NULL"}
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmplifyConfigurationView;
