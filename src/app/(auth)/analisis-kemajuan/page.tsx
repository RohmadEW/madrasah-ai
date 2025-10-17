"use client";

import { useMemo } from "react";
import { Line, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler
);

const masteryTags = [
  { label: "Kognitif", value: "+12%", tone: "text-emerald-500" },
  { label: "Afektif", value: "+6%", tone: "text-sky-500" },
  { label: "Psikomotorik", value: "+9%", tone: "text-indigo-500" },
];

const riskAlerts = [
  {
    title: "Pemahaman Trigonometri",
    detail: "Skor rata-rata turun 8% dalam 2 pekan.",
    action: "Aktifkan sesi remedial 20 menit.",
    severity: "warning",
  },
  {
    title: "Keterlambatan Tugas",
    detail: "5 siswa terlambat mengumpulkan tugas analitis.",
    action: "Kirim pengingat otomatis & hubungi wali.",
    severity: "info",
  },
  {
    title: "Partisipasi Diskusi",
    detail: "Forum diskusi Rabu hanya diikuti 42% siswa.",
    action: "Kirim insight diskusi + pemantik pertanyaan.",
    severity: "critical",
  },
];

const growthMilestones = [
  {
    title: "Benchmark Nasional",
    value: "84",
    subtitle: "Naik 6 poin dari bulan lalu",
  },
  {
    title: "Leaderboard Kelas",
    value: "#2",
    subtitle: "Selisih 2 poin dari peringkat 1",
  },
  {
    title: "Target Semester",
    value: "78%",
    subtitle: "Sudah tercapai 86% dari target",
  },
];

const competencyDistribution = [
  { label: "Pemahaman Konsep", percent: 68 },
  { label: "Penalaran", percent: 54 },
  { label: "Problem Solving", percent: 72 },
  { label: "Komunikasi", percent: 63 },
];

