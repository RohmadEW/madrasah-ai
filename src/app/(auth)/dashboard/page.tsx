"use client";

export default function DashboardPage() {
  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard Madrasah AI
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Selamat datang di Sistem Manajemen Pendidikan Madrasah
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Platform berbasis AI untuk meningkatkan kualitas pendidikan madrasah. Kelola data siswa, guru, kurikulum, dan monitoring pembelajaran dengan lebih efisien.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Siswa */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          {/* Gradient Background Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>

          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Siswa</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">1,245</h3>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Tahun Ajaran 2024/2025</span>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12%
              </div>
            </div>
          </div>
        </div>

        {/* Total Guru */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          {/* Gradient Background Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>

          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Guru</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">87</h3>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Guru Aktif</span>
              <div className="flex items-center text-blue-500 text-xs font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                85 Orang
              </div>
            </div>
          </div>
        </div>

        {/* Kelas Aktif */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          {/* Gradient Background Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>

          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Kelas Aktif</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">36</h3>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Dari 40 Kelas</span>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                </div>
                90%
              </div>
            </div>
          </div>
        </div>

        {/* Rata-rata Nilai */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          {/* Gradient Background Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>

          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Rata-rata Nilai</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">84.5</h3>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Semester Ganjil</span>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                +3.2
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Chart & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Network</h2>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Upload Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Download Speed</span>
              </div>
            </div>
          </div>
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-end justify-between px-4 pb-4">
            {/* Simple chart representation */}
            <svg viewBox="0 0 800 200" className="w-full h-full">
              <defs>
                <linearGradient id="uploadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="downloadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Upload Speed - Green to Blue */}
              <path
                d="M0,120 L50,110 L100,125 L150,105 L200,115 L250,100 L300,110 L350,95 L400,105 L450,90 L500,100 L550,85 L600,95 L650,80 L700,90 L750,75 L800,85 L800,200 L0,200 Z"
                fill="url(#uploadGradient)"
              />
              <path
                d="M0,120 L50,110 L100,125 L150,105 L200,115 L250,100 L300,110 L350,95 L400,105 L450,90 L500,100 L550,85 L600,95 L650,80 L700,90 L750,75 L800,85"
                fill="none"
                stroke="#4ade80"
                strokeWidth="2"
              />

              {/* Download Speed - Blue */}
              <path
                d="M0,140 L50,135 L100,145 L150,130 L200,140 L250,125 L300,135 L350,120 L400,130 L450,115 L500,125 L550,110 L600,120 L650,105 L700,115 L750,100 L800,110 L800,200 L0,200 Z"
                fill="url(#downloadGradient)"
              />
              <path
                d="M0,140 L50,135 L100,145 L150,130 L200,140 L250,125 L300,135 L350,120 L400,130 L450,115 L500,125 L550,110 L600,120 L650,105 L700,115 L750,100 L800,110"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span>Oct-12</span>
            <span>Oct-18</span>
            <span>Oct-24</span>
            <span>Oct-30</span>
            <span>Nov-05</span>
            <span>Nov-11</span>
            <span>Nov-17</span>
            <span>Nov-23</span>
            <span>Nov-29</span>
          </div>
        </div>

        {/* System Info */}
        <div className="space-y-6">
          {/* CPU Temperature */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">CPU Temperature</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-gray-800 dark:text-white">
                  43.7 <span className="text-2xl">°C</span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Min Values <span className="ml-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-0.5 rounded text-xs">27°</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Max Values <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs">89°</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bandwidth Usage */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Bandwidth Usage</h3>
            <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              754.9 <span className="text-xl font-normal text-gray-600">Mbps</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">Income</span>
                <span className="font-semibold text-gray-800 dark:text-white">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tips */}
      <div className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              Tips AI Hari Ini
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Rekomendasi</span>
            </h3>
            <p className="text-white text-opacity-90 text-sm leading-relaxed">
              Manfaatkan fitur analisis AI untuk mengevaluasi perkembangan belajar siswa secara otomatis dan dapatkan rekomendasi metode pembelajaran yang lebih efektif.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
