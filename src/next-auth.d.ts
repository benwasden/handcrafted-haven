// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    usertype?: string;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      usertype?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    usertype?: string;
  }
}
