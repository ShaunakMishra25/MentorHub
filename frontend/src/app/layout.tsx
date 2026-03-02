import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
import "./globals.css";
import ConditionalNavbar from "@/shared/ui/ConditionalNavbar";
import ScrollProgress from "@/shared/ui/ScrollProgress";
import { MentorOnboardingProvider } from "@/shared/lib/context/MentorOnboardingContext";
import { SWRProvider } from "@/shared/providers/SWRProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MentoMania",
  description: "Mentorship platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SWRProvider>
        <MentorOnboardingProvider>
          <html lang="en" className="scroll-smooth">
            <body
              className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} antialiased`}
            >
              <ScrollProgress />
              <ConditionalNavbar />
              <main>{children}</main>
            </body>
          </html>
        </MentorOnboardingProvider>
      </SWRProvider>
    </ClerkProvider>
  );
}
