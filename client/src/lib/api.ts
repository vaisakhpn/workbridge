const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

class ApiError extends Error {
  status: number;
  info: any;

  constructor(message: string, status: number, info?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.info = info;
  }
}

export const api = {
  getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('workbridge_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return headers;
  },

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = { ...this.getHeaders(), ...options.headers };
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let info;
      try {
        info = await response.json();
      } catch {
        info = null;
      }
      throw new ApiError(
        info?.message || `Request failed with status ${response.status}`,
        response.status,
        info
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  },

  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};
