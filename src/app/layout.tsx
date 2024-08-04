import type { Metadata } from "next";
import {GeistSans} from "geist/font/sans"
import "./globals.css";
import { Providers } from "@/providers/providers";
import { cn } from "@nextui-org/theme";
import GridPattern from "@/components/magicui/grid-pattern";



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
        <body className={cn(GeistSans.variable, "font-sans")}>
        <GridPattern
        width={70}
        height={70}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent)] " , "opacity-70"
        )}
      />
          {children}</body>
      </Providers>
    </html>
  );
}
