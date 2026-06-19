import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-xl font-bold">PYQSBank</h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">PYQs</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;