"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const notification_sound = useRef<HTMLAudioElement>(null);

  const [hour, SetHour] = useState(new Date().getHours());
  const [minute, SetMinute] = useState(new Date().getMinutes());
  const [next_break, SetNextBreak] = useState(
    minute <= 20 ? 20 - minute : minute <= 40 ? 40 - minute : 60 - minute
  );

  useEffect(() => {
    const interval = setInterval(() => {
      SetHour(new Date().getHours());
      SetMinute(new Date().getMinutes());
      SetNextBreak(
        minute <= 20 ? 20 - minute : minute <= 40 ? 40 - minute : 60 - minute
      );

      if (next_break === 0) notification_sound.current?.play();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-5 bg-gradient-to-br from-neutral-600 to-neutral-800">
      <h1 className="px-8 py-4 text-5xl font-bold rounded-sm text-neutral-800 shadow-box bg-neutral-100">
        Care for your eyes
      </h1>
      <span className="font-bold text-neutral-100 text-9xl drop-shadow-font">
        {hour < 10 ? "0" + hour : hour}:{minute < 10 ? "0" + minute : minute}
      </span>
      <span className="text-xl font-semibold text-neutral-100 animate-pulse">
        Next break in {next_break} minutes
      </span>
      <audio src="/sounds/bell_sound.mp3" ref={notification_sound} />
    </main>
  );
}
