/**
 * Options for Gemini API requests.
 */
export interface ApiRequestOptions extends RequestInit {
  timeout?: number;
}

/**
 * Payload structure for Gemini requests.
 */
export interface GeminiRequest {
  [key: string]: unknown;
}

/**
 * Payload structure for Gemini responses.
 */
export interface GeminiResponse {
  [key: string]: unknown;
}

/**
 * Wrapper for fetch requests to Gemini endpoints.
 * @param endpoint The API endpoint path.
 * @param options Additional fetch options and timeout.
 * @returns The parsed JSON response as a specific generic type.
 */
export async function fetchGemini<T = GeminiResponse>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(`/api/gemini${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`, {
      ...fetchOptions,
      signal: controller.signal
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } finally {
    clearTimeout(id);
  }
}
