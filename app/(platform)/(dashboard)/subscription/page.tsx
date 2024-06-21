"use client";

import { useSession } from "next-auth/react";
import SubscriptionCard from "./_components/subscription-card";
import { useQuery } from "@tanstack/react-query";


const SubscriptionPage = () => {
  
  const { data: session, status } = useSession();

  const { data: subscription, isLoading, isError } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const subscription = await fetch(
        `https://api.nodeforge.site/api/subscription`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.accessToken}`,
          },
        }
      ).then((res) => res.json());
      return subscription;
    },
    enabled: status === "authenticated",
  })

  if(isLoading){
    return <SubscriptionCard.Skeleton />
  }


  return (
    <SubscriptionCard data={subscription} />
  );
};

export default SubscriptionPage;
