import { Card } from "@/components/ui/Card";

interface VideoPreviewProps {
  isLoading: boolean;
  src?: string | null;
}

export function VideoPreview({ isLoading, src }: VideoPreviewProps) {
  return (
    <Card className="mt-4 flex h-64 items-center justify-center rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-0">
      {isLoading ? (
        <div className="flex flex-col items-center gap-3 text-xs text-slate-300">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
          <p className="text-xs text-slate-400">
            Synthesizing frames and soundtrack...
          </p>
        </div>
      ) : src ? (
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-transparent to-fuchsia-500/20" />
          <div className="flex h-full w-full items-center justify-center bg-slate-900">
            <span className="text-xs text-slate-200">
              Mock preview (video placeholder)
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center text-xs text-slate-500">
          <p>No video generated yet</p>
          <p className="max-w-xs text-[11px] text-slate-500">
            Describe the scene you want and NovaFlow will generate a short
            clip. Perfect for intros, explainers, and social content.
          </p>
        </div>
      )}
    </Card>
  );
}

