import { useState, useCallback } from "react";
import useAppStore from "../store/useAppStore";

/**
 * USEAUTH HOOK
 * Handles authentication logic
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const logout = useAppStore((state) => state.logout);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      setError("");

      try {
        // Simulate API delay
        await new Promise((r) => setTimeout(r, 1200));

        if (!email || !password) {
          throw new Error("Please fill all fields.");
        }

        // In real app, make API call to backend
        setUser({
          name: email.split("@")[0],
          email,
          plan: "free",
          msgCount: 0,
          msgLimit: 20,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setUser],
  );

  const signup = useCallback(
    async (name, email, password) => {
      setLoading(true);
      setError("");

      try {
        // Simulate API delay
        await new Promise((r) => setTimeout(r, 1200));

        if (!name || !email || !password) {
          throw new Error("Please fill all fields.");
        }

        // In real app, make API call to backend
        setUser({
          name,
          email,
          plan: "free",
          msgCount: 0,
          msgLimit: 20,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setUser],
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout: handleLogout,
    isAuthenticated: !!user,
  };
};

export default useAuth;
