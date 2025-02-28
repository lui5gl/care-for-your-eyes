"use client";

import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";

export default function Home() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [nextBreak, setNextBreak] = useState(0);

  useEffect(() => {
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
  }, []);

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
  }, []);

  useEffect(() => {
    let title = "Care for your eyes";
    if (!isSoundAllowed) title = "🔕 " + title;

    document.title = title;
  }, [isSoundAllowed]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-linear-to-b from-neutral-600 to-neutral-900 select-none">
      <h1 className="shadow-background rounded-xs bg-neutral-100 px-8 py-4 text-5xl font-bold text-neutral-800">
        Care for your eyes
      </h1>
      <span className="drop-shadow-font drop-shadow-text text-9xl font-bold text-neutral-100">
        {hour.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")}
      </span>
      <span className="animate-pulse text-xl font-semibold text-neutral-100">
        Next break in {nextBreak} minutes
      </span>

      <button
        className="hover:shadow-button absolute top-5 left-5 flex items-center justify-center rounded-xs bg-neutral-100 p-2 transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none"
        onClick={() => setIsSoundAllowed(!isSoundAllowed)}
      >
        <Image
          src={`/icons/${isSoundAllowed ? "bell-check" : "bell-exclamation"}.svg`}
          alt={isSoundAllowed ? "Sound is allowed" : "Sound is not allowed"}
          width={20}
          height={20}
        />
      </button>

      <audio src="/sounds/bell_sound.mp3" ref={notificationSoundRef} />
    </main>
  );
}
