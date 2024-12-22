// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import NextAuth from "next-auth";
// import authConfig from "./auth.config";
// import mongoClientPromise from "./database/mongoClientPromise";
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: MongoDBAdapter(mongoClientPromise, {
//     databaseName: process.env.ENVIRONMENT,
//   }),
//   session: {
//     strategy: "jwt",
//   },
//   ...authConfig,
// });
import bcrypt from "bcryptjs";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./app/models/user-model";
import connectMongo from "./services/mongo";
import { createSession } from "./lib/session";
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        await connectMongo();
        const user = await User.findOne({
          username: credentials.username,
        }).lean();

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          await createSession({
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            name: user.first_name + " " + user.last_name,
          });
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            name: user.first_name + " " + user.last_name,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // //console.log("user FROM JWT", user);
        // //console.log("TOKEN FROM JWT", token);
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          email: token.email,
          role: token.role,
          name: token.name,
          phone: token.phone,
        };
      }
      return session;
    },
  },
});
