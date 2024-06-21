"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, password } = validatedFields.data;

  const res = await fetch(
    "https://api.nodeforge.site/" + `api/users/info/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const existingUser = await res.json();

  if (!existingUser || !existingUser.username || !existingUser.email) {
    return { error: "User does not exist!" };
  }

  if (!existingUser.isVerified) {
    try {
      await fetch("https://api.nodeforge.site/" + `api/users/verify`, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: existingUser.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { success: "Confirmation email sent" };
    } catch (error) {
      return { error: "An error occurred!" };
    }
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "An error occurred!" };
      }
    }
    throw error;
  }
};
