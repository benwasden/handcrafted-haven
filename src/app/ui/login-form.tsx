'use client';
 
import { funnel, montserrat } from '@/app/ui/fonts';
import {ExclamationCircleIcon} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useState, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get('callbackUrl') || '/';

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
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    setIsPending(false);

    if (res?.error) {
      setErrorMessage('Invalid email or password.');
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <>
    <div className="loginFormWrapper">
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <h1 className={`${funnel.className}`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div className="login-form-email">
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
            </div>
          </div>
          <div className="login-form-pwd">
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
            </div>
          </div>
        </div>

        <Button className={montserrat.className} id="login-button" aria-disabled={isPending}>
          Sign In
        </Button>

        <div
          className="login-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="error_symbol" />
              <p className="error_message">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
    </div>
    </>
  );
}
