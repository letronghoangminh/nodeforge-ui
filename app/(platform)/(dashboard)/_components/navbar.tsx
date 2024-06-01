"use client"

import { Logo } from "@/components/logo";
import { NavigationMenuLeft } from "./navigationMenuLeft";
import { NavigationMenuRight } from "./navigationMenuRight";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserNav } from "./user-nav";
// import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const router = useRouter()

    return ( 
        <nav className=" fixed top-0 z-50  w-full px-4 h-20 border-b shadow-sm bg-white flex justify-center " >
            <div className="h-full w-[1200px] flex items-center" >
                <div className=" flex items-center gap-x-20" >
                    <div className=" hidden md:flex" >
                        <Logo/>
                    </div>
                    <div className="flex gap-4 items-center" >
                        <NavigationMenuLeft/>
                        <Separator className=" h-6" orientation="vertical" />
                        <NavigationMenuRight/>    
                    </div>
                   
                    
                </div>
                <div className=" ml-auto flex items-center gap-x-2" >
                    <Button onClick={() =>  router.push("/create")} >New <Plus className="ml-2 h-4 w-4" /> </Button>
                    <UserNav/>
                </div>
            </div>
        </nav>
    );
}
 