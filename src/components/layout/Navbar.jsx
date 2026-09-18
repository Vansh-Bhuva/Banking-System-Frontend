import { Menu, Bell, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../services/api/axios";

function Navbar({ onMenuClick }) {
  const { user } = useSelector((state) => state.auth);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchNotifications = async () => {
    try {
      const accountResponse = await api.get("/api/v1/accounts");

      if (accountResponse.data.length === 0) return;

      const accountNumber = accountResponse.data[0].accountNumber;

      const notificationResponse = await api.get(
        `/api/v1/notifications/${accountNumber}`,
      );

      setNotifications(notificationResponse.data);

      const unreadResponse = await api.get(
        `/api/v1/notifications/${accountNumber}/unread-count`,
      );

      setUnreadCount(unreadResponse.data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative rounded-lg p-2 hover:bg-slate-100"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-lg bg-white shadow-lg">
              <div className="border-b border-slate-200 p-3">
                <h3 className="font-semibold text-slate-800">
                  Notifications
                </h3>
              </div>

              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-slate-500">
                  No notifications
                </p>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="border-b border-slate-100 p-3 last:border-0"
                    >
                      <p className="font-medium text-slate-800">
                        {notification.subject}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {notification.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-slate-500">Customer</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;