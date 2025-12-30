import InfiniteScroll from "react-infinite-scroll-component";
import { UserData } from "./CardUser";
import { useCallback, useEffect, useState } from "react";
import { getUsersPaginated } from "@/src/infra/userApi";

const PAGE_SIZE = 4;

export default function UserInfiniteScroll() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadInitial = async () => {
      setIsLoading(true);
      const response = await getUsersPaginated(0, PAGE_SIZE); // Page bắt đầu từ 1
      console.log("Initial users loaded:", response);
      if (isMounted) {
        setUsers(response.data);
        setTotal(response.total);
        setCurrentPage(0);
        setHasMore(response.data.length < response.total);
        setIsLoading(false);
      }
    };

    loadInitial();

    return () => {
      isMounted = false;
    };
  }, []);

  // Load thêm khi scroll
  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = currentPage + 1; // Trang tiếp theo

    console.log("Loading page:", nextPage);
    const response = await getUsersPaginated(nextPage, PAGE_SIZE);
    console.log("Load more response:", response);

    if (response.data.length === 0) {
      setHasMore(false);
    } else {
      setUsers((prev) => [...prev, ...response.data]); // Nối thêm vào mảng cũ
      setCurrentPage(nextPage);
      // hasMore = false khi đã load hết (số items đã load >= total)
      setHasMore(users.length + response.data.length < response.total);
    }

    setIsLoading(false);
  }, [currentPage, users.length, isLoading, hasMore]);

  // Pull to refresh - kéo xuống để làm mới danh sách
  const handleRefresh = useCallback(async () => {
    console.log("Refreshing...");
    const response = await getUsersPaginated(0, PAGE_SIZE);
    setUsers(response.data);
    setTotal(response.total);
    setCurrentPage(0);
    setHasMore(response.data.length < response.total);
  }, []);

  return (
    <div id="scrollableDiv">
      {/* // id="scrollableDiv" dùng khi muốn scroll trong 1 div cố định nếu ko có
      mặc định là cả trang */}
      <InfiniteScroll
        dataLength={users.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<h4>Đang tải...</h4>}
        endMessage={<p>Đã hiển thị tất cả {total} người dùng</p>}
        // scrollThreshold - khi nào trigger load thêm:
        // 1 = chạm cuối mới load (mặc định)
        // 0.8 = còn 20% là load
        // 0.5 = scroll được 50% là load
        // "200px" = còn cách cuối 200px là load
        scrollThreshold={0.8}
        // ===== PULL TO REFRESH (kéo xuống để làm mới) =====
        // Bật tính năng pull-to-refresh
        pullDownToRefresh={true}
        // Hàm gọi khi user thả ra để refresh
        refreshFunction={handleRefresh}
        // Nội dung hiện khi đang kéo xuống (chưa đủ ngưỡng)
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center", color: "#999" }}>
            ↓ Kéo xuống để làm mới...
          </h3>
        }
        // Nội dung hiện khi đã kéo đủ ngưỡng (sẵn sàng thả)
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center", color: "#667eea" }}>
            ↑ Thả ra để refresh!
          </h3>
        }
        // Ngưỡng kéo bao nhiêu px mới trigger refresh (mặc định 100)
        pullDownToRefreshThreshold={120}
        // ===== INITIAL SCROLL POSITION =====
        // Vị trí scroll ban đầu (px từ top)
        // Hữu ích khi muốn scroll đến vị trí user đã xem trước đó
        // initialScrollY={200}
      >
        <div className="user-grid">
          {users.map((user) => (
            <div key={user.id} className="user-grid-item">
              <span className="user-id">{user.id}</span>
              <span className="user-name">{user.userName}</span>
              <span className="user-email">{user.email}</span>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
