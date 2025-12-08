'use server'

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const redirectTo = (formData.get('redirectTo') as string) || '/';
    try {
        await signIn('credentials', {
            redirect: false,
            email: formData.get('email'),
            password: formData.get('password'),
        });
        redirect(redirectTo);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function deleteItem(id: number) {
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath('/list');
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Failed to delete product.");
    }
}