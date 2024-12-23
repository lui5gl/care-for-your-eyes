"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const notification_sound = useRef<HTMLAudioElement>(null);

  const [hour, SetHour] = useState(new Date().getHours());
  const [minute, SetMinute] = useState(new Date().getMinutes());
  const [next_break, SetNextBreak] = useState(
    minute <= 20 ? 20 - minute : minute <= 40 ? 40 - minute : 60 - minute,
  );

  const [isSoundAllowed, setIsSoundAllowed] = useState(false);

  useEffect(() => {
    if (!isSoundAllowed) return;

    const interval = setInterval(() => {
      SetHour(new Date().getHours());
      SetMinute(new Date().getMinutes());
      SetNextBreak(
        minute <= 20 ? 20 - minute : minute <= 40 ? 40 - minute : 60 - minute,
      );

      if (next_break === 0) notification_sound.current?.play();
    }, 1000);

    return () => clearInterval(interval);
  }, [isSoundAllowed, minute, next_break]);

  return (
    <main className="flex min-h-screen flex-col select-none items-center justify-center gap-5 bg-gradient-to-br from-neutral-600 to-neutral-800">
      <h1 className="rounded-sm bg-neutral-100 px-8 py-4 text-5xl font-bold text-neutral-800 shadow-box">
        Care for your eyes
      </h1>
      <span className="drop-shadow-font text-9xl font-bold text-neutral-100">
        {hour < 10 ? "0" + hour : hour}:{minute < 10 ? "0" + minute : minute}
      </span>
      <span className="animate-pulse text-xl font-semibold text-neutral-100">
        Next break in {next_break} minutes
      </span>
      {!isSoundAllowed && (
        <button
          className="flex items-center justify-center gap-1 rounded-sm bg-neutral-100 p-1 px-4 py-2 font-semibold text-neutral-800 hover:shadow-button transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none"
          onClick={() => setIsSoundAllowed(true)}
        >
          <Image src="/icons/bell.svg" alt="Bell" width={16} height={16} />
          Enable sound
        </button>
      )}
      <audio src="/sounds/bell_sound.mp3" ref={notification_sound} />
    </main>
  );
}
