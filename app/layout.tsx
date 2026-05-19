import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider  } from "./ConvexClientProvider";
import ConnectUserConvex from "./ConnectUserConvex";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { ToastProvider } from "./_components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RealKey — Find Your Dream Home",
  description: "Browse premium properties for sale and rent. RealKey connects buyers, sellers, and renters with the best real estate listings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ToastProvider>
              <Navbar />
              <ConnectUserConvex />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </ToastProvider>
          </body>
        </html>
      </ClerkProvider>
    </ConvexClientProvider>
  );
}
