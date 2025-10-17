"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { isAuthenticatedAtom, userAtom } from "@/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const setUser = useSetAtom(userAtom);

  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "admin123",
    role: "siswa",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password && formData.role) {
        // Set auth state
        setIsAuthenticated(true);
        setUser({
          email: formData.email,
          name: "Admin User",
          role: formData.role,
        });

        // Success - redirect to dashboard
        router.push("/dashboard");
      } else {
        setError("Semua field harus diisi");
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2c3e50] p-4">
      {/* Logo Section */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-xl">
            M
          </div>
          <span className="text-2xl font-bold text-white">Madrasah AI</span>
        </div>
      </div>

      <div className="w-full max-w-md bg-[#34495e] rounded-lg shadow-2xl border border-[#3d5266]">
        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Login
            </h2>
            <p className="text-gray-300 text-sm">
              Sistem Manajemen Pendidikan Madrasah
            </p>
          </div>

          <DemoNotice />

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Login Sebagai
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#2c3e50] border border-[#3d5266] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                required
              >
                <option value="siswa" className="bg-[#2c3e50]">👨‍🎓 Siswa</option>
                <option value="guru" className="bg-[#2c3e50]">👨‍🏫 Guru</option>
                <option value="wali_kelas" className="bg-[#2c3e50]">👨‍💼 Wali Kelas</option>
                <option value="kepala_sekolah" className="bg-[#2c3e50]">👔 Kepala Sekolah</option>
              </select>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="nama@example.com"
                className="w-full px-4 py-3 bg-[#2c3e50] border border-[#3d5266] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Masukkan password"
                className="w-full px-4 py-3 bg-[#2c3e50] border border-[#3d5266] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="mt-2 text-right">
                <a href="#" className="text-sm text-green-400 hover:text-green-300">
                  Lupa password?
                </a>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900 bg-opacity-20 border border-red-700 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading && (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#3d5266]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#34495e] text-gray-400">atau login dengan</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#3d5266] rounded-lg hover:bg-[#2c3e50] transition-colors">
              <svg
                className="w-5 h-5 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-medium text-gray-300">Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#3d5266] rounded-lg hover:bg-[#2c3e50] transition-colors">
              <svg
                className="w-5 h-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm font-medium text-gray-300">GitHub</span>
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Belum punya akun?{" "}
              <a href="/register" className="text-green-400 hover:text-green-300 font-medium">
                Daftar di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoNotice() {
  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 p-[1px] shadow-md">
      <div className="rounded-2xl bg-white/95 p-4 text-sm text-emerald-900 shadow-inner backdrop-blur dark:bg-emerald-950/40 dark:text-emerald-50">
        Aplikasi ini merupakan demo. Untuk implementasi atau penggunaan, silakan
        hubungi{" "}
        <a
          href="https://wa.me/6281393480510"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-emerald-700 underline decoration-emerald-500 decoration-2 underline-offset-4 transition hover:text-emerald-900 dark:text-emerald-200 dark:hover:text-emerald-100"
        >
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path d="M12.04 2a9.95 9.95 0 00-8.5 15.16L2.2 22l5.05-1.32A9.95 9.95 0 0012.05 22C17.55 22 22 17.55 22 12.05 22 6.55 17.54 2 12.04 2zm0 17.96a7.96 7.96 0 01-4.07-1.1l-.29-.17-3 .79.8-2.92-.19-.3a7.96 7.96 0 1112.31-2.08 7.94 7.94 0 01-5.56 5.78zm4.36-5.95c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.23-.72-.64-1.21-1.42-1.35-1.66-.14-.24-.02-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.04.4 1.4.52.59.19 1.13.16 1.56.1.48-.07 1.43-.58 1.63-1.13.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28z" />
            </svg>
          </span>
          WA 6281393480510
        </a>
        .
      </div>
    </div>
  );
}
