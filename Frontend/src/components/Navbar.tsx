import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-xl font-bold">PYQSBank</h1>

      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">PYQs</Link>

        {user ? (
          <>
            <span>{user.email}</span>

            <button
              onClick={logout}
              className="rounded bg-red-500 px-3 py-1 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;