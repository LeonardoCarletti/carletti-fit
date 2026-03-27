"use client";

import { useState } from "react";
import { useAuth } from "../providers";
import { useRouter } from "next/navigation";
import { loginAccessTokenApiV1AuthLoginPost } from "@fitness/api-client/src/services.gen";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Usar fetch nativo para garantir a serialização correta do OAuth2
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://172.18.4.34:8000";
      const response = await fetch(`${apiBaseUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "password",
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const resData = await response.json();

      if (resData.access_token) {
        login(resData.access_token);
        router.push("/dashboard");
      } else {
        setError("Invalid credentials or server error.");
      }
    } catch (err: any) {
      setError("Login failed: check your email and password.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="w-full max-w-md space-y-8 p-10 bg-[#131313] rounded-3xl border border-white/5 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Carletti Fit</h2>
          <p className="text-gray-400">Log in to your coach account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="coach@carletti.fit"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
