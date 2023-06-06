import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { type NextAuthOptions } from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@app/api/models/mongoDB/route'

// Secrets must be attained from provider and then stored in a .env file.  'default' is a placeholder to avoid type error
const googleId: string = process.env.GOOGLE_CLIENT_ID !== undefined ? process.env.GOOGLE_CLIENT_ID : 'default'
const googleSecret: string = process.env.GOOGLE_CLIENT_SECRET !== undefined ? process.env.GOOGLE_CLIENT_SECRET : 'default'
const ghId: string = process.env.GITHUB_ID !== undefined ? process.env.GITHUB_ID : 'default'
const ghSecret: string = process.env.GITHUB_SECRET !== undefined ? process.env.GITHUB_SECRET : 'default'

export const authOptions: NextAuthOptions = {
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
  // this secret is required to use NextAuth, generate here: https://next-auth.js.org/configuration/options
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise)
}
const handler = NextAuth(authOptions)
// because NextAuth generally still follows Next.js 12 logic, we need to hard-code using auth object as a route handler
export { handler as GET, handler as POST }
