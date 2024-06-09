"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DeploymentColumn } from "./columns";

interface CellDataProps {
    data: DeploymentColumn;
    id: keyof DeploymentColumn;
  }

const CellData = ({data, id} : CellDataProps) => {
    const router = useRouter()

    // useEffect(() => {
    //     router.push(`/deployment/${data.id}`)
    // }, [])

    const redirectDetail = async (id: any) => {
        router.push(`/deployment/${id}`);
    }


    return ( 
        <div onClick={() => redirectDetail(data.id)} >{id === "repository" ? `https://github.com/letronghoangminh/${data["repository"]}.git` : data[id]}</div>
    );
}
 
export default CellData;