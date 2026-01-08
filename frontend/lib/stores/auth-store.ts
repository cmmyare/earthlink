import { create } from "zustand";
import { apiClient } from "@/lib/api/client";

export interface User {
  id: string;
  email: string;
  credits: number;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  login: (payload: { email: string; password: string }) => Promise<void>;
  register: (payload: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,
  async login(payload) {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.login(payload);
      set({
        user: {
          id: response.user.id,
          email: response.user.email,
          credits: response.user.credits
        },
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed"
      });
      throw error;
    }
  },
  async register(payload) {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.register(payload);
      set({
        user: {
          id: response.user.id,
          email: response.user.email,
          credits: response.user.credits
        },
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Registration failed"
      });
      throw error;
    }
  },
  async logout() {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
    set({ user: null, error: null });
  },
  async checkAuth() {
    if (typeof window === "undefined") return;

    set({ isLoading: true });
    try {
      const response = await apiClient.getCurrentUser();
      set({
        user: {
          id: response.user.id,
          email: response.user.email,
          credits: response.user.credits
        },
        isLoading: false,
        isInitialized: true,
        error: null
      });
    } catch (error) {
      set({
        user: null,
        isLoading: false,
        isInitialized: true,
        error: null
      });
    }
  }
}));

