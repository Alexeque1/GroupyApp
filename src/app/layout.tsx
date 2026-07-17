import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://groupy-app.vercel.app/"),

  title: {
    default: "Groupy",
    template: "%s | Groupy",
  },

  description:
    "Discover events, connect with people, and build communities with Groupy.",

  keywords: [
    "events",
    "social",
    "community",
    "meetups",
    "groupy",
  ],

  authors: [
    {
      name: "Alexander Sequera",
    },
  ],

  openGraph: {
    title: "Groupy",
    description: "Discover events and connect with people.",
    url: "https://groupy-app.vercel.app/",
    siteName: "Groupy",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
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
      className={cn(
        "h-full",
        "antialiased",
        spaceGrotesk.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
