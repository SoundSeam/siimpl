"use client";

import Image from "next/image";
import type { FormEvent, WheelEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import {
  FaBriefcase,
  FaCalculator,
  FaChartLine,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const easeOut = [0.22, 1, 0.36, 1] as const;
const contentWidthClass = "mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12";

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
    name: "Taxation",
    description:
      "Turn tax complexities into simple solutions to support business.",
    icon: <FaFileInvoiceDollar aria-hidden="true" className="h-5 w-5" />,
  },
  {
    name: "Accounting",
    description:
      "Ensure the financial health of your business with our accounting services.",
    icon: <FaCalculator aria-hidden="true" className="h-5 w-5" />,
  },
  {
    name: "Consulting",
    description: "Take advantage of our expertise with our consulting services.",
    icon: <FaChartLine aria-hidden="true" className="h-5 w-5" />,
  },
  {
    name: "Other Services",
    description:
      "Discover our other services designed to meet all your business needs.",
    icon: <FaBriefcase aria-hidden="true" className="h-5 w-5" />,
  },
] as const;

const faqItems = [
  {
    question: "What does your bookkeeping service include?",
    answer:
      "Our bookkeeping service includes the accurate and timely recording of all your company’s financial transactions, including sales, purchases, income and payments.",
  },
  {
    question: "How can your tax accounting service help me save money?",
    answer:
      "Our tax accounting service aims to minimize your tax burden while ensuring compliance with tax legislation. We examine your income and expenses to identify possible tax deductions and develop effective tax planning strategies.",
  },
  {
    question: "What types of management consulting do you offer?",
    answer:
      "Our management consulting services include business performance analysis, operational process improvement, growth strategy, and strategic decision-making support. We work with you to understand your specific industry challenges and develop customized solutions.",
  },
  {
    question: "What types of training do you offer for skills development?",
    answer:
      "We offer a range of bespoke training courses, including technical skills development, leadership, project management, and more. Our training courses are designed to help your team develop the skills they need to excel in their role.",
  },
  {
    question: "Can your tax compliance department help me prepare for a tax audit?",
    answer:
      "Yes, our tax compliance department can help you prepare for a tax audit. We’ll help you gather and organize all the necessary documents, and understand the audit process.",
  },
  {
    question: "What kind of IT consulting services do you offer?",
    answer:
      "Our IT consulting services include assistance in the selection and implementation of accounting business management systems and process optimization.",
  },
] as const;

