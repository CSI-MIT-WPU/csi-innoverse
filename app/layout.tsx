import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TanstackProvider from "./providers/TanstackProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AxiomWebVitals } from "next-axiom";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = {
  title: "CSI MITWPU",
  description: "CSI MITWPU INNOVERSE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "max-w-screen-2xl mx-auto bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <AxiomWebVitals />
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </TanstackProvider>
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS || ""} />
      </body>
    </html>
  );
}
