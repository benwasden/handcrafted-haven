import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
       
        token.usertype = (user as any).usertype;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.usertype = token.usertype;
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
