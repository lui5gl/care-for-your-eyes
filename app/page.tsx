"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const now = new Date();
  const [hour, setHour] = useState(now.getHours());
  const [minute, setMinute] = useState(now.getMinutes());
  const [nextBreak, setNextBreak] = useState(
    minute <= 20 ? 20 - minute : minute <= 40 ? 40 - minute : 60 - minute,
  );

  const [isSoundAllowed, setIsSoundAllowed] = useState(false);

  const notificationSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHour(now.getHours());
      setMinute(now.getMinutes());

      const currentMinute = now.getMinutes();
      const newNextBreak =
        currentMinute <= 20
          ? 20 - currentMinute
          : currentMinute <= 40
            ? 40 - currentMinute
            : 60 - currentMinute;
      setNextBreak(newNextBreak);

      if (isSoundAllowed && newNextBreak === 0)
        notificationSoundRef.current?.play();
    }, 1000);

    return () => clearInterval(interval);
  }, [hour, minute, nextBreak, isSoundAllowed, notificationSoundRef]);

  useEffect(() => {
    let title = "Care for your eyes";
    if (!isSoundAllowed) title = "🔕 " + title;

    document.title = title;
  }, [isSoundAllowed]);

  return (
    <main className="flex min-h-screen select-none flex-col items-center justify-center gap-2 bg-linear-to-b from-neutral-600 to-neutral-900">
      <h1 className="rounded-xs bg-neutral-100 px-8 py-4 text-5xl font-bold text-neutral-800 shadow-background">
        Care for your eyes
      </h1>
      <span className="drop-shadow-font text-9xl font-bold text-neutral-100 drop-shadow-text">
        {hour.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")}
      </span>
      <span className="animate-pulse text-xl font-semibold text-neutral-100">
        Next break in {nextBreak} minutes
      </span>

      <button
        className="absolute left-5 top-5 flex items-center justify-center rounded-xs bg-neutral-100 p-2 transition-all duration-150 hover:shadow-button active:translate-x-1 active:translate-y-1 active:shadow-none"
        onClick={() => setIsSoundAllowed(!isSoundAllowed)}
      >
        <Image
          src={`/icons/${isSoundAllowed ? "bell-off" : "bell-ringing"}.svg`}
          alt="Activate/Deactivate sound"
          width={20}
          height={20}
        />
      </button>

      <audio src="/sounds/bell_sound.mp3" ref={notificationSoundRef} />
    </main>
  );
}
