import { create } from "zustand";
import { apiClient } from "@/lib/api/client";

export type VideoStyle = "fun" | "calm" | "background";
export type VideoStatus = "queued" | "processing" | "completed" | "failed";
export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:3";

export interface GeneratedVideo {
  id: string;
  jobId: string;
  prompt: string;
  style: VideoStyle;
  duration: number;
  aspectRatio: AspectRatio;
  status: VideoStatus;
  createdAt: string;
  updatedAt: string;
  url: string | null;
  errorMessage: string | null;
}

interface VideoState {
  prompt: string;
  style: VideoStyle;
  duration: number;
  aspectRatio: AspectRatio;
  isGenerating: boolean;
  currentJobId: string | null;
  currentVideoUrl: string | null;
  currentStatus: VideoStatus | null;
  library: GeneratedVideo[];
  error: string | null;
  setPrompt: (value: string) => void;
  setStyle: (style: VideoStyle) => void;
  setDuration: (duration: number) => void;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  generateVideo: () => Promise<void>;
  checkJobStatus: (jobId: string) => Promise<void>;
  loadLibrary: () => Promise<void>;
}

const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export const useVideoStore = create<VideoState>((set, get) => ({
  prompt: "",
  style: "fun",
  duration: 8,
  aspectRatio: "16:9",
  isGenerating: false,
  currentJobId: null,
  currentVideoUrl: null,
  currentStatus: null,
  library: [],
  error: null,
  setPrompt: (value) => set({ prompt: value }),
  setStyle: (style) => set({ style }),
  setDuration: (duration) => set({ duration }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  async generateVideo() {
    const { prompt, style, duration, aspectRatio } = get();
    if (!prompt.trim()) {
      set({ error: "Please enter a prompt" });
      return;
    }

    set({ isGenerating: true, error: null, currentJobId: null, currentVideoUrl: null, currentStatus: null });

    try {
      const response = await apiClient.generateVideo({
        prompt: prompt.trim(),
        style,
        duration,
        aspectRatio
      });

      set({
        currentJobId: response.jobId,
        currentStatus: response.status as VideoStatus
      });

      // Start polling for job status
      get().checkJobStatus(response.jobId);
    } catch (error) {
      set({
        isGenerating: false,
        error: error instanceof Error ? error.message : "Failed to generate video"
      });
    }
  },
  async checkJobStatus(jobId: string) {
    try {
      const job = await apiClient.getVideoJobStatus(jobId);

      set({
        currentStatus: job.status as VideoStatus,
        currentVideoUrl: job.videoUrl
      });

      // If job is still processing or queued, poll again
      if (job.status === "queued" || job.status === "processing") {
        setTimeout(() => {
          get().checkJobStatus(jobId);
        }, 3000); // Poll every 3 seconds
      } else {
        // Job completed or failed
        set({ isGenerating: false });

        if (job.status === "completed" && job.videoUrl) {
          // Add to library and reload
          await get().loadLibrary();
        } else if (job.status === "failed") {
          set({
            error: job.errorMessage || "Video generation failed"
          });
        }
      }
    } catch (error) {
      console.error("Error checking job status:", error);
      set({
        isGenerating: false,
        error: error instanceof Error ? error.message : "Failed to check job status"
      });
    }
  },
  async loadLibrary() {
    // TODO: Implement GET /api/videos endpoint to fetch user's video library
    // For now, we'll keep the current job in the library if completed
    const { currentJobId, currentVideoUrl, currentStatus, prompt, style, duration, aspectRatio } = get();
    
    if (currentJobId && currentStatus === "completed" && currentVideoUrl) {
      const newVideo: GeneratedVideo = {
        id: currentJobId,
        jobId: currentJobId,
        prompt,
        style,
        duration,
        aspectRatio,
        status: currentStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        url: currentVideoUrl,
        errorMessage: null
      };

      set((state) => ({
        library: [newVideo, ...state.library.filter((v) => v.jobId !== currentJobId)]
      }));
    }
  }
}));

