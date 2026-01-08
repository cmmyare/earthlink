"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { VideoPreview } from "@/components/video/VideoPreview";
import { useVideoStore } from "@/lib/stores/video-store";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "generate";
  const { user } = useAuthStore();
  const {
    prompt,
    style,
    duration,
    aspectRatio,
    isGenerating,
    currentVideoUrl,
    currentStatus,
    library,
    error,
    setPrompt,
    setStyle,
    setDuration,
    setAspectRatio,
    generateVideo,
    loadLibrary
  } = useVideoStore();

  // Load library on mount
  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl gap-4 px-4 py-6 sm:px-6 lg:px-8">
      <Sidebar />

      <section className="flex flex-1 flex-col gap-4">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-semibold tracking-tight">
              {tab === "library"
                ? "My Videos"
                : tab === "pricing"
                  ? "Plan & usage"
                  : "Generate video"}
            </h1>
            <p className="mt-1 text-[11px] text-slate-400">
              {tab === "library"
                ? "Browse the clips you&apos;ve generated with NovaFlow."
                : tab === "pricing"
                  ? "Review what&apos;s included and upgrade when you&apos;re ready."
                  : "Describe the clip, pick a style, and let AI handle the rest."}
            </p>
          </div>

          <div className="hidden items-center gap-2 text-[11px] text-slate-400 sm:flex">
            <span>Credits</span>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-sky-400">
              {user?.credits ?? 0} remaining
            </span>
          </div>
        </header>

        {tab === "library" ? (
          <LibraryView library={library} />
        ) : tab === "pricing" ? (
          <PricingInlineView />
        ) : (
          <Card className="flex flex-1 flex-col rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-3">
                <label className="text-xs font-medium text-slate-300">
                  Prompt
                </label>
                <textarea
                  className="min-h-[120px] w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/70 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Example: 8 second vertical intro of a product unboxing with bold typography and upbeat lo-fi track."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <div className="w-full space-y-3 sm:w-64">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">
                    Style
                  </label>
                  <select
                    className="h-10 w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 text-xs text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/70"
                    value={style}
                    onChange={(e) =>
                      setStyle(e.target.value as typeof style)
                    }
                    disabled={isGenerating}
                  >
                    <option value="fun">Fun • punchy & animated</option>
                    <option value="calm">Calm • minimal & slow</option>
                    <option value="background">
                      Background • subtle loops
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    disabled={isGenerating}
                    className="h-10 w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 text-xs text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/70"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">
                    Aspect Ratio
                  </label>
                  <select
                    className="h-10 w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 text-xs text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/70"
                    value={aspectRatio}
                    onChange={(e) =>
                      setAspectRatio(e.target.value as typeof aspectRatio)
                    }
                    disabled={isGenerating}
                  >
                    <option value="16:9">16:9 • Widescreen</option>
                    <option value="9:16">9:16 • Vertical</option>
                    <option value="1:1">1:1 • Square</option>
                    <option value="4:3">4:3 • Classic</option>
                  </select>
                </div>

                <div className="space-y-1 rounded-lg border border-dashed border-slate-800/80 bg-slate-900/50 p-3 text-[11px] text-slate-400">
                  <p className="font-medium text-slate-300">
                    Generation tips
                  </p>
                  <ul className="mt-1 list-inside list-disc space-y-0.5">
                    <li>Mention format (vertical, square, 16:9)</li>
                    <li>Add motion verbs (&quot;slow pan&quot;, &quot;zoom
                      in&quot;)</li>
                    <li>Specify colors, pacing, and music vibe</li>
                  </ul>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-400">
                {error}
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                {currentStatus && (
                  <>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        currentStatus === "completed"
                          ? "bg-emerald-400"
                          : currentStatus === "failed"
                            ? "bg-rose-400"
                            : "bg-sky-400 animate-pulse"
                      }`}
                    />
                    <span className="capitalize">
                      Status: {currentStatus}
                      {currentStatus === "processing" && "..."}
                    </span>
                  </>
                )}
                {!currentStatus && (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>Ready to generate</span>
                  </>
                )}
              </div>

              <Button
                onClick={generateVideo}
                disabled={isGenerating || !prompt.trim()}
                className="text-xs"
              >
                {isGenerating
                  ? currentStatus === "queued"
                    ? "Queued..."
                    : currentStatus === "processing"
                      ? "Processing..."
                      : "Generating..."
                  : "Generate video"}
              </Button>
            </div>

            <VideoPreview
              isLoading={isGenerating && currentStatus !== "completed"}
              src={currentVideoUrl}
              status={currentStatus}
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={!currentVideoUrl || currentStatus !== "completed"}
                className="text-[11px]"
                onClick={() => {
                  if (currentVideoUrl) {
                    window.open(currentVideoUrl, "_blank");
                  }
                }}
              >
                {currentVideoUrl ? "View Video" : "Download (coming soon)"}
              </Button>
              <p className="text-[11px] text-slate-500">
                {currentStatus === "completed"
                  ? "Video generation complete. Click to view."
                  : "Export, brand kit, and timeline editing will be wired once the generation API is live."}
              </p>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}

function LibraryView({
  library
}: {
  library: ReturnType<typeof useVideoStore>["library"];
}) {
  return (
    <Card className="flex flex-1 flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5">
      {library.length === 0 ? (
        <p className="text-xs text-slate-400">
          You don&apos;t have any generated clips yet. Once you generate a
          video, it will appear here.
        </p>
      ) : (
        <div className="space-y-3">
          {library.map((video) => (
            <div
              key={video.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 px-3 py-3 text-xs"
            >
              <div className="space-y-1">
                <p className="line-clamp-2 text-slate-100">
                  {video.prompt}
                </p>
                <p className="text-[11px] text-slate-500">
                  {video.style} • {video.duration}s • {video.aspectRatio} •{" "}
                  {new Date(video.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
                {video.status === "failed" && video.errorMessage && (
                  <p className="text-[11px] text-rose-400">
                    {video.errorMessage}
                  </p>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-[11px]"
                disabled={!video.url || video.status !== "completed"}
                onClick={() => {
                  if (video.url) {
                    window.open(video.url, "_blank");
                  }
                }}
              >
                {video.status === "completed" && video.url
                  ? "View"
                  : video.status === "failed"
                    ? "Failed"
                    : "Processing"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function PricingInlineView() {
  return (
    <Card className="flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 text-xs">
      <p className="text-slate-300">
        For now, all generations inside this demo are free. When Stripe is
        wired, teams will be able to top up credits and manage seats here.
      </p>
    </Card>
  );
}

