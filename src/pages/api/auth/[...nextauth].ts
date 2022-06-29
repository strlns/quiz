import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../globals/db";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    ...(process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
          }),
        ]
      : []),
  ],
  callbacks: {
    /*To do: Use DB ID or similar in session, get rid of e-mail addresses*/
    // session: async ({ session, token }) => {
    //   console.log(session, token);
    //   return session;
    // },
    // jwt: async ({ token, user, account, profile, isNewUser }) => {
    //   console.log(token, user, account, profile);
    //   return token;
    // },
    // signIn: async ({ user, account, profile, email, credentials }) => {
    //   console.log(user, account, profile, email, credentials);
    //   return true;
    // },
  },
});
