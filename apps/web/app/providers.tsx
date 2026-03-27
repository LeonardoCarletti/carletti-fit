"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { client } from "@hey-api/client-fetch";
import { readUserMeApiV1AuthMeGet } from "@fitness/api-client/src/services.gen";

// Injetar baseUrl (padrão local se não houver env)
client.getConfig().baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://172.18.4.34:8000";

// Interceptor para injetar o token em todas as requisições
client.interceptors.request.use((request) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("@carletti:token") : null;
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  // Log para depuração em desenvolvimento
  console.log(`[API Request] ${request.method} ${request.url}`);
  return request;
});

client.interceptors.response.use((response) => {
  if (response.status === 401) {
    console.warn("[API 401] Unauthorized access - token may be invalid");
  }
  return response;
});

interface User {
  id: number;
  email: string;
  profile?: {
    full_name: string;
    avatar_url?: string;
  };
}

interface AuthContextData {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await readUserMeApiV1AuthMeGet();
      if (res.data) {
        setUser(res.data as User);
      }
    } catch (err) {
      console.error("Failed to fetch user me", err);
      // Opcional: logout() em caso de erro 401
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("@carletti:token");
    if (savedToken) {
      setToken(savedToken);
      fetchMe();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("@carletti:token", newToken);
    setToken(newToken);
    fetchMe();
  };

  const logout = () => {
    localStorage.removeItem("@carletti:token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
