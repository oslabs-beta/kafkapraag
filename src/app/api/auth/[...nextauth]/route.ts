import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

const googleId: string = process.env.GOOGLE_CLIENT_ID !== undefined ? process.env.GOOGLE_CLIENT_ID : 'default'
const googleSecret: string = process.env.GOOGLE_CLIENT_SECRET !== undefined ? process.env.GOOGLE_CLIENT_SECRET : 'default'

const ghId: string = process.env.GITHUB_ID !== undefined ? process.env.GITHUB_ID : 'default'
const ghSecret: string = process.env.GITHUB_SECRET !== undefined ? process.env.GITHUB_SECRET : 'default'

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
  ]
  // callbacks: {
  //   redirect: async () => {
  //     return Promise.resolve('http://localHost:3000/testing')
  //   }
  // }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
