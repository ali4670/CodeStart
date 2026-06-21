import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import HeroAsciiOne from "@/components/ui/hero-ascii-one";
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { InfiniteRibbon } from "@/components/ui/infinite-ribbon";
import { Features } from "@/components/ui/features-8";
import Bucket from "@/components/ui/bucket";
import { Testimonials } from "@/components/ui/testimonials-columns-1";
import { TextEffect } from "@/components/ui/text-effect";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <HeroAsciiOne />
      <DynamicTextSlider />
      <section className="relative bg-[#0A0A0F] py-10">
        <InfiniteRibbon repeat={10} duration={22} rotation={-1.5}>
          Python • JavaScript • C++ • Data Structures • Algorithms • Git • HTML & CSS • React • Problem Solving • Databases • AI Basics •
        </InfiniteRibbon>
        <InfiniteRibbon repeat={10} duration={24} reverse rotation={1.5} className="mt-4">
          Python • JavaScript • C++ • Data Structures • Algorithms • Git • HTML & CSS • React • Problem Solving • Databases • AI Basics •
        </InfiniteRibbon>
      </section>
      <Features />
      <section className="relative overflow-hidden bg-[#0A0A0F] px-6 py-24 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-48 max-w-4xl rounded-full bg-blue-600/10 blur-3xl" />
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-100">
            Built for the Thanaweya to engineering journey
          </div>
          <TextEffect as="h2" preset="slide" per="word" className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            CodeStart fits the reality of ambitious Egyptian students.
          </TextEffect>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/60 md:text-lg">
            School pressure is already intense. CodeStart gives students one structured system for Thanaweya study, programming practice, AI support, and visible progress, without the chaos of generic course platforms.
          </p>
          <div className="mt-14">
            <Bucket />
          </div>
        </div>
      </section>
      <Testimonials />
    </main>
  );
}
