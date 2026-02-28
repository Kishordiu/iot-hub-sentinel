import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { authApi } from "@/services/endpoints";
import socketService from "@/services/socket";
import type { User } from "@/types/models";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await authApi.me();
      setUser(data.user);
      socketService.connect(token);
    } catch {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("tenant_id");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const { data } = await authApi.login(email, password);
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("tenant_id", data.user.tenantId);
      setUser(data.user);
      socketService.connect(data.token);
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Login failed";
      setError(message);
      throw new Error(message);
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout().catch(() => {});
    localStorage.removeItem("auth_token");
    localStorage.removeItem("tenant_id");
    socketService.disconnect();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
