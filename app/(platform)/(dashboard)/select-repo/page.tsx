"use server";

import { auth } from "@/auth";
import ListRepo from "./_components/list-repo";
import { Repository } from "@/types";

async function getData() {
  const session = await auth();

  const res = await fetch( process.env.BACKEND_URL + `api/github/repos`, {
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
 

const SelectRepoPage = async () => {

    let data:Repository[] = await getData();
    
    return ( 
        <div className="flex-col w-full h-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex justify-center flex-col items-center" >
              <div className=" font-bold text-2xl" >
                  Create a new Web Service
              </div>
              <p className=" font-light text-xs" >Connect a Git repository, or use an existing image.</p>
          </div>
          <ListRepo data={data} />
        </div>
      </div>
    );
}
 
export default SelectRepoPage;