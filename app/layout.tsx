import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BGMI Kill Cash — Daily 8PM Solo Tournament",
  description: "Daily BGMI solo tournaments at 8 PM. Per Kill & Winner formats. Mobile only. Real cash prizes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
