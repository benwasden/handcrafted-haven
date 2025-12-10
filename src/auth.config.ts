import type { NextAuthConfig } from "next-auth";

export const authConfig = {
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

    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const userId = user?.id;

      const pathname = nextUrl.pathname;

      if (!pathname.startsWith('/list')) return true;

      if (!userId) {
        return Response.redirect(new URL("/", nextUrl));
      }
    
      const pathParts = pathname.split('/');
      const listId = pathParts[2];
    
      if (!listId || listId !== userId) {
        return Response.redirect(new URL(`/list/${userId}`, nextUrl));
      }

      return true;
    }   
  },
} satisfies Partial<NextAuthConfig>;   // <-- FIXED
