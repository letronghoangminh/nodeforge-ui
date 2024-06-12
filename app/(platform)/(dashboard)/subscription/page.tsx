"use server";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const SubscriptionPage = async () => {
  
  return (
    <Card className="w-[1200px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Subscription</p>
      </CardHeader>
      <CardContent className=" space-y-6" >
        {/* <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">NAME</p>
          <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            Nga
          </p>
        </div> */}
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">Subscription Type</p>
          <Badge variant={"success"}>Free</Badge>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">Limit Deployment</p>
          <Badge variant={"success"}>2</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full gap-4">
          <Button type="button" variant={"green"} >
            Upgrade Plan
          </Button>
          <Button>
            Manage Plan
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPage;
