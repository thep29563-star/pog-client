"use client";
import { useEffect } from "react";

type NotificationProps = {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
  duration?: number; // ms
};

export default function Notification({
  message,
  type,
  onClose,
  duration = 3000,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded text-white shadow-lg ${colors[type]}`}
    >
      {message}
    </div>
  );
}
