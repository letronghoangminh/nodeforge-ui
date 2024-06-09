"use server";

import { auth } from "@/auth";
import ProfileForm from "./_components/profileForm";
import { ProfileType } from "@/types";

const Profile = async() => {

  const session = await auth();
    
    let profile:ProfileType
    const res = await fetch("https://api.nodeforge.site/" + `/api/users/info/${session?.user?.username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.accessToken}`,
        }
    })

    if(res.ok) {
        profile = await res.json();
    }

    return ( 
        <div className="flex-col w-full h-full" >
            <div className="flex-1 space-y-4 p-8 pt-6" >
                <ProfileForm initialData={profile} />
            </div>
        </div>    
     );
}
 
export default Profile;