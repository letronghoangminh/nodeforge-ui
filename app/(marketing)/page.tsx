import { Button } from "@/components/ui/button"
import { Medal } from "lucide-react"
import Link from "next/link"
import localFont from "next/font/local"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

const headingFont = localFont({
    src: "../../public/fonts/font.woff2"
})

const textFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "600",
        "700",
        "800",
        "900"
    ]
})

const MarketingPage = () => {
    return (
        <div className="flex items-center justify-center flex-col" >
            <div className={cn(
                "flex items-center justify-center flex-col",
                headingFont.className,
            )} >
                <div
                    className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 uppercase rounded-full"
                >
                    <Medal className="h-6 w-6 mr-2" />
                    No 1 no Platform
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6" >
                    KhonLang helps team dev move
                </h1>
                <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit" >
                    work forward.
                </div>
            </div>
            <div className={cn("text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",textFont.className)} >
                Get dgds ddsf dg dg df gfd sh dfh fdh fd hfdh fd hdf hdf shfdsh dfh fd hdfs  dfh fdh fd hdf hf h fdsh fd hfd h dfh fd hfd h fdh fdh fds hfds  dhfdhf dhf  dfgfdg dfsgfdgs 
            </div>
            <Button
                className=""
            >
                <Link href={"/auth/login"} >
                    Get KhonLang for free
                </Link>
            </Button>
        </div>
    )
}

export default MarketingPage