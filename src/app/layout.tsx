import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";

export const metadata: Metadata = {
  title: "Jasper Nikko Navarez | Full-Stack Developer",
  description: "CS student at Mapúa MCM. Freelance full-stack developer, open-source contributor, and AI/ML enthusiast. Building production-grade software across web, mobile, and cloud.",
  keywords: ["Jasper Navarez", "full-stack developer", "React", "Next.js", "cloudpush-cli", "Mapúa MCM"],
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
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
