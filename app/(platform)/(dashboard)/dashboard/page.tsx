"use server"

import { DeploymentClient } from "./_components/client";
import { DeploymentColumn } from "./_components/columns";
import { headers } from "next/headers";
import UseGetDeployment from "@/actions/getDeployments";
import { auth } from "@/auth";


async function getData() {
    const session = await auth();

    const res = await fetch( process.env.BACKEND_URL + `api/deployment`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.accessToken}`
        }
    })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
   

const DashBardPage = async () => {
    let data:any[] = await getData();

    const formattedDeployments:DeploymentColumn[]  = data.map((deployment) => {
        return {
            id: deployment.id,
            name: deployment.name,
            status: deployment.status,
            type: deployment.type,
            repository: deployment.repository.name,
            reason: deployment.reason
        }
    })

    return ( 
        <div className="flex-col w-full h-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <DeploymentClient data={formattedDeployments} /> 
        </div>
      </div>
    );
}
 
export default DashBardPage;