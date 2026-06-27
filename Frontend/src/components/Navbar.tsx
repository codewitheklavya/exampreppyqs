import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const {
    user,
    logout,
    isGuest,
  } = useAuth();

  const navigate = useNavigate();

  const isAdmin =
    user?.email ===
    "codewitheklavya@gmail.com";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-600">
            PYQSBank
          </h1>
        </Link>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600"
          >
            PYQs
          </Link>

          {isGuest && (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
              Guest
            </span>
          )}

          {user && (
            <span className="hidden text-gray-600 md:block">
              {user.email}
            </span>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Admin Panel
            </Link>
          )}

          {!isGuest ? (
            user && (
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            )
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;