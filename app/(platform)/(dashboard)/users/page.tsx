"use server"

import {  UserClient } from "./_components/client";
import { UserColumn } from "./_components/columns";
import { auth } from "@/auth";
import toast from "react-hot-toast";
import { Deployment } from "@/types";


async function getData() {
    const session = await auth();

    const res = await fetch("https://api.nodeforge.site/" + `api/deployment/admin/deployments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.accessToken}`
        }
    })
    console.log(res)
    if (!res.ok) {
      toast.error('Failed to fetch users.');
      console.log(res.statusText)
      return []
    }
   
    return res.json()
  }
   

const UsersPage = async () => {
    let data:{
      user: {
        id: number;
        username: string;
        name: string;
        email: string;
        phoneNumber: string;
        isVerified: boolean;
      },
      deployments: Deployment[]
    }[] = await getData();

    console.log("data",data)

    const formattedUsers:UserColumn[]  = data.map((item) => {
        return {
          id: item.user.id,
          username: item.user.username,
          name: item.user.name,
          email: item.user.email,
          phoneNumber: item.user.phoneNumber,
          isVerified: item.user.isVerified,
        }
    })

    return ( 
        <div className="flex-col w-full h-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <UserClient data={formattedUsers} /> 
        </div>
      </div>
    );
}
 
export default UsersPage;