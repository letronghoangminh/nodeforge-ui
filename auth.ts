import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { jwtDecode } from "jwt-decode";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {},
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = jwtDecode(user?.accessToken || "") as any;

      if (!existingUser || !existingUser.isVerified) {
        return false;
      }

    return true;
    },
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ token, session }) {
      session.user = jwtDecode(token.accessToken);
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.JWT_SECRET,
  ...authConfig,
});
