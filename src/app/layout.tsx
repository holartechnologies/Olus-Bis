import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OLUS-BIS Immigration Services | Your Trusted Immigration Partner for America",
    template: "%s | OLUS-BIS Immigration Services",
  },
  description:
    "Professional US immigration services by Barrister Oluseyi Bisiriyu. Expert guidance for family visas, work visas, green cards, citizenship, and more.",
  keywords: [
    "US immigration lawyer",
    "immigration services",
    "green card",
    "work visa",
    "family visa",
    "student visa",
    "citizenship",
    "Barrister Oluseyi Bisiriyu",
  ],
  authors: [{ name: "OLUS-BIS Immigration Services" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "OLUS-BIS Immigration Services",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
