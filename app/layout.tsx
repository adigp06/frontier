import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FRONTIER // Indian Deeptech 3D Terminal",
  description: "Immersive 3D terminal mapping the Indian deeptech ecosystem.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full w-full overflow-hidden bg-black`}>
      <body className="h-full w-full overflow-hidden bg-black text-white antialiased m-0 p-0">
        {children}
      </body>
    </html>
  );
}
