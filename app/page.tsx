"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  let hour_now = new Date().getHours();
  let minute_now = new Date().getMinutes();

  let remaining_time =
    minute_now <= 20
      ? 20 - minute_now
      : minute_now <= 40
        ? 40 - minute_now
        : 60 - minute_now;

  const [hour, setHour] = useState(hour_now);
  const [minute, setMinute] = useState(minute_now);
  const [next_break, setNextBreak] = useState(remaining_time);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const notification_sound = useRef<HTMLAudioElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let hour_now = new Date().getHours();
      let minute_now = new Date().getMinutes();

      let remaining_time =
        minute_now <= 20
          ? 20 - minute_now
          : minute_now <= 40
            ? 40 - minute_now
            : 60 - minute_now;

      setHour(hour_now);
      setMinute(minute_now);
      setNextBreak(remaining_time);

      if (remaining_time === 20 && notificationEnabled === true) {
        notification_sound.current?.play();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [notificationEnabled]);

  const handleNotificationEnable = () => {
    setNotificationEnabled(true);
    notificationButtonRef.current?.classList.add("hidden");
  };

  return (
    <main className="grid min-h-screen gap-2 text-white select-none bg-gradient-to-t to-stone-500 from-stone-700 place-content-center">
      <h1 className="text-4xl font-bold text-center">Care for your 👀</h1>
      <section className="grid p-5 rounded-md bg-white/25 shadow-box">
        <p className="font-bold text-center text-9xl drop-shadow-font">
          {hour < 10 ? "0" + hour : hour}:{minute < 10 ? "0" + minute : minute}
        </p>
        <span className="text-lg font-semibold text-center animate-pulse">
          Next break in {next_break} minutes 🙀
        </span>
        <button
          ref={notificationButtonRef}
          className="flex items-center justify-center gap-2 py-1 mt-2 transition-all duration-200 rounded-md bg-white/25 hover:shadow-button active:translate-x-1 active:translate-y-1 active:shadow-none"
          onClick={handleNotificationEnable}
        >
          Enable notifications
          <Image
            src="/images/bell_icon.png"
            alt="bell icon"
            height={12}
            width={12}
          />
        </button>
      </section>
      <audio src="/sounds/bell_sound.mp3" ref={notification_sound} />
    </main>
  );
}
