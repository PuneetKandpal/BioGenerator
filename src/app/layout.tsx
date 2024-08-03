import type { Metadata } from "next";
import {GeistSans} from "geist/font/sans"
import "./globals.css";
import { Providers } from "@/providers/providers";
import { cn } from "@nextui-org/theme";



export const metadata: Metadata = {
  title: "Bio Generator",
  description: "AI powered bio generator", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={cn(GeistSans.variable, "font-sans")}>{children}</body>
      </Providers>
    </html>
  );
}
