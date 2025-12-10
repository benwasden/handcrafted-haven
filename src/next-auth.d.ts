import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    usertype?: string;
    id?: string;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      usertype?: string;
      id?: string;
    } & Session["user"];
  }

  interface JWT {
    usertype?: string;
    id?: string;
  }
}
