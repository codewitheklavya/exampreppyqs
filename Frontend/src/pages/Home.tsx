import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">
        Previous Year Question Bank
      </h1>

      <p className="mt-4">
        Access all previous year question papers in one place.
      </p>

      <p className="mt-6">
        {user ? `Logged in as ${user.email}` : "Not Logged In"}
      </p>
    </div>
  );
}

export default Home;