import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/"
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter email address" },
        password: { label: "Password", type: "password", placeholder: "Enter password" }
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        try {
          const API = process.env.SERVER_BASE_URL + "/user/login"
          const response = await fetch(API, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          console.log(response)
          if(response.ok){
            const data = await response.json()
            const user = data.data
            return user
          } else{
            throw new Error(`Error: ${response.status} - ${await response.text()}`)
          }
        } catch (error) {
          throw new Error("An error occurred!")
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }){
      session.email = token.email
      session.accessToken = token.accessToken
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
}