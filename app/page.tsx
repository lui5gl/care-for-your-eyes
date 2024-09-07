"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const [hour, setHour] = useState(currentHour);
  const [minute, setMinute] = useState(currentMinute);

  const [next_break, setNextBreak] = useState(
    currentMinute <= 20
      ? 20 - currentMinute
      : currentMinute <= 40
        ? 40 - currentMinute
        : 60 - currentMinute,
  );

  const notification_sound = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();

      setHour(hour);
      setMinute(minute);
      setNextBreak(
        minute <= 20 ? 20 - minute : minute <= 40 ? 40 - minute : 60 - minute,
      );

      if (next_break === 0) {
        notification_sound.current?.play();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <main className="flex min-h-screen select-none flex-col items-center justify-center gap-2 bg-gradient-to-b from-neutral-500 to-neutral-700 px-5 text-white">
      <h1 className="text-4xl font-bold">Care for your 👀</h1>
      <section className="rounded-md bg-white/10 px-20 py-10">
        <span className="text-9xl font-bold drop-shadow-timer">
          {`${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`}
        </span>
        <p className="animate-pulse text-center text-xl font-semibold">
          Next break in {next_break} minutes 🙀
        </p>
      </section>
      <audio src="/sounds/bell_sound.mp3" ref={notification_sound} />
    </main>
  );
}
