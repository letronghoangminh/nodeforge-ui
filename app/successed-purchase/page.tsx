"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";


const SuccessedPurchase = () => {
    const router = useRouter();

    const backSubscription = useCallback(() => {
        router.push("/subscription");
      }, [router]);

    return ( 
        <div className="flex h-full items-center justify-center w-full" >
          <div>
            <div className="flex justify-center">
              <CheckCircle className=" h-[80px] w-[80px] text-emerald-400" />
            </div>
            <div className="flex justify-center mt-8">
              <p className=" text-3xl font-bold text-emerald-400 ">Thank you for buying the service, please enjoy the rapid deployments!</p>
            </div>
            <div className=" flex justify-center mt-16 ">
              <Button className="dark:md:hover:bg-grey-90" onClick={backSubscription}>
                Back to Subscription Page
              </Button>
            </div>
          </div>
        </div>
    );
}
 
export default SuccessedPurchase;