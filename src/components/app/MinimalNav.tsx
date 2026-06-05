"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiBriefcase,
  FiCheckSquare,
  FiClock,
  FiFileText,
  FiFolder,
  FiHome,
  FiMessageSquare,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

const iconMap = {
  activity: FiActivity,
  briefcase: FiBriefcase,
  check: FiCheckSquare,
  clock: FiClock,
  file: FiFileText,
  folder: FiFolder,
  home: FiHome,
  message: FiMessageSquare,
  settings: FiSettings,
  users: FiUsers,
} satisfies Record<string, IconType>;

type MinimalNavIcon = keyof typeof iconMap;

export type MinimalNavLink = {
  href: string;
  label: string;
  icon: MinimalNavIcon;
};

export default function MinimalNav({
  links,
  orientation = "horizontal",
}: {
  links: readonly MinimalNavLink[];
  orientation?: "horizontal" | "vertical";
}) {
  const pathname = usePathname();
  const vertical = orientation === "vertical";

  return (
    <nav
      aria-label="Primary"
      className={vertical ? "mt-10" : "-mx-1 overflow-x-auto"}
    >
      <div
        className={
          vertical
            ? "flex flex-col gap-1"
            : "flex min-w-max items-center gap-1 px-1"
        }
      >
        {links.map((link) => {
          const Icon = iconMap[link.icon];
          const active =
            link.href === "/portal" || link.href === "/admin"
              ? pathname === link.href
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-neutral-100 text-neutral-950"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
