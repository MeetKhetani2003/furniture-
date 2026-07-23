import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/db";
import { User } from "@/db/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "admin",
            name: "Administrator",
            email: process.env.ADMIN_EMAIL,
            role: "admin",
          };
        }
        return null;
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectToDatabase();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const role = user.email === process.env.ADMIN_EMAIL ? "admin" : "user";
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              role: role,
            });
          }
          return true;
        } catch (error) {
          console.error("Error saving user", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (user.role === "admin") {
          token.id = user.id;
          token.role = "admin";
          return token;
        }
        
        await connectToDatabase();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
