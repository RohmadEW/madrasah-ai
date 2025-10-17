"use client";

import { atom, useAtomValue, useSetAtom, useAtom } from "jotai";
import { useMemo } from "react";

type Message = {
  id: number;
  from: "mentor" | "student";
  text: string;
  mood?: "supportive" | "celebrate" | "focus";
  timestamp: string;
};

const focusAreas = ["Matematika", "Bahasa Indonesia", "IPA"] as const;
type FocusArea = (typeof focusAreas)[number];

const focusAtom = atom<FocusArea>("Matematika");
const activeJourneyAtom = atom("Kelas 11 · Bab Trigonometri");
const energyAtom = atom(82);
const mentorMoodAtom = atom("Super Termotivasi");
const streakAtom = atom(9);

const initialMessages: Message[] = [
  {
    id: 1,
    from: "mentor",
    text: "Hai! Selamat sudah bertahan di streak belajar ke-9 🎉. Mau lanjut review Trigonometri atau eksplorasi topik baru hari ini?",
    mood: "celebrate",
    timestamp: "08:05",
  },
  {
    id: 2,
    from: "student",
    text: "Aku mau mantapkan Trigonometri buat persiapan kuis besok.",
    mood: "focus",
    timestamp: "08:06",
  },
  {
    id: 3,
    from: "mentor",
    text: "Mantap! Kita fokus ke identitas trigonometri. Aku sudah siapkan latihan adaptif dan visualisasi interaktif biar makin paham.",
    mood: "supportive",
    timestamp: "08:06",
  },
];

const conversationAtom = atom<Message[]>(initialMessages);

const quickPromptAtom = atom((get) => {
  const focus = get(focusAtom);

  const promptByFocus: Record<FocusArea, { id: string; label: string; studentText: string }[]> = {
    Matematika: [
      {
        id: "ringkasan",
        label: "Ringkasan konsep",
        studentText: "Bisa ringkaskan identitas trig utama biar cepat hafal?",
      },
      {
        id: "latihan",
        label: "Latihan adaptif",
        studentText: "Aku mau latihan tingkat medium dong.",
      },
      {
        id: "visual",
        label: "Lihat grafik",
        studentText: "Tunjukin visual grafik sinus dan cosinus ya.",
      },
    ],
    "Bahasa Indonesia": [
      {
        id: "sinopsis",
        label: "Buat sinopsis",
        studentText: "Bantu rangkum cerpen 'Roro Jonggrang' jadi 3 paragraf.",
      },
      {
        id: "latihan",
        label: "Latihan memahami",
        studentText: "Aku butuh latihan soal teks eksposisi.",
      },
      {
        id: "kuis",
        label: "Simulasi kuis",
        studentText: "Siapin kuis singkat biar siap ulangan.",
      },
    ],
    IPA: [
      {
        id: "eksperimen",
        label: "Simulasi eksperimen",
        studentText: "Ada simulasi gaya dan gerak yang interaktif?",
      },
      {
        id: "catatan",
        label: "Catatan pintar",
        studentText: "Tolong buat catatan ringkas tentang hukum Newton.",
      },
      {
        id: "quiz",
        label: "Kuis adaptif",
        studentText: "Uji aku dengan kuis konsep percepatan.",
      },
    ],
  };

  return promptByFocus[focus];
});

const recommendationsAtom = atom((get) => {
  const focus = get(focusAtom);

  const base = {
    Matematika: [
      {
        title: "Visualisasi Sudut",
        description: "Eksplorasi interaktif sudut kuadran dan pergeseran fase.",
        progress: 68,
        vibe: "from-blue-500 to-indigo-500",
      },
      {
        title: "Latihan Identitas",
        description: "6 soal adaptif yang menyesuaikan kesulitan secara real-time.",
        progress: 45,
        vibe: "from-emerald-500 to-teal-500",
      },
      {
        title: "Strategi Kuis Besok",
        description: "Kuasai 3 tipe soal yang paling sering keluar.",
        progress: 25,
        vibe: "from-amber-500 to-orange-500",
      },
    ],
    "Bahasa Indonesia": [
      {
        title: "Analisis Struktur",
        description: "Bedah struktur teks eksposisi lewat mind-map interaktif.",
        progress: 72,
        vibe: "from-pink-500 to-rose-500",
      },
      {
        title: "Latihan Diksi",
        description: "Pilih diksi terbaik untuk menulis paragraf logis.",
        progress: 38,
        vibe: "from-purple-500 to-violet-500",
      },
      {
        title: "Simulasi Ulangan",
        description: "Kumpulkan 150 poin dari 10 soal adaptif.",
        progress: 55,
        vibe: "from-indigo-500 to-blue-500",
      },
    ],
    IPA: [
      {
        title: "Lab Virtual",
        description: "Uji pengaruh massa terhadap percepatan di lab virtual.",
        progress: 60,
        vibe: "from-teal-500 to-cyan-500",
      },
      {
        title: "Catatan Newton",
        description: "Flashcard pintar hukum Newton dengan audio highlight.",
        progress: 90,
        vibe: "from-lime-500 to-emerald-500",
      },
      {
        title: "Tantangan Mingguan",
        description: "Kalahkan skor kelas di leaderboard konsep gerak.",
        progress: 32,
        vibe: "from-orange-500 to-red-500",
      },
    ],
  };

  return base[focus];
});

