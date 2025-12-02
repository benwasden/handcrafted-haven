import { createAuthClient } from "better-auth/react";
import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { signIn, signOut, useSession } = createAuthClient({
    baseURL: "http://localhost:3000"
})

export const { GET, POST } = toNextJsHandler(auth.handler);