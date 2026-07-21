import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const ADMIN_EMAIL = "umkmpataka2026"
const ADMIN_PASSWORD_HASH = "$2b$12$Kh0EYikySLdydq8tOtSDHOlOBuqBeBrSyShUd4IOJdc.K6XQcU9aO"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        if (credentials.email !== ADMIN_EMAIL) return null

        const isValid = await bcrypt.compare(credentials.password, ADMIN_PASSWORD_HASH)
        if (!isValid) return null

        return {
          id: "admin-001",
          name: "Admin Patakaharja",
          email: ADMIN_EMAIL,
          role: "ADMIN",
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role as string
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
