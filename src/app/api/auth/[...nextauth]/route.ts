import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const GoogleID = process.env.GOOGLE_CLIENT_ID || '276248763365-17ptko88a42e57nvlrnt03f2ajhhfk9h.apps.googleusercontent.com'
const GoogleSecret = process.env.GOOGLE_CLIENT_SECRET || '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'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GoogleID,
      clientSecret: GoogleSecret
    })
  ],
  callbacks: {
    redirect: async () => {
      return Promise.resolve('http://localHost:3000/testing')
    }
  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}