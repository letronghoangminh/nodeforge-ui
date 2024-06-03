
import {format} from "date-fns"

interface LogItemProp {
    data: {
        timestamp: string;
        message: string;
    }

}

export const LogItem = ({
    data
}: LogItemProp) => {
    return(
        <li className="flex items-center gap-x-2 w-full" >
            <div className="flex space-y-0.5 justify-between w-full" >
                <p className=" text-lg text-muted-foreground" >
                    {data.message}
                </p>

                <p className="text-base text-muted-foreground" >
                    {format(new Date(data.timestamp), "MMM d, yyyy 'at' h:mm a")}
                </p>
            </div>
        </li>
    )
}