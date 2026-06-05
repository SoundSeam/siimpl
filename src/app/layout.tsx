import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siimpl | Accounting, Tax, Payroll & Advisory in Quebec",
  description:
    "Modern accounting, tax planning, bookkeeping, payroll, and advisory support for Quebec businesses that want clarity, compliance, and growth support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Akt:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
