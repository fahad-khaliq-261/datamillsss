// ============================================
// NOTIFICATION COMPONENT
// Toast notification for success/error messages
// ============================================

import { Notification as NotificationType } from "@/types";

interface NotificationProps {
  notification: NotificationType | null;
}

export function Notification({ notification }: NotificationProps) {
  if (!notification) return null;

  const isSuccess = notification.type === "success";

  return (
    <div
      className={`
        fixed top-24 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl border 
        backdrop-blur-xl transition-all duration-300 animate-slide-in
        ${
          isSuccess
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }
      `}
    >
      <div className="flex items-center gap-3">
        {isSuccess ? (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        {notification.message}
      </div>
    </div>
  );
}