const conversationResponderAtom = atom(null, (get, set, promptId: string) => {
  const focus = get(focusAtom);
  const quickPrompts = get(quickPromptAtom);
  const chosenPrompt = quickPrompts.find((item) => item.id === promptId);
  if (!chosenPrompt) return;

  const responseTemplates: Record<FocusArea, Record<string, Omit<Message, "id">>> = {
    Matematika: {
      ringkasan: {
        from: "mentor",
        text: "Catatan kilat: 1) sin²θ + cos²θ = 1, 2) tanθ = sinθ/cosθ, 3) 1 + tan²θ = sec²θ. Aku lampirin kartu hafalan beserta trik ingatan.",
        mood: "supportive",
        timestamp: "08:12",
      },
      latihan: {
        from: "mentor",
        text: "Latihan siap! Mulai dari soal identitas tingkat medium. Setelah 3 soal pertama, aku akan adaptasi tingkat kesulitannya ya.",
        mood: "focus",
        timestamp: "08:12",
      },
      visual: {
        from: "mentor",
        text: "Nih grafik interaktif sinus & cosinus. Geser slider fase buat lihat pergeseran grafik real-time. Cobain tantangan kecilku juga!",
        mood: "supportive",
        timestamp: "08:12",
      },
    },
    "Bahasa Indonesia": {
      sinopsis: {
        from: "mentor",
        text: "Ini sinopsis 3 paragraf yang kuat, lengkap dengan konflik utama dan resolusi. Aku juga kasih highlight diksi yang kuat.",
        mood: "supportive",
        timestamp: "08:12",
      },
      latihan: {
        from: "mentor",
        text: "Latihan teks eksposisi siap. Kita latihan bikin kalimat tesis, argumen, dan penegasan. Aku beri feedback instan ya.",
        mood: "focus",
        timestamp: "08:12",
      },
      kuis: {
        from: "mentor",
        text: "Kuis 8 soal adaptif on! Setiap jawaban langsung aku jelasin, jadi jangan takut salah. Gaskeun!",
        mood: "celebrate",
        timestamp: "08:12",
      },
    },
    IPA: {
      eksperimen: {
        from: "mentor",
        text: "Lab virtual sudah aktif. Atur massa dan gaya, terus lihat grafik percepatan otomatis. Catat insight yang muncul ya!",
        mood: "supportive",
        timestamp: "08:12",
      },
      catatan: {
        from: "mentor",
        text: "Catatan ringkas hukum Newton: ada mode audio dan mind-map. Aku kasih challenge kecil di akhir buat cek pemahamanmu.",
        mood: "focus",
        timestamp: "08:12",
      },
      quiz: {
        from: "mentor",
        text: "Kuis percepatan siap tempur! Ada leaderboard kecil buat bikin makin seru. Aku bantu analisis skor kamu nanti.",
        mood: "celebrate",
        timestamp: "08:12",
      },
    },
  };

  const studentMessage: Message = {
    id: Date.now(),
    from: "student",
    text: chosenPrompt.studentText,
    timestamp: "08:11",
    mood: "focus",
  };

  const mentorReply = responseTemplates[focus][promptId];
  if (!mentorReply) return;

  set(conversationAtom, (prev) => [
    ...prev,
    studentMessage,
    {
      ...mentorReply,
      id: Date.now() + 1,
    },
  ]);
});

const learningCelebrationAtom = atom((get) => {
  const streak = get(streakAtom);
  const energy = get(energyAtom);

  if (streak > 10 && energy > 80) {
    return "🔥 Mode On Fire · Kamu lagi di top leaderboard kelas minggu ini!";
  }
  if (streak >= 7) {
    return "✨ Streak Keren! Pertahankan ritme belajarmu, target 12 hari yuk!";
  }
  return "🚀 Momentum Baru · Yuk bangun kebiasaan belajar bareng mentor!";
});

