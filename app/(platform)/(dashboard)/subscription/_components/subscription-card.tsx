"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { permanentRedirect, redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { useState } from "react";
import toast from "react-hot-toast";


interface SubscriptionCardProps{
    data: any
}

export enum SubscriptionType {
    FREE = "FREE",
    PRO = "PRO",    
}

const SubscriptionCard = ({data}:SubscriptionCardProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const { data: session, status } = useSession();

    const onHandleUpgrade = async() => {
        if(isLoading || status === "unauthenticated") return
        try{
            setIsLoading(true)
            const res = await fetch(`https://api.nodeforge.site/api/subscription/pro-subscription`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${session?.accessToken}`,
                },
            })

            if(!res.ok){
                toast.error("Failed to upgrade subscription")
                return;
            }

            const dataResponse = await res.json()
            toast.success("Subscription upgraded successfully")
            window.location.href = dataResponse.redirectUrl
            
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    const onHandleManage = async() => {
        if(isLoading || status === "unauthenticated") return
        try{
            setIsLoading(true)
            const res = await fetch(`https://api.nodeforge.site/api/subscription/portal-session`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${session?.accessToken}`,
                },
            })

            if(!res.ok){
                toast.error("Failed to manage subscription")
                return;
            }

            const dataResponse = await res.json()
            toast.success("Subscription managed successfully")
            window.location.href = dataResponse.redirectUrl
            
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    return ( 
        <Card className="w-[1200px]">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">Subscription</p>
        </CardHeader>
        <CardContent className=" space-y-6" >
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className=" text-sm font-medium">Subscription Type</p>
            <Badge variant={data?.type === SubscriptionType.FREE ? "success" : "warning"}>{data?.type}</Badge>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className=" text-sm font-medium">Limit Deployment</p>
            <Badge variant={data?.type === SubscriptionType.FREE ? "success" : "warning"}>{data?.type === SubscriptionType.FREE ? "2" : "5"}</Badge>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end w-full gap-4">
            {data?.type === SubscriptionType.FREE && <Button onClick={() => onHandleUpgrade()} type="button" variant={data?.type === SubscriptionType.FREE ? "green" : "warning"} >
              Upgrade Plan
            </Button>}
            <Button onClick={() => onHandleManage()} >
              Manage Plan
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
}
SubscriptionCard.Skeleton = function SubscriptionCardSkeleton(){
    return (
        <Card className="w-[1200px]">
        <CardHeader>
          <Skeleton className="w-1/2 h-6 mt-2" />
        </CardHeader>
        <CardContent className=" space-y-6" >
          {/* <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className=" text-sm font-medium">Subscription Type</p>
            <Badge variant="success">FREE</Badge>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className=" text-sm font-medium">Limit Deployment</p>
            <Badge variant="success">2</Badge>
          </div> */}
            <div className="flex flex-row  items-center justify-between rounded-lg border p-3 shadow-sm" >
                <Skeleton className="w-1/2 h-6" />
                <Skeleton className="w-1/4 h-6" />
            </div>
            <div className="flex flex-row  items-center justify-between rounded-lg border p-3 shadow-sm" >
                <Skeleton className="w-1/2 h-6" />
                <Skeleton className="w-1/4 h-6" />
            </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end w-full gap-4">
            {/* <Button type="button" variant="green" >
              Upgrade Plan
            </Button>
            <Button>
              Manage Plan
            </Button> */}
            <Skeleton className="w-1/6 h-10" />
            <Skeleton className="w-1/6 h-10" />
          </div>
        </CardFooter>
      </Card>
    )
}

 
export default SubscriptionCard;