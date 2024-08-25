import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Care for your eyes",
  description:
    "Care for Your Eyes is an app designed to promote eye care for individuals who spend extended periods in front of computer screens. The app's primary goal is to remind you to take regular breaks to prevent eye strain and maintain the health of your eyes. Following the 20-20-20 rule, the app will notify you every 20 minutes to focus your gaze on distant objects for 20 seconds. With an intuitive and customizable interface, Care for Your Eyes helps you develop healthy visual habits, reducing the risk of issues such as digital eye strain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={onest.className}>{children}</body>
    </html>
  );
}
