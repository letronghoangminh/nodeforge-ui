"use server"
import { auth } from "@/auth";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { redirect } from 'next/navigation'
import { BeatLoader } from "react-spinners";
 

async function getData() {
  const session = await auth();
  const res = await fetch("https://api.nodeforge.site/" + `api/github/repos`, {
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


    if(data.status == 400){
        const res = await fetch("https://api.nodeforge.site/" + `api/github/authorize`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
              },
        });
        const redirectUrl = await res.json();
        redirect(redirectUrl.url);
    }

    if(data.status == 200){
        redirect('/select-repo');
    }
  return (
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back to Login"
      >
        <div className="flex items-center w-full justify-center">
          <BeatLoader />
        </div>
      </CardWrapper>
  );
};

export default ConnectGithub;
