import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    usertype?: string;
    id?: number;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      usertype?: string;
      id?: number;
    } & Session["user"];
  }

  interface User {
    usertype?: string;
    id?: number;
  }

  interface JWT {
    usertype?: string;
    id?: number;
  }
}
