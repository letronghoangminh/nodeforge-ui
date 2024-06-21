"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";


const SuccessedPurchase = () => {
    const router = useRouter();

    const backHome = useCallback(() => {
        router.push("/");
      }, [router]);

    return ( 
        <div className="flex h-full items-center justify-center w-full" >
          <div>
            <div className="flex justify-center">
              <CheckCircle className=" h-[80px] w-[80px] text-emerald-400" />
            </div>
            <div className="flex justify-center mt-8">
              <p className=" text-3xl font-bold text-emerald-400 ">Thank you for buy Upgrade Subscription!</p>
            </div>
            <div className=" flex justify-center mt-16 ">
              <Button className="dark:md:hover:bg-grey-90" onClick={backHome}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
    );
}
 
export default SuccessedPurchase;