import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Search App",
  description: "An app for searching child-related information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
