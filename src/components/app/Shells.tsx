import type { ComponentProps, ReactNode } from "react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "@/lib/portal-actions";
import MinimalNav from "./MinimalNav";

const portalLinks = [
  { href: "/portal", label: "Home", icon: "home" },
  { href: "/portal/files", label: "Files", icon: "folder" },
  { href: "/portal/messages", label: "Messages", icon: "message" },
  { href: "/portal/activity", label: "Activity", icon: "activity" },
  { href: "/portal/settings", label: "Settings", icon: "settings" },
] as const;

const adminLinks = [
  { href: "/admin", label: "Home", icon: "home" },
  { href: "/admin/clients", label: "Clients", icon: "briefcase" },
  { href: "/admin/deadlines", label: "Deadlines", icon: "clock" },
  { href: "/admin/files", label: "Files", icon: "check" },
  { href: "/admin/messages", label: "Messages", icon: "message" },
  { href: "/admin/audit", label: "Audit", icon: "file" },
  { href: "/admin/admins", label: "Admins", icon: "users" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
] as const;

function Logo() {
  return (
    <div
      aria-label="Siimpl"
      role="img"
      className="block h-[1.125rem] w-[4.725rem] bg-black"
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
  );
}

function AppShell({
  children,
  links,
}: {
  children: ReactNode;
  links: ComponentProps<typeof MinimalNav>["links"];
}) {
  return (
    <main className="min-h-dvh bg-neutral-100 text-neutral-950">
      <div className="flex min-h-dvh w-full flex-col lg:grid lg:grid-cols-[14rem_minmax(0,1fr)]">
        <header className="flex flex-col gap-5 border-b border-neutral-200 px-5 py-5 sm:px-8 sm:py-7 lg:hidden">
          <div className="flex items-center justify-between gap-5">
            <Logo />
            <form action={signOut}>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950">
                <FiLogOut aria-hidden="true" className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
          <MinimalNav links={links} />
        </header>

        <aside className="sticky top-0 hidden h-dvh flex-col border-r border-neutral-200 bg-white px-7 py-8 lg:flex">
          <div>
            <Logo />
          </div>
          <MinimalNav links={links} orientation="vertical" />
          <form action={signOut} className="mt-auto">
            <button className="inline-flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950">
              <FiLogOut aria-hidden="true" className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </aside>

        <div className="min-w-0 flex-1 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-10">
          {children}
        </div>
      </div>
    </main>
  );
}

export function PortalShell({ children }: { children: ReactNode }) {
  return <AppShell links={portalLinks}>{children}</AppShell>;
}

export function AdminShell({ children }: { children: ReactNode }) {
  return <AppShell links={adminLinks}>{children}</AppShell>;
}
