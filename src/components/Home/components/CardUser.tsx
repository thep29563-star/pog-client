import Link from "next/link";
export interface UserData {
  id: string;
  userName: string;
  email: string;
  description?: string; // Dấu ? nghĩa là có thể null
}

interface UserCardProps {
  userData: UserData;
  isDragging?: boolean; // Ngăn click khi đang vuốt
}
export default function CardUser({
  userData,
  isDragging = false,
}: UserCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Ngăn click vào card khi đang vuốt slider
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      {" "}
      {/* Giữ nguyên class cũ để ăn CSS của bạn */}
      <div className="product-image">
        <div className="product-placeholder">
          {/* Icon User thay cho icon hộp */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
      <div className="product-content">
        <h3>{userData.userName}</h3>
        <p>{userData.email}</p> {/* Ưu tiên hiện mô tả, ko có thì hiện email */}
        <Link href={`/users/${userData.id}`} className="product-link">
          Xem chi tiết →
        </Link>
      </div>
    </div>
  );
}
