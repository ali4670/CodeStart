import HeroAsciiOne from "@/components/ui/hero-ascii-one";
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { InfiniteRibbon } from "@/components/ui/infinite-ribbon";
import { Features } from "@/components/ui/features-8";
import { Bucket } from "@/components/ui/bucket";
import { Testimonials } from "@/components/ui/testimonials-columns-1";
import { LampContainer } from "@/components/ui/lamp";
import { CreativePricing } from "@/components/ui/creative-pricing";
import { LeverSwitch } from "@/components/ui/lever-switch";
import { useState } from "react";
import { BrainCircuit, BookOpen, Users } from "lucide-react";

export default function LandingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex flex-col gap-0">
      <HeroAsciiOne />
      <DynamicTextSlider />
      
      <InfiniteRibbon repeat={10} duration={20}>
        Python • JavaScript • C++ • Data Structures • Algorithms • Git • HTML & CSS • React • Problem Solving • Databases • AI Basics •
      </InfiniteRibbon>

      <Features />

      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Why CodeStart?</h2>
            <Bucket />
        </div>
      </section>

      <Testimonials />

      <section id="pricing" className="py-24 bg-black">
        <LampContainer>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Choose Your Path</h1>
            
            <div className="flex items-center gap-4 mb-16 bg-zinc-900/50 p-2 rounded-full border border-zinc-800">
                <span className={`text-sm ${!isYearly ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
                <LeverSwitch checked={isYearly} onChange={setIsYearly} />
                <span className={`text-sm ${isYearly ? 'text-white' : 'text-zinc-500'}`}>Yearly (20% off)</span>
            </div>

            <CreativePricing 
                tiers={[
                    {
                        name: "Explorer",
                        icon: <BookOpen className="size-6" />,
                        price: 0,
                        description: "Get started for free",
                        features: ["Limited Courses", "3 AI Queries/day", "Community Access"],
                        color: "blue"
                    },
                    {
                        name: "Student",
                        icon: <Code className="size-6" />,
                        price: isYearly ? 160 : 199,
                        description: "Perfect for Thanaweya students",
                        features: ["All Courses", "Unlimited AI", "Coding Playground", "Certificates"],
                        popular: true,
                        color: "amber"
                    },
                    {
                        name: "Pro",
                        icon: <BrainCircuit className="size-6" />,
                        price: isYearly ? 280 : 349,
                        description: "For serious engineers",
                        features: ["Everything in Student", "Parent Dashboard", "Priority Support", "Offline Mode"],
                        color: "emerald"
                    }
                ]}
            />
        </LampContainer>
      </section>
    </div>
  );
}
