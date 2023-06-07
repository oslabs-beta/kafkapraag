import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { type NextAuthOptions } from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@app/api/models/mongoDB/route'

// Secrets must be attained from provider and then stored in a root level .env file

// Sign up for an OAuth 2.0 Client ID using this form: https://console.cloud.google.com/apis/credentials?pli=1&project=friendly-chat-368817
const googleId: string = process.env.GOOGLE_CLIENT_ID as string
const googleSecret: string = process.env.GOOGLE_CLIENT_SECRET as string
// Sign up for OAuth via Github secret: https://github.com/settings/apps
const ghId: string = process.env.GITHUB_ID as string
const ghSecret: string = process.env.GITHUB_SECRET as string

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
// because NextAuth is still partially built on Next 12 logic, we use auth object as a route handler
export { handler as GET, handler as POST }
