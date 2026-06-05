import Link from "next/link";
import { acceptClientInvite } from "@/lib/portal-actions";

export default async function ClientInvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  await params;

  return (
    <main className="flex min-h-dvh bg-neutral-100 px-6 py-8 text-neutral-950">
      <section className="m-auto w-full max-w-[24rem]">
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
        <form action={acceptClientInvite} className="mt-10 text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">Northstar Studio Inc.</h1>
          <button className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
            Accept invite
          </button>
        </form>
      </section>
    </main>
  );
}
