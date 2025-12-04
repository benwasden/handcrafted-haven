import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
       
        token.usertype = (user as any).usertype;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.usertype = token.usertype;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
