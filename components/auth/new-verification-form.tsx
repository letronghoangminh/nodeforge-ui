"use client";
import { BeatLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useSession } from "next-auth/react";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data: session, status } = useSession();

  const newVerification = useCallback(async (token: string) => {
    await fetch(process.env.BACKEND_URL + "api/auth/verify" + `?token=${token}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  }, [session])


  const onSubmit = useCallback(() => {

    if(success || error) return;

    if (!token) {
      setError("Invalid token");
      return;
    }
    if (status === "loading") {
      return;
    }
    newVerification(token)
      .then((data: any) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, status, newVerification, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
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
