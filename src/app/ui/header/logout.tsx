'use server';

import { signOut } from "@/auth";

export default async function SignOutForm() {
    return await signOut({ redirectTo: '/'});
}