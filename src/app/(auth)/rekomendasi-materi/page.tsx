"use client";

import {
  atom,
  useAtom,
  useAtomValue,
  useSetAtom,
  PrimitiveAtom,
} from "jotai";
import { useMemo } from "react";

type Difficulty = "Dasar" | "Menengah" | "Lanjutan";
type MediaType = "Video" | "Interactive" | "Latihan" | "Ebook";

type Resource = {
  id: string;
  title: string;
  summary: string;
  focus: string;
  difficulty: Difficulty;
  mediaType: MediaType;
  estimatedTime: string;
  tags: string[];
  reward: number;
  aiNote: string;
};

const focusOptions = ["Matematika", "Bahasa Indonesia", "IPA", "IPS"] as const;
const difficultyOptions: Difficulty[] = ["Dasar", "Menengah", "Lanjutan"];
const mediaFilters: MediaType[] = ["Video", "Interactive", "Latihan", "Ebook"];
const mediaOptions: readonly (MediaType | "All")[] = [
  "All",
  ...mediaFilters,
] as const;

const focusAtom = atom<(typeof focusOptions)[number]>("Matematika");
const difficultyAtom = atom<Difficulty>("Menengah");
const mediaAtom = atom<MediaType | "All">("All");
const highlightAtom = atom("Kuasai konsep kunci melalui materi adaptif ini.");
const selectedResourceAtom = atom<string | null>(null);

const resourcesAtom = atom<Resource[]>((get) => {
  const focus = get(focusAtom);
  const difficulty = get(difficultyAtom);
  const media = get(mediaAtom);

  const base: Resource[] = [
    {
      id: "trig-visual",
      title: "Visualisasi Interaktif Sudut Trigonometri",
      summary:
        "Eksplorasi interaktif untuk memahami hubungan sinus, cosinus, dan tangent dengan slider fase real-time.",
      focus: "Matematika",
      difficulty: "Menengah",
      mediaType: "Interactive",
      estimatedTime: "25 menit",
      tags: ["Interaktif", "Visual", "Konsep"],
      reward: 150,
      aiNote:
        "Dipilih karena kamu sedang mempersiapkan kuis trig. Aktivitas ini memperkuat intuisi sudut.",
    },
    {
      id: "trig-latihan",
      title: "Latihan Adaptif Identitas Trigonometri",
      summary:
        "10 soal adaptif dengan pembahasan AI instan. Tingkat kesulitan menyesuaikan performa.",
      focus: "Matematika",
      difficulty: "Menengah",
      mediaType: "Latihan",
      estimatedTime: "18 menit",
      tags: ["Latihan", "Adaptif", "Penalaran"],
      reward: 120,
      aiNote:
        "AI melihat ketepatan identitas trig kamu 74%. Latihan ini fokus pada langkah transformasi yang sering keliru.",
    },
    {
      id: "bn-sinopsis",
      title: "Sinopsis Cerdas Cerpen Modern",
      summary:
        "Gunakan template AI untuk merangkum cerpen menjadi poin utama dengan sudut pandang tokoh.",
      focus: "Bahasa Indonesia",
      difficulty: "Dasar",
      mediaType: "Video",
      estimatedTime: "15 menit",
      tags: ["Menulis", "Pemahaman", "AI Template"],
      reward: 90,
      aiNote:
        "Rekomendasi ini membantu memperkuat struktur sinopsis setelah nilai latihan menulis turun 5%.",
    },
    {
      id: "ipa-lab",
      title: "Lab Virtual Gaya & Gerak",
      summary:
        "Simulasi gaya tarikan dan massa benda. Analisis grafik percepatan otomatis dengan AI Coach.",
      focus: "IPA",
      difficulty: "Menengah",
      mediaType: "Interactive",
      estimatedTime: "30 menit",
      tags: ["Fisika", "Simulasi", "Grafik"],
      reward: 160,
      aiNote:
        "Diprioritaskan karena catatan guru menunjukkan kendala pada interpretasi grafik gerak.",
    },
    {
      id: "ipa-flash",
      title: "Flashcard Audio Hukum Newton",
      summary:
        "Set flashcard dengan narasi audio singkat dan contoh kontekstual untuk tiap hukum.",
      focus: "IPA",
      difficulty: "Dasar",
      mediaType: "Ebook",
      estimatedTime: "12 menit",
      tags: ["Memori", "Audio", "Dasar"],
      reward: 70,
      aiNote:
        "Membantu menguatkan recall sebelum pre-test. Direkomendasikan oleh AI karena streak belajar kamu tinggi.",
    },
    {
      id: "ips-case",
      title: "Studi Kasus Ketimpangan Ekonomi",
      summary:
        "Analisis data nyata dan presentasikan solusi. Tersedia template slide dan rubrik penilaian AI.",
      focus: "IPS",
      difficulty: "Lanjutan",
      mediaType: "Latihan",
      estimatedTime: "40 menit",
      tags: ["Analisis Data", "Presentasi", "Kritis"],
      reward: 200,
      aiNote:
        "Menjawab kebutuhan project-based learning minggu depan. AI menyiapkan rubrik untuk memudahkan penilaian guru.",
    },
  ];

  return base.filter((item) => {
    const focusMatch = item.focus === focus;
    const difficultyMatch = item.difficulty === difficulty;
    const mediaMatch = media === "All" ? true : item.mediaType === media;
    return focusMatch && difficultyMatch && mediaMatch;
  });
});

const activeResourceAtom = atom<Resource | null>((get) => {
  const resources = get(resourcesAtom);
  const selectedId = get(selectedResourceAtom);
  if (!resources.length) return null;
  return (
    resources.find((item) => item.id === selectedId) ??
    resources[0]
  );
});

function useToggle<T>(atomRef: PrimitiveAtom<T>) {
  const setAtomVal = useSetAtom(atomRef);
  return (value: T) => setAtomVal(value);
}

export default function RekomendasiMateriPage() {
  const focus = useAtomValue(focusAtom);
  const difficulty = useAtomValue(difficultyAtom);
  const media = useAtomValue(mediaAtom);
  const resources = useAtomValue(resourcesAtom);
  const [, setSelectedResource] = useAtom(selectedResourceAtom);
  const activeResource = useAtomValue(activeResourceAtom);

  const setFocus = useToggle(focusAtom);
  const setDifficulty = useToggle(difficultyAtom);
  const setMedia = useToggle(mediaAtom);
  const setHighlight = useToggle(highlightAtom);

  const highlight = useAtomValue(highlightAtom);

  const handleSelectResource = (resource: Resource) => {
    setSelectedResource(resource.id);
    setHighlight(resource.aiNote);
  };

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-sky-500 to-blue-600 text-white shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]" />
        <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="max-w-2xl text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80 sm:text-sm">
              AI Mentor · Kurasi Materi
            </p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              Rekomendasi Materi Belajar Personal
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
              AI memilih materi berdasarkan fokus belajar, performa terbaru, dan
              preferensi gaya belajarmu. Filter sesuai kebutuhan lalu mulai
              eksplorasi.
            </p>
          </div>
          <div className="w-full max-w-md rounded-2xl bg-white/15 p-5 backdrop-blur-md sm:p-6">
            <p className="text-xs font-semibold text-white/80 sm:text-sm">
              Insight Cepat
            </p>
            <p className="mt-3 text-base font-semibold text-white sm:text-lg">
              {highlight}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-white/80 sm:grid-cols-2">
              <Metric label="Fokus" value={focus} />
              <Metric label="Tingkat" value={difficulty} />
              <Metric label="Tipe Konten" value={media === "All" ? "Semua" : media} />
              <Metric label="Materi Terpilih" value={resources.length.toString()} />
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6">
            <FilterGroup
              title="Fokus Pembelajaran"
              options={focusOptions}
              active={focus}
              onSelect={setFocus}
            />
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FilterGroup
                title="Tingkat Kesulitan"
                options={difficultyOptions}
                active={difficulty}
                onSelect={setDifficulty}
                compact
              />
              <FilterGroup
                title="Jenis Media"
                options={mediaOptions}
                active={media}
                onSelect={setMedia}
                compact
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Materi Pilihan AI
              </h2>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 sm:text-sm">
                🎯 {resources.length} materi cocok dengan fokusmu
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  active={activeResource?.id === resource.id}
                  onSelect={() => handleSelectResource(resource)}
                />
              ))}
              {!resources.length && (
                <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-7 text-center text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                  Belum ada rekomendasi untuk kombinasi ini. Coba ganti tingkat
                  kesulitan atau jenis media.
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
              Detail Materi Terpilih
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Ringkasan lengkap dan catatan AI Mentor.
            </p>
            {activeResource ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-900/40">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {activeResource.title}
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                    {activeResource.summary}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-gray-500 dark:text-gray-400 sm:text-sm">
                  <DetailPill label="Fokus" value={activeResource.focus} />
                  <DetailPill label="Kesulitan" value={activeResource.difficulty} />
                  <DetailPill label="Media" value={activeResource.mediaType} />
                  <DetailPill label="Durasi" value={activeResource.estimatedTime} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 sm:text-sm">
                    Tag Materi
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeResource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 px-4 py-4 text-sm text-white shadow-lg">
                  <p className="font-semibold">Catatan AI Mentor</p>
                  <p className="mt-2 leading-relaxed text-white/90">
                    {activeResource.aiNote}
                  </p>
                </div>
                <button className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                  Mulai Materi & Klaim {activeResource.reward} XP
                </button>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-600 dark:text-gray-300">
                Pilih materi pada daftar untuk melihat detailnya.
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-none sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
              Saran Ekspansi Belajar
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Tugas tambahan untuk memperluas mastery.
            </p>
            <div className="mt-5 space-y-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              <QuickSuggestion label="Buat catatan digital dari materi di atas" emoji="📝" />
              <QuickSuggestion label="Diskusikan hasil latihan dengan AI Mentor" emoji="💬" />
              <QuickSuggestion label="Tantang teman satu kelas dengan kuis adaptif" emoji="🤝" />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function FilterGroup<T extends string>({
  title,
  options,
  active,
  onSelect,
  compact,
}: {
  title: string;
  options: readonly T[];
  active: T;
  onSelect: (value: T) => void;
  compact?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`relative min-w-[7.5rem] overflow-hidden rounded-2xl px-4 py-2 text-xs font-semibold transition-all duration-300 whitespace-nowrap sm:px-5 sm:text-sm ${
              active === option
                ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900/40 dark:text-gray-200"
            } ${compact ? "sm:flex-1" : ""}`}
          >
            {active === option && (
              <span className="absolute inset-0 bg-white/15 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]" />
            )}
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResourceCard({
  resource,
  active,
  onSelect,
}: {
  resource: Resource;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`group flex h-full flex-col gap-3 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
        active
          ? "border-emerald-400 bg-emerald-50 shadow-lg shadow-emerald-500/20 dark:border-emerald-500/60 dark:bg-emerald-500/10"
          : "border-gray-100 bg-white hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900/40"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg text-white shadow">
          {resource.mediaType === "Interactive"
            ? "🎮"
            : resource.mediaType === "Latihan"
            ? "📝"
            : resource.mediaType === "Video"
            ? "🎬"
            : "📘"}
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
            {resource.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            {resource.estimatedTime} · {resource.difficulty}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
        {resource.summary}
      </p>
      <div className="mt-auto flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 sm:text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 group-hover:bg-emerald-500" />
          Fokus: {resource.focus}
        </span>
        <span className="text-emerald-500">+{resource.reward} XP</span>
      </div>
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 px-4 py-3 text-left">
      <p className="text-[11px] uppercase tracking-wide text-white/70">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white sm:text-base">
        {value}
      </p>
    </div>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-xl bg-gray-50 px-3 py-2 text-xs text-gray-600 dark:bg-gray-900/40 dark:text-gray-300 sm:text-sm">
      <span className="font-semibold text-gray-800 dark:text-white">
        {label}:
      </span>{" "}
      {value}
    </span>
  );
}

function QuickSuggestion({ label, emoji }: { label: string; emoji: string }) {
  return (
    <button className="flex w-full flex-col gap-2 rounded-2xl bg-gray-50 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:bg-gray-900/40 dark:hover:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-center gap-3">
        <span className="text-lg">{emoji}</span>
        {label}
      </span>
      <span className="text-xs font-semibold text-emerald-500 sm:text-sm">
        Ayo Jalankan
      </span>
    </button>
  );
}
