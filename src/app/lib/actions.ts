'use server'

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

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

export async function updateProductInfo(formData: FormData, imageUrl: string | null = null) {
  const id = Number(formData.get("id"));
  const price = Number(formData.get("price"));
  const name = formData.get("productName") as string;
  const description = formData.get("description") as string;
  const category_id = Number(formData.get("category"));
  const age_group_id = Number(formData.get("age_group"));
  const gender_id = Number(formData.get("gender"));

  try {
    await sql`
      UPDATE products
      SET
        price = ${price},
        product_name = ${name},
        description = ${description},
        image_url = COALESCE(${imageUrl}, image_url),
        category_id = ${category_id},
        age_group_id = ${age_group_id},
        gender_id = ${gender_id}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Error updating product data:", error);
    throw new Error("Failed to update product data.");
  }
}

export async function saveProductUpdate(formData: FormData) {
    const file = formData.get("image") as File | null;
    let imageUrl = null

    if (file && file.size > 0) {
        const { url } = await put(`product-images/${file.name}`, file, {
            access: "public",
        });

        imageUrl = url;
    }

    await updateProductInfo(formData, imageUrl);
    redirect(`/list/${formData.get("user_id")}`);
}