/**
 * Cấu hình API
 * Base URL có thể được cấu hình qua biến môi trường
 */

// Lấy base URL từ biến môi trường hoặc dùng default
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5135/api";

/**
 * Các endpoint API
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/LoginUser",
    REGISTER: "/RegisterUser",
    LOGOUT: "/logout",
  },
USER :{
    GET_USER: "/Users",
}
} as const;


export function getApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}
