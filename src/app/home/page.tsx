"use client";

import { useRouter } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";
import { isAuthenticatedAtom, userAtom } from "@/store/auth";

export default function HomePage() {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const setUser = useSetAtom(userAtom);

  const handleLogout = () => {
    // Clear auth state
    setIsAuthenticated(false);
    setUser(null);

    // Redirect to login
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <a className="btn btn-ghost text-lg sm:text-xl normal-case">
            Madrasah AI
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 sm:w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-base sm:text-lg font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge badge-sm">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero min-h-[calc(100vh-4rem)] bg-base-200 px-4">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Selamat Datang di Madrasah AI{user?.name && `, ${user.name}`}
            </h1>
            <p className="py-4 sm:py-6 text-base sm:text-lg px-4">
              Platform pembelajaran berbasis AI untuk meningkatkan kualitas
              pendidikan. Mulai perjalanan belajar Anda dengan teknologi terkini.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="btn btn-primary btn-md sm:btn-lg">
                Mulai Belajar
              </button>
              <button className="btn btn-outline btn-md sm:btn-lg">
                Lihat Kursus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="stats stats-vertical sm:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Siswa</div>
            <div className="stat-value text-primary">1,200</div>
            <div className="stat-desc">21% lebih banyak dari bulan lalu</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Kursus Tersedia</div>
            <div className="stat-value text-secondary">45</div>
            <div className="stat-desc">5 kursus baru ditambahkan</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Tingkat Kelulusan</div>
            <div className="stat-value text-accent">95%</div>
            <div className="stat-desc">Target tahun ini tercapai</div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          Kursus Populer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-6 sm:px-10 pt-6 sm:pt-10">
              <div className="w-full h-40 sm:h-48 bg-primary rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-primary-content"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Bahasa Arab</h2>
              <p>
                Pelajari bahasa Arab dari dasar hingga mahir dengan metode
                interaktif berbasis AI.
              </p>
              <div className="card-actions">
                <button className="btn btn-primary">Mulai Belajar</button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-6 sm:px-10 pt-6 sm:pt-10">
              <div className="w-full h-40 sm:h-48 bg-secondary rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-secondary-content"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Studi Islam</h2>
              <p>
                Pahami ajaran Islam secara komprehensif dengan panduan AI yang
                adaptif.
              </p>
              <div className="card-actions">
                <button className="btn btn-secondary">Mulai Belajar</button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-6 sm:px-10 pt-6 sm:pt-10">
              <div className="w-full h-40 sm:h-48 bg-accent rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-accent-content"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Al-Quran</h2>
              <p>
                Belajar membaca, menghafal, dan memahami Al-Quran dengan
                teknologi AI.
              </p>
              <div className="card-actions">
                <button className="btn btn-accent">Mulai Belajar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center bg-base-300 text-base-content p-6 sm:p-10">
        <aside>
          <p className="font-bold text-lg sm:text-xl">Madrasah AI</p>
          <p className="text-sm sm:text-base px-4">
            Platform pembelajaran berbasis AI untuk pendidikan Islam
          </p>
          <p className="text-xs sm:text-sm">
            Copyright © 2025 - All right reserved
          </p>
        </aside>
        <nav>
          <div className="grid grid-cols-2 sm:grid-flow-col gap-2 sm:gap-4 text-sm sm:text-base">
            <a className="link link-hover">Tentang Kami</a>
            <a className="link link-hover">Kontak</a>
            <a className="link link-hover">Kebijakan Privasi</a>
            <a className="link link-hover">Syarat & Ketentuan</a>
          </div>
        </nav>
      </footer>
    </div>
  );
}
