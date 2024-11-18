"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  let current_hour = new Date().getHours();
  let current_minute = new Date().getMinutes();

  const [hour, SetHour] = useState(current_hour);
  const [minute, SetMinute] = useState(current_minute);
  const [next_break, SetNextBreak] = useState(
    current_minute <= 20
      ? 20 - current_minute
      : current_minute <= 40
        ? 40 - current_minute
        : 60 - current_minute
  );
  const notification_sound = useRef<HTMLAudioElement>(null);
  const notification_button = useRef<HTMLButtonElement>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      let current_hour = new Date().getHours();
      let current_minute = new Date().getMinutes();

      SetHour(current_hour);
      SetMinute(current_minute);
      SetNextBreak(
        current_minute <= 20
          ? 20 - current_minute
          : current_minute <= 40
            ? 40 - current_minute
            : 60 - current_minute
      );

      if (notificationsEnabled && next_break.toString() === "0")
        notification_sound.current?.play();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-5 bg-gradient-to-br from-neutral-600 to-neutral-800">
      <button
        ref={notification_button}
        onClick={() => {
          notification_button.current?.classList.add("hidden");
          setNotificationsEnabled(true);
        }}
        className="bg-neutral-100 p-2 rounded-sm fixed top-5 right-5 hover:drop-shadow-font transition-all duration-150"
      >
        <Image
          src="/images/bell_icon.png"
          alt="bell icon"
          width={24}
          height={24}
        />
      </button>
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
