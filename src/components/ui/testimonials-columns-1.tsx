"use client";
import React from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "I am in Year 3 Thanaweya in Nasr City, and CodeStart was the first place that explained Python using examples that actually felt close to my school routine. I built a marks calculator for my math revision and finally understood loops properly.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    name: "Omar Hassan",
    role: "Thanaweya Student, Cairo",
  },
  {
    text: "My daughter studies in Alexandria, and for the first time I can see her excited about both her schoolwork and technology. She now talks about algorithms, problem solving, and university plans with real confidence.",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80",
    name: "Fatma Adel",
    role: "Parent, Alexandria",
  },
  {
    text: "I joined Computer Science at Ain Shams already knowing Git, basic C++, and how to break problems into steps. The track roadmap made the jump from Thanaweya to university much less intimidating.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    name: "Nour Mahmoud",
    role: "CS Freshman, Cairo",
  },
  {
    text: "Before CodeStart, I was jumping between random Arabic and English playlists. Here everything was in one path. I stopped wasting time and started building small JavaScript projects after school instead.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    name: "Ahmed Samir",
    role: "Student Developer, Giza",
  },
  {
    text: "The daily missions helped me study in shorter sessions without feeling overwhelmed by Thanaweya pressure. I could finish a lesson, solve a challenge, and still feel that I moved forward every day.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    name: "Mariam Nabil",
    role: "Thanaweya Student, Mansoura",
  },
  {
    text: "My son used the AI summaries before exams and then went back to practicing JavaScript in the evening. As a parent in Tanta, I liked that the platform respected his school priorities while still growing his technical skills.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
    name: "Youssef Amin",
    role: "Parent, Tanta",
  },
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full" key={i}>
                  <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export function Testimonials() {
  const first = testimonials.slice(0, 2);
  const second = testimonials.slice(2, 4);
  const third = testimonials.slice(4, 6);

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">Social proof</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Students building before campus.</h2>
          <p className="mt-5 text-muted-foreground">Stories that sound like real Egyptian homes, schools, and student goals, not generic edtech marketing.</p>
        </div>
        <div className="grid h-[620px] grid-cols-1 justify-center gap-6 overflow-hidden md:grid-cols-3">
          <TestimonialsColumn testimonials={first} duration={18} />
          <TestimonialsColumn testimonials={second} duration={22} className="hidden md:block" />
          <TestimonialsColumn testimonials={third} duration={20} className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}
