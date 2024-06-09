// import { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { jwtDecode } from "jwt-decode";

// async function refreshToken(token: JWT): Promise<JWT> {
//   const res = await fetch("https://api.nodeforge.site/" + "api/auth/refresh", {
//     method: "POST",
//     body: JSON.stringify({
//       refreshToken: token.refreshToken,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const response = await res.json();

//   return {
//     ...token,
//     ...response,
//   };
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Username",
//           type: "text",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) return null;
//         const { username, password } = credentials;
//         const res = await fetch("https://api.nodeforge.site/" + "api/auth/login", {
//           method: "POST",
//           body: JSON.stringify({
//             username,
//             password,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         if (res.status == 401) {
//           console.log(res.statusText);

//           return null;
//         }
//         const user = await res.json();
//         return user;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/",
//   },
//   debug: process.env.NODE_ENV === "development",
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.JWT_SECRET,

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) return { ...token, ...user };

//       const currentTime = Math.floor(Date.now() / 1000);
//       if (currentTime < jwtDecode(token.accessToken).exp!) return token;

//       return await refreshToken(token);
//     },

//     // async signIn({}){

//     // }

//     async session({ token, session }) {
//       session.user = jwtDecode(token.accessToken);
//       session.accessToken = token.accessToken;
//       session.refreshToken = token.refreshToken;

//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
