import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FAQ } from "@/components/home/FAQ";

const FEATURES = [
  {
    title: "On-brand in seconds",
    description:
      "Generate clips that match your colors, pacing, and tone from a single prompt.",
    badge: "Brand-safe"
  },
  {
    title: "Native for product teams",
    description:
      "Designed for PMMs, founders, and designers shipping launch videos every week.",
    badge: "Ship faster"
  },
  {
    title: "Made for experimentation",
    description:
      "Spin up multiple variations, compare side by side, and keep only what works.",
    badge: "Explore"
  }
];

const STEPS = [
  {
    title: "Describe the moment",
    body: "Write what you want to see: context, pacing, and where it will live."
  },
  {
    title: "Pick a style",
    body: "Fun, calm, or subtle background loops optimized for product footage."
  },
  {
    title: "Generate & iterate",
    body: "Review a preview, tweak the prompt, and save your favorites."
  }
];

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-900/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-300">
            AI video workspace
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.55rem]">
            Turn product moments into{" "}
            <span className="text-gradient">launch‑ready video</span>.
          </h1>

          <p className="max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm">
            NovaFlow is an AI-native studio for teams shipping content every
            week. Describe the scene, choose a style, and generate clips that
            feel on-brand without opening a timeline.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/login">
              <Button size="lg" className="text-xs sm:text-sm">
                Start generating
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="text-xs sm:text-sm"
              >
                View pricing
              </Button>
            </Link>
            <p className="text-[11px] text-slate-500">
              No card required • Mock data only in this MVP
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span>Built for SaaS launches, demos, and changelog videos.</span>
          </div>
        </div>

        <Card className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(244,114,182,0.22),transparent_52%)]" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-medium">Preview • 8s intro</span>
              <span className="rounded-full bg-slate-900/80 px-2 py-1 text-[10px] text-slate-300">
                Mock preview
              </span>
            </div>
            <div className="relative h-40 overflow-hidden rounded-xl border border-slate-800/60 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.45),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(244,114,182,0.4),transparent_52%)] opacity-80" />
              <div className="relative flex h-full items-center justify-center">
                <div className="h-10 w-10 rounded-full border-2 border-slate-100/80 bg-slate-900/70 shadow-lg" />
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span>“Product launch intro with bold typography”</span>
              <span className="text-slate-400">Fun • vertical</span>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Why EirthLink
            </p>
            <h2 className="mt-1 text-sm font-semibold text-slate-50 sm:text-base">
              A studio that thinks like your product team
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="group relative flex flex-col rounded-2xl border-slate-800/80 bg-slate-950/80 p-4 transition-transform hover:-translate-y-1"
            >
              <span className="mb-3 inline-flex w-min rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium text-sky-300">
                {feature.badge}
              </span>
              <h3 className="text-sm font-semibold text-slate-50">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
              How it works
            </p>
            <h2 className="mt-1 text-sm font-semibold text-slate-50 sm:text-base">
              From idea to shareable clip in 3 steps
            </h2>
          </div>
        </div>

        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Card className="flex h-full flex-col rounded-2xl border-slate-800/80 bg-slate-950/80 p-4">
                <div className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-sky-300 ring-1 ring-slate-700/80">
                  {index + 1}
                </div>
                <h3 className="text-sm font-semibold text-slate-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400">{step.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-2 rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-950 via-slate-950 to-slate-900 px-6 py-6 text-center sm:px-10 sm:py-8">
        <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
          Ready to see your product in motion?
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Log in, drop a prompt, and generate a mock clip in under a minute.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href="/login">
            <Button size="md" className="text-xs">
              Login to dashboard
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="md" className="text-xs">
              Create free account
            </Button>
          </Link>
        </div>
      </section>

      <FAQ />
    </div>
  );
}

