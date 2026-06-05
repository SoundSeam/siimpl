"use client";

import Image from "next/image";
import type { FormEvent, MouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import Flicking, {
  type ChangedEvent,
  ViewportSlot,
  type WillChangeEvent,
} from "@egjs/react-flicking";
import { AutoPlay, Pagination, Perspective } from "@egjs/flicking-plugins";
import {
  FaCalculator,
  FaChartLine,
  FaFileInvoiceDollar,
  FaArrowRight,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import BookedCallPrompt from "@/components/app/BookedCallPrompt";

const easeOut = [0.22, 1, 0.36, 1] as const;
const contentWidthClass = "mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12";
const sectionScrollDuration = 900;
const sectionScrollGap = 16;
const heroBackgroundImage =
  "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/89648983-dc60-4fdc-beb1-c15fb736b3b2.png";
const painCarouselImageVersion = "2026-06-05";
const painCarouselImageSrc = (src: string) =>
  `${src}?v=${painCarouselImageVersion}`;

const staggerGroupVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const blurItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "0.55em",
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: easeOut,
    },
  },
};

type AnimatedWordsProps = {
  as?: "h1" | "p" | "span";
  className: string;
  stagger?: number;
  text: string;
};

function AnimatedWords({
  as = "p",
  className,
  stagger = 0.06,
  text,
}: AnimatedWordsProps) {
  const words = text.trim().split(/\s+/);

  const Component =
    as === "h1" ? motion.h1 : as === "span" ? motion.span : motion.p;

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className={`${index === words.length - 1 ? "" : "mr-[0.28em]"} inline-block will-change-transform`}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}

const serviceItems = [
  {
    name: "Accounting & Bookkeeping",
    slug: "bookkeeping",
    description:
      "Current numbers that reveal profit, gaps, and what needs attention.",
    icon: <FaCalculator aria-hidden="true" className="h-5 w-5" />,
    imageSrc:
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplService_5.png",
  },
  {
    name: "Tax Planning & Compliance",
    slug: "tax",
    description:
      "Planned tax deadlines and fewer surprise bills disrupting cash flow.",
    icon: <FaFileInvoiceDollar aria-hidden="true" className="h-5 w-5" />,
    imageSrc:
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplService_2.png",
  },
  {
    name: "Payroll Services",
    slug: "payroll",
    description:
      "Accurate payroll, on-time remittances, and fewer pay-period risks.",
    icon: <FaMoneyCheckAlt aria-hidden="true" className="h-5 w-5" />,
    imageSrc:
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplService_6.png",
  },
  {
    name: "Business Advisory",
    slug: "advisory",
    description:
      "Clear financial insight before you hire, invest, finance, or expand.",
    icon: <FaChartLine aria-hidden="true" className="h-5 w-5" />,
    imageSrc:
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplService_3.png",
  },
] as const;

const serviceCarouselItems = [
  ...serviceItems,
  ...serviceItems,
  ...serviceItems,
] as const;

const problemItems = [
  {
    service: "Bookkeeping",
    title: "Stop running the business on late books.",
    imageSrc: painCarouselImageSrc(
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplPains_11.png",
    ),
  },
  {
    service: "Tax",
    title: "No more surprise tax bills at the worst time.",
    imageSrc: painCarouselImageSrc(
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplPains_8.png",
    ),
  },
  {
    service: "Payroll",
    title: "Payroll should not feel like a weekly risk.",
    imageSrc: painCarouselImageSrc(
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplPains_3.png",
    ),
  },
  {
    service: "Cash",
    title: "Know cash flow before it becomes a problem.",
    imageSrc: painCarouselImageSrc(
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplPains_12.png",
    ),
  },
  {
    service: "Admin",
    title: "End the receipt chase and document back-and-forth.",
    imageSrc: painCarouselImageSrc(
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplPains_5.png",
    ),
  },
  {
    service: "Advisory",
    title: "Make big decisions with numbers you can trust.",
    imageSrc: painCarouselImageSrc(
      "https://soundseam-origin.s3.us-east-2.amazonaws.com/misc/SiimplPains_10.png",
    ),
  },
] as const;

function getCircularDistance(index: number, activeIndex: number, total: number) {
  const directDistance = Math.abs(index - activeIndex);

  return Math.min(directDistance, total - directDistance);
}

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function easeOutQuint(progress: number) {
  return 1 - Math.pow(1 - progress, 5);
}

