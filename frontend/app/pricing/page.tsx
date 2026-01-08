import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    credits: "20 credits / month",
    highlight: false,
    description: "Perfect for quick tests and side projects."
  },
  {
    name: "Pro",
    price: "$29",
    period: "month",
    credits: "400 credits / month",
    highlight: true,
    description: "For individual creators shipping content weekly."
  },
  {
    name: "Premium",
    price: "$99",
    period: "month",
    credits: "2,000 credits / month",
    highlight: false,
    description: "For teams, agencies, and product marketing squads."
  }
];

export default function PricingPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-sky-400">
          Pricing
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Pick a plan that scales with your studio
        </h1>
        <p className="mt-3 text-xs text-slate-400">
          All plans include access to the same generation engine. You only pay
          for additional credits and collaboration features.
        </p>
      </div>

      <div className="mt-8 grid w-full gap-5 md:grid-cols-3">
        {PLANS.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border-slate-800/80 bg-slate-950/85 p-6 ${
              plan.highlight
                ? "ring-1 ring-sky-500/70 shadow-soft"
                : "opacity-95"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-2 right-4 rounded-full bg-sky-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950">
                Most popular
              </span>
            )}
            <h2 className="text-sm font-semibold text-slate-50">
              {plan.name}
            </h2>
            <p className="mt-1 text-[11px] text-slate-400">
              {plan.description}
            </p>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-xl font-semibold text-slate-50">
                {plan.price}
              </span>
              <span className="text-[11px] text-slate-500">
                / {plan.period}
              </span>
            </div>

            <p className="mt-2 text-xs text-sky-400">{plan.credits}</p>

            <ul className="mt-4 space-y-1 text-[11px] text-slate-300">
              <li>• HD exports</li>
              <li>• Commercial usage</li>
              <li>• Brand-safe soundtrack library</li>
              {plan.name !== "Free" && <li>• Priority generation queue</li>}
            </ul>

            <Button
              className="mt-6 w-full text-xs"
              variant={plan.highlight ? "primary" : "outline"}
              disabled
            >
              Subscribe (coming soon)
            </Button>
            {/* TODO: replace with real API call (Stripe Checkout session) */}
          </Card>
        ))}
      </div>
    </div>
  );
}