export default function AnalisisKemajuanPage() {
  const masteryTrendData = useMemo(
    () => ({
      labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
      datasets: [
        {
          label: "Nilai Rata-rata",
          data: [72, 74, 78, 80, 83, 85],
          borderColor: "rgba(16, 185, 129, 1)",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          fill: true,
          tension: 0.35,
        },
        {
          label: "Ketuntasan Materi",
          data: [65, 70, 74, 76, 80, 82],
          borderColor: "rgba(59, 130, 246, 1)",
          backgroundColor: "rgba(59, 130, 246, 0.16)",
          fill: true,
          tension: 0.35,
        },
      ],
    }),
    []
  );

  const masteryTrendOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom" as const,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10,
          },
        },
      },
    }),
    []
  );

  const competencyRadarData = useMemo(
    () => ({
      labels: ["Analisis", "Evaluasi", "Aplikasi", "Kreativitas", "Kolaborasi"],
      datasets: [
        {
          label: "Kelas XI IPA",
          data: [78, 72, 84, 69, 74],
          backgroundColor: "rgba(16, 185, 129, 0.35)",
          borderColor: "rgba(16, 185, 129, 1)",
          pointBackgroundColor: "rgba(16, 185, 129, 1)",
        },
        {
          label: "Target Semester",
          data: [82, 78, 88, 80, 82],
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderColor: "rgba(59, 130, 246, 1)",
          pointBackgroundColor: "rgba(59, 130, 246, 1)",
        },
      ],
    }),
    []
  );

  const competencyRadarOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom" as const,
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          suggestedMax: 100,
          grid: {
            color: "rgba(148, 163, 184, 0.2)",
          },
          angleLines: {
            color: "rgba(148, 163, 184, 0.25)",
          },
          ticks: {
            display: false,
          },
        },
      },
    }),
    []
  );

  const focusBarData = useMemo(
    () => ({
      labels: ["Trigonometri", "Deret", "Statistika", "Fisika Dinamis", "Kimia"],
      datasets: [
        {
          label: "Ketuntasan Materi",
          data: [82, 74, 88, 69, 72],
          backgroundColor: [
            "rgba(16, 185, 129, 0.85)",
            "rgba(59, 130, 246, 0.85)",
            "rgba(139, 92, 246, 0.85)",
            "rgba(249, 115, 22, 0.85)",
            "rgba(236, 72, 153, 0.85)",
          ],
          borderRadius: 12,
          borderSkipped: false,
        },
      ],
    }),
    []
  );

  const focusBarOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10,
          },
        },
      },
    }),
    []
  );

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="max-w-2xl text-left">
            <p className="text-xs uppercase tracking-[0.32em] text-white/80 sm:text-sm">
              Analitik Belajar · Mode Kepala Sekolah
            </p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              Analisis Kemajuan Akademik & Kompetensi
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
              Pandangan menyeluruh perkembangan murid berbasis data: lihat trend
              nilai, ketuntasan materi, serta rekomendasi otomatis untuk tindak
              lanjut. Semua metrik diperbarui real-time oleh AI MADRASAH.
            </p>
          </div>
          <div className="w-full max-w-sm rounded-2xl bg-white/15 p-5 backdrop-blur-md sm:p-6">
            <p className="text-xs font-semibold text-white/80 sm:text-sm">
              Ringkasan Hari Ini
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 text-center sm:grid-cols-3">
              {growthMilestones.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-white/15 px-4 py-3 text-white shadow-sm"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xl font-semibold">{item.value}</p>
                  <p className="text-[11px] text-white/70">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                  Trend Nilai & Ketuntasan
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                  Diperbarui per pekan berdasarkan integrasi LMS dan catatan
                  penilaian guru.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Naik 13% dalam 6 bulan
              </div>
            </div>
            <div className="h-64 sm:h-72 lg:h-[22rem]">
              <Line data={masteryTrendData} options={masteryTrendOptions} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                Radar Kompetensi HOTS
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Bandingkan performa kelas dengan target semester.
              </p>
              <div className="mt-6 h-64 sm:h-72">
                <Radar data={competencyRadarData} options={competencyRadarOptions} />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                Fokus Materi Minggu Ini
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                AI menyoroti topik yang butuh intervensi.
              </p>
              <div className="mt-6 h-64 sm:h-72">
                <Bar data={focusBarData} options={focusBarOptions} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
              Distribusi Kompetensi
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Proporsi ketuntasan per dimensi kompetensi inti.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {competencyDistribution.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-gray-100 px-4 py-4 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.label}
                    </p>
                    <span className="text-xs font-semibold text-emerald-500">
                      {item.percent}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    {item.percent >= 70
                      ? "Stabil, lanjutkan strategi yang sama."
                      : "Perlu sesi klinis dan latihan adaptif tambahan."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
              Ringkasan Ketuntasan
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Disinkronkan otomatis dengan catatan pembelajaran harian.
            </p>
            <div className="mt-5 space-y-4">
              {masteryTags.map((tag) => (
                <div
                  key={tag.label}
                  className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900/40"
                >
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {tag.label}
                  </span>
                  <span className={`text-sm font-semibold ${tag.tone}`}>
                    {tag.value}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              Unduh Laporan Bulanan
            </button>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
              Insight Risiko Otomatis
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Rekomendasi tindak lanjut berbasis deteksi AI.
            </p>
            <div className="mt-5 space-y-4">
              {riskAlerts.map((alert) => (
                <div
                  key={alert.title}
                  className="rounded-2xl border border-gray-100 px-4 py-4 dark:border-gray-700"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
                      {alert.title}
                    </h4>
                    <span
                      className={`inline-flex w-max items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        alert.severity === "critical"
                          ? "bg-red-500/15 text-red-500"
                          : alert.severity === "warning"
                          ? "bg-amber-400/20 text-amber-500"
                          : "bg-sky-400/20 text-sky-500"
                      }`}
                    >
                      {alert.severity === "critical"
                        ? "Prioritas Tinggi"
                        : alert.severity === "warning"
                        ? "Butuh Perhatian"
                        : "Monitoring"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                    {alert.detail}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-emerald-500 sm:text-sm">
                    🎯 {alert.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
              Aksi Cepat
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Eksekusi langsung dari panel ini dan lihat dampaknya.
            </p>
            <div className="mt-5 space-y-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              <QuickAction label="Buat kelas remedial adaptif" emoji="🧠" />
              <QuickAction label="Kirim insight ke wali siswa kritikal" emoji="📤" />
              <QuickAction label="Aktifkan leaderboard kompetensi" emoji="🏆" />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function QuickAction({ label, emoji }: { label: string; emoji: string }) {
  return (
    <button className="flex w-full flex-col gap-2 rounded-2xl bg-gray-50 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:bg-gray-900/40 dark:hover:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-center gap-3 text-sm sm:text-base">
        <span className="text-lg">{emoji}</span>
        {label}
      </span>
      <span className="text-xs font-semibold text-emerald-500 sm:text-sm">
        Luncurkan
      </span>
    </button>
  );
}
