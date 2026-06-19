import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Home() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email || "");
      }
    };

    getUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">
        Previous Year Question Bank
      </h1>

      <p className="mt-4">
        Access all previous year question papers in one place.
      </p>

      <p className="mt-6 font-semibold">
        Logged in as: {email || "Not Logged In"}
      </p>
    </div>
  );
}

export default Home;