"use client";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import axios from "axios";
import { headers } from "next/headers";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const installation_id = searchParams.get("installation_id");
  const { data: session, status } = useSession();

  const newVerification = useCallback(async (installation_id: number) => {
    await fetch("https://api.nodeforge.site/" + "api/github/profile",
      {
        body: JSON.stringify({ installationId: +installation_id }),
        method: "POST",
        headers: {
          authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
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
        console.log("data",data);
        setError(data?.error);
        setSuccess(data?.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [installation_id, status, newVerification, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

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
