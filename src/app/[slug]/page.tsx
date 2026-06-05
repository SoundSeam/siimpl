import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookedCallPrompt from "@/components/app/BookedCallPrompt";
import CurrentDateLabel from "./CurrentDateLabel";
import ServicePageClient from "./ServicePageClient";

const contentWidthClass = "mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function getCurrentDateLabel() {
  const date = new Date();

  return {
    dateTime: date.toISOString().slice(0, 10),
    label: dateFormatter.format(date),
  };
}

const processSteps = [
  {
    step: "1",
    title: "Submit",
    description:
      "Tell Siimpl about your business, current accounting setup, deadlines, and goals, then book your consultation.",
  },
  {
    step: "2",
    title: "Review",
    description:
      "Siimpl reviews your records, identifies what is missing or overdue, and confirms the support you need.",
  },
  {
    step: "3",
    title: "Organize",
    description:
      "We clean up your books, organize recurring workflows, and keep filings, payroll, and tax deadlines on track.",
  },
  {
    step: "4",
    title: "Grow",
    description:
      "Use clear reports and ongoing guidance to manage cash flow, make decisions, and grow with confidence.",
  },
] as const;

const footerLinkGroups = [
  {
    title: "Services",
    links: [
      { label: "Accounting & Bookkeeping", href: "/bookkeeping" },
      { label: "Tax Planning & Compliance", href: "/tax" },
      { label: "Payroll Services", href: "/payroll" },
      { label: "Business Advisory", href: "/advisory" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Siimpl", href: "/#why-siimpl" },
      { label: "FAQ", href: "#faqs" },
      { label: "Contact", href: "#contact" },
      { label: "Book a Consultation", href: "#contact" },
    ],
  },
] as const;

const footerContactDetails = [
  {
    label: "Location",
    value: "6705 Bd Chevrier #105, Brossard, Quebec J4Z 3T9",
  },
  {
    label: "Phone",
    value: "1 (877) 905-2666",
    href: "tel:+18779052666",
  },
  {
    label: "Email",
    value: "info@siimpl.com",
    href: "mailto:info@siimpl.com",
  },
  {
    label: "Hours",
    value: "Monday to Friday\n9:00 AM - 5:00 PM",
  },
] as const;

const servicesBySlug = {
  bookkeeping: {
    meta: "Bookkeeping",
    title: "Accounting & Bookkeeping",
    subtitle: "Clean books, clear reports, and a calmer way to run the month.",
    imageSrc:
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplService_5.png",
    imageAlt: "Accounting and bookkeeping workspace with organized reports",
    body: [
      "Good bookkeeping gives owners a current view of the business instead of a cleanup project waiting at year end. Siimpl organizes transactions, reconciliations, reports, and recurring accounting routines so your numbers are easier to trust.",
      "The goal is simple: know what happened, what is outstanding, and what needs attention before it becomes urgent. We help turn receipts, statements, software, and owner questions into a clean monthly rhythm.",
      "That clarity supports better conversations about cash, tax, payroll, pricing, and growth. When the books are current, every other financial decision becomes easier to make.",
    ],
    ctaLabel: "Clean up my books",
    faqs: [
      {
        question: "Can Siimpl help if my books are behind?",
        answer:
          "Yes. We review what is missing, prioritize the most urgent periods, and create a practical catch-up plan that gets the records current.",
      },
      {
        question: "Do you work with existing accounting software?",
        answer:
          "Yes. We can review your current setup, clean up the workflow where needed, and recommend changes only when they make the process easier.",
      },
      {
        question: "How often should bookkeeping be updated?",
        answer:
          "Most active businesses benefit from a monthly rhythm, with more frequent support when transaction volume, payroll, or reporting needs are higher.",
      },
      {
        question: "Will I receive reports I can understand?",
        answer:
          "Yes. We focus on reports that help owners see cash, profit, obligations, and decision points in clear business language.",
      },
    ],
  },
  tax: {
    meta: "Tax",
    title: "Tax Planning & Compliance",
    subtitle: "Keep filings on track and make tax decisions before deadlines.",
    imageSrc:
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplService_2.png",
    imageAlt: "Tax planning documents and financial notes",
    body: [
      "Tax work is easier when it is planned before the pressure arrives. Siimpl helps owners understand filing obligations, upcoming deadlines, and the choices that affect cash flow through the year.",
      "We support compliance while also looking ahead, so tax season is not the first time important questions get asked. The process is designed to reduce surprises and keep documentation organized.",
      "For growing businesses, that means fewer rushed decisions and a clearer view of what is due, what can be planned, and where the business may need advice before the next deadline.",
    ],
    ctaLabel: "Plan my taxes",
    faqs: [
      {
        question: "Do you handle both planning and filing?",
        answer:
          "Yes. We support compliance filings and planning conversations so tax decisions are not left until the last minute.",
      },
      {
        question: "Can you help with sales tax deadlines?",
        answer:
          "Yes. We help businesses track obligations, organize supporting information, and keep remittance deadlines visible.",
      },
      {
        question: "When should tax planning start?",
        answer:
          "Earlier is better. Planning before year end gives owners more room to make clear, compliant decisions.",
      },
      {
        question: "What documents should I prepare?",
        answer:
          "Bring current books, prior filings, notices, payroll details if relevant, and any questions about cash flow or upcoming obligations.",
      },
    ],
  },
  payroll: {
    meta: "Payroll",
    title: "Payroll Services",
    subtitle: "Accurate payroll, clean remittances, and fewer pay-period risks.",
    imageSrc:
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplService_6.png",
    imageAlt: "Payroll and payment records arranged on a desk",
    body: [
      "Payroll touches employees, cash flow, and government obligations at the same time. Siimpl helps keep each pay period organized so owners are not rebuilding the process from scratch every cycle.",
      "We support setup, processing, source deductions, remittances, and year-end slips with a focus on accuracy and timing. The right workflow makes payroll feel routine instead of risky.",
      "That consistency helps owners understand the real cost of hiring, keep obligations visible, and avoid payroll becoming a recurring distraction from the business.",
    ],
    ctaLabel: "Fix my payroll",
    faqs: [
      {
        question: "Can Siimpl set up payroll for a new employee?",
        answer:
          "Yes. We can help organize the setup, payroll schedule, required details, and recurring obligations.",
      },
      {
        question: "Do you support source deductions?",
        answer:
          "Yes. We help payroll deductions and remittances stay visible and aligned with the proper schedule.",
      },
      {
        question: "Can you help with year-end slips?",
        answer:
          "Yes. We support year-end payroll records and slips so reporting does not become a last-minute scramble.",
      },
      {
        question: "Is payroll support available for small teams?",
        answer:
          "Yes. Payroll support is often most valuable for small teams because mistakes can quickly create stress for owners and employees.",
      },
    ],
  },
  advisory: {
    meta: "Advisory",
    title: "Business Advisory",
    subtitle: "Use financial clarity before you hire, invest, finance, or grow.",
    imageSrc:
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplService_3.png",
    imageAlt: "Business advisory session reviewing financial charts",
    body: [
      "Business advisory starts with numbers that are current enough to guide decisions. Siimpl helps owners read what the financials are saying before committing to a hire, purchase, financing decision, or growth plan.",
      "The work is practical and direct: understand cash flow, margins, obligations, and what needs attention next. Clear advice gives owners a better way to compare options.",
      "When accounting is connected to decision-making, the business can move with more confidence. Advisory support helps turn financial reports into action, not just recordkeeping.",
    ],
    ctaLabel: "Get clear advice",
    faqs: [
      {
        question: "What kind of decisions can advisory support help with?",
        answer:
          "We can help owners think through hiring, financing, pricing, cash flow, expansion, and other decisions that depend on reliable numbers.",
      },
      {
        question: "Do I need clean books before advisory work starts?",
        answer:
          "Reliable records help. If the books need cleanup first, we will identify that and build the right sequence.",
      },
      {
        question: "Is advisory only for larger businesses?",
        answer:
          "No. Small and growing businesses often need advisory support when decisions start affecting cash, payroll, and tax obligations.",
      },
      {
        question: "How practical is the advice?",
        answer:
          "The focus is on clear next steps, tradeoffs, and what the numbers suggest for the business owner in front of us.",
      },
    ],
  },
} as const;

type ServiceSlug = keyof typeof servicesBySlug;

type PageProps = {
  readonly params: Promise<{
    readonly slug: string;
  }>;
};

function isServiceSlug(slug: string): slug is ServiceSlug {
  return Object.hasOwn(servicesBySlug, slug);
}

export function generateStaticParams() {
  return Object.keys(servicesBySlug).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isServiceSlug(slug)) {
    return {};
  }

  const service = servicesBySlug[slug];

  return {
    title: `${service.title} | Siimpl`,
    description: service.subtitle,
  };
}

