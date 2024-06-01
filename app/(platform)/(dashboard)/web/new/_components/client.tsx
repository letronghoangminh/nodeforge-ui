import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import NewForm from "./newForm";




const WebNewClient = () => {
    return ( 
        <>
            <div className="flex items-center" >
                <Heading title={"You are deploying a web service for letronghoangminh/nodeforge-ui."} description={"You seem to be using Next.js, so we’ve autofilled some fields accordingly. Make sure the values look right to you!"} />
            </div>
            <Separator />
            <NewForm/>
        </>

    );
}
 
export default WebNewClient;