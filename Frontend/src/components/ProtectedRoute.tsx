import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const {
    user,
    loading,
    isGuest,
  } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user && !isGuest) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;