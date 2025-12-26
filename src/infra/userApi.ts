import { fetcher } from "./api/api";
import { API_ENDPOINTS, getApiUrl } from "./api/config";

export async function getUser(
){
  try {
    const response = await fetcher(getApiUrl(API_ENDPOINTS.USER.GET_USER), {
      method: "GET",
    });
    console.log("User data fetched:", response);
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Đăng nhập thất bại";
    return {
      success: false,
      message: errorMessage,
    };
  }
}
