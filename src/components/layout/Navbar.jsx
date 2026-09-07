import { Menu, Bell, Search } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar({ onMenuClick }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      {/* Left */}

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

      {/* Right */}

      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 hover:bg-slate-100">
          <Bell size={21} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

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
