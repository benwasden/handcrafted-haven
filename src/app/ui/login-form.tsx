'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useState, FormEvent } from 'react';
import { authenticate } from '../lib/actions';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get('callbackUrl') || '/list';

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage(undefined);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await signIn('credentials', {
      redirect: false,      // we control navigation manually
      email,
      password,
      callbackUrl,
    });

    setIsPending(false);

    if (res?.error) {
      setErrorMessage('Invalid email or password.');
      return;
    }

    // 🔥 This is what fixes your issue:
    // 1) Navigate to your dashboard/list page
    // 2) Force Next.js to re-fetch server components & session
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <h1 className={`${lusitana.className}`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div className="login-form">
            <label
              className="login-label"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="login-input"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              {/* <AtSymbolIcon className="atsymbol" /> */}
            </div>
          </div>
          <div className="login-form">
            <label
              className="login-label"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="login-input"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              {/* <KeyIcon className="keyicon" /> */}
            </div>
          </div>
        </div>

        <Button className="login-button" aria-disabled={isPending}>
          Log in
          {/* <ArrowRightIcon className="arrow" /> */}
        </Button>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
