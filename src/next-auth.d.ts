import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    usertype?: string;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      usertype?: string;
    };
  }

  interface JWT {
    usertype?: string;
  }
}
