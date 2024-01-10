import { configDotenv } from "dotenv"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

configDotenv()

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: '/login',
    
  },
  providers: [Google({
   clientId: process.env.GOOGLE_ID ?? "735281332515-9kbvj0pg1jq05r4mueq4ovtr4lsbtqcd.apps.googleusercontent.com",
   clientSecret: process.env.GOOGLE_SECRET ?? "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"})
  ], // Add providers with an empty array for now
   session: {
    strategy: 'jwt',
   },
}

const handler = NextAuth(authOptions)

export { 
  handler as GET, 
  handler as POST 
}
