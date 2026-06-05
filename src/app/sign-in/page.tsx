import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in | Siimpl",
  description: "Sign in to your Siimpl client account.",
};

export default function SignInPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="flex min-h-dvh bg-neutral-100 px-6 py-8 text-neutral-950 sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl flex-col items-center justify-between">
        <div aria-hidden="true" className="h-5" />

        <section className="flex w-full flex-1 items-center justify-center py-8">
          <div className="w-full max-w-[24rem]">
            <Link
              href="/"
              aria-label="Siimpl home"
              className="mx-auto block h-[1.125rem] w-[4.725rem] bg-black"
              style={{
                WebkitMaskImage: 'url("/Recurso-3.svg")',
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskImage: 'url("/Recurso-3.svg")',
                maskPosition: "center",
                maskRepeat: "no-repeat",
                maskSize: "contain",
              }}
            />

            <form className="mt-10 w-full">
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">
                  Welcome back
                </h1>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-neutral-600">
                  Use the email connected to your Siimpl client profile.
                </p>
              </div>

              <label className="block text-sm font-medium text-neutral-950">
                Email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="mt-2 h-12 w-full rounded-full border border-neutral-200 bg-white px-5 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
                  placeholder="you@company.com"
                />
              </label>

              <label className="mt-5 block text-sm font-medium text-neutral-950">
                Password
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="mt-2 h-12 w-full rounded-full border border-neutral-200 bg-white px-5 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
                  placeholder="Password"
                />
              </label>

              <div className="mt-4 flex justify-end">
                <Link
                  href="/#contact"
                  className="text-sm font-medium text-neutral-950 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-current"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="button"
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Sign in
              </button>

              <p className="mt-6 text-center text-sm leading-6 text-neutral-600">
                Need access?{" "}
                <Link
                  href="/#contact"
                  className="font-medium text-neutral-950 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-current"
                >
                  Book a consultation
                </Link>
              </p>
            </form>
          </div>
        </section>

        <p className="text-center text-xs leading-5 text-neutral-500">
          © {currentYear} Siimpl. All rights reserved.
        </p>
      </div>
    </main>
  );
}
