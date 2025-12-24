import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

// Providers for third party libraries
import Providers from "./providers";

// Sans font for general text
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Mono font for code blocks
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the application
export const metadata: Metadata = {
  title: "Blog App",
  description:
    "A simple blog application built with Next.js, TypeScript, Axios, React Hook Form, Tanstack Query, Material-UI, and PHP backend.",
  icons: {
    icon: "/images/circled-user-male-skin-type.png", // 👈 Add your favicon here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*  Wrap the application with Providers */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