const whyItems = [
  {
    title: "Based in Quebec",
    description:
      "Serving businesses across Canada with clear guidance from an experienced local team.",
  },
  {
    title: "Clear answers, not accounting fog",
    description:
      "We explain what matters, what is due, and what decisions need attention in plain business language.",
  },
  {
    title: "Built for modern owners",
    description:
      "Your accounting process should feel organized, responsive, and easy to follow, without endless email chains.",
  },
  {
    title: "Advice before the pressure point",
    description:
      "Good accounting is not only year-end work. We help you look ahead so taxes, payroll, and cash flow do not become last-minute problems.",
  },
] as const;

const featuredWhyItems = whyItems.filter(
  (item) => item.title !== "Built for modern owners",
);

const whyItemIconPaths = [
  [
    "M10 3v14",
    "M3 10h14",
    "m5.75 5.75 8.5 8.5",
    "m14.25 5.75-8.5 8.5",
  ],
  ["M10 3 17 10 10 17 3 10 10 3Z", "M10 7v6", "M7 10h6"],
  ["M10 3c3.25 0 7 3.75 7 7s-3.75 7-7 7-7-3.75-7-7 3.75-7 7-7Z", "M6 10h8", "m10 6 4 4-4 4"],
] as const;

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

const faqItems = [
  {
    question: "Who does Siimpl work with?",
    answer:
      "We work with small and growing businesses in Quebec, including owners in Montreal, Brossard, and surrounding areas. If you need accounting, tax, payroll, or financial guidance for an active business, a consultation is the best place to start.",
  },
  {
    question: "Can you help if my bookkeeping is behind?",
    answer:
      "Yes. We can review where things stand, identify what is missing, and create a practical catch-up plan. The goal is to get your records accurate, current, and easier to maintain going forward.",
  },
  {
    question: "Do you handle both tax planning and tax filing?",
    answer:
      "Yes. We support compliance filings and help you plan ahead so tax decisions are not left until the last minute. We focus on clear, compliant planning that fits your business situation.",
  },
  {
    question: "Can Siimpl manage payroll for my business?",
    answer:
      "Yes. We can support payroll setup, regular payroll processing, source deductions, remittances, and year-end slips. We also help owners understand payroll obligations before they become stressful.",
  },
  {
    question: "What should I bring to the consultation?",
    answer:
      "Bring the basics: your business structure, current accounting system if you use one, recent financial statements if available, payroll details if relevant, and the main questions you want answered.",
  },
  {
    question: "Is the first step always a consultation?",
    answer:
      "Yes. A short consultation helps us understand your business, confirm whether we are the right fit, and recommend the accounting, tax, payroll, or advisory support that makes sense.",
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
      { label: "Why Siimpl", href: "#why-siimpl" },
      { label: "FAQ", href: "#faqs" },
      { label: "Contact", href: "#contact" },
      { label: "Book a Consultation", href: "#contact" },
    ],
  },
] as const;

type FooterContactDetail = {
  readonly label: string;
  readonly value: string;
  readonly href?: string;
};

