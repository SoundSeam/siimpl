"use client";

import { useEffect, useState } from "react";

type DateLabel = {
  readonly dateTime: string;
  readonly label: string;
};

type CurrentDateLabelProps = {
  readonly fallbackDateTime: string;
  readonly fallbackLabel: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function getCurrentDateLabel(): DateLabel {
  const date = new Date();

  return {
    dateTime: date.toISOString().slice(0, 10),
    label: dateFormatter.format(date),
  };
}

export default function CurrentDateLabel({
  fallbackDateTime,
  fallbackLabel,
}: CurrentDateLabelProps) {
  const [dateLabel, setDateLabel] = useState<DateLabel>({
    dateTime: fallbackDateTime,
    label: fallbackLabel,
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDateLabel(getCurrentDateLabel());
    }, 0);

    const interval = window.setInterval(() => {
      setDateLabel(getCurrentDateLabel());
    }, 60_000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <time className="text-black" dateTime={dateLabel.dateTime}>
      {dateLabel.label}
    </time>
  );
}
