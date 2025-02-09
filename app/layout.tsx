import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";

export const metadata: Metadata = {
  title: "Buck",
  description: "Created with v0",
  icons: "../logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* {children} */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