const footerContactDetails: readonly FooterContactDetail[] = [
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

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [activeProblem, setActiveProblem] = useState(0);
  const headerBaseRef = useRef<HTMLDivElement | null>(null);
  const scrollAnimationFrameRef = useRef<number | null>(null);
  const serviceCarouselRef = useRef<Flicking | null>(null);
  const problemCarouselPlugins = useMemo(
    () => [
      new Perspective({
        perspective: 1400,
        rotate: 0,
        scale: 0.67,
        selector: ".problem-card",
      }),
      new AutoPlay({
        animationDuration: 1200,
        duration: 2700,
        stopOnHover: false,
      }),
      new Pagination({
        renderBullet: (className, index) =>
          `<button type="button" class="${className}" aria-label="Go to problem ${index + 1}"></button>`,
        selector: ".problem-flicking-pagination",
      }),
    ],
    [],
  );

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      if (scrollAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      }

      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollServicesBy = (direction: -1 | 1) => {
    const carousel = serviceCarouselRef.current;

    if (!carousel || carousel.animating) {
      return;
    }

    void (direction === -1 ? carousel.prev(650) : carousel.next(650)).catch(
      () => undefined,
    );
  };

  const focusServiceCarousel = (serviceIndex: number) => {
    const carousel = serviceCarouselRef.current;

    if (!carousel) {
      return;
    }

    void carousel
      .moveTo(serviceItems.length + serviceIndex, 650)
      .catch(() => undefined);
  };

  const visibleFaqItems = showAllFaqs ? faqItems : faqItems.slice(0, 3);

  const scrollToSection = (targetHash: string) => {
    const targetId = targetHash.replace(/^#/, "");
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    if (scrollAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      scrollAnimationFrameRef.current = null;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const headerHeight =
      headerBaseRef.current?.getBoundingClientRect().height ?? 72;
    const startY = window.scrollY;
    const targetY = Math.max(
      target.getBoundingClientRect().top +
        startY -
        headerHeight -
        sectionScrollGap,
      0,
    );

    if (reducedMotion) {
      window.scrollTo({ top: targetY, behavior: "auto" });
      return;
    }

    const distance = targetY - startY;
    const startTime = window.performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / sectionScrollDuration, 1);

      window.scrollTo(0, startY + distance * easeInOutCubic(progress));

      if (progress < 1) {
        scrollAnimationFrameRef.current =
          window.requestAnimationFrame(animateScroll);
        return;
      }

      scrollAnimationFrameRef.current = null;
      target.focus({ preventScroll: true });
    };

    scrollAnimationFrameRef.current = window.requestAnimationFrame(animateScroll);
  };

  const handleSectionLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    targetHash: string,
    serviceIndex?: number,
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    const targetId = targetHash.replace(/^#/, "");

    if (!document.getElementById(targetId)) {
      return;
    }

    event.preventDefault();
    setServicesOpen(false);

    if (window.location.hash === targetHash) {
      window.history.replaceState(null, "", targetHash);
    } else {
      window.history.pushState(null, "", targetHash);
    }

    scrollToSection(targetHash);

    if (typeof serviceIndex === "number") {
      focusServiceCarousel(serviceIndex);
    }
  };

  const getSectionLinkProps = (href: string, serviceIndex?: number) => ({
    href,
    onClick: (event: MouseEvent<HTMLAnchorElement>) =>
      handleSectionLinkClick(event, href, serviceIndex),
  });

  const handleMessageInput = (event: FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || 24;
    const paddingHeight =
      Number.parseFloat(computedStyle.paddingTop) +
      Number.parseFloat(computedStyle.paddingBottom);
    const borderHeight =
      Number.parseFloat(computedStyle.borderTopWidth) +
      Number.parseFloat(computedStyle.borderBottomWidth);
    const maxHeight = lineHeight * 4 + paddingHeight + borderHeight;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  return (
    <motion.main
      className="bg-white text-neutral-950"
      initial="hidden"
      animate="visible"
      variants={staggerGroupVariants}
    >
      <header className="fixed inset-x-0 top-0 z-20 overflow-visible">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-[3.75rem] border-b border-neutral-200/70 bg-white/50 backdrop-blur-md transition-opacity duration-300 sm:h-[4.25rem] lg:h-[4.5rem] ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <motion.div
          ref={headerBaseRef}
          className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 sm:px-8 sm:py-3.5 lg:px-12 lg:py-4"
          variants={staggerGroupVariants}
        >
          <div className="flex items-center gap-5 lg:gap-7">
            <motion.span
              aria-label="Siimpl logo"
              role="img"
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
              variants={blurItemVariants}
            />
            <motion.nav
              className="hidden items-center gap-1 md:flex sm:gap-2"
              variants={staggerGroupVariants}
            >
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <motion.button
                  type="button"
                  aria-expanded={servicesOpen}
                  className="inline-flex h-8 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-black transition-colors duration-200 hover:bg-black/10"
                  onClick={() => setServicesOpen((open) => !open)}
                  variants={blurItemVariants}
                >
                  <AnimatedWords
                    as="span"
                    className="inline-flex"
                    stagger={0.04}
                    text="Services"
                  />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 8 5 5 5-5" />
                  </svg>
                </motion.button>
                <div
                  className={`absolute left-1/2 top-full w-[24rem] -translate-x-1/2 pt-2 transition-all duration-200 ${
                    servicesOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="services-dropdown-surface flex flex-col rounded-3xl p-3 shadow-lg shadow-black/5">
                    {serviceItems.map((item) => (
                      <a
                        key={item.name}
                        href={`/${item.slug}`}
                        className="group flex items-start gap-4 rounded-2xl p-3 text-black transition-colors duration-200 hover:bg-black/5"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f5f2f0] text-black transition-colors duration-200 group-hover:bg-black group-hover:text-white">
                          {item.icon}
                        </div>
                        <div className="flex min-h-11 flex-col justify-center text-left">
                          <span className="text-sm font-semibold text-black">
                            {item.name}
                          </span>
                          <span className="mt-1 text-xs font-light leading-5 text-black">
                            {item.description}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <motion.a
                {...getSectionLinkProps("#why-siimpl")}
                className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
                variants={blurItemVariants}
              >
                <AnimatedWords
                  as="span"
                  className="inline-flex"
                  stagger={0.04}
                  text="Why Siimpl"
                />
              </motion.a>
              <motion.a
                {...getSectionLinkProps("#contact")}
                className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
                variants={blurItemVariants}
              >
                <AnimatedWords
                  as="span"
                  className="inline-flex"
                  stagger={0.04}
                  text="Contact"
                />
              </motion.a>
            </motion.nav>
          </div>
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            variants={staggerGroupVariants}
          >
            <nav className="flex items-center gap-1 md:hidden sm:gap-2">
              <button
                type="button"
                aria-expanded={servicesOpen}
                className="inline-flex h-8 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
                onClick={() => setServicesOpen((open) => !open)}
              >
                <AnimatedWords
                  as="span"
                  className="inline-flex"
                  stagger={0.04}
                  text="Services"
                />
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 8 5 5 5-5" />
                </svg>
              </button>
              <a
                {...getSectionLinkProps("#why-siimpl")}
                className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
              >
                <AnimatedWords
                  as="span"
                  className="inline-flex"
                  stagger={0.04}
                  text="Why Siimpl"
                />
              </a>
              <a
                {...getSectionLinkProps("#contact")}
                className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
              >
                <AnimatedWords
                  as="span"
                  className="inline-flex"
                  stagger={0.04}
                  text="Contact"
                />
              </a>
            </nav>
            <motion.a
              href="/sign-in"
              className="hidden h-9 items-center justify-center rounded-full px-5 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10 sm:inline-flex sm:h-10 sm:px-6 sm:text-base"
              variants={blurItemVariants}
            >
              <AnimatedWords
                as="span"
                className="inline-flex"
                stagger={0.04}
                text="Sign in"
              />
            </motion.a>
            <motion.a
              {...getSectionLinkProps("#contact")}
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:h-10 sm:px-6 sm:text-base"
              variants={blurItemVariants}
            >
              <AnimatedWords
                as="span"
                className="inline-flex"
                stagger={0.04}
                text="Book a Consultation"
              />
            </motion.a>
          </motion.div>
        </motion.div>
        <div
          className={`mx-auto w-full max-w-7xl px-6 md:hidden sm:px-8 lg:px-12 ${
            servicesOpen ? "pb-4" : "pb-0"
          }`}
        >
          <div
            className={`overflow-hidden transition-all duration-200 ${
              servicesOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="services-dropdown-surface flex flex-col rounded-3xl p-3 shadow-lg shadow-black/5">
              {serviceItems.map((item) => (
                <a
                  key={item.name}
                  href={`/${item.slug}`}
                  className="group flex items-start gap-4 rounded-2xl p-3 text-black transition-colors duration-200 hover:bg-black/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f5f2f0] text-black transition-colors duration-200 group-hover:bg-black group-hover:text-white">
                    {item.icon}
                  </div>
                  <div className="flex min-h-11 flex-col justify-center text-left">
                    <span className="text-sm font-semibold text-black">
                      {item.name}
                    </span>
                    <span className="mt-1 text-xs font-light leading-5 text-black">
                      {item.description}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
      <motion.section
        className="relative min-h-screen overflow-hidden bg-neutral-100"
        variants={blurItemVariants}
      >
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-full overflow-hidden sm:w-[82%] lg:w-[68%] xl:w-[64%]"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 24%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 24%, black 100%)",
          }}
        >
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${heroBackgroundImage}")`,
            }}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.96)_48%,rgba(255,255,255,0.78)_64%,rgba(255,255,255,0.34)_84%,rgba(255,255,255,0.14)_100%)]"
        />
        <motion.div
          className="relative z-10 flex min-h-screen flex-col"
          variants={staggerGroupVariants}
        >
          <div className="flex flex-1 items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-6 sm:px-8 sm:pb-8 lg:px-12 lg:pb-12">
              <motion.div
                className="flex max-w-4xl flex-col items-start text-left"
                variants={staggerGroupVariants}
              >
                <AnimatedWords
                  as="p"
                  className="mb-4 text-sm font-medium uppercase text-black/50"
                  stagger={0.08}
                  text="Based in Quebec, serving businesses across Canada"
                />
                <AnimatedWords
                  as="h1"
                  className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl"
                  stagger={0.045}
                  text="Simplify your finances. Strengthen your business."
                />
                <AnimatedWords
                  as="p"
                  className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl"
                  stagger={0.02}
                  text="Siimpl helps business owners manage accounting, tax planning, bookkeeping, payroll, and financial decisions with clear guidance from an experienced local team."
                />
                <motion.div
                  className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
                  variants={staggerGroupVariants}
                >
                  <motion.a
                    {...getSectionLinkProps("#contact")}
                    className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-lg font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:h-16 sm:px-10 sm:text-xl"
                    variants={blurItemVariants}
                  >
                    <AnimatedWords
                      as="span"
                      className="inline-flex"
                      stagger={0.04}
                      text="Book a Consultation"
                    />
                  </motion.a>
                  <motion.a
                    {...getSectionLinkProps("#services")}
                    className="inline-flex h-14 items-center justify-center px-8 text-lg font-medium text-neutral-950 underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:text-primary hover:decoration-current sm:h-16 sm:px-10 sm:text-xl"
                    variants={blurItemVariants}
                  >
                    <AnimatedWords
                      as="span"
                      className="inline-flex"
                      stagger={0.04}
                      text="View Services"
                    />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
      <section className="overflow-hidden bg-white py-20 sm:py-24">
        <div className={`${contentWidthClass} text-center`}>
          <div className="mx-auto flex max-w-4xl flex-col items-center">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-4xl lg:text-5xl">
              We know the pain of running a business with messy numbers.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">
              Late books, payroll mistakes, tax surprises, and cash gaps do
              not stay in the accounting file. They show up as missed
              deadlines, tense payroll weeks, and nights spent wondering what
              is coming next. What would change if the financial pressure
              finally stopped stealing your focus?
            </p>
            <a
              {...getSectionLinkProps("#contact")}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:h-14 sm:px-8 sm:text-base"
            >
              See how Siimpl helps your business
            </a>
          </div>
        </div>
        <Flicking
          align="center"
          circular
          className="problem-flicking relative left-1/2 mt-14 w-screen -translate-x-1/2 pb-12"
          horizontal
          moveType="snap"
          easing={easeOutQuint}
          onChanged={(event: ChangedEvent) => setActiveProblem(event.index)}
          onWillChange={(event: WillChangeEvent) =>
            setActiveProblem(event.index)
          }
          panelsPerView={-1}
          plugins={problemCarouselPlugins}
          duration={650}
        >
          {problemItems.map((item, index) => {
            const textDistance = getCircularDistance(
              index,
              activeProblem,
              problemItems.length,
            );
            const textStateClass =
              textDistance === 0
                ? "text-black opacity-100"
                : textDistance === 1
                  ? "text-black/50 opacity-100"
                  : "text-black/50 opacity-0";

            return (
              <div
                key={item.title}
                className="problem-panel w-[76vw] max-w-[22rem] px-1 sm:w-[21rem] sm:px-1.5 md:w-[23rem] lg:w-[25rem]"
              >
                <div className="problem-card relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-neutral-100">
                  <Image
                    src={item.imageSrc}
                    alt={`${String(index + 1).padStart(2, "0")} - ${item.title}`}
                    fill
                    sizes="(min-width: 1024px) 25rem, (min-width: 768px) 23rem, (min-width: 640px) 21rem, 76vw"
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-x-0 top-0 flex flex-col items-start p-6 text-left transition-[color,opacity] duration-[650ms] ease-out sm:p-7 ${textStateClass}`}
                  >
                    <h3 className="text-2xl font-medium tracking-[-0.03em] text-current sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
          <ViewportSlot>
            <div className="problem-flicking-pagination flicking-pagination" />
          </ViewportSlot>
        </Flicking>
      </section>
      <section id="services" className="overflow-x-clip py-20">
        <div className={contentWidthClass}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-4xl lg:text-5xl">
              Feel the weight lift from your business.
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              With Siimpl, your books get cleaned up, your deadlines become
              visible, and your financial pressure turns into a clear plan you
              can finally trust.
            </p>
          </div>
        </div>
        <Flicking
          ref={serviceCarouselRef}
          align="center"
          circular
          defaultIndex={serviceItems.length}
          className="service-flicking relative left-1/2 mt-12 w-screen -translate-x-1/2"
          horizontal
          moveType="snap"
          inputType={[]}
          panelsPerView={-1}
          duration={650}
          aria-live="polite"
        >
          {serviceCarouselItems.map((item, index) => (
            <a
              key={`${item.name}-${index}`}
              href={`/${item.slug}`}
              className="service-panel group flex w-[82vw] max-w-[30rem] px-6 sm:w-[30rem]"
            >
              <div className="flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-[#f5f2f0]">
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 30rem, 82vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col px-7 py-5 sm:px-9 sm:py-6">
                  <h3 className="text-2xl font-medium tracking-[-0.03em] text-neutral-950">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm font-normal leading-5 text-neutral-600">
                    {item.description}
                  </p>
                  <span className="mt-auto flex justify-end pt-7">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 underline decoration-transparent underline-offset-4 transition-colors group-hover:text-neutral-950 group-hover:decoration-neutral-950">
                      Learn more
                      <FaArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </Flicking>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous service"
            onClick={() => scrollServicesBy(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-950 transition-colors hover:border-neutral-950"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 12 3 8l4-4" />
              <path d="M3 8h10" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next service"
            onClick={() => scrollServicesBy(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-950 transition-colors hover:border-neutral-950"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 4 4 4-4 4" />
              <path d="M13 8H3" />
            </svg>
          </button>
        </div>
      </section>
      <section
        id="why-siimpl"
        className="relative overflow-hidden bg-[#f5f2f0] pb-10 pt-14 text-neutral-950 sm:pb-12 sm:pt-16"
      >
        <div className={`${contentWidthClass} relative z-10`}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-black sm:text-4xl lg:text-5xl">
              Guidance that keeps owners ahead.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-10">
            {featuredWhyItems.map((item, index) => (
              <article key={item.title} className="min-w-0 px-6">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="mb-4 h-7.5 w-7.5 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {whyItemIconPaths[index].map((path) => (
                    <path key={path} d={path} />
                  ))}
                </svg>
                <h3 className="text-base font-medium leading-6 text-black sm:text-lg sm:leading-7">
                  {item.title}
                </h3>
                <p className="mt-3 text-base font-normal leading-6 text-black/62 sm:text-lg sm:leading-7">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <a
              {...getSectionLinkProps("#contact")}
              className="inline-flex h-14 items-center justify-center rounded-full bg-neutral-950 px-8 text-base font-medium text-white transition-colors duration-200 hover:bg-neutral-800"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </section>
      <section className="bg-white py-20 sm:py-24">
        <div className={contentWidthClass}>
          <div className="max-w-3xl pl-6">
            <p className="text-sm font-medium uppercase text-black/50">
              Getting started with Siimpl
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-4xl lg:text-5xl">
              How it works
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              Fill out your business details in minutes. Siimpl will review
              your current setup, recommend the right accounting, tax, payroll,
              and advisory support, and build a clear plan to keep your numbers
              organized.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.5rem] last:pr-6"
              >
                <span className="ml-[1.5625rem] inline-flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#f5f2f0] text-lg font-semibold text-black/50">
                  {item.step}
                </span>
                <h3 className="mt-6 border-l border-primary pl-6 text-xl font-semibold tracking-[-0.03em] text-neutral-950">
                  {item.title}
                </h3>
                <p className="ml-[1.5625rem] mt-4 text-base leading-7 text-neutral-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="bg-primary py-20 text-primary-foreground sm:py-24"
      >
        <div className={contentWidthClass}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20 xl:gap-28">
            <aside className="max-w-xl text-left">
              <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Book a consultation with{" "}
                <span className="relative ml-2 inline-flex -translate-y-[calc(0.08em-1px)] align-middle">
                  <span
                    aria-label="Siimpl"
                    role="img"
                    className="block h-[0.7em] w-[2.95em] bg-black"
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
                </span>
              </h2>
              <p className="mt-6 text-base leading-7 text-primary-foreground sm:text-lg">
                Tell us what feels unclear, late, or harder than it should be.
                We will review your situation and recommend the next practical
                step.
              </p>
            </aside>
            <aside>
              <form className="grid gap-6 text-primary-foreground sm:grid-cols-2">
                <div className="flex flex-col text-sm font-medium text-primary-foreground">
                  <input
                    type="text"
                    name="firstName"
                    aria-label="First name"
                    className="w-full rounded-none border-b border-primary-foreground bg-transparent px-0 py-3 text-base text-primary-foreground outline-none placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                    placeholder="First name"
                  />
                </div>
                <div className="flex flex-col text-sm font-medium text-primary-foreground">
                  <input
                    type="text"
                    name="lastName"
                    aria-label="Last name"
                    className="w-full rounded-none border-b border-primary-foreground bg-transparent px-0 py-3 text-base text-primary-foreground outline-none placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                    placeholder="Last name"
                  />
                </div>
                <div className="flex flex-col text-sm font-medium text-primary-foreground">
                  <input
                    type="text"
                    name="company"
                    aria-label="Company"
                    className="w-full rounded-none border-b border-primary-foreground bg-transparent px-0 py-3 text-base text-primary-foreground outline-none placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                    placeholder="Company"
                  />
                </div>
                <div className="flex flex-col text-sm font-medium text-primary-foreground">
                  <input
                    type="email"
                    name="email"
                    aria-label="Email"
                    className="w-full rounded-none border-b border-primary-foreground bg-transparent px-0 py-3 text-base text-primary-foreground outline-none placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col text-sm font-medium text-primary-foreground sm:col-span-2">
                  <textarea
                    name="message"
                    rows={1}
                    onInput={handleMessageInput}
                    aria-label="Message"
                    className="w-full resize-none rounded-none border-b border-primary-foreground bg-transparent px-0 py-3 text-base leading-6 text-primary-foreground outline-none placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                    placeholder="What would you like to solve?"
                  />
                </div>
                <div className="mt-4 sm:col-span-2 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-800"
                  >
                    Book a Consultation
                  </button>
                </div>
              </form>
            </aside>
          </div>
        </div>
      </section>
      <section
        id="faqs"
        className="bg-white py-20 sm:py-24"
      >
        <div
          className={`${contentWidthClass} grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]`}
        >
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-4xl lg:text-5xl">
                Questions owners ask before booking
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-neutral-600 sm:text-lg">
                Short answers about fit, process, and what to expect when you
                start working with Siimpl.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {visibleFaqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <article
                  key={item.question}
                  className="rounded-[1.5rem] bg-[#f5f2f0] transition-colors duration-200"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span className="pr-4 text-lg font-medium leading-7 text-neutral-950 sm:text-xl">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                        isOpen
                          ? "bg-neutral-950 text-white"
                          : "bg-white text-neutral-950"
                      }`}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 3v10" />
                        <path d="M3 8h10" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-base leading-7 text-neutral-600 sm:px-6 sm:pb-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
            {!showAllFaqs && faqItems.length > 3 ? (
              <button
                type="button"
                className="inline-flex w-fit items-center gap-2 self-start px-2 py-1 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-neutral-950"
                onClick={() => setShowAllFaqs(true)}
              >
                <span>View more FAQs</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </button>
            ) : null}
            <div className="rounded-[1.75rem] bg-[#f5f2f0] p-6 sm:p-7">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">
                Not sure what you need?
              </h3>
              <p className="mt-3 max-w-md text-base leading-7 text-neutral-600">
                Start with a consultation. We will help you identify the right
                accounting, tax, payroll, or advisory support for your business.
              </p>
              <a
                {...getSectionLinkProps("#contact")}
                className="mt-6 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-neutral-950 pl-3 pr-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-800"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-neutral-950">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 14 14"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 11 11 3" />
                    <path d="M4 3h7v7" />
                  </svg>
                </span>
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
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
                      {item.href ? (
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
                            {...getSectionLinkProps(link.href)}
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
    </motion.main>
  );
}
