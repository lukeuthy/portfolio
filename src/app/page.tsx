import PageBackground from "@/components/PageBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import GitHub from "@/components/GitHub";
import Organizations from "@/components/Organizations";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <PageBackground />
      <main className="relative min-h-screen" style={{ zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <GitHub />
        <Organizations />
        <Certifications />
        <Footer />
      </main>
    </>
  );
}
