// Type cho Next.js fetch options
export interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

export interface FetcherOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

/**
 * Hàm fetcher chung để gọi API
 * @param url - URL endpoint
 * @param options - Các tùy chọn: method, headers, body, cache, next
 * @returns Promise với dữ liệu JSON từ response
 * @throws Error nếu request thất bại
 */
export async function fetcher(
  url: string,
  { method = "GET", headers = {}, body, cache, next }: FetcherOptions = {}
) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache, // no-store | force-cache
    next, // { revalidate: 60 }
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Fetch failed");
  }

  return res.json();
}
