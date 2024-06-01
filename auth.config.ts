import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = credentials;

          const res = await fetch(process.env.BACKEND_URL + "api/auth/login", {
            method: "POST",
            body: JSON.stringify({
              username,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.status == 401) {
            console.log(res.statusText);

            return null;
          }
          const user = await res.json();
          return user;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
