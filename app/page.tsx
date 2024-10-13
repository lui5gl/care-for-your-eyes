"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  let hour_now = new Date().getHours();
  let minute_now = new Date().getMinutes();

  let next_pause =
    minute_now <= 20
      ? 20 - minute_now
      : minute_now <= 40
        ? 40 - minute_now
        : 60 - minute_now;

  const [hour, setHour] = useState(hour_now);
  const [minute, setMinute] = useState(minute_now);
  const [pause, setPause] = useState(next_pause);

  const notification_sound = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let minute_now = new Date().getMinutes();
      let next_pause =
        minute_now <= 20
          ? 20 - minute_now
          : minute_now <= 40
            ? 40 - minute_now
            : 60 - minute_now;

      setHour(new Date().getHours());
      setMinute(minute_now);
      setPause(next_pause);

      if (next_pause === 0) {
        console.log("Time to take a break!");
        notification_sound.current?.play();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="grid min-h-screen gap-2 text-white select-none bg-gradient-to-t to-stone-500 from-stone-700 place-content-center">
      <h1 className="text-4xl font-bold text-center">Care for your 👀</h1>
      <section className="grid p-5 rounded-md bg-white/25 shadow-box">
        <span className="font-bold text-center text-9xl drop-shadow-font">
          {hour < 10 ? "0" + hour : hour}:{minute < 10 ? "0" + minute : minute}
        </span>
        <span className="text-lg font-semibold text-center animate-pulse">
          Next break in {pause} minutes 🙀
        </span>
      </section>
      <audio src="/sounds/bell_sound.mp3" ref={notification_sound} />
    </main>
  );
}
