import { fetcher } from "./api/api";
import { API_ENDPOINTS, getApiUrl } from "./api/config";
import { mockUsers } from "../data/mockData";
import { UserData } from "../components/Home/components/CardUser";

export async function getUser() {
  try {
    const response = await fetcher(getApiUrl(API_ENDPOINTS.USER.GET_USER), {
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.warn("API không khả dụng, sử dụng mock data:", error);
    return mockUsers;
  }
}

// Response type cho paginated API
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Lấy users có phân trang (page, pageSize)
export async function getUsersPaginated(
  page: number,
  pageSize: number
): Promise<PaginatedResponse<UserData>> {
  try {
    const response = await fetcher(
      getApiUrl(`${API_ENDPOINTS.USER.GET_USER}?page=${page}&pageSize=${pageSize}`),
      { method: "GET" }
    );
    return {
      data: response.data,
      total: response.total,
      page: response.page,
      pageSize: response.pageSize,
    };
  } catch (error) {
    console.warn("API không khả dụng, sử dụng mock data:", error);
    // Mock phân trang
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      data: mockUsers.slice(start, end),
      total: mockUsers.length,
      page: page,
      pageSize: pageSize,
    };
  }
}
