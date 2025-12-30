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
    // Thử gọi API thật
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
    // ❌ API lỗi → Dùng mock data
    console.warn("API không khả dụng, sử dụng mock data:", error);

    // Tính toán phân trang cho mock data
    const start = (page - 1) * pageSize; // page=1 → start=0
    const end = start + pageSize; // page=1 → end=4

    return {
      data: mockUsers.slice(start, end), // Lấy 4 items từ mock
      total: mockUsers.length, // Tổng số mock users (16)
      page: page,
      pageSize: pageSize,
    };
  }
}
