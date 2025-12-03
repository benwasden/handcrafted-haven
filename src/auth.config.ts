import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.usertype = user.usertype;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.usertype = token.usertype as string | undefined;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnList = nextUrl.pathname.startsWith('/list');
            if (isOnList) {
                if (isLoggedIn) {
                    return true;
                }
                return false;
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;