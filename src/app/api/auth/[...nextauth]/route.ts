import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { type NextAuthOptions } from 'next-auth'

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
  secret: process.env.NEXTAUTH_SECRET
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
