import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isGuest: false,
  loginAsGuest: () => {},
  logout: async () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [isGuest, setIsGuest] =
    useState(false);

  const loginAsGuest = () => {
    localStorage.setItem("guest", "true");
    setIsGuest(true);
  };

  const logout = async () => {
    localStorage.removeItem("guest");
    setIsGuest(false);

    await supabase.auth.signOut();
  };

  useEffect(() => {
    const guest =
      localStorage.getItem("guest");

    if (guest === "true") {
      setIsGuest(true);
    }

    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);

        // If a real user logs in,
        // remove guest mode.
        if (session?.user) {
          localStorage.removeItem("guest");
          setIsGuest(false);
        }

        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isGuest,
        loginAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);