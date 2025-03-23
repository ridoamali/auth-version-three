import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Version Three - Modern Authentication UI",
  description: "A modern authentication UI with sign-in, sign-up, forgot password, and registration pages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}