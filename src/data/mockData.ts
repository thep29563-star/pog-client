import { UserData } from "../components/Home/components/CardUser";

// ========== AUTH MOCK DATA ==========

// Interface cho user credentials (đăng nhập)
export interface MockUserCredential {
  id: string;
  userName: string;
  email: string;
  password: string; // Plain text password cho mock
  description?: string;
}

// Danh sách tài khoản mock để đăng nhập
export const mockUserCredentials: MockUserCredential[] = [
  {
    id: "1",
    userName: "admin",
    email: "admin@pog.com",
    password: "123456",
    description: "Tài khoản Admin",
  },
  {
    id: "2",
    userName: "user",
    email: "user@pog.com",
    password: "123456",
    description: "Tài khoản User thường",
  },
  {
    id: "3",
    userName: "test",
    email: "test@gmail.com",
    password: "test123",
    description: "Tài khoản Test",
  },
];

// Hàm mock đăng nhập
export const mockLogin = async (
  userName: string,
  passwordHash: string
): Promise<{
  success: boolean;
  message: string;
  userDto?: Omit<MockUserCredential, "password">;
}> => {
  // Giả lập delay như API thật
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Tìm user theo userName
  const user = mockUserCredentials.find(
    (u) => u.userName.toLowerCase() === userName.toLowerCase()
  );

  if (!user) {
    return {
      success: false,
      message: "Tên đăng nhập không tồn tại",
    };
  }

  // Check password (trong mock, passwordHash = password)
  if (user.password !== passwordHash) {
    return {
      success: false,
      message: "Mật khẩu không chính xác",
    };
  }

  // Trả về user info (không có password)
  const { password, ...userDto } = user;
  return {
    success: true,
    message: "Đăng nhập thành công",
    userDto,
  };
};

// Hàm mock đăng ký
export const mockRegister = async (
  userName: string,
  email: string,
  passwordHash: string
): Promise<{
  success: boolean;
  message: string;
  userDto?: Omit<MockUserCredential, "password">;
}> => {
  // Giả lập delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check userName đã tồn tại
  const existingUser = mockUserCredentials.find(
    (u) => u.userName.toLowerCase() === userName.toLowerCase()
  );
  if (existingUser) {
    return {
      success: false,
      message: "Tên đăng nhập đã tồn tại",
    };
  }

  // Check email đã tồn tại
  const existingEmail = mockUserCredentials.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existingEmail) {
    return {
      success: false,
      message: "Email đã được sử dụng",
    };
  }

  // Tạo user mới (trong thực tế sẽ lưu vào DB)
  const newUser: MockUserCredential = {
    id: String(mockUserCredentials.length + 1),
    userName,
    email,
    password: passwordHash,
    description: "Thành viên mới",
  };

  // Thêm vào danh sách (chỉ trong memory, refresh sẽ mất)
  mockUserCredentials.push(newUser);

  const { password, ...userDto } = newUser;
  return {
    success: true,
    message: "Đăng ký thành công",
    userDto,
  };
};

// ========== USER MOCK DATA ==========

// Fake data cho users
export const mockUsers: UserData[] = [
  {
    id: "1",
    userName: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    description: "Nhà phát triển Full Stack với 5 năm kinh nghiệm",
  },
  {
    id: "2",
    userName: "Trần Thị B",
    email: "tranthib@gmail.com",
    description: "UI/UX Designer chuyên nghiệp",
  },
  {
    id: "3",
    userName: "Lê Văn C",
    email: "levanc@gmail.com",
    description: "Project Manager với nhiều dự án thành công",
  },
  {
    id: "4",
    userName: "Phạm Thị D",
    email: "phamthid@gmail.com",
    description: "Backend Developer chuyên về Node.js",
  },
  {
    id: "5",
    userName: "Hoàng Văn E",
    email: "hoangvane@gmail.com",
    description: "DevOps Engineer với kinh nghiệm cloud",
  },
  {
    id: "6",
    userName: "Đỗ Thị F",
    email: "dothif@gmail.com",
    description: "Mobile Developer React Native",
  },
  {
    id: "7",
    userName: "Vũ Văn G",
    email: "vuvang@gmail.com",
    description: "Data Analyst và Business Intelligence",
  },
  {
    id: "8",
    userName: "Bùi Thị H",
    email: "buithih@gmail.com",
    description: "QA Engineer với kỹ năng automation testing",
  },
];

// Fake data cho products (nếu cần sau này)
export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sản phẩm A",
    price: 150000,
    description: "Mô tả sản phẩm A",
    category: "Điện tử",
  },
  {
    id: "2",
    name: "Sản phẩm B",
    price: 250000,
    description: "Mô tả sản phẩm B",
    category: "Thời trang",
  },
  {
    id: "3",
    name: "Sản phẩm C",
    price: 350000,
    description: "Mô tả sản phẩm C",
    category: "Gia dụng",
  },
  {
    id: "4",
    name: "Sản phẩm D",
    price: 450000,
    description: "Mô tả sản phẩm D",
    category: "Điện tử",
  },
];

export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";
