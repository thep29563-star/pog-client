import { HomeSever } from "@/src/components/Home/HomeSever";
import { mockUsers, USE_MOCK_DATA } from "@/src/data/mockData";
import { getUser } from "@/src/infra/userApi";

export default async function Home() {
  let users = [];

  // Sử dụng mock data nếu config bật hoặc API lỗi
  if (USE_MOCK_DATA) {
    users = mockUsers;
  } else {
    try {
      users = await getUser();
      // Nếu API trả về rỗng, dùng mock data
      if (!users || users.length === 0) {
        users = mockUsers;
      }
    } catch (error) {
      console.error("API Error, using mock data:", error);
      users = mockUsers;
    }
  }

  return <HomeSever users={users} />;
}
