import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";
import { Space_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "Buck",
  description: "Created with v0",
  icons: "../logo.png",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-space-grotesk',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-space-grotesk`}>
        {/* {children} */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
