"use client";
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";


export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const installation_id = searchParams.get("installation_id");
  const { data: session, status } = useSession();
  const router = useRouter();

  const newVerification = useCallback(async (installation_id: number) => {
    const res = await fetch("https://api.nodeforge.site/" + "api/github/profile",
      {
        body: JSON.stringify({ installationId: +installation_id }),
        method: "POST",
        headers: {
          authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if(res.ok) {
      return { success: "Verification sent!" };
    }
    return { error: "Something went wrong!" };
  }, [session])


  const onSubmit = useCallback(() => {

    if(success || error) return;

    if (!installation_id) {
      setError("installation_id");
      return;
    }
    if (status === "loading") {
      return;
    }
    newVerification(+installation_id)
      .then((data: any) => {
        setError(data?.error);
        setSuccess(data?.success);
        if(data?.success) {
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [installation_id, status, newVerification, success, error, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  console.log("success", success);


  useEffect(() => {
    if (success) {
      router.push("/select-repo");
    }
  },[success, router]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/dashboard"
      backButtonLabel="Back to Dashboard"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && !error && (
            <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  );
};
