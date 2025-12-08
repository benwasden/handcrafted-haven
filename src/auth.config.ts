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
    authorized( {auth, request: { nextUrl }}) {
      const isLoggedIn = !!auth?.user;
      const isUser = !!auth?.user.id;
      const isOnList = nextUrl.pathname.startsWith('/list');
      const isOnRightList = nextUrl.pathname.startsWith(`/list/${!!auth?.user.id}`)
      if (isOnRightList) {
        if (isUser) {
          return true;
        }
        return false;
      } 
      return true;
    }
  },
} satisfies NextAuthConfig;
