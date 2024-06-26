"use server"

import toast from "react-hot-toast";
import { DeploymentClient } from "./_components/client";
import { DeploymentColumn } from "./_components/columns";
import { auth } from "@/auth";
import SubscriptionCard from "../../../subscription/_components/subscription-card";



async function getData(userId:number) {
    const session = await auth();

    const res = await fetch("https://api.nodeforge.site/" + `/api/deployment/admin/${userId}/deployments`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.accessToken}`
        }
    })

    if (!res.ok) {
      return []
    }
   
    return await res.json()
}

interface DeploymentProps {
  params: {
    userId: string;
  },
  searchParams: {
    userName: string;
  }
}
   

const DeploymentsPage = async ({
  params,
  searchParams
}:DeploymentProps) => {
    const session = await auth();

    let data:any[] = await getData(+params.userId);

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

    const subscriptionData = await fetch(`https://api.nodeforge.site/api/subscription/admin/${params.userId}/subscription`, {
      method : "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.accessToken}`
      }
    }).then(res => res.json())

    console.log(subscriptionData)

    return ( 
        <div className="flex-col w-full h-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <DeploymentClient name={searchParams.userName} data={formattedDeployments} /> 
          <SubscriptionCard data={subscriptionData} isAdmin={true}  />
        </div>
      </div>
    );
}
 
export default DeploymentsPage;