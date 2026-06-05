"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type ProcessStep = {
  readonly step: string;
  readonly title: string;
  readonly description: string;
};

type FaqItem = {
  readonly question: string;
  readonly answer: string;
};

type ServicePageClientProps = {
  readonly processSteps: readonly ProcessStep[];
  readonly faqItems: readonly FaqItem[];
};

export default function ServicePageClient({
  processSteps,
  faqItems,
}: ServicePageClientProps) {
  const [openFaq, setOpenFaq] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const visibleFaqItems = showAllFaqs ? faqItems : faqItems.slice(0, 3);

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
    <>
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl pl-0 sm:pl-6">
            <p className="text-sm font-medium uppercase text-black/50">
              Getting started with Siimpl
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-4xl lg:text-5xl">
              How it works
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              Fill out your business details in minutes. Siimpl will review
              your current setup, recommend the right support, and build a
              clear plan to keep your numbers organized.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <article key={item.step} className="rounded-[1.5rem] last:pr-6">
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
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
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
      <section id="faqs" className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-12">
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
          </div>
        </div>
      </section>
    </>
  );
}
