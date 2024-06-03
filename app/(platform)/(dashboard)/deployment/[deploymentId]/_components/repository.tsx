"use client";

import { Repository } from "@/types";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface RepositoryProps {
  data: any;
}

const RepositoryView = ({ data }: RepositoryProps) => {

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('copied to clipboard.');
      }
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="text-xl font-semibold text-gray-700">Repository</div>
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
          <div className=" text-sm font-semibold text-gray-500">NAME</div>
          <div onClick={() => onCopy(data.id)} className="flex items-center">
            <Copy className="mr-2 h-4 w-4" />{" "}
            <span className=" text-xs font-medium text-black">
              {data?.name}
            </span>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className=" text-sm font-semibold text-gray-500">URL</div>
          <div onClick={() => onCopy(data.id)} className="flex items-center">
            <Copy className="mr-2 h-4 w-4" />{" "}
            <span className=" text-xs font-medium text-black truncate max-w-[200px]">
              {data?.url}
            </span>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className=" text-sm font-semibold text-gray-500">BRANCH</div>
          <div className="flex items-center">
            <span className="text-xs font-medium text-black">
              {data?.branch}
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryView;