export default function AiMentorPage() {
  const focus = useAtomValue(focusAtom);
  const setFocus = useSetAtom(focusAtom);
  const journey = useAtomValue(activeJourneyAtom);
  const energy = useAtomValue(energyAtom);
  const mood = useAtomValue(mentorMoodAtom);
  const streak = useAtomValue(streakAtom);
  const celebration = useAtomValue(learningCelebrationAtom);
  const recommendations = useAtomValue(recommendationsAtom);
  const quickPrompts = useAtomValue(quickPromptAtom);
  const [conversation] = useAtom(conversationAtom);
  const triggerPrompt = useSetAtom(conversationResponderAtom);

  const moodBadge = useMemo(() => {
    if (mood.toLowerCase().includes("super")) return "bg-emerald-100 text-emerald-700";
    if (mood.toLowerCase().includes("santai")) return "bg-sky-100 text-sky-700";
    return "bg-indigo-100 text-indigo-700";
  }, [mood]);

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 text-white shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]"></div>
        <div className="relative px-8 py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/80">AI Mentor · Mode Siswa</p>
              <h1 className="mt-2 text-4xl font-extrabold drop-shadow-sm">Belajar Seru Bareng Mentor Pintar</h1>
              <p className="mt-3 max-w-2xl text-white/90">
                Mentor memantau progresmu secara real-time dan menyiapkan latihan adaptif yang pas. Pilih fokus, tekan tombol, dan lihat AI Mentor bergerak.
              </p>
            </div>
            <div className="rounded-2xl bg-white/15 px-6 py-4 backdrop-blur-md">
              <p className="text-sm font-semibold text-white/80">Energi Belajar</p>
              <p className="text-4xl font-bold">{energy}%</p>
              <p className="text-xs text-white/75">Mengacu pada tidur, fokus, dan mood belajarmu hari ini.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-medium text-white/90">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              {journey}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
              <span className="text-lg">🔥</span>
              Streak {streak} hari berturut-turut
            </span>
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${moodBadge}`}>
              <span className="text-lg">🤖</span>
              {mood}
            </span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-gray-800 dark:shadow-none">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pilih Fokus Belajar</h2>
                <p className="text-gray-500 dark:text-gray-400">AI Mentor menyesuaikan rekomendasi dan gaya bantuannya sesuai topik yang kamu pilih.</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Fokus: {focus}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {focusAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => setFocus(area)}
                  className={`relative overflow-hidden rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    focus === area
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
                  }`}
                >
                  {focus === area && (
                    <span className="absolute inset-0 bg-white/20 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]" />
                  )}
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-gray-800 dark:shadow-none">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Chat Interaktif AI Mentor</h2>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-300">{celebration}</span>
            </div>

            <div className="relative max-h-[380px] space-y-4 overflow-y-auto pr-2">
              {conversation.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.from === "mentor" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-5 py-4 text-sm shadow-md transition-transform duration-300 ${
                      message.from === "mentor"
                        ? "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2 text-xs opacity-80">
                      <span>{message.from === "mentor" ? "AI Mentor" : "Kamu"}</span>
                      <span>•</span>
                      <span>{message.timestamp}</span>
                    </div>
                    <p className="leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Quick Action · Klik dan lihat respon AI Mentor</p>
              <div className="flex flex-wrap gap-3">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => triggerPrompt(prompt.id)}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:from-emerald-500 dark:to-teal-500 dark:shadow-emerald-900/30"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      {prompt.label}
                    </span>
                    <span className="absolute inset-0 translate-y-full bg-white/20 transition-all duration-300 group-hover:translate-y-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-none">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Progress Tracker</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update otomatis setiap kamu menyelesaikan misi harian.</p>
            <div className="mt-6 space-y-5">
              <ProgressItem label="Tantangan Harian" percent={82} accent="from-emerald-500 to-lime-500" />
              <ProgressItem label="XP Mingguan" percent={68} accent="from-sky-500 to-indigo-500" />
              <ProgressItem label="Mood Belajar" percent={energy} accent="from-amber-400 to-orange-500" />
            </div>
            <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              Buka Insight Harian
            </button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-none">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Misi Seru {focus}</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">AI Mentor menyesuaikan misi sesuai performa dan mood-mu.</p>
            <div className="mt-6 space-y-4">
              {recommendations.map((item, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.vibe}`} />
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div className={`h-full rounded-full bg-gradient-to-r ${item.vibe}`} style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-none">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Mood Booster</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">AI Mentor siap kasih dukungan ekstra kalau kamu lagi butuh semangat.</p>
            <div className="mt-5 space-y-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              <MoodBoost label="Play playlist fokus 20 menit" emoji="🎧" />
              <MoodBoost label="Ambil jeda mindful 2 menit" emoji="🧘" />
              <MoodBoost label="Lihat highlight teman satu kelas" emoji="🏅" />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function ProgressItem({
  label,
  percent,
  accent,
}: {
  label: string;
  percent: number;
  accent: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-200">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
        <div className={`h-full rounded-full bg-gradient-to-r ${accent}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function MoodBoost({ label, emoji }: { label: string; emoji: string }) {
  return (
    <button className="flex w-full items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
      <span className="flex items-center gap-3">
        <span className="text-xl">{emoji}</span>
        {label}
      </span>
      <span className="text-xs font-semibold text-emerald-500">Aktifkan</span>
    </button>
  );
}
