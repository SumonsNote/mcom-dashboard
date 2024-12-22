// import bcrypt from "bcryptjs";
// import credentials from "next-auth/providers/credentials";
// import facebook from "next-auth/providers/facebook";
// import google from "next-auth/providers/google";

// import { User } from "./app/models/user-model.js";
// import connectMongo from "./services/mongo.js";
// import { replaceMongoIdInObject } from "./utils/data-utils.js";
// import { createSession } from "./lib/session.js";

// const authConfig = {
//   providers: [
//     google,
//     facebook,
//     credentials({
//       credentials: {
//         username: {},
//         password: {},
//       },

//       async authorize(credentials) {
//         if (!credentials) return null;
//         await connectMongo();
//         try {
//           const user = await User.findOne({
//             username: credentials.username,
//           }).lean();
//           if (user) {
//             const isMatch = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );
//             if (isMatch) {
//               createSession(user);
//               return replaceMongoIdInObject(user);
//             } else {
//               throw new Error("Email or password mismatch");
//             }
//           } else {
//             throw new Error("User not found");
//           }
//         } catch (error) {
//           console.error("Authorization error:", error);
//           throw new Error("Authorization failed");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, user, profile, trigger, session }) {
//       if (account) {
//         if (account.provider === "credentials") {
//           return {
//             user,
//             token,
//             account,
//             profile,
//           };
//         } else {
//           return {
//             user: {
//               ...user,
//               id: token.sub,
//             },
//             provider: account.provider,
//             access_token: account.access_token,
//             refresh_token: account.refresh_token,
//             expires_at: account.expires_at,
//           };
//         }
//       } else {
//         return token;
//       }
//     },
//     async session({ session, token }) {
//       session.error = token.error;
//       return token;
//     },
//   },
// };

// export default authConfig;
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./app/models/user-model";

const authConfig = {
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

        const user = await User.findOne({ username: credentials.username });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          email: token.email,
        };
      }
      return session;
    },
  },
};

export default authConfig;
