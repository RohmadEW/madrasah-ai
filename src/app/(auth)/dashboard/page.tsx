"use client";

import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { Line, Doughnut, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardPage() {
  const [user] = useAtom(userAtom);
  const role = user?.role || "siswa";

  // Render dashboard berdasarkan role
  const renderDashboard = () => {
    switch (role) {
      case "guru":
        return <DashboardGuru />;
      case "wali_kelas":
        return <DashboardWaliKelas />;
      case "kepala_sekolah":
        return <DashboardKepalaSekolah />;
      case "orang_tua":
        return <DashboardOrangTua />;
      case "siswa":
      default:
        return <DashboardSiswa />;
    }
  };

  return renderDashboard();
}

// ============================================
// DASHBOARD SISWA - Pembelajaran Personal
// ============================================
function DashboardSiswa() {
  // Data untuk Line Chart - Progress Nilai
  const nilaiProgressData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Matematika",
        data: [75, 78, 82, 85, 87, 89],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
      },
      {
        label: "Bahasa Indonesia",
        data: [80, 82, 85, 83, 88, 90],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
      {
        label: "IPA",
        data: [70, 73, 75, 78, 80, 82],
        borderColor: "rgb(168, 85, 247)",
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        tension: 0.4,
      },
    ],
  };

  // Data untuk Doughnut Chart - Status Tugas
  const tugasStatusData = {
    labels: ["Selesai", "Dalam Progress", "Overdue"],
    datasets: [
      {
        data: [12, 3, 2],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgb(16, 185, 129)",
          "rgb(59, 130, 246)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-8 relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Siswa</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Selamat Datang di Portal Pembelajaran AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards untuk Siswa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Nilai Rata-rata */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Nilai Rata-rata</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">85.5</h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Semester Ini</span>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +2.5
              </div>
            </div>
          </div>
        </div>

        {/* Tugas Aktif */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Tugas Aktif</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">5</h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Deadline Minggu Ini</span>
              <div className="flex items-center text-red-500 text-xs font-medium">
                3 Urgent
              </div>
            </div>
          </div>
        </div>

        {/* Streak Belajar */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Streak Belajar</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">15</h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Hari Berturut-turut</span>
              <div className="flex items-center text-orange-500 text-xs font-medium">
                🔥 On Fire!
              </div>
            </div>
          </div>
        </div>

        {/* Poin Gamifikasi */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Poin Belajar</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">1,250</h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Level 12</span>
              <div className="flex items-center text-blue-500 text-xs font-medium">
                +50 Hari Ini
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Progress Nilai Chart - 2 kolom */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Progress Nilai per Mata Pelajaran</h3>
          <div style={{ height: "300px" }}>
            <Line data={nilaiProgressData} options={chartOptions} />
          </div>
        </div>

        {/* Status Tugas Chart - 1 kolom */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Status Tugas</h3>
          <div style={{ height: "300px" }}>
            <Doughnut data={tugasStatusData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Jadwal Hari Ini & Tugas Mendesak */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Jadwal Kelas Hari Ini */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Jadwal Kelas Hari Ini</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Waktu</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Mata Pelajaran</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Guru</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">07:30 - 08:45</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Matematika</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Pak Ahmad</td>
                  <td className="py-3 px-2"><span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Hadir</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">09:00 - 10:15</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Bahasa Indonesia</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Bu Siti</td>
                  <td className="py-3 px-2"><span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Hadir</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">10:30 - 11:45</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">IPA</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Pak Budi</td>
                  <td className="py-3 px-2"><span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Berlangsung</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">13:00 - 14:15</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Olahraga</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Pak Joko</td>
                  <td className="py-3 px-2"><span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Belum Mulai</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tugas Mendesak */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tugas Mendesak</h3>
          <div className="space-y-3">
            {[
              { mapel: "Matematika", judul: "Soal Latihan Bab 5", deadline: "Besok, 10:00", status: "urgent" },
              { mapel: "Bahasa Indonesia", judul: "Essay tentang Lingkungan", deadline: "2 hari lagi", status: "urgent" },
              { mapel: "IPA", judul: "Laporan Praktikum", deadline: "3 hari lagi", status: "warning" },
              { mapel: "PKN", judul: "Analisis UUD 1945", deadline: "5 hari lagi", status: "normal" },
            ].map((tugas, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full font-medium">
                        {tugas.mapel}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{tugas.judul}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span className={tugas.status === "urgent" ? "text-red-500 font-medium" : tugas.status === "warning" ? "text-orange-500" : "text-gray-500"}>
                        ⏰ {tugas.deadline}
                      </span>
                    </p>
                  </div>
                  <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">Kerjakan</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Tips */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative p-8 flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Rekomendasi AI Hari Ini</h3>
              <span className="text-xs bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1.5 rounded-full font-medium shadow-sm">
                ✨ Untuk Kamu
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              Berdasarkan analisis perkembangan belajarmu, kami merekomendasikan untuk fokus pada materi Matematika bab Fungsi. Kamu bisa menggunakan fitur AI Tutor untuk bimbingan lebih lanjut dan Latihan Adaptif untuk latihan soal yang disesuaikan dengan kemampuanmu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DASHBOARD GURU - Pengajaran & Analisis
// ============================================
function DashboardGuru() {
  // Data untuk Bar Chart - Perbandingan Nilai per Kelas
  const nilaiPerKelasData = {
    labels: ["VII-A", "VII-B", "VIII-A", "VIII-B", "IX-A", "IX-B"],
    datasets: [
      {
        label: "Rata-rata Nilai",
        data: [82, 78, 85, 80, 88, 84],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 2,
      },
    ],
  };

  // Data untuk Line Chart - Trend Kehadiran
  const kehadiranTrendData = {
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    datasets: [
      {
        label: "Tingkat Kehadiran",
        data: [92, 94, 91, 95],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-8 relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Guru</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Portal Pengajaran & Analisis AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards untuk Guru */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Kelas */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Kelas</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">6</h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">240 Total Siswa</span>
              <div className="flex items-center text-blue-500 text-xs font-medium">
                3 Tingkat
              </div>
            </div>
          </div>
        </div>

        {/* Tugas Perlu Dinilai */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Perlu Dinilai</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">23</h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Tugas Masuk</span>
              <div className="flex items-center text-red-500 text-xs font-medium">
                5 Urgent
              </div>
            </div>
          </div>
        </div>

        {/* RPP Generated */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">RPP AI</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">45</h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Bulan Ini</span>
              <div className="flex items-center text-green-500 text-xs font-medium">
                +12 Baru
              </div>
            </div>
          </div>
        </div>

        {/* Rata-rata Kelas */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Rata-rata</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">83.2</h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">Semua Kelas</span>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +1.8
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart - Nilai per Kelas */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Perbandingan Nilai per Kelas</h3>
          <div style={{ height: "300px" }}>
            <Bar data={nilaiPerKelasData} options={chartOptions} />
          </div>
        </div>

        {/* Line Chart - Trend Kehadiran */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Trend Kehadiran Siswa (Bulan Ini)</h3>
          <div style={{ height: "300px" }}>
            <Line data={kehadiranTrendData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Tugas Perlu Dinilai */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tugas Perlu Dinilai</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Siswa</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Kelas</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Judul</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Ahmad Rizki</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">IX-A</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Essay Matematika</td>
                  <td className="py-3 px-2"><span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">Besok</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Siti Nurhaliza</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">VIII-B</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Soal Latihan 5</td>
                  <td className="py-3 px-2"><span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">2 hari</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Budi Santoso</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">VII-A</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">PR Bab 3</td>
                  <td className="py-3 px-2"><span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">5 hari</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Dewi Kartika</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">IX-B</td>
                  <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">Tugas Akhir</td>
                  <td className="py-3 px-2"><span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">1 minggu</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Siswa Perlu Perhatian */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Siswa Perlu Perhatian</h3>
          <div className="space-y-3">
            {[
              { nama: "Andi Wijaya", kelas: "VIII-A", masalah: "Nilai menurun 15%", nilai: 65, status: "critical" },
              { nama: "Lina Sari", kelas: "IX-A", masalah: "Absen 3x minggu ini", nilai: 78, status: "warning" },
              { nama: "Rudi Hartono", kelas: "VII-B", masalah: "Tugas sering terlambat", nilai: 72, status: "warning" },
              { nama: "Maya Putri", kelas: "VIII-B", masalah: "Partisipasi rendah", nilai: 80, status: "info" },
            ].map((siswa, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{siswa.nama}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{siswa.kelas}</p>
                  </div>
                  <span className={`text-lg font-bold ${siswa.status === "critical" ? "text-red-500" : siswa.status === "warning" ? "text-orange-500" : "text-blue-500"}`}>
                    {siswa.nilai}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600 dark:text-gray-400">{siswa.masalah}</p>
                  <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">Lihat Detail</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button className="p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="font-medium">Buat RPP dengan AI</span>
        </button>
        <button className="p-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="font-medium">Generate Soal AI</span>
        </button>
        <button className="p-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span className="font-medium">Nilai Otomatis AI</span>
        </button>
      </div>

      {/* AI Tips */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative p-8 flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Rekomendasi AI untuk Guru</h3>
              <span className="text-xs bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1.5 rounded-full font-medium shadow-sm">
                Analisis AI
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              Berdasarkan analisis data, 4 siswa di kelas VIII-A menunjukkan penurunan nilai signifikan. Gunakan fitur AI Analisis untuk mengidentifikasi pola pembelajaran dan AI RPP Generator untuk menyesuaikan metode pengajaran yang lebih efektif.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardWaliKelas() {
  const kehadiranKelasData = {
    labels: ["VII-A", "VII-B", "VIII-A", "VIII-B", "IX-A"],
    datasets: [
      {
        label: "Kehadiran (%)",
        data: [96, 92, 94, 90, 95],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
        borderRadius: 12,
      },
    ],
  };

  const komunikasiOrtuData = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        label: "Pesan Masuk",
        data: [9, 12, 10, 14, 16, 8, 6],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "rgb(16, 185, 129)",
      },
    ],
  };

  const kesehatanKelasData = {
    labels: ["Kehadiran", "Kedisiplinan", "Tugas Tepat Waktu", "Partisipasi", "Kebahagiaan"],
    datasets: [
      {
        label: "Kelas Binaan",
        data: [92, 88, 85, 90, 82],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.25)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(16, 185, 129)",
      },
      {
        label: "Rata-rata Tingkat",
        data: [88, 82, 80, 84, 79],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(59, 130, 246)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        suggestedMin: 40,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          showLabelBackdrop: false,
        },
        angleLines: {
          color: "rgba(148, 163, 184, 0.2)",
        },
        grid: {
          color: "rgba(148, 163, 184, 0.2)",
        },
        pointLabels: {
          font: {
            size: 12,
          },
          color: "#475569",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  const statCards = [
    {
      title: "Kehadiran Hari Ini",
      value: "96%",
      caption: "Target 94%",
      trend: "+1.8%",
      trendLabel: "vs minggu lalu",
      trendColor: "text-emerald-500",
      icon: "📋",
    },
    {
      title: "Siswa Perlu Perhatian",
      value: "7",
      caption: "3 kategori prioritas",
      trend: "2 baru",
      trendLabel: "minggu ini",
      trendColor: "text-orange-500",
      icon: "🧭",
    },
    {
      title: "Interaksi Orang Tua",
      value: "48",
      caption: "Pesan 7 hari terakhir",
      trend: "+12%",
      trendLabel: "naik",
      trendColor: "text-emerald-500",
      icon: "💬",
    },
    {
      title: "Agenda Pekan Ini",
      value: "5",
      caption: "Event sekolah & kelas",
      trend: "2 hari lagi",
      trendLabel: "PTS dimulai",
      trendColor: "text-sky-500",
      icon: "🗓️",
    },
  ];

  const agendaKelas = [
    {
      title: "Parent Teacher Conference",
      schedule: "Rabu, 15.30",
      type: "Pertemuan Orang Tua",
      status: "Siapkan laporan progres",
    },
    {
      title: "Monitoring Kelas VIII-B",
      schedule: "Kamis, 09.00",
      type: "Observasi Kelas",
      status: "Fokus pada partisipasi",
    },
    {
      title: "Pengumpulan RPP Kolaboratif",
      schedule: "Jumat, 12.00",
      type: "Administrasi",
      status: "Verifikasi 3 guru",
    },
  ];

  const siswaButuhPerhatian = [
    {
      name: "Dimas Setiawan",
      kelas: "VIII-B",
      concern: "Konsistensi tugas",
      trend: "3 tugas terlambat",
      severity: "warning" as const,
    },
    {
      name: "Putri Ayu",
      kelas: "VII-A",
      concern: "Mood belajar turun",
      trend: "2 kali absen",
      severity: "info" as const,
    },
    {
      name: "Rifky Pratama",
      kelas: "IX-A",
      concern: "Nilai matematika",
      trend: "rerata 72",
      severity: "critical" as const,
    },
  ];

  const updateOrtu = [
    {
      parent: "Ibu Amira",
      child: "Putri Ayu",
      message: "Konfirmasi hadir sesi konsultasi kamis.",
      timestamp: "1 jam lalu",
    },
    {
      parent: "Bapak Rudi",
      child: "Rifky",
      message: "Minta materi tambahan untuk algebra.",
      timestamp: "Kemarin",
    },
    {
      parent: "Ibu Sari",
      child: "Dimas",
      message: "Berbagi insight pola belajar di rumah.",
      timestamp: "2 hari lalu",
    },
  ];

  return (
    <div>
      <div className="mb-8 relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m4 0h-4m4 0v10a2 2 0 01-2 2h-4m6-12l-2 0M8 7H4m4 0v10a2 2 0 002 2h4m-6-12l-2 0"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Wali Kelas</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Monitor keseharian kelas dan kolaborasi orang tua</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.title} className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg text-2xl">
                  {card.icon}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{card.value}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">{card.caption}</span>
                <div className={`flex items-center gap-1 text-xs font-medium ${card.trendColor}`}>
                  <span>{card.trend}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-normal">{card.trendLabel}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Rekap Kehadiran Kelas</h3>
          <div style={{ height: "320px" }}>
            <Bar data={kehadiranKelasData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Skor Kesehatan Kelas</h3>
          <div style={{ height: "320px" }}>
            <Radar data={kesehatanKelasData} options={radarOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Aktivitas Komunikasi Orang Tua</h3>
            <span className="text-xs font-semibold text-blue-500 bg-blue-100/80 dark:bg-blue-500/10 dark:text-blue-300 px-3 py-1 rounded-full">Realtime</span>
          </div>
          <div style={{ height: "280px" }}>
            <Line data={komunikasiOrtuData} options={chartOptions} />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-4 py-3">
              <p className="font-semibold text-gray-800 dark:text-white">Topik Terbanyak</p>
              <p className="text-xs mt-1">Konsultasi progres PTS</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-4 py-3">
              <p className="font-semibold text-gray-800 dark:text-white">Respons Rata-rata</p>
              <p className="text-xs mt-1">17 menit</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Agenda & Follow-up Pekan Ini</h3>
          <div className="space-y-4">
            {agendaKelas.map((agenda) => (
              <div key={agenda.title} className="rounded-2xl border border-gray-100 dark:border-gray-700 px-4 py-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800 dark:text-white">{agenda.title}</h4>
                  <span className="text-xs font-semibold text-emerald-500 bg-emerald-100/70 dark:bg-emerald-500/10 dark:text-emerald-300 px-3 py-1 rounded-full">
                    {agenda.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{agenda.schedule}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{agenda.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Siswa Butuh Perhatian</h3>
            <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {siswaButuhPerhatian.map((siswa) => (
              <div key={siswa.name} className="rounded-2xl border border-gray-100 dark:border-gray-700 px-4 py-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{siswa.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{siswa.kelas}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      siswa.severity === "critical"
                        ? "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-300"
                        : siswa.severity === "warning"
                        ? "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"
                    }`}
                  >
                    {siswa.trend}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{siswa.concern}</p>
                <div className="mt-3 flex items-center justify-between">
                  <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">Rencana Intervensi</button>
                  <button className="text-xs text-emerald-500 hover:text-emerald-600 font-medium">Hubungi Orang Tua</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Update Terakhir dari Orang Tua</h3>
          <div className="space-y-4">
            {updateOrtu.map((update) => (
              <div key={update.parent} className="rounded-2xl bg-gray-50 dark:bg-gray-900/40 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{update.parent}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Orang tua {update.child}</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{update.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{update.message}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-lg">
              📊 Laporan Singkat
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-lg">
              🤝 Atur Konsultasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardKepalaSekolah() {
  const performaAkademikData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Rata-rata Nilai",
        data: [78, 80, 81, 83, 85, 86],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "rgb(16, 185, 129)",
      },
      {
        label: "Kehadiran (%)",
        data: [94, 93, 95, 96, 95, 97],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.12)",
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
      },
    ],
  };

  const pemanfaatanProgramData = {
    labels: ["AI Mentor", "AI Tutor", "Generator RPP", "Dashboard Kepala", "Analitik"],
    datasets: [
      {
        label: "Sekolah",
        data: [82, 74, 68, 91, 76],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 2,
        borderRadius: 12,
      },
    ],
  };

  const alokasiAnggaranData = {
    labels: ["Pengembangan Guru", "Teknologi AI", "Beasiswa", "Program Karakter"],
    datasets: [
      {
        data: [35, 30, 20, 15],
        backgroundColor: [
          "rgba(16, 185, 129, 0.85)",
          "rgba(59, 130, 246, 0.85)",
          "rgba(168, 85, 247, 0.85)",
          "rgba(249, 115, 22, 0.85)",
        ],
        borderColor: [
          "rgb(16, 185, 129)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
          "rgb(249, 115, 22)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  const indikatorSekolah = [
    {
      title: "Total Siswa",
      value: "1.280",
      caption: "54 kelas aktif",
      trend: "+3.2%",
      trendLabel: "pertumbuhan",
      trendColor: "text-emerald-500",
      icon: "🎓",
    },
    {
      title: "Rata-rata Nilai",
      value: "84.2",
      caption: "Semester berjalan",
      trend: "+2.1 pts",
      trendLabel: "vs semester lalu",
      trendColor: "text-emerald-500",
      icon: "📈",
    },
    {
      title: "Guru Aktif AI",
      value: "86%",
      caption: "126 dari 147 guru",
      trend: "+9%",
      trendLabel: "adopsi fitur",
      trendColor: "text-sky-500",
      icon: "🤖",
    },
    {
      title: "Budget Terserap",
      value: "72%",
      caption: "Program transformasi",
      trend: "On track",
      trendLabel: "Q2",
      trendColor: "text-emerald-500",
      icon: "💰",
    },
  ];

  const agendaStrategis = [
    {
      title: "Review Kurikulum AI",
      owner: "Tim Kurikulum",
      deadline: "20 Mei 2024",
      status: "Dalam Progress",
      statusColor: "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300",
    },
    {
      title: "Pelatihan Guru Batch 3",
      owner: "Divisi SDM",
      deadline: "27 Mei 2024",
      status: "Terjadwal",
      statusColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
    },
    {
      title: "Audit Data Akademik",
      owner: "Unit QA",
      deadline: "30 Mei 2024",
      status: "Perlu Perhatian",
      statusColor: "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300",
    },
  ];

  const alertSekolah = [
    {
      label: "Kehadiran kelas IX-B turun 4%",
      action: "Koordinasi dengan wali kelas",
      severity: "warning" as const,
    },
    {
      label: "Laporan keuangan Q1 siap ditinjau",
      action: "Cek dashboard finance",
      severity: "info" as const,
    },
    {
      label: "Program AI Tutor butuh konten baru",
      action: "Kolaborasi dengan tim konten",
      severity: "critical" as const,
    },
  ];

  return (
    <div>
      <div className="mb-8 relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-3 3-3-3m3 3V10m6 4h3l-9-13-9 13h3v8h12v-8z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Kepala Sekolah</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Gambaran makro performa sekolah & transformasi AI</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {indikatorSekolah.map((item) => (
          <div key={item.title} className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg text-2xl">
                  {item.icon}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{item.value}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.caption}</span>
                <div className={`flex items-center gap-1 text-xs font-medium ${item.trendColor}`}>
                  <span>{item.trend}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-normal">{item.trendLabel}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Performa Akademik & Kehadiran</h3>
          <div style={{ height: "320px" }}>
            <Line data={performaAkademikData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Alokasi Anggaran Transformasi</h3>
          <div style={{ height: "320px" }}>
            <Doughnut data={alokasiAnggaranData} options={chartOptions} />
          </div>
          <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <p className="flex items-center justify-between">
              <span>Penyerapan anggaran</span>
              <span className="font-semibold text-emerald-500">72%</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Budget tersisa</span>
              <span className="font-semibold text-blue-500">28%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Pemanfaatan Program AI</h3>
          <div style={{ height: "280px" }}>
            <Bar data={pemanfaatanProgramData} options={chartOptions} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-4 py-3">
              <p className="font-semibold text-gray-800 dark:text-white">Program Terpopuler</p>
              <p className="text-xs mt-1">Dashboard Kepala 91%</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-4 py-3">
              <p className="font-semibold text-gray-800 dark:text-white">Perlu Diperkuat</p>
              <p className="text-xs mt-1">Generator RPP 68%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Agenda Strategis</h3>
          <div className="space-y-4">
            {agendaStrategis.map((agenda) => (
              <div key={agenda.title} className="rounded-2xl border border-gray-100 dark:border-gray-700 px-4 py-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">{agenda.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Penanggung jawab: {agenda.owner}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Deadline: {agenda.deadline}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${agenda.statusColor}`}>{agenda.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <button className="flex-1 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-lg">
              📊 Lihat KPI Sekolah
            </button>
            <button className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-lg">
              🤝 Panel Kolaborasi
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Alert & Insight Penting</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">Kelola alert</button>
        </div>
        <div className="space-y-4">
          {alertSekolah.map((alert, index) => (
            <div key={index} className="rounded-2xl bg-gray-50 dark:bg-gray-900/40 px-4 py-4 flex items-start gap-3">
              <span
                className={`text-lg ${
                  alert.severity === "critical"
                    ? "text-red-500"
                    : alert.severity === "warning"
                    ? "text-orange-500"
                    : "text-sky-500"
                }`}
              >
                {alert.severity === "critical" ? "⚠️" : alert.severity === "warning" ? "🛎️" : "ℹ️"}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{alert.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.action}</p>
              </div>
              <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">Detail</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardOrangTua() {
  const perkembanganNilaiData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Rata-rata Nilai",
        data: [82, 84, 85, 87, 88, 90],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
      },
      {
        label: "Target Keluarga",
        data: [80, 82, 84, 86, 88, 89],
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.12)",
        tension: 0.35,
        fill: true,
        borderDash: [8, 4],
        pointRadius: 0,
      },
    ],
  };

  const pembagianWaktuData = {
    labels: ["Belajar Mandiri", "Kegiatan Sekolah", "Ekstrakurikuler", "Istirahat"],
    datasets: [
      {
        data: [35, 30, 20, 15],
        backgroundColor: [
          "rgba(16, 185, 129, 0.85)",
          "rgba(59, 130, 246, 0.85)",
          "rgba(236, 72, 153, 0.85)",
          "rgba(249, 115, 22, 0.85)",
        ],
        borderColor: [
          "rgb(16, 185, 129)",
          "rgb(59, 130, 246)",
          "rgb(236, 72, 153)",
          "rgb(249, 115, 22)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  const statCards = [
    {
      title: "Nilai Rata-rata",
      value: "90",
      caption: "Naik 5 poin dari semester lalu",
      trend: "+5 pts",
      trendColor: "text-emerald-500",
      icon: "🏆",
    },
    {
      title: "Tugas Selesai",
      value: "24",
      caption: "dari 26 tugas bulan ini",
      trend: "92%",
      trendColor: "text-emerald-500",
      icon: "✅",
    },
    {
      title: "Mood Belajar",
      value: "Bahagia",
      caption: "3 hari berturut-turut",
      trend: "Stabil",
      trendColor: "text-sky-500",
      icon: "😊",
    },
    {
      title: "Streak Belajar",
      value: "11",
      caption: "Hari konsisten",
      trend: "+3",
      trendColor: "text-emerald-500",
      icon: "🔥",
    },
  ];

  const jadwalPekanIni = [
    {
      waktu: "Sen, 07.30",
      kegiatan: "Presentasi IPA",
      catatan: "Cek ulang slide eksperimen",
      status: "Siap",
      statusColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
    },
    {
      waktu: "Rabu, 15.00",
      kegiatan: "Ekstrakurikuler Musik",
      catatan: "Bawa partitur baru",
      status: "Latihan",
      statusColor: "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300",
    },
    {
      waktu: "Sabtu, 09.00",
      kegiatan: "Bimbingan AI Tutor",
      catatan: "Topik: Persamaan Kuadrat",
      status: "Terjadwal",
      statusColor: "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300",
    },
  ];

  const insightAnak = [
    {
      title: "Kekuatan",
      detail: "Pemahaman konsep IPA meningkat drastis, teruskan eksplorasi eksperimen di rumah.",
      icon: "🌟",
    },
    {
      title: "Fokus Pekan Ini",
      detail: "Matematika bab Persamaan Kuadrat, gunakan AI Mentor untuk latihan adaptif.",
      icon: "🎯",
    },
    {
      title: "Kolaborasi Ortu",
      detail: "Dukung rutinitas tidur lebih awal menjelang PTS agar fokus tetap optimal.",
      icon: "🤝",
    },
  ];

  const trackTugas = [
    {
      judul: "Ringkasan Buku Sejarah",
      deadline: "14 Mei",
      status: "Selesai",
      statusColor: "text-emerald-500",
    },
    {
      judul: "Latihan Matematika AI Tutor",
      deadline: "16 Mei",
      status: "Dalam Progres",
      statusColor: "text-sky-500",
    },
    {
      judul: "Proyek Sains Mini",
      deadline: "18 Mei",
      status: "Siapkan bahan",
      statusColor: "text-orange-500",
    },
  ];

  return (
    <div>
      <div className="mb-8 relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM19.428 15.341A8 8 0 104.57 15.34"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Orang Tua</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Pantau progres belajar anak dan dukung perjalanan akademiknya</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.title} className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg text-2xl">
                  {card.icon}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{card.value}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">{card.caption}</span>
                <span className={`text-xs font-semibold ${card.trendColor}`}>{card.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Perkembangan Nilai Semester Ini</h3>
          <div style={{ height: "320px" }}>
            <Line data={perkembanganNilaiData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Pembagian Waktu Mingguan</h3>
          <div style={{ height: "320px" }}>
            <Doughnut data={pembagianWaktuData} options={chartOptions} />
          </div>
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p className="flex items-center justify-between">
              <span>Fokus Belajar Mandiri</span>
              <span className="font-semibold text-emerald-500">35%</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Ekstrakurikuler</span>
              <span className="font-semibold text-pink-500">20%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Jadwal & Agenda Pekan Ini</h3>
            <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">Sinkronkan kalender</button>
          </div>
          <div className="space-y-4">
            {jadwalPekanIni.map((item) => (
              <div key={item.kegiatan} className="rounded-2xl border border-gray-100 dark:border-gray-700 px-4 py-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.kegiatan}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.waktu}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.statusColor}`}>{item.status}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.catatan}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Insight Anak dari AI Mentor</h3>
          <div className="space-y-4">
            {insightAnak.map((insight) => (
              <div key={insight.title} className="rounded-2xl bg-gray-50 dark:bg-gray-900/40 px-4 py-4 flex items-start gap-3">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{insight.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{insight.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-lg">
              📚 Rekomendasi Materi
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-lg">
              🤖 Hubungi AI Tutor
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Progress Tugas & Proyek</h3>
            <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">Lihat di detail tugas</button>
          </div>
          <div className="space-y-4">
            {trackTugas.map((tugas) => (
              <div key={tugas.judul} className="rounded-2xl border border-gray-100 dark:border-gray-700 px-4 py-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{tugas.judul}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Deadline {tugas.deadline}</p>
                </div>
                <span className={`text-sm font-semibold ${tugas.statusColor}`}>{tugas.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tips Kolaborasi Keluarga</h3>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-4 py-3">
              ✔️ Jadwalkan sesi belajar bersama 20 menit tiap malam.
            </li>
            <li className="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-4 py-3">
              🎧 Cek playlist fokus pilihan AI Mentor untuk menemani belajar.
            </li>
            <li className="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-4 py-3">
              🗣️ Ajak anak berbagi insight setelah sesi AI Tutor untuk memperkuat refleksi.
            </li>
          </ul>
          <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-lg">
            📬 Kirim pesan ke wali kelas
          </button>
        </div>
      </div>
    </div>
  );
}
