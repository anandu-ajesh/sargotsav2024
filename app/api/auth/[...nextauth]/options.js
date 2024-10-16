import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import { Admin } from "../../../../models/adminSchema";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await Admin.findOne({username: credentials.username})

        
       

        if (!user) {
          return null;
        }

        const passwordCorrect = user.password === credentials.password


        if (passwordCorrect) {
          return {
            _id: user?._id,
            username: user?.username,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username=user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session._id = token._id;
        session.username=token.username;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    signOut: "/",
    error: "/"
  },
};