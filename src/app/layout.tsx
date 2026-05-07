import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Jasper Nikko Navarez | Full-Stack Developer",
  description: "Full-stack developer and published npm author. Freelance software engineer specializing in React, React Native, Node.js, and cloud. Building production-grade software across web, mobile, and cloud.",
  keywords: ["Jasper Navarez", "full-stack developer", "React", "React Native", "Node.js", "Next.js", "cloudpush-cli", "freelance software engineer"],
  authors: [{ name: "Jasper Nikko Navarez", url: "https://github.com/lukeuthy" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#03040e" }}>
        <Providers>
          <CursorGlow />
          {children}
        </Providers>
      </body>
    </html>
  );
}
