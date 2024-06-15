import useRepository from "@/hooks/use-select-repo";
import WebNewClient from "./_components/client";



const WebNewPage = () => {



    return ( 
        <div className="flex-col w-full h-full" >
            <div className="flex-1 space-y-4 p-8 pt-6" >
                <WebNewClient />
            </div>
        </div>    
    );
}
 
export default WebNewPage;