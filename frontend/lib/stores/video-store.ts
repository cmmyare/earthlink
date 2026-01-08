import { create } from "zustand";

export type VideoStyle = "fun" | "calm" | "background";

interface GeneratedVideo {
  id: string;
  prompt: string;
  style: VideoStyle;
  createdAt: string;
  url: string;
}

interface VideoState {
  prompt: string;
  style: VideoStyle;
  isGenerating: boolean;
  currentVideoUrl: string | null;
  library: GeneratedVideo[];
  setPrompt: (value: string) => void;
  setStyle: (style: VideoStyle) => void;
  generateVideo: () => Promise<void>;
}

const MOCK_LIBRARY: GeneratedVideo[] = [
  {
    id: "1",
    prompt: "Futuristic city skyline at golden hour with flying cars",
    style: "fun",
    createdAt: "2h ago",
    url: "#"
  },
  {
    id: "2",
    prompt: "Soft abstract gradient background loop for product demo",
    style: "background",
    createdAt: "Yesterday",
    url: "#"
  }
];

export const useVideoStore = create<VideoState>((set, get) => ({
  prompt: "",
  style: "fun",
  isGenerating: false,
  currentVideoUrl: null,
  library: MOCK_LIBRARY,
  setPrompt: (value) => set({ prompt: value }),
  setStyle: (style) => set({ style }),
  async generateVideo() {
    const { prompt, style, library } = get();
    if (!prompt.trim()) return;

    set({ isGenerating: true });
    // TODO: replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1600));

    const id = Date.now().toString();
    const newVideo: GeneratedVideo = {
      id,
      prompt,
      style,
      createdAt: "Just now",
      url: "#"
    };

    set({
      isGenerating: false,
      currentVideoUrl: newVideo.url,
      library: [newVideo, ...library]
    });
  }
}));

