import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "NovaStudio – AI Video Generation",
  description: "Generate on-brand AI videos in seconds with NovaStudio."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

