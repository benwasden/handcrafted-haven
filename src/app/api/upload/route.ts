// /app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File;

  const { url } = await put(`products/${file.name}`, file, {
    access: "public"
  });

  return NextResponse.json({ url });
}
