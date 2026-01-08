"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does the AI agent create videos?",
    answer:
      "Our AI agent uses advanced machine learning models to generate videos from text prompts. Simply describe the scene, style, and mood you want, and our AI processes your request to create professional video content. The agent analyzes your prompt, selects appropriate visual elements, generates frames, and compiles them into a complete video with smooth transitions and timing."
  },
  {
    question: "What video styles can the AI agent generate?",
    answer:
      "The AI agent can create videos in three main styles: Fun (punchy and animated with dynamic movements), Calm (minimal and slow-paced for professional content), and Background (subtle loops perfect for product demos). Each style is optimized for different use cases, from social media content to product launches and background footage."
  },
  {
    question: "How long does it take to generate a video?",
    answer:
      "Video generation typically takes 30-90 seconds depending on the complexity and length of your prompt. Our AI agent processes requests in real-time, generating frames and compiling them into a complete video. You'll see a preview once generation is complete, and you can download or regenerate if needed."
  },
  {
    question: "Can I customize the generated videos?",
    answer:
      "Yes! You can customize videos by adjusting your prompt, selecting different styles, and regenerating until you get the perfect result. Our AI agent learns from your preferences and can create variations. You can specify format (vertical, square, 16:9), pacing, colors, and motion verbs like 'slow pan' or 'zoom in' in your prompts."
  },
  {
    question: "What video formats and resolutions are supported?",
    answer:
      "The AI agent can generate videos in multiple formats including vertical (9:16) for social media, square (1:1), and widescreen (16:9) for presentations. All videos are exported in HD quality suitable for professional use. You can specify the format in your prompt, and the AI will optimize the composition accordingly."
  },
  {
    question: "Do I need video editing experience to use the AI agent?",
    answer:
      "No video editing experience is required! The AI agent handles all the technical aspects of video creation. Simply write a descriptive prompt about what you want to see, choose a style, and let the AI do the rest. The platform is designed for product teams, marketers, and creators who want professional videos without the complexity of traditional video editing software."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mt-10 space-y-3">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-sky-500/30 bg-slate-900/60 backdrop-blur-sm transition-all hover:border-sky-400/50"
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="flex-1 text-sm font-medium text-slate-100 sm:text-base">
                  {item.question}
                </span>
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-sky-500/50 bg-sky-500/20 text-sky-400 transition-all",
                    isOpen && "rotate-45 border-sky-400 bg-sky-500/30"
                  )}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="border-t border-sky-500/20 px-5 py-4">
                  <p className="text-sm leading-relaxed text-slate-300">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
