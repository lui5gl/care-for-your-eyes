"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [current_hour, SetCurrentHour] = useState(Number);
  const [current_minute, SetCurrentMinute] = useState(Number);
  const [next_break, SetNextBreak] = useState(Number);
  const notification_sound = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();

      SetCurrentHour(hour);
      SetCurrentMinute(minute);

      if (minute <= 20) {
        SetNextBreak(20 - minute);
      } else if (minute <= 40) {
        SetNextBreak(40 - minute);
      } else if (minute <= 60) {
        SetNextBreak(60 - minute);
      }

      if (minute === 0 || minute === 20 || minute === 40 || minute === 60) {
        notification_sound.current?.play();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [current_hour, current_minute, next_break]);

  return (
    <main className="min-h-screen bg-neutral-800 text-white flex items-center justify-center flex-col gap-5 select-none px-5">
      <h1 className="font-bold text-3xl">Care for your eyes</h1>
      <section className="bg-white/5 p-5 rounded-lg w-full max-w-xl grid gap-5 place-content-center">
        <span className="font-bold text-9xl">
          {`${current_hour < 10 ? `0${current_hour}` : current_hour}:${current_minute < 10 ? `0${current_minute}` : current_minute}`}
        </span>
        <p className="font-semibold text-xl text-center ">
          Next break in {next_break} minutes
        </p>
      </section>
      <audio src="/sounds/bell_sound.mp3" ref={notification_sound} />
    </main>
  );
}
