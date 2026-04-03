import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";

export const metadata: Metadata = {
  title: "Portfolio | Developer",
  description: "Full-stack developer portfolio showcasing projects, certifications, and open source contributions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#03040e" }}>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
