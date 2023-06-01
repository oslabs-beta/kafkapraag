import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";

const ghId = process.env.GITHUB_ID;
const ghSecret = process.env.GITHUB_SECRET;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: ghId,
      clientSecret: ghSecret
    })
  ],
  // callbacks: {
  //   redirect: async () => {
  //     return Promise.resolve('http://localHost:3000/testing')
  //   }
  // }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}