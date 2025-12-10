import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can leave this blank if proxy does not need authorize()
      authorize() {
        return null;
      },
    }),
  ],
}).auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
