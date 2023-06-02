import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";

const googleId: string = process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : "";
const googleSecret: string = process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : "";

const ghId: string = process.env.GITHUB_ID ? process.env.GITHUB_ID : "";
const ghSecret: string = process.env.GITHUB_SECRET ? process.env.GITHUB_SECRET : "";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret
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