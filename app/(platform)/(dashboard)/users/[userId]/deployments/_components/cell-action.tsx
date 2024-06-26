"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, Info, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { DeploymentColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: DeploymentColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
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
      router.refresh();
    } catch (error) {
      toast.error('deploy failed to delete.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('copied to clipboard.');
  }


  return (
    <>
      <AlertModal
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(`https://github.com/letronghoangminh/${data.repository}.git`)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Repository
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => redirectDetail(+data.id)}
          >
            <Info className="mr-2 h-4 w-4" /> More Info
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem
            onClick={() => router.push(`/event/${data.id}`) } 
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
