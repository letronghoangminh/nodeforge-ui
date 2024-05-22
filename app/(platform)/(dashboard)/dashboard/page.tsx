"use server"

import { DeploymentClient } from "./_components/client";
import { DeploymentColumn } from "./_components/columns";


const DashBardPage = async () => {


    const data = [
        {
            id: "1",
            name: "Test afgg",
            status: "Deployed",
            type: "Service",
            reason: "sdgdgdgdsagdsagdasgds dsag dsg sadg dsg dsg dsfg fds g",
            subdomain: "https://www.google.com",
            framework: "React",
            repository: {
                name: "name",
                branch: "branch",
                url: "https://www.google.com"
            }
        }
    ]

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