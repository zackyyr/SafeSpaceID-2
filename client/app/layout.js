// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PreloaderWrapper from "./PreloaderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SafeSpaceID – Ruang Aman Digital untuk Kesehatan Mental",
  description:
    "SafeSpaceID adalah platform digital yang mendukung kesehatan mental anak muda Indonesia dengan fitur curhat, konsultasi, dan komunitas aman.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PreloaderWrapper> {children}</PreloaderWrapper> 
      </body>
    </html>
  );
}
