"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import NewForm from "./newForm";
import useRepository from "@/hooks/use-select-repo";





const WebNewClient = () => {
    const { item: dataStore } = useRepository();

    return ( 
        <>
            <div className="flex items-center" >
                <Heading title={`You are deploying a web service for ${dataStore.name}`} description={"You seem to be using Next.js, so we’ve autofilled some fields accordingly. Make sure the values look right to you!"} />
            </div>
            <Separator />
            <NewForm/>
        </>

    );
}
 
export default WebNewClient;