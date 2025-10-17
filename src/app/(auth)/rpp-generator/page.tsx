"use client";

import {
  atom,
  useAtom,
  useAtomValue,
  useSetAtom,
  PrimitiveAtom,
} from "jotai";
import { useMemo } from "react";

type StepKey =
  | "identitas"
  | "tujuan"
  | "kegiatan"
  | "penilaian"
  | "refleksi";

type LearningStyle = "Visual" | "Auditori" | "Kinestetik" | "Kolaboratif";
type ActivityMode = "Eksplorasi" | "Diskusi" | "Proyek" | "Penguatan";

type KDItem = {
  id: string;
  label: string;
  indicator: string;
  assessment: string;
};

type Phase = {
  title: string;
  duration: string;
  focus: string;
  detail: string;
};

type StepDetail = {
  key: StepKey;
  title: string;
  description: string;
  highlights: string[];
  items: { label: string; value: string }[];
  nextAction?: string;
};

const gradeOptions = [
  "Kelas 7",
  "Kelas 8",
  "Kelas 9",
  "Kelas 10",
  "Kelas 11",
] as const;

const subjectOptions = [
  "Matematika",
  "Bahasa Indonesia",
  "IPA",
  "IPS",
  "PPKn",
] as const;

const styleOptions: LearningStyle[] = [
  "Visual",
  "Auditori",
  "Kinestetik",
  "Kolaboratif",
];

const activityModes: ActivityMode[] = [
  "Eksplorasi",
  "Diskusi",
  "Proyek",
  "Penguatan",
];

const durationOptions = ["2 x 35 menit", "2 x 40 menit", "3 x 45 menit"];

const focusThemes = [
  "Penguatan Konsep",
  "Berpikir Kritis",
  "Kolaborasi Tim",
  "Proyek Kontekstual",
] as const;

const gradeAtom = atom<(typeof gradeOptions)[number]>("Kelas 7");
const subjectAtom = atom<(typeof subjectOptions)[number]>("Matematika");
const durationAtom = atom(durationOptions[1]);
const learningStyleAtom = atom<LearningStyle>("Visual");
const activityModeAtom = atom<ActivityMode>("Eksplorasi");
const meetingFocusAtom = atom<(typeof focusThemes)[number]>("Penguatan Konsep");

const kdMap: Record<string, KDItem[]> = {
  "Kelas 7|Matematika": [
    {
      id: "KD-1",
      label: "Bilangan Rasional dalam Kehidupan Sehari-hari",
      indicator:
        "Siswa mampu menghubungkan representasi desimal, pecahan, dan persen untuk menyelesaikan masalah kontekstual.",
      assessment:
        "Lembar aktivitas pemodelan pasar mini dan refleksi numerik individu.",
    },
    {
      id: "KD-2",
      label: "Perbandingan dan Skala",
      indicator:
        "Siswa menerapkan perbandingan untuk membaca peta sederhana dan memecahkan masalah skala.",
      assessment:
        "Proyek mini membuat infografis skala ruangan kelas dengan rubric kolaborasi.",
    },
  ],
  "Kelas 8|Matematika": [
    {
      id: "KD-3",
      label: "Sistem Persamaan Linear Dua Variabel",
      indicator:
        "Siswa menggunakan metode eliminasi dan substitusi untuk menyelesaikan masalah kontekstual.",
      assessment:
        "Evaluasi format kuis interaktif dengan pembahasaan video personal.",
    },
    {
      id: "KD-4",
      label: "Transformasi Geometri",
      indicator:
        "Siswa menjelaskan hasil transformasi refleksi dan translasi pada objek visual.",
      assessment:
        "Penilaian proyek membuat poster transformasi dengan catatan reflektif.",
    },
  ],
  "Kelas 7|Bahasa Indonesia": [
    {
      id: "KD-5",
      label: "Teks Deskripsi",
      indicator:
        "Siswa mampu menyusun teks deskripsi dengan struktur runtut dan diksi kaya.",
      assessment:
        "Rubrik penilaian menulis teks deskripsi berbasis portofolio.",
    },
    {
      id: "KD-6",
      label: "Menyimak Cerita Rakyat",
      indicator:
        "Siswa merangkum alur, tokoh, dan amanat melalui mind-map kolaboratif.",
      assessment:
        "Penilaian formatif melalui catatan visual dan kuis cerita digital.",
    },
  ],
  "Kelas 8|IPA": [
    {
      id: "KD-7",
      label: "Sistem Pencernaan Manusia",
      indicator:
        "Siswa menghubungkan fungsi organ pencernaan dengan gaya hidup sehat.",
      assessment:
        "Logbook eksperimen sederhana dan wawancara reflektif dengan keluarga.",
    },
    {
      id: "KD-8",
      label: "Kalor dan Perubahannya",
      indicator:
        "Siswa menjelaskan perpindahan kalor melalui demonstrasi dan grafik hasil eksperimen.",
      assessment:
        "Penilaian berbasis proyek percobaan kalor dengan rubrik presentasi.",
    },
  ],
  "Kelas 10|PPKn": [
    {
      id: "KD-9",
      label: "Hak dan Kewajiban Warga Negara",
      indicator:
        "Siswa menganalisis studi kasus pelanggaran hak dan merancang solusi partisipatif.",
      assessment:
        "Debat reflektif dan jurnal aksi warga sekolah yang terstruktur.",
    },
    {
      id: "KD-10",
      label: "Demokrasi Pancasila",
      indicator:
        "Siswa mengevaluasi praktik demokrasi di lingkungan sekolah secara kritis.",
      assessment:
        "Rubrik observasi partisipasi dan portofolio rekomendasi kebijakan kelas.",
    },
  ],
};

const selectedKDIdAtom = atom<string | null>(null);
const kdListAtom = atom<KDItem[]>((get) => {
  const grade = get(gradeAtom);
  const subject = get(subjectAtom);
  return (
    kdMap[`${grade}|${subject}`] ??
    kdMap[`${grade}|Matematika`] ??
    kdMap["Kelas 7|Matematika"]
  );
});

const selectedKDAtom = atom(
  (get) => {
    const kdList = get(kdListAtom);
    const selectedId = get(selectedKDIdAtom);
    if (!kdList.length) return null;
    if (selectedId && kdList.some((item) => item.id === selectedId)) {
      return selectedId;
    }
    return kdList[0].id;
  },
  (_get, set, newId: string) => {
    set(selectedKDIdAtom, newId);
  }
);

const selectedKDDetailAtom = atom((get) => {
  const kdList = get(kdListAtom);
  const activeId = get(selectedKDAtom);
  return kdList.find((item) => item.id === activeId) ?? null;
});

const phaseAtom = atom<Phase[]>((get) => {
  const duration = get(durationAtom);
  const activityMode = get(activityModeAtom);
  const focus = get(meetingFocusAtom);
  const learningStyle = get(learningStyleAtom);
  const kd = get(selectedKDDetailAtom);

  const styleCue: Record<LearningStyle, string> = {
    Visual: "visualisasi grafis, slide dinamis, dan catatan warna-warni",
    Auditori: "diskusi terarah, narasi audio, dan tanya jawab singkat",
    Kinestetik: "aktivitas bergerak, manipulatif konkret, dan praktek langsung",
    Kolaboratif: "kerja tim terstruktur, peran berbeda, dan refleksi kelompok",
  };

  const modeCue: Record<ActivityMode, string> = {
    Eksplorasi: "mengamati fenomena atau masalah pemantik sebelum masuk teori",
    Diskusi: "bertukar ide dan membangun pemahaman bersama sebelum simpulan",
    Proyek: "mendesain keluaran kreatif dan menetapkan peran sejak awal",
    Penguatan: "mendalami kesulitan umum dengan scaffolding adaptif",
  };

  return [
    {
      title: "Pendahuluan",
      duration: duration.includes("3")
        ? "12 menit"
        : duration.includes("35")
        ? "10 menit"
        : "12 menit",
      focus: "Orientasi & Apersepsi",
      detail: `Guru memantik melalui ${modeCue[activityMode]} dengan menampilkan ${styleCue[learningStyle]}. Kaitkan dengan pengalaman siswa terkait ${
        kd?.label ?? "kompetensi yang dipilih"
      } dan fokus pertemuan "${focus}".`,
    },
    {
      title: "Kegiatan Inti",
      duration: duration.includes("3")
        ? "60 menit"
        : duration.includes("35")
        ? "45 menit"
        : "50 menit",
      focus: `${activityMode} Terpandu`,
      detail: `Siswa bekerja dalam kelompok kecil untuk menggali ${
        kd?.indicator ?? "indikator pencapaian"
      }. Guru menyediakan scaffolding diferensiasi sesuai gaya belajar ${
        learningStyle === "Kolaboratif" ? "dengan peran khusus" : learningStyle
      }. Setiap kelompok mengunggah artefak belajar ke papan digital.`,
    },
    {
      title: "Penutup & Refleksi",
      duration: duration.includes("3")
        ? "23 menit"
        : duration.includes("35")
        ? "15 menit"
        : "18 menit",
      focus: "Simpulan & Tindak Lanjut",
      detail: `Kelas menyusun simpulan kolektif dan menyusun rencana tindak lanjut. Siswa menuliskan refleksi singkat di jurnal digital yang akan digunakan AI untuk menyarankan intervensi selanjutnya.`,
    },
  ];
});

const stepOrder: StepKey[] = [
  "identitas",
  "tujuan",
  "kegiatan",
  "penilaian",
  "refleksi",
];

const activeStepAtom = atom<StepKey>("identitas");

const stepDetailsAtom = atom<StepDetail[]>((get) => {
  const grade = get(gradeAtom);
  const subject = get(subjectAtom);
  const duration = get(durationAtom);
  const learningStyle = get(learningStyleAtom);
  const activityMode = get(activityModeAtom);
  const focus = get(meetingFocusAtom);
  const kd = get(selectedKDDetailAtom);
  const phases = get(phaseAtom);

  return [
    {
      key: "identitas",
      title: "Identitas & Konteks Kelas",
      description:
        "Ringkasan karakteristik kelas untuk memastikan RPP relevan dan responsif.",
      highlights: [
        `Fokus pertemuan: ${focus}`,
        `Durasi pertemuan: ${duration}`,
      ],
      items: [
        { label: "Kelas", value: grade },
        { label: "Mata Pelajaran", value: subject },
        {
          label: "Kompetensi",
          value: kd?.label ?? "Pilih kompetensi terlebih dahulu",
        },
        {
          label: "Gaya Belajar Dominan",
          value: learningStyle,
        },
        {
          label: "Mode Aktivitas",
          value: activityMode,
        },
        {
          label: "Fokus Pertemuan",
          value: focus,
        },
      ],
      nextAction:
        "Pastikan profil kelas sudah terisi di sistem agar rekomendasi AI semakin akurat.",
    },
    {
      key: "tujuan",
      title: "Tujuan Pembelajaran",
      description:
        "Rumusan tujuan menggunakan kata kerja operasional dan indikator yang terukur.",
      highlights: [
        "Mengintegrasikan literasi numerasi & karakter",
        "Tujuan disesuaikan dengan profil pelajar Pancasila",
      ],
      items: [
        {
          label: "Tujuan Operasional",
          value:
            kd?.indicator ??
            "Pilih kompetensi untuk melihat rekomendasi tujuan operasional.",
        },
        {
          label: "Profil Pelajar",
          value:
            activityMode === "Proyek"
              ? "Gotong royong · Kreatif · Bernalar kritis"
              : activityMode === "Diskusi"
              ? "Bernalar kritis · Komunikatif"
              : activityMode === "Eksplorasi"
              ? "Mandiri · Bernalar kritis"
              : "Mandiri · Beriman & bertakwa · Bernalar kritis",
        },
        {
          label: "Diferensiasi",
          value:
            learningStyle === "Kinestetik"
              ? "Variasi aktivitas bergerak dan penggunaan alat peraga konkret."
              : learningStyle === "Auditori"
              ? "Narasi audio, diskusi reflektif, dan ikhtisar suara AI."
              : learningStyle === "Kolaboratif"
              ? "Penetapan peran tim dan rubrik kolaborasi eksplisit."
              : "Visualisasi konsep dengan slide interaktif dan mind-map AI.",
        },
      ],
      nextAction:
        "Gunakan tombol 'Generate Tujuan' untuk mempersonalisasi bahasa tujuan ke karakter kelas Anda.",
    },
    {
      key: "kegiatan",
      title: "Skema Kegiatan",
      description:
        "Alur kegiatan inti dengan strategi pembelajaran berdiferensiasi.",
      highlights: [
        `Fase inti menekankan ${activityMode.toLowerCase()} kolaboratif`,
        `Media utama menyesuaikan gaya ${learningStyle.toLowerCase()}`,
      ],
      items: phases.map((phase) => ({
        label: `${phase.title} · ${phase.duration}`,
        value: `${phase.focus} — ${phase.detail}`,
      })),
      nextAction:
        "Aktifkan mode 'AI Coach' untuk mendapatkan instruksi diferensiasi real-time selama pembelajaran.",
    },
    {
      key: "penilaian",
      title: "Instrumen Penilaian",
      description:
        "Kombinasi penilaian formatif dan sumatif berikut rubrik singkat.",
      highlights: [
        "Penilaian berbasis bukti autentik",
        "Rubrik terintegrasi dengan portofolio digital",
      ],
      items: [
        {
          label: "Formatif",
          value:
            kd?.assessment ??
            "Pilih kompetensi untuk melihat ide penilaian formatif.",
        },
        {
          label: "Sumatif",
          value:
            activityMode === "Proyek"
              ? "Produk proyek + presentasi reflektif tim."
              : activityMode === "Diskusi"
              ? "Resume kolaboratif dan kuis refleksi cepat."
              : activityMode === "Eksplorasi"
              ? "Kuis adaptif AI dengan remidi otomatis."
              : "Tes singkat dengan analisis kesalahan terarah.",
        },
        {
          label: "Rubrik Singkat",
          value:
            learningStyle === "Kolaboratif"
              ? "Kriteria meliputi kontribusi ide, kerja sama, dan refleksi tim."
              : "Kriteria mencakup ketepatan konsep, proses berpikir, dan komunikasi.",
        },
      ],
      nextAction:
        "Unggah rubrik ke LMS untuk memanfaatkan auto-tagging evidensi belajar siswa.",
    },
    {
      key: "refleksi",
      title: "Refleksi & Tindak Lanjut",
      description:
        "Rencana umpan balik dan penyesuaian pembelajaran berikutnya berbasis data.",
      highlights: [
        "AI menyiapkan insight otomatis dari jurnal siswa",
        "Guru mendapat rekomendasi intervensi personal",
      ],
      items: [
        {
          label: "Refleksi Guru",
          value:
            "Catat respon siswa, catatan diferensiasi, dan ide pengayaan untuk pertemuan berikutnya.",
        },
        {
          label: "Umpan Balik AI",
          value:
            focus === "Berpikir Kritis"
              ? "AI memetakan tingkat argumentasi siswa dan memberi saran penguatan literasi."
              : focus === "Kolaborasi Tim"
              ? "AI mengirim laporan kontribusi tiap siswa dan rekomendasi peran lanjut."
              : focus === "Proyek Kontekstual"
              ? "AI merangkum progres proyek dan memberi daftar sumber lokal."
              : "AI mengidentifikasi miskonsepsi utama dan menyiapkan materi remedial.",
        },
        {
          label: "Tindak Lanjut",
          value:
            activityMode === "Penguatan"
              ? "Siapkan sesi klinik belajar dengan materi adaptif tambahan."
              : "Rencanakan aktivitas sambung materi untuk memperdalam kompetensi.",
        },
      ],
      nextAction:
        "Aktifkan reminder refleksi harian untuk memudahkan dokumentasi supervisi.",
    },
  ];
});

const activeStepDetailAtom = atom((get) => {
  const steps = get(stepDetailsAtom);
  const activeKey = get(activeStepAtom);
  return steps.find((item) => item.key === activeKey) ?? steps[0];
});

const quickPromptAtom = atom((get) => {
  const subject = get(subjectAtom);
  const kd = get(selectedKDDetailAtom);
  const focus = get(meetingFocusAtom);
  const activity = get(activityModeAtom);

  const basePrompts: Record<
    (typeof subjectOptions)[number],
    { title: string; body: string }[]
  > = {
    Matematika: [
      {
        title: "Generasi Soal Kontekstual",
        body:
          "Buat 3 soal kontekstual terkait belanja harian yang menuntut siswa membandingkan persen dan pecahan.",
      },
      {
        title: "Visualisasi Konsep",
        body:
          "Siapkan slide interaktif tentang hubungan pecahan, persen, dan desimal dengan contoh nyata.",
      },
      {
        title: "Remedial Adaptif",
        body:
          "Rancang 2 aktivitas remedial berbasis miskonsepsi umum tentang perbandingan senilai.",
      },
    ],
    "Bahasa Indonesia": [
      {
        title: "Template Teks Deskripsi",
        body:
          "Susun kerangka teks deskripsi dengan fokus diksi indrawi dan pilihan kata variatif.",
      },
      {
        title: "Sesi Diskusi",
        body:
          "Buat daftar pertanyaan pemantik untuk diskusi cerita rakyat dengan fokus nilai karakter.",
      },
      {
        title: "Penilaian Portofolio",
        body:
          "Sediakan rubrik penilaian portofolio menulis yang mudah digunakan siswa dan orang tua.",
      },
    ],
    IPA: [
      {
        title: "Simulasi Laboratorium",
        body:
          "Rancang simulasi virtual tentang perpindahan kalor dengan pengukuran tabel otomatis.",
      },
      {
        title: "Video Pendukung",
        body:
          "Kurasi 2 video singkat yang memperkuat pemahaman siswa tentang fungsi organ pencernaan.",
      },
      {
        title: "Kuis Diagnostik",
        body:
          "Buat kuis diagnostik 5 soal untuk memetakan gaya belajar sains siswa.",
      },
    ],
    IPS: [
      {
        title: "Studi Kasus",
        body:
          "Siapkan studi kasus ketimpangan ekonomi lokal dan panduan diskusi kelompok.",
      },
      {
        title: "Infografis Cepat",
        body:
          "Buat outline infografis perubahan sosial yang relevan dengan kehidupan siswa.",
      },
      {
        title: "Rubrik Presentasi",
        body:
          "Sediakan rubrik presentasi dengan penekanan pada data dan argumentasi.",
      },
    ],
    PPKn: [
      {
        title: "Debat Mini",
        body:
          "Susun panduan debat mini tentang konflik hak dan kewajiban di lingkungan sekolah.",
      },
      {
        title: "Refleksi Nilai",
        body:
          "Buat 3 pertanyaan refleksi singkat tentang praktik demokrasi Pancasila.",
      },
      {
        title: "Tugas Proyek Sosial",
        body:
          "Rancang proyek aksi warga sekolah untuk meningkatkan partisipasi demokratis siswa.",
      },
    ],
  };

  const prompts = basePrompts[subject].map((prompt) => ({
    ...prompt,
    body: `${prompt.body} Fokuskan pada kompetensi "${kd?.label ?? "yang dipilih"}" dengan penekanan ${focus.toLowerCase()} dalam mode ${activity.toLowerCase()}.`,
  }));

  return prompts;
});

const copiedPromptAtom = atom<string | null>(null);

const highlightAtom = atom((get) => {
  const subject = get(subjectAtom);
  const focus = get(meetingFocusAtom);
  const learningStyle = get(learningStyleAtom);
  return `RPP ${subject} dengan fokus ${focus.toLowerCase()} dan pendekatan ${learningStyle.toLowerCase()} siap dibagikan ke tim guru.`;
});

function useQuickToggle<T>(atomRef: PrimitiveAtom<T>) {
  const setAtomValue = useSetAtom(atomRef);
  return (value: T) => setAtomValue(value);
}

const chipClass =
  "rounded-full border px-4 py-2 text-sm font-medium transition-all";
const chipSelectedClass =
  "border-blue-500/60 bg-blue-500/15 text-blue-100 shadow-sm";
const chipIdleClass =
  "border-base-300/60 bg-base-200/35 text-base-content/75 hover:bg-base-200/60";

export default function RppGeneratorPage() {
  const grade = useAtomValue(gradeAtom);
  const subject = useAtomValue(subjectAtom);
  const duration = useAtomValue(durationAtom);
  const learningStyle = useAtomValue(learningStyleAtom);
  const activityMode = useAtomValue(activityModeAtom);
  const focus = useAtomValue(meetingFocusAtom);
  const kdList = useAtomValue(kdListAtom);
  const [selectedKD, setSelectedKD] = useAtom(selectedKDAtom);
  const kdDetail = useAtomValue(selectedKDDetailAtom);
  const phases = useAtomValue(phaseAtom);
  const steps = useAtomValue(stepDetailsAtom);
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const activeStepDetail = useAtomValue(activeStepDetailAtom);
  const quickPrompts = useAtomValue(quickPromptAtom);
  const highlight = useAtomValue(highlightAtom);
  const [copiedPrompt, setCopiedPrompt] = useAtom(copiedPromptAtom);

  const setGrade = useQuickToggle(gradeAtom);
  const setSubject = useQuickToggle(subjectAtom);
  const setDuration = useQuickToggle(durationAtom);
  const setStyle = useQuickToggle(learningStyleAtom);
  const setActivityMode = useQuickToggle(activityModeAtom);
  const setFocus = useQuickToggle(meetingFocusAtom);

  const stepProgress = useMemo(
    () => (stepOrder.indexOf(activeStep) + 1) / stepOrder.length,
    [activeStep]
  );

  const handleCopyPrompt = async (text: string, id: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(id);
      window.setTimeout(() => setCopiedPrompt(null), 2400);
    } catch (error) {
      console.error("Gagal menyalin prompt:", error);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]" />
        <div className="relative flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-white/80 sm:text-sm">
              Guru · Generator RPP
            </p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              RPP Adaptif Berbasis AI
            </h1>
            <p className="text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
              Susun RPP terpadu yang otomatis menyesuaikan karakteristik kelas,
              kompetensi dasar, serta preferensi belajar siswa. AI membantu
              merangkum tujuan, strategi kegiatan, hingga penilaian autentik
              dalam sekali klik.
            </p>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/75">
              Snapshot RPP
            </p>
            <div className="mt-4 space-y-3 text-sm sm:text-base">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-white">
                <span className="text-white/75">Kelas &amp; Mapel</span>
                <span className="font-semibold whitespace-nowrap">
                  {grade} · {subject}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-white">
                <span className="text-white/75">Durasi</span>
                <span className="font-semibold whitespace-nowrap">{duration}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-white">
                <span className="text-white/75">Fokus</span>
                <span className="font-semibold whitespace-nowrap">{focus}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-white">
                <span className="text-white/75">Gaya Belajar</span>
                <span className="font-semibold whitespace-nowrap">{learningStyle}</span>
              </div>
            </div>
            <p className="mt-5 rounded-xl border border-white/15 bg-white/10 p-4 text-sm text-white/90 sm:text-base">
              {highlight}
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 rounded-3xl border border-base-300/60 bg-base-200/35 p-6 shadow-lg backdrop-blur-sm lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-base-content">
                Personalisasi RPP
              </h2>
              <p className="text-sm text-base-content/70">
                Sesuaikan karakteristik kelas untuk mengoptimalkan rekomendasi
                AI.
              </p>
            </div>
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase text-blue-100">
              Real-time
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Pilih Kelas
              </p>
              <div className="flex flex-wrap gap-2">
                {gradeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setGrade(option)}
                    className={`${chipClass} ${
                      grade === option ? chipSelectedClass : chipIdleClass
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Mata Pelajaran
              </p>
              <div className="flex flex-wrap gap-2">
                {subjectOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSubject(option)}
                    className={`${chipClass} ${
                      subject === option ? chipSelectedClass : chipIdleClass
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Durasi Pertemuan
              </p>
              <div className="flex flex-wrap gap-2">
                {durationOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setDuration(option)}
                    className={`${chipClass} ${
                      duration === option ? chipSelectedClass : chipIdleClass
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Mode Aktivitas
              </p>
              <div className="flex flex-wrap gap-2">
                {activityModes.map((option) => (
                  <button
                    key={option}
                    onClick={() => setActivityMode(option)}
                    className={`${chipClass} ${
                      activityMode === option ? chipSelectedClass : chipIdleClass
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Gaya Belajar Dominan
              </p>
              <div className="flex flex-wrap gap-2">
                {styleOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setStyle(option)}
                    className={`${chipClass} ${
                      learningStyle === option ? chipSelectedClass : chipIdleClass
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Fokus Pertemuan
              </p>
              <div className="flex flex-wrap gap-2">
                {focusThemes.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFocus(option)}
                    className={`${chipClass} ${
                      focus === option ? chipSelectedClass : chipIdleClass
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-base-300/60 bg-base-200/40 p-6 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-base-content">
            <h3 className="text-lg font-semibold text-base-content">
              Progres Outline
            </h3>
            <span className="text-sm font-semibold text-blue-400">
              {Math.round(stepProgress * 100)}%
            </span>
          </div>
          <p className="mt-2 text-sm text-base-content/80">
            Telusuri setiap bagian RPP. Klik tab untuk mengisi detail dan lihat
            rekomendasi AI.
          </p>
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-base-300/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${stepProgress * 100}%` }}
            />
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {steps.map((step) => (
              <li
                key={step.key}
                className={`flex items-start gap-3 rounded-2xl border p-3 transition-all ${
                  activeStep === step.key
                    ? "border-blue-500/40 bg-blue-500/10 text-blue-100"
                    : "border-base-300/50 bg-base-200/40 text-base-content/80"
                }`}
              >
                <span
                  className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${
                    activeStep === step.key
                      ? "bg-blue-500 text-white"
                      : "bg-base-300/80 text-base-content"
                  }`}
                >
                  {stepOrder.indexOf(step.key) + 1}
                </span>
                <div>
                  <p
                    className={`font-semibold ${
                      activeStep === step.key
                        ? "text-blue-100"
                        : "text-base-content"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p
                    className={`text-xs ${
                      activeStep === step.key
                        ? "text-blue-100/80"
                        : "text-base-content/65"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 rounded-3xl border border-base-300/70 bg-base-200/40 p-6 shadow-lg backdrop-blur-sm lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-base-content">
                Struktur RPP
              </h2>
              <p className="text-sm text-base-content/70">
                Klik bagian untuk melihat rekomendasi detail dari AI.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {stepOrder.map((stepKey) => (
                <button
                  key={stepKey}
                  onClick={() => setActiveStep(stepKey)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-all ${
                    activeStep === stepKey
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-base-200/35 text-base-content/75 hover:bg-base-200/55"
                  }`}
                >
                  {stepKey}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-base-300/60 bg-base-200/35 p-6 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-base-content">
                  {activeStepDetail.title}
                </h3>
                <p className="text-sm text-base-content/70">
                  {activeStepDetail.description}
                </p>
              </div>
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase text-blue-100">
                AI Assisted
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {activeStepDetail.highlights.map((highlightItem, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4 text-sm text-blue-100"
                >
                  {highlightItem}
                </div>
              ))}
            </div>

            <dl className="mt-6 grid gap-4">
              {activeStepDetail.items.map((item, idx) => (
                <div
                  key={`${activeStepDetail.key}-${idx}`}
                  className="rounded-2xl border border-base-300/50 bg-base-100/70 p-4"
                >
                  <div className="grid grid-cols-[auto,minmax(0,1fr)] items-start gap-x-6 gap-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-base-content/65">
                      {item.label}
                    </dt>
                    <dd className="text-sm sm:text-base text-base-content">
                      {item.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            {activeStepDetail.nextAction ? (
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-400 p-[1px]">
                <div className="rounded-2xl bg-base-200/85 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
                    Rekomendasi AI
                  </p>
                  <p className="mt-2 text-sm text-base-content">
                    {activeStepDetail.nextAction}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="space-y-5 rounded-3xl border border-base-300/60 bg-base-200/35 p-6 shadow-lg backdrop-blur-sm">
          <div>
            <h3 className="text-lg font-semibold text-base-content">
              Timeline Pembelajaran
            </h3>
            <p className="text-sm text-base-content/70">
              Otomatis disesuaikan dengan durasi dan mode aktivitas.
            </p>
          </div>
          <div className="space-y-4">
            {phases.map((phase) => (
              <div
                key={phase.title}
                className="relative rounded-2xl border border-base-300/50 bg-base-100/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-base-content">
                      {phase.title}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-blue-300">
                      {phase.focus}
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-100">
                    {phase.duration}
                  </span>
                </div>
                <p className="mt-3 text-sm text-base-content/85">
                  {phase.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">
              Insight Otomatis
            </p>
            <p className="mt-2 text-sm text-blue-100">
              AI siap memonitor keterlibatan siswa dan memberikan saran
              diferensiasi selama kelas berlangsung.
            </p>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-base-300/60 bg-base-200/35 p-6 shadow-lg backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-base-content">
                Kompetensi & Indikator
              </h3>
              <p className="text-sm text-base-content/70">
                Pilih kompetensi dasar, AI akan mempersonalisasi tujuan dan
                asesmen.
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase text-emerald-100">
              Terhubung LMS
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {kdList.map((item) => (
              <button
                key={item.id}
                onClick={() => item.id && setSelectedKD(item.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  selectedKD === item.id
                    ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-100 shadow-sm"
                    : "border-base-300/60 bg-base-100/70 text-base-content hover:border-emerald-300/40"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide">
                  {item.id}
                </p>
                <p className="mt-1 text-sm font-semibold">{item.label}</p>
                <p className="mt-2 text-xs text-base-content/70">
                  {item.indicator}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-base-300/50 bg-base-100/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-base-content/70">
              Penilaian Direkomendasikan
            </p>
            <p className="mt-2 text-sm text-base-content">
              {kdDetail?.assessment ??
                "Pilih kompetensi untuk melihat rekomendasi penilaian formatif."}
            </p>
          </div>
        </div>

        <div className="space-y-5 rounded-3xl border border-base-300/60 bg-base-200/35 p-6 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-base-content">
            <h3 className="text-lg font-semibold text-base-content">
              Quick Prompt AI
            </h3>
            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold uppercase text-purple-100">
              Template
            </span>
          </div>
          <p className="text-sm text-base-content/70">
            Gunakan prompt siap pakai untuk mempercepat persiapan materi,
            penilaian, dan remedial.
          </p>
          <div className="space-y-4">
            {quickPrompts.map((prompt, idx) => (
              <div
                key={`${prompt.title}-${idx}`}
                className="rounded-2xl border border-base-300/50 bg-base-100/70 p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-sm font-semibold text-purple-100">
                    {idx + 1}
                  </span>
                  <p className="font-semibold text-base-content">
                    {prompt.title}
                  </p>
                </div>
                <p className="mt-3 text-sm text-base-content/80">
                  {prompt.body}
                </p>
                <button
                  onClick={() => handleCopyPrompt(prompt.body, prompt.title)}
                  className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    copiedPrompt === prompt.title
                      ? "bg-emerald-600 hover:bg-emerald-500 focus:ring-emerald-400"
                      : "bg-purple-600 hover:bg-purple-500 focus:ring-purple-400"
                  }`}
                >
                  <span>
                    {copiedPrompt === prompt.title ? "Tersalin" : "Salin Prompt"}
                  </span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16h8M8 12h8m-7-8h6a2 2 0 012 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
