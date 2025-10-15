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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* HDD Usage */}
        <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
              <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
              <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
            </svg>
            <h3 className="text-lg font-semibold">HDD Usage</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Free Space</span>
              <span className="font-bold">132Gb</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Used space</span>
              <span className="font-bold">1,45Gb</span>
            </div>
            <div className="mt-4">
              <div className="h-20">
                <svg viewBox="0 0 200 60" className="w-full">
                  <polyline
                    points="0,40 20,35 40,42 60,30 80,38 100,28 120,35 140,32 160,29 180,35 200,30"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Earning */}
        <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-semibold">Earning</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Today</span>
              <span className="font-bold">$764</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Last 7 Day</span>
              <span className="font-bold">$1,332</span>
            </div>
            <div className="mt-4">
              <div className="h-20">
                <svg viewBox="0 0 200 60" className="w-full">
                  <polyline
                    points="0,45 20,38 40,42 60,35 80,40 100,32 120,38 140,30 160,35 180,28 200,32"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Sales */}
        <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <h3 className="text-lg font-semibold">Sales</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Today</span>
              <span className="font-bold">$764</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Last 7 Day</span>
              <span className="font-bold">$1,332</span>
            </div>
            <div className="mt-4 flex gap-1 items-end h-20">
              {[40, 60, 30, 70, 45, 80, 35, 65, 50, 75, 42, 68].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white bg-opacity-40 rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-semibold">Progress</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completed</span>
              <span className="font-bold">34</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total</span>
              <span className="font-bold">79</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="bg-white bg-opacity-40 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <div className="bg-white bg-opacity-40 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
              <div className="bg-white bg-opacity-40 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Chart & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
        <div className="space-y-4">
          {/* CPU Temperature */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Tips AI Hari Ini</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Manfaatkan fitur analisis AI untuk mengevaluasi perkembangan belajar siswa secara otomatis dan dapatkan rekomendasi metode pembelajaran yang lebih efektif.
        </p>
      </div>
    </div>
  );
}
