import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

// Providers for Tanstack query
import Providers from "./providers";

// Sans font for general text
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// Mono font for code blocks
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// Metadata for the application
export const metadata: Metadata = {
  title: "Blog App",
  description:
    "this is a Free Blog website that let Users post, edit, Read and Delete Blogs ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