export default async function ServiceArticlePage({ params }: PageProps) {
  const { slug } = await params;

  if (!isServiceSlug(slug)) {
    notFound();
  }

  const service = servicesBySlug[slug];
  const currentDate = getCurrentDateLabel();

  return (
    <main className="bg-white text-neutral-950">
      <header className="fixed inset-x-0 top-0 z-20 overflow-visible">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[3.75rem] border-b border-neutral-200/70 bg-white/50 backdrop-blur-md sm:h-[4.25rem] lg:h-[4.5rem]"
        />
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 sm:px-8 sm:py-3.5 lg:px-12 lg:py-4">
          <div className="flex items-center gap-5 lg:gap-7">
            <Link
              href="/"
              aria-label="Siimpl home"
              className="block h-6 w-[6.3rem] bg-black"
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
            <nav className="hidden items-center gap-1 md:flex sm:gap-2">
              <Link
                href="/#services"
                className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
              >
                Services
              </Link>
              <Link
                href="/#why-siimpl"
                className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
              >
                Why Siimpl
              </Link>
              <a
                href="#contact"
                className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="hidden h-9 items-center justify-center rounded-full px-5 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10 sm:inline-flex sm:h-10 sm:px-6 sm:text-base"
            >
              Home
            </Link>
            <a
              href="#contact"
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:h-10 sm:px-6 sm:text-base"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </header>
      <article className="pt-32 sm:pt-36 lg:pt-40">
        <div className={`${contentWidthClass} text-center`}>
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium sm:text-base">
              <CurrentDateLabel
                fallbackDateTime={currentDate.dateTime}
                fallbackLabel={currentDate.label}
              />
              <span className="text-black/50">{service.meta}</span>
              <span className="text-black/50">Service Guide</span>
            </div>
            <h1 className="mt-10 max-w-5xl text-5xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-6xl lg:text-7xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700 sm:text-xl">
              {service.subtitle}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-[1.5rem] bg-[#f5f2f0]">
            <div className="relative aspect-[16/9]">
              <Image
                src={service.imageSrc}
                alt={service.imageAlt}
                fill
                priority
                sizes="(min-width: 1280px) 64rem, (min-width: 768px) 82vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className={`${contentWidthClass} py-16 sm:py-20`}>
          <div className="mx-auto max-w-3xl text-left">
            <div className="space-y-7 text-lg leading-8 text-neutral-700">
              {service.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <a
                href="#contact"
                className="inline-flex h-16 items-center justify-center rounded-full bg-primary px-12 text-xl font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:h-18 sm:px-14 sm:text-2xl"
              >
                {service.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </article>
      <ServicePageClient processSteps={processSteps} faqItems={service.faqs} />
      <footer className="overflow-hidden bg-neutral-950 text-white">
        <div className={contentWidthClass}>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
            <div className="flex flex-col">
              <Image
                src="/Siimpl%20White%20Logo.png"
                alt="Siimpl white logo"
                width={512}
                height={122}
                className="h-auto w-full max-w-[17rem] sm:max-w-[22rem]"
              />
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
                Modern accounting, tax, payroll, and advisory support for
                Quebec businesses that want clarity, compliance, and stronger
                financial decisions.
              </p>
              <p className="mt-10 text-sm text-white/52 sm:mt-auto sm:pt-8">
                © 2026 Siimpl. All rights reserved.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-1">
                {footerContactDetails.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm font-semibold text-white/45">
                      {item.label}
                    </dt>
                    <dd className="mt-3 whitespace-pre-line text-base leading-7 text-white/78">
                      {"href" in item ? (
                        <a
                          href={item.href}
                          className="transition-colors duration-200 hover:text-white"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <nav className="grid gap-8 sm:grid-cols-2 md:grid-cols-1">
                {footerLinkGroups.map((group) => (
                  <div key={group.title}>
                    <p className="text-sm font-semibold text-white/45">
                      {group.title}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="text-base text-white/78 transition-colors duration-200 hover:text-white"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
      <BookedCallPrompt />
    </main>
  );
}
