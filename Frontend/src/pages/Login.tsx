import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { supabase } from "../lib/supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleGoogleLogin =
    async () => {
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });
    };

  const handleLogin = async () => {
    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  };

  const handleGuestLogin = () => {
    localStorage.setItem(
      "guest",
      "true"
    );

    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          PYQSBank
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="mb-4 w-full rounded border p-3"
        />

        <button
          onClick={handleLogin}
          className="mb-4 w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
        >
          Login
        </button>

        <Link
          to="/signup"
          className="mb-4 block w-full rounded bg-green-600 p-3 text-center text-white hover:bg-green-700"
        >
          Create Account
        </Link>

        <div className="mb-4 text-center">
          -------- OR --------
        </div>

        <button
          onClick={handleGuestLogin}
          className="mb-4 w-full rounded bg-gray-600 p-3 text-white hover:bg-gray-700"
        >
          Continue as Guest
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full rounded bg-black p-3 text-white"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;