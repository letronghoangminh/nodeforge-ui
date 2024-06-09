"use server";
import { auth } from "@/auth";
import { DeploymentClient } from "./_components/client";
import TabsDeployment from "./_components/tabsDeplopment";

interface DeploymentPageProps {
    params: {
        deploymentId: string;
    }
}

const DeploymentPage = async({
    params
}: DeploymentPageProps) => {
    const session = await auth();

    const deploymentId = params.deploymentId;

    const deployment = await fetch(`https://api.nodeforge.site/api/deployment/${deploymentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.accessToken}`,
        }
    }).then(res => res.json());

    console.log(deployment);


    return ( 
        <div className="flex-col w-full h-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <DeploymentClient data={deployment} />
          <TabsDeployment type={deployment?.type} deploymentId={deploymentId} /> 
        </div>
      </div>
    );
}
 
export default DeploymentPage;