const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    credits: number;
  };
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      credentials: "include", // Include cookies in requests
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error");
    }
  }

  async register(payload: {
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/users/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    if (response.data) {
      return response.data;
    }

    throw new Error(response.message || "Registration failed");
  }

  async login(payload: { email: string; password: string }): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    if (response.data) {
      return response.data;
    }

    throw new Error(response.message || "Login failed");
  }

  async logout(): Promise<void> {
    await this.request("/users/logout", {
      method: "POST"
    });
  }

  async getCurrentUser(): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/users/me", {
      method: "GET"
    });

    if (response.data) {
      return response.data;
    }

    throw new Error(response.message || "Failed to get user");
  }

  async generateVideo(payload: {
    prompt: string;
    style: string;
    duration: number;
    aspectRatio: string;
  }): Promise<{ jobId: string; status: string }> {
    const response = await this.request<{ jobId: string; status: string }>(
      "/videos/generate",
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    );

    if (response.data) {
      return response.data;
    }

    throw new Error(response.message || "Failed to generate video");
  }

  async getVideoJobStatus(jobId: string): Promise<{
    jobId: string;
    status: string;
    videoUrl: string | null;
    errorMessage: string | null;
    prompt: string;
    style: string;
    duration: number;
    aspectRatio: string;
    createdAt: string;
    updatedAt: string;
  }> {
    const response = await this.request<{
      jobId: string;
      status: string;
      videoUrl: string | null;
      errorMessage: string | null;
      prompt: string;
      style: string;
      duration: number;
      aspectRatio: string;
      createdAt: string;
      updatedAt: string;
    }>(`/videos/${jobId}`, {
      method: "GET"
    });

    if (response.data) {
      return response.data;
    }

    throw new Error(response.message || "Failed to get video job status");
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
