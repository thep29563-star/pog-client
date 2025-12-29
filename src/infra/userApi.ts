import { fetcher } from "./api/api";
import { API_ENDPOINTS, getApiUrl } from "./api/config";
import { mockUsers } from "../data/mockData";

export async function getUser() {
  try {
    const response = await fetcher(getApiUrl(API_ENDPOINTS.USER.GET_USER), {
      method: "GET",
    });
    return response.data;
  } catch (error) {
    // API lỗi -> fallback sang mock data
    console.warn("API không khả dụng, sử dụng mock data:", error);
    return mockUsers;
  }
}
