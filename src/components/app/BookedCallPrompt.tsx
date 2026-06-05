"use client";

import { useEffect, useState } from "react";

export default function BookedCallPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem("siimpl-call-prompt-dismissed");
    if (!dismissed) {
      const timer = window.setTimeout(() => setVisible(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <aside className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-[1.5rem] border border-neutral-200 bg-white p-4 text-neutral-950">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium">Book a consultation</p>
        <button
          type="button"
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
          onClick={() => {
            window.localStorage.setItem("siimpl-call-prompt-dismissed", "true");
            setVisible(false);
          }}
        >
          Close
        </button>
      </div>
      <a
        href="#contact"
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Start here
      </a>
    </aside>
  );
}