const footerLinkGroups = [
  {
    title: "Services",
    links: [
      { label: "Taxation", href: "#services" },
      { label: "Accounting", href: "#services" },
      { label: "Consulting", href: "#services" },
      { label: "Other Services", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#faqs" },
      { label: "FAQs", href: "#faqs" },
      { label: "Contact", href: "#contact" },
      { label: "Book an appointment", href: "#contact" },
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
    label: "Opening Hours",
    value: "Monday - Friday:\n09:00 A.M - 17:00 P.M.",
  },
] as const;

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [trackOffset, setTrackOffset] = useState(0);
  const [maxTrackOffset, setMaxTrackOffset] = useState(0);
  const carouselViewportRef = useRef<HTMLDivElement | null>(null);
  const carouselTrackRef = useRef<HTMLDivElement | null>(null);

  const syncCarousel = useCallback(
    (requestedOffset?: number) => {
      const viewport = carouselViewportRef.current;
      const track = carouselTrackRef.current;

      if (!viewport || !track) {
        return;
      }

      const cards = Array.from(track.children) as HTMLAnchorElement[];

      if (cards.length === 0) {
        return;
      }

      const nextMaxTrackOffset = Math.max(
        0,
        track.scrollWidth - viewport.clientWidth,
      );
      const clampedOffset = Math.max(
        0,
        Math.min(requestedOffset ?? trackOffset, nextMaxTrackOffset),
      );

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - clampedOffset);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setMaxTrackOffset(nextMaxTrackOffset);
      setTrackOffset(clampedOffset);
      setActiveService(closestIndex);
    },
    [trackOffset],
  );

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
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

  useEffect(() => {
    const viewport = carouselViewportRef.current;
    const track = carouselTrackRef.current;

    if (!viewport || !track) {
      return;
    }

    const updateCarouselPosition = () => {
      syncCarousel(trackOffset);
    };

    updateCarouselPosition();

    const observer = new ResizeObserver(updateCarouselPosition);
    observer.observe(viewport);
    observer.observe(track);
    Array.from(track.children).forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, [syncCarousel, trackOffset]);

  useEffect(() => {
    const track = carouselTrackRef.current;

    if (!track) {
      return;
    }

    const activeCard = track.children[activeService] as HTMLAnchorElement | undefined;

    if (!activeCard) {
      return;
    }

    syncCarousel(activeCard.offsetLeft);
  }, [activeService, syncCarousel]);

  const scrollServicesBy = (direction: -1 | 1) => {
    setActiveService((currentService) =>
      Math.max(
        0,
        Math.min(serviceItems.length - 1, currentService + direction),
      ),
    );
  };

  const canGoPrev = trackOffset > 0;
  const canGoNext = trackOffset < maxTrackOffset;
  const visibleFaqItems = showAllFaqs ? faqItems : faqItems.slice(0, 3);

  const handleCarouselWheel = (event: WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;

    if (delta === 0) {
      return;
    }

    event.preventDefault();
    syncCarousel(trackOffset + delta);
  };

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
      <header
        className={`fixed inset-x-0 top-0 z-20 transition-all duration-300 ${
          isScrolled ? "bg-white/50 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 sm:px-8 sm:py-3.5 lg:px-12 lg:py-4"
          variants={staggerGroupVariants}
        >
          <motion.img
            src="/Recurso-3.svg"
            alt="Siimpl logo"
            className="h-8 w-auto"
            variants={blurItemVariants}
          />
          <motion.nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex sm:gap-2"
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
                  text="Our Services"
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
                <div className="flex flex-col rounded-3xl bg-neutral-50/80 p-3 shadow-lg shadow-black/5 backdrop-blur-md">
                  {serviceItems.map((item) => (
                    <a
                      key={item.name}
                      href="#"
                      className="flex items-start gap-4 rounded-2xl p-3 text-black transition-colors duration-200 hover:bg-black/5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3164F3] text-white">
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
              href="#"
              className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
              variants={blurItemVariants}
            >
              <AnimatedWords
                as="span"
                className="inline-flex"
                stagger={0.04}
                text="About Us"
              />
            </motion.a>
            <motion.a
              href="#"
              className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
              variants={blurItemVariants}
            >
              <AnimatedWords
                as="span"
                className="inline-flex"
                stagger={0.04}
                text="Contact Us"
              />
            </motion.a>
          </motion.nav>
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
                  text="Our Services"
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
                href="#"
                className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
              >
                <AnimatedWords
                  as="span"
                  className="inline-flex"
                  stagger={0.04}
                  text="About Us"
                />
              </a>
              <a
                href="#"
                className="inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-black/10"
              >
                <AnimatedWords
                  as="span"
                  className="inline-flex"
                  stagger={0.04}
                  text="Contact Us"
                />
              </a>
            </nav>
            <motion.a
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#3164F3] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:h-10 sm:px-6 sm:text-base"
              variants={blurItemVariants}
            >
              <AnimatedWords
                as="span"
                className="inline-flex"
                stagger={0.04}
                text="Book an appointment"
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
            <div className="flex flex-col rounded-3xl bg-neutral-50/80 p-3 shadow-lg shadow-black/5 backdrop-blur-md">
              {serviceItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="flex items-start gap-4 rounded-2xl p-3 text-black transition-colors duration-200 hover:bg-black/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3164F3] text-white">
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
        className="min-h-screen rounded-b-[4.5rem] bg-neutral-100"
        variants={blurItemVariants}
      >
        <motion.div
          className="flex min-h-screen flex-col"
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
                  className="mb-4 text-sm font-medium uppercase text-[#3164F3]"
                  stagger={0.08}
                  text="Welcome to Siimpl"
                />
                <AnimatedWords
                  as="h1"
                  className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl"
                  stagger={0.045}
                  text="Your ideal partner for streamlining and enhancing your business"
                />
                <AnimatedWords
                  as="p"
                  className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl"
                  stagger={0.02}
                  text="Located in Montreal City, we offer a full range of tax, accounting, consulting and other services to support your growth and success."
                />
                <motion.div
                  className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
                  variants={staggerGroupVariants}
                >
                  <motion.a
                    href="#"
                    className="inline-flex h-14 items-center justify-center rounded-full bg-[#3164F3] px-8 text-lg font-medium text-white transition-opacity hover:opacity-90 sm:h-16 sm:px-10 sm:text-xl"
                    variants={blurItemVariants}
                  >
                    <AnimatedWords
                      as="span"
                      className="inline-flex"
                      stagger={0.04}
                      text="Get started now"
                    />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="inline-flex h-14 items-center justify-center px-8 text-lg font-medium text-neutral-950 underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:text-[#3164F3] hover:decoration-current sm:h-16 sm:px-10 sm:text-xl"
                    variants={blurItemVariants}
                  >
                    <AnimatedWords
                      as="span"
                      className="inline-flex"
                      stagger={0.04}
                      text="Our services"
                    />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
      <section id="services" className="overflow-x-clip py-20">
        <div className={contentWidthClass}>
          <div className="flex items-end justify-between gap-6">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-4xl lg:text-5xl">
              Explore our services to see how we can help you achieve your
              goals.
            </h2>
            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                aria-label="Previous service"
                onClick={() => scrollServicesBy(-1)}
                disabled={!canGoPrev}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                  !canGoPrev
                    ? "border-neutral-200 text-neutral-300"
                    : "border-neutral-300 text-neutral-950 hover:border-neutral-950"
                }`}
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
                disabled={!canGoNext}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                  !canGoNext
                    ? "border-neutral-200 text-neutral-300"
                    : "border-neutral-300 text-neutral-950 hover:border-neutral-950"
                }`}
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
          </div>
          <div
            ref={carouselViewportRef}
            className="mt-12 overflow-visible"
            aria-live="polite"
            onWheel={handleCarouselWheel}
          >
            <div
              ref={carouselTrackRef}
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${trackOffset}px)` }}
            >
              {serviceItems.map((item, index) => (
                <a
                  key={item.name}
                  href="#"
                  className="w-full shrink-0 sm:w-[30rem]"
                  onFocus={() => setActiveService(index)}
                >
                  <div className="overflow-hidden rounded-[2rem] bg-neutral-100">
                    <div className="aspect-[27/16] p-6 sm:p-8">
                      <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-neutral-200 bg-white p-5">
                        <div className="flex justify-between">
                          <span className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                            Service
                          </span>
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                            {item.icon}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div className="h-3 w-24 rounded-full bg-neutral-200" />
                          <div className="h-3 w-full rounded-full bg-neutral-200" />
                          <div className="h-3 w-3/4 rounded-full bg-neutral-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-1 pt-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">
                      {item.name}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2 md:hidden">
            {serviceItems.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Go to service ${index + 1}`}
                aria-pressed={activeService === index}
                onClick={() => setActiveService(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeService === index
                    ? "w-8 bg-neutral-950"
                    : "w-2.5 bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="bg-[#3164F3] py-20 text-white sm:py-24"
      >
        <div className={contentWidthClass}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20 xl:gap-28">
            <aside className="max-w-xl text-left">
              <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                We’re looking forward to working with you at{" "}
                <span className="relative ml-2 inline-flex -translate-y-[calc(0.08em-1px)] align-middle">
                  <Image
                    src="/Siimpl%20White%20Logo.png"
                    alt="Siimpl"
                    width={512}
                    height={122}
                    className="h-[0.7em] w-auto"
                  />
                </span>
              </h2>
              <p className="mt-6 text-base leading-7 text-white sm:text-lg">
                If you have any questions or would like to discuss your
                specific requirements, please do not hesitate to contact us.
              </p>
            </aside>
            <aside>
              <form className="grid gap-6 text-white sm:grid-cols-2">
                <div className="flex flex-col text-sm font-medium text-white">
                  <input
                    type="text"
                    name="firstName"
                    aria-label="First name"
                    className="w-full rounded-none border-b border-white bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/75 focus:border-white"
                    placeholder="First name"
                  />
                </div>
                <div className="flex flex-col text-sm font-medium text-white">
                  <input
                    type="text"
                    name="lastName"
                    aria-label="Last name"
                    className="w-full rounded-none border-b border-white bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/75 focus:border-white"
                    placeholder="Last name"
                  />
                </div>
                <div className="flex flex-col text-sm font-medium text-white">
                  <input
                    type="text"
                    name="company"
                    aria-label="Company"
                    className="w-full rounded-none border-b border-white bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/75 focus:border-white"
                    placeholder="Company"
                  />
                </div>
                <div className="flex flex-col text-sm font-medium text-white">
                  <input
                    type="email"
                    name="email"
                    aria-label="Email"
                    className="w-full rounded-none border-b border-white bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/75 focus:border-white"
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col text-sm font-medium text-white sm:col-span-2">
                  <textarea
                    name="message"
                    rows={1}
                    onInput={handleMessageInput}
                    aria-label="Message"
                    className="w-full resize-none rounded-none border-b border-white bg-transparent px-0 py-3 text-base leading-6 text-white outline-none placeholder:text-white/75 focus:border-white"
                    placeholder="Message"
                  />
                </div>
                <div className="mt-4 sm:col-span-2 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-[#3164F3] transition-colors duration-200 hover:bg-white/90"
                  >
                    Send inquiry
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
                Frequently asked questions
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-neutral-600 sm:text-lg">
                Find quick answers about how we work, what we support and how
                to start with the right service.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {visibleFaqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <article
                  key={item.question}
                  className={`rounded-[1.5rem] transition-colors duration-200 ${
                    isOpen
                      ? "bg-neutral-200"
                      : "bg-neutral-100 hover:bg-neutral-200"
                  }`}
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
                          : "bg-neutral-100 text-neutral-950"
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
                <span>See more</span>
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
            <div className="rounded-[1.75rem] bg-neutral-100 p-6 sm:p-7">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">
                Still have questions?
              </h3>
              <p className="mt-3 max-w-md text-base leading-7 text-neutral-600">
                Reach out and we will help you understand the right next step
                for your business.
              </p>
              <a
                href="#contact"
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
                Talk to our team
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
                Practical tax, accounting, and advisory support for teams that
                want cleaner systems and sharper decisions.
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
    </motion.main>
  );
}
