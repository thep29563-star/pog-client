import { fetcher, type FetcherOptions } from "./api/api";
import { getApiUrl, API_ENDPOINTS } from "./api/config";

/**
 * Types cho Authentication
 */
export interface LoginRequest {
  userName: string;
  passwordHash: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  passwordHash: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    success: boolean;
    message?: string;
    userDto: {
      id: string;
      userName: string;
      email: string;
      passwordHash?: string;
    };
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * API đăng nhập
 * @param credentials - userName và passwordHash
 * @param options - Tùy chọn bổ sung cho fetcher
 * @returns Promise với thông tin user và token
 */
export async function loginApi(
  credentials: LoginRequest,
  options?: FetcherOptions
): Promise<AuthResponse> {
  try {
    const response = await fetcher(getApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
      method: "POST",
      body: credentials,
      ...options,
    });
    if (response.success && response.userDto) {
      if (typeof window !== "undefined") {
        // Lưu userDto nhưng bỏ passwordHash
        const { passwordHash, ...safeUserDto } = response.userDto;
        localStorage.setItem("userDto", JSON.stringify(safeUserDto));
        console.log("response userDto:", safeUserDto);
      }
    }
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Đăng nhập thất bại";
    return {
      success: false,
      message: errorMessage,
    };
  }
}

/**
 * API đăng ký
 * @param userData - Thông tin đăng ký (userName, email, passwordHash)
 * @param options - Tùy chọn bổ sung cho fetcher
 * @returns Promise với thông tin user và token
 */
export async function registerApi(
  userData: RegisterRequest,
  options?: FetcherOptions
): Promise<AuthResponse> {
  try {
    const response = await fetcher(getApiUrl(API_ENDPOINTS.AUTH.REGISTER), {
      method: "POST",
      body: userData,
      ...options,
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Đăng ký thất bại";
    return {
      success: false,
      message: errorMessage,
    };
  }
}

/**
 * API đăng xuất
 * @param token - Access token
 * @param options - Tùy chọn bổ sung cho fetcher
 * @returns Promise với kết quả đăng xuất
 */
export async function logoutApi(
  token: string,
  options?: FetcherOptions
): Promise<{ success: boolean; message?: string }> {
  try {
    await fetcher(getApiUrl(API_ENDPOINTS.AUTH.LOGOUT), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });

    return {
      success: true,
      message: "Đăng xuất thành công",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Đăng xuất thất bại";
    return {
      success: false,
      message: errorMessage,
    };
  }
}

/**
 * API lấy thông tin profile
 * @param token - Access token
 * @param options - Tùy chọn bổ sung cho fetcher
 * @returns Promise với thông tin user
 */
export async function getProfileApi(
  token: string,
  options?: FetcherOptions
): Promise<AuthResponse> {
  try {
    const response = await fetcher(getApiUrl(API_ENDPOINTS.AUTH.PROFILE), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Lấy thông tin thất bại";
    return {
      success: false,
      message: errorMessage,
    };
  }
}

/**
 * API quên mật khẩu
 * @param email - Email của user
 * @param options - Tùy chọn bổ sung cho fetcher
 * @returns Promise với kết quả
 */
export async function forgotPasswordApi(
  email: string,
  options?: FetcherOptions
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetcher(
      getApiUrl(API_ENDPOINTS.AUTH.FORGOT_PASSWORD),
      {
        method: "POST",
        body: { email },
        ...options,
      }
    );

    return {
      success: true,
      message: response.message || "Email đặt lại mật khẩu đã được gửi",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Gửi email thất bại";
    return {
      success: false,
      message: errorMessage,
    };
  }
}
