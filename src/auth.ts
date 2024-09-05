//@ts-nocheck

import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    credentials({
      async authorize(credentials): Promise<any> {
        if (credentials === null) return null;
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              role: true,
              image: true,
              about: true,
              age: true,
              location: true,
            },
          });
          console.log(user);
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (e) {
          console.log(e);
          throw new Error("Something went wrong. Please try again later.");
        }
      },
    }),
  ],
});
