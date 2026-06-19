import { supabase } from "../lib/supabase";

function Login() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Continue with Google
      </button>
    </div>
  );
}

export default Login;