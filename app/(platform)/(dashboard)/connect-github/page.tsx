"use server"
import { auth } from "@/auth";
import { redirect } from 'next/navigation'
 

async function getData() {
  const session = await auth();
  const res = await fetch(process.env.BACKEND_URL + `api/github/repos`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return res
}

const ConnectGithub = async () => {
  const session = await auth();
    let data: any= await getData();
    console.log(data.status);
    console.log(session?.accessToken);

    if(data.status == 400){
        const res = await fetch(process.env.BACKEND_URL + `api/github/authorize`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
              },
        });
        const redirectUrl = await res.json();
        console.log(redirectUrl.url);
        redirect(redirectUrl.url);
    }
    if(data.status == 200){
        redirect('/select-repo');
    }
  return <div></div>;
};

export default ConnectGithub;
