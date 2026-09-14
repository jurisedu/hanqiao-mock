"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DICT } from "./dict";

export type Lang = "zh" | "en" | "en-US" | "sw" | "fr" | "es" | "nl" | "id" | "vi" | "ms" | "th" | "ko" | "de" | "lo" | "my" | "mn" | "uz" | "ar";
export type L = { zh: string; en: string; sw: string } & Partial<Record<Lang, string>>;

export type Cov = "full" | "core" | "soon";
export const LANGS: { code: Lang; label: string; en: string; region: L; cov: Cov }[] = [
  { code: "zh", label: "中文", en: "Chinese", region: t3("通用", "Global", "Kimataifa"), cov: "full" },
  { code: "en", label: "English (UK)", en: "British / International English", region: t3("通用", "Global", "Kimataifa"), cov: "full" },
  { code: "en-US", label: "English (US)", en: "American English", region: t3("通用", "Global", "Kimataifa"), cov: "full" },
  { code: "id", label: "Bahasa Indonesia", en: "Indonesian", region: t3("东南亚", "Southeast Asia", "Asia ya Kusini-Mashariki"), cov: "full" },
  { code: "vi", label: "Tiếng Việt", en: "Vietnamese", region: t3("东南亚", "Southeast Asia", "Asia ya Kusini-Mashariki"), cov: "core" },
  { code: "ms", label: "Bahasa Melayu", en: "Malay", region: t3("东南亚", "Southeast Asia", "Asia ya Kusini-Mashariki"), cov: "core" },
  { code: "th", label: "ไทย", en: "Thai", region: t3("东南亚", "Southeast Asia", "Asia ya Kusini-Mashariki"), cov: "core" },
  { code: "lo", label: "ລາວ", en: "Lao", region: t3("东南亚", "Southeast Asia", "Asia ya Kusini-Mashariki"), cov: "soon" },
  { code: "my", label: "မြန်မာ", en: "Burmese", region: t3("东南亚", "Southeast Asia", "Asia ya Kusini-Mashariki"), cov: "soon" },
  { code: "ko", label: "한국어", en: "Korean", region: t3("东亚", "East Asia", "Asia ya Mashariki"), cov: "core" },
  { code: "mn", label: "Монгол", en: "Mongolian", region: t3("东亚", "East Asia", "Asia ya Mashariki"), cov: "soon" },
  { code: "uz", label: "Oʻzbekcha", en: "Uzbek", region: t3("中亚", "Central Asia", "Asia ya Kati"), cov: "soon" },
  { code: "ar", label: "العربية", en: "Arabic", region: t3("中东 · 非洲", "Middle East · Africa", "Mashariki ya Kati · Afrika"), cov: "soon" },
  { code: "de", label: "Deutsch", en: "German", region: t3("欧洲", "Europe", "Ulaya"), cov: "core" },
  { code: "fr", label: "Français", en: "French", region: t3("欧洲", "Europe", "Ulaya"), cov: "full" },
  { code: "es", label: "Español", en: "Spanish", region: t3("欧洲", "Europe", "Ulaya"), cov: "full" },
  { code: "nl", label: "Nederlands", en: "Dutch", region: t3("欧洲", "Europe", "Ulaya"), cov: "full" },
  { code: "sw", label: "Kiswahili", en: "Swahili", region: t3("非洲", "Africa", "Afrika"), cov: "full" },
];
const CODES = LANGS.map((l) => l.code);
const HTML_LANG: Record<Lang, string> = { zh: "zh-Hans", en: "en-GB", "en-US": "en-US", sw: "sw", fr: "fr", es: "es", nl: "nl", id: "id", vi: "vi", ms: "ms", th: "th", ko: "ko", de: "de", lo: "lo", my: "my", mn: "mn", uz: "uz", ar: "ar" };
const DICT_INDEX: Record<string, number> = { fr: 0, es: 1, nl: 2, id: 3 };

/* The interface is authored in British / International English (the base `en`). American English
   is produced from that base at read time — a curated, high-confidence, whole-word map applied
   over s.en — so English (US) Americanises the entire interface with no parallel dictionary to
   maintain and no risk of mangling names or data. Case is preserved. */
const US_MAP: Record<string, string> = {
  colour: "color", colours: "colors", coloured: "colored", colouring: "coloring", colourful: "colorful",
  favourite: "favorite", favourites: "favorites", favourited: "favorited",
  behaviour: "behavior", behaviours: "behaviors",
  honour: "honor", honours: "honors", honoured: "honored",
  neighbour: "neighbor", neighbours: "neighbors",
  centre: "center", centres: "centers", centred: "centered",
  catalogue: "catalog", catalogues: "catalogs",
  grey: "gray", maths: "math",
  customise: "customize", customised: "customized", customises: "customizes", customising: "customizing",
  personalise: "personalize", personalised: "personalized", personalising: "personalizing",
  organise: "organize", organised: "organized", organising: "organizing", organiser: "organizer",
  organisation: "organization", organisations: "organizations",
  optimise: "optimize", optimised: "optimized", optimising: "optimizing", optimisation: "optimization",
  analyse: "analyze", analysed: "analyzed", analysing: "analyzing", analyser: "analyzer",
  synchronise: "synchronize", synchronised: "synchronized", synchronising: "synchronizing",
  prioritise: "prioritize", prioritised: "prioritized", prioritising: "prioritizing",
  summarise: "summarize", summarised: "summarized", summarising: "summarizing",
  recognise: "recognize", recognised: "recognized", recognising: "recognizing",
  realise: "realize", realised: "realized", realising: "realizing",
  emphasise: "emphasize", emphasised: "emphasized", emphasising: "emphasizing",
  minimise: "minimize", minimised: "minimized", minimising: "minimizing",
  maximise: "maximize", maximised: "maximized", maximising: "maximizing",
  memorise: "memorize", memorised: "memorized", memorising: "memorizing",
  categorise: "categorize", categorised: "categorized", categorising: "categorizing",
  specialise: "specialize", specialised: "specialized", specialising: "specializing",
  randomise: "randomize", randomised: "randomized", randomising: "randomizing",
  enrolment: "enrollment", enrol: "enroll",
  fulfil: "fulfill", fulfilment: "fulfillment",
  cancelled: "canceled", cancelling: "canceling",
  travelled: "traveled", travelling: "traveling", traveller: "traveler",
  modelling: "modeling", modelled: "modeled",
  labelled: "labeled", labelling: "labeling",
  programme: "program", programmes: "programs",
  defence: "defense", offence: "offense", licence: "license",
};
const US_RE = new RegExp("\\b(" + Object.keys(US_MAP).join("|") + ")\\b", "gi");
function matchCase(src: string, repl: string): string {
  if (src === src.toUpperCase()) return repl.toUpperCase();
  if (src[0] === src[0].toUpperCase()) return repl[0].toUpperCase() + repl.slice(1);
  return repl;
}
export function toAmerican(s: string): string {
  return s.replace(US_RE, (m) => matchCase(m, US_MAP[m.toLowerCase()]));
}

/* Core interface + navigation strings for demo-region languages (vi/ms/de/ko/th).
   Short, high-frequency terms only; longer phrases fall back to English until native review. Keyed by English. */
type Extra = Partial<Record<Lang, string>>;
export const EXTRA: Record<string, Extra> = {
  "AI Chinese learning platform": { vi: "Nền tảng học tiếng Trung AI", ms: "Platform pembelajaran bahasa Cina AI", de: "KI-Plattform zum Chinesischlernen", ko: "AI 중국어 학습 플랫폼", th: "แพลตฟอร์มเรียนภาษาจีนด้วย AI" },
  "Preview environment": { vi: "Môi trường demo", ms: "Persekitaran demo", de: "Demo-Umgebung", ko: "미리보기 환경", th: "สภาพแวดล้อมสาธิต" },
  "Today": { vi: "Hôm nay", ms: "Hari ini", de: "Heute", ko: "오늘", th: "วันนี้" },
  "Continue": { vi: "Tiếp tục", ms: "Teruskan", de: "Weiter", ko: "계속", th: "ต่อไป" },
  "Start": { vi: "Bắt đầu", ms: "Mula", de: "Start", ko: "시작", th: "เริ่ม" },
  "Submit": { vi: "Nộp", ms: "Hantar", de: "Senden", ko: "제출", th: "ส่ง" },
  "Language": { vi: "Ngôn ngữ", ms: "Bahasa", de: "Sprache", ko: "언어", th: "ภาษา" },
  "Online": { vi: "Trực tuyến", ms: "Dalam talian", de: "Online", ko: "온라인", th: "ออนไลน์" },
  "Offline": { vi: "Ngoại tuyến", ms: "Luar talian", de: "Offline", ko: "오프라인", th: "ออฟไลน์" },
  "Sign in": { vi: "Đăng nhập", ms: "Log masuk", de: "Anmelden", ko: "로그인", th: "เข้าสู่ระบบ" },
  "Learners": { vi: "Học viên", ms: "Pelajar", de: "Lernende", ko: "학습자", th: "ผู้เรียน" },
  "Teachers": { vi: "Giáo viên", ms: "Guru", de: "Lehrkräfte", ko: "교사", th: "ครู" },
  "Classes": { vi: "Lớp học", ms: "Kelas", de: "Klassen", ko: "학급", th: "ชั้นเรียน" },
  "Schools": { vi: "Trường học", ms: "Sekolah", de: "Schulen", ko: "학교", th: "โรงเรียน" },
  "Search learners, lessons, knowledge points…": { vi: "Tìm học viên, bài học, điểm kiến thức…", ms: "Cari pelajar, pelajaran, mata pengetahuan…", de: "Lernende, Lektionen, Wissenspunkte suchen…", ko: "학습자·수업·지식점 검색…", th: "ค้นหาผู้เรียน บทเรียน จุดความรู้…" },
  // learner nav
  "Lessons": { vi: "Bài học", ms: "Pelajaran", de: "Lektionen", ko: "수업", th: "บทเรียน" },
  "Live class": { vi: "Lớp trực tiếp", ms: "Kelas langsung", de: "Live-Unterricht", ko: "라이브 수업", th: "เรียนสด" },
  "Practice": { vi: "Luyện tập", ms: "Latihan", de: "Übung", ko: "연습", th: "ฝึกฝน" },
  "Pronunciation": { vi: "Phát âm", ms: "Sebutan", de: "Aussprache", ko: "발음", th: "การออกเสียง" },
  "Conversation": { vi: "Hội thoại", ms: "Perbualan", de: "Konversation", ko: "회화", th: "บทสนทนา" },
  "Review cards": { vi: "Thẻ ôn tập", ms: "Kad ulang kaji", de: "Wiederholungskarten", ko: "복습 카드", th: "การ์ดทบทวน" },
  "Photo homework": { vi: "Bài tập chụp ảnh", ms: "Kerja rumah foto", de: "Foto-Hausaufgabe", ko: "사진 숙제", th: "การบ้านถ่ายรูป" },
  "Mock exam": { vi: "Thi thử", ms: "Peperiksaan olok", de: "Probeprüfung", ko: "모의고사", th: "สอบจำลอง" },
  "Library": { vi: "Thư viện", ms: "Perpustakaan", de: "Bibliothek", ko: "도서관", th: "ห้องสมุด" },
  "Future Academy": { vi: "Học viện Tương lai", ms: "Akademi Masa Depan", de: "Future Academy", ko: "미래 아카데미", th: "สถาบันอนาคต" },
  "Knowledge map": { vi: "Bản đồ kiến thức", ms: "Peta pengetahuan", de: "Wissenskarte", ko: "지식 지도", th: "แผนที่ความรู้" },
  "My agents": { vi: "Trợ lý của tôi", ms: "Ejen saya", de: "Meine Agenten", ko: "내 에이전트", th: "เอเจนต์ของฉัน" },
  "Certificates": { vi: "Chứng chỉ", ms: "Sijil", de: "Zertifikate", ko: "수료증", th: "ใบรับรอง" },
  // teacher nav
  "Workbench": { vi: "Bàn làm việc", ms: "Meja kerja", de: "Arbeitsplatz", ko: "작업대", th: "โต๊ะทำงาน" },
  "Review queue": { vi: "Hàng chờ duyệt", ms: "Baris semakan", de: "Prüf-Warteschlange", ko: "검토 대기열", th: "คิวตรวจ" },
  "AI proposals": { vi: "Đề xuất của AI", ms: "Cadangan AI", de: "KI-Vorschläge", ko: "AI 제안", th: "ข้อเสนอ AI" },
  "Class insight": { vi: "Thông tin lớp", ms: "Wawasan kelas", de: "Klassenanalyse", ko: "학급 현황", th: "ข้อมูลชั้นเรียน" },
  "Live console": { vi: "Bảng điều khiển trực tiếp", ms: "Konsol langsung", de: "Live-Konsole", ko: "라이브 콘솔", th: "คอนโซลถ่ายทอดสด" },
  "Recording & voice": { vi: "Ghi hình & giọng nói", ms: "Rakaman & suara", de: "Aufnahme & Stimme", ko: "녹화 및 음성", th: "บันทึกและเสียง" },
  "Schedule": { vi: "Lịch dạy", ms: "Jadual", de: "Stundenplan", ko: "일정", th: "ตารางสอน" },
};

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "zh", setLang: () => {} });

export function LangProvider({ children, initial = "zh" }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initial);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hq_lang") as Lang | null;
      if (saved && CODES.includes(saved)) { setLangState(saved); document.documentElement.lang = HTML_LANG[saved]; }
    } catch {}
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("hq_lang", l); } catch {}
    document.documentElement.lang = HTML_LANG[l];
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() { return useContext(Ctx); }

/** Resolve a string for the current language. zh / en / sw are authored inline; other languages come from inline
    overrides, then the EXTRA core dictionary, then the fr/es/nl/id batch dictionary, then fall back to English. */
export function resolve(s: L | string, lang: Lang): string {
  if (typeof s === "string") return s;
  const direct = s[lang];
  if (direct) return direct;
  if (lang === "en-US") return toAmerican(s.en);
  const ex = EXTRA[s.en]; if (ex && ex[lang]) return ex[lang]!;
  const i = DICT_INDEX[lang];
  if (i !== undefined) { const hit = DICT[s.en]; if (hit) return hit[i]; }
  return s.en;
}

export function useT() {
  const { lang } = useContext(Ctx);
  return (s: L | string) => resolve(s, lang);
}

export function t3(zh: string, en: string, sw: string): L { return { zh, en, sw }; }

/* Shared UI vocabulary */
export const UI = {
  brand: t3("山海同文", "SHANHAI TONGWEN", "SHANHAI TONGWEN"),
  brandSub: t3("AI 中文学习平台", "AI Chinese learning platform", "Jukwaa la AI la Kichina"),
  language: t3("语言", "Language", "Lugha"),
  search: t3("搜索学员、课程、知识点…", "Search learners, lessons, knowledge points…", "Tafuta wanafunzi, masomo, mada…"),
  online: t3("在线", "Online", "Mtandaoni"),
  offline: t3("离线", "Offline", "Nje ya mtandao"),
  weak: t3("弱网", "Weak network", "Mtandao dhaifu"),
  good: t3("网络良好", "Good network", "Mtandao mzuri"),
  today: t3("今天", "Today", "Leo"),
  continue: t3("继续", "Continue", "Endelea"),
  start: t3("开始", "Start", "Anza"),
  submit: t3("提交", "Submit", "Tuma"),
  save: t3("保存", "Save", "Hifadhi"),
  cancel: t3("取消", "Cancel", "Ghairi"),
  approve: t3("批准", "Approve", "Kubali"),
  reject: t3("婉拒", "Decline", "Kataa"),
  viewAll: t3("查看全部", "View all", "Angalia zote"),
  details: t3("详情", "Details", "Maelezo"),
  minutes: t3("分钟", "min", "dakika"),
  week: t3("本周", "This week", "Wiki hii"),
  streak: t3("连续学习", "Streak", "Mfululizo"),
  days: t3("天", "days", "siku"),
  score: t3("得分", "Score", "Alama"),
  students: t3("学员", "Learners", "Wanafunzi"),
  teachers: t3("老师", "Teachers", "Walimu"),
  classes: t3("班级", "Classes", "Madarasa"),
  schools: t3("学校", "Schools", "Shule"),
  signIn: t3("登录", "Sign in", "Ingia"),
  signOut: t3("退出", "Sign out", "Toka"),
  role: t3("角色", "Role", "Nafasi"),
  switchRole: t3("切换角色", "Switch role", "Badilisha nafasi"),
  mock: t3("演示环境 · 全部数据为模拟", "Preview environment · all data is sample data", "Mazingira ya onyesho · data zote ni za mfano"),
  env: t3("演示环境", "Preview environment", "Mazingira ya onyesho"),
  download: t3("下载", "Download", "Pakua"),
  downloaded: t3("已下载", "Downloaded", "Imepakuliwa"),
  sync: t3("同步", "Sync", "Sawazisha"),
  synced: t3("已同步", "Synced", "Imesawazishwa"),
  pending: t3("待同步", "Pending sync", "Inasubiri"),
  lowData: t3("省流模式", "Low-data mode", "Hali ya data kidogo"),
  teacherSign: t3("老师签发", "Teacher sign-off", "Idhini ya mwalimu"),
  aiAssist: t3("AI 辅助", "AI-assisted", "Msaada wa AI"),
  source: t3("出处", "Source", "Chanzo"),
  abstain: t3("拿不准，已转老师", "Unsure, sent to teacher", "Sina uhakika, imetumwa kwa mwalimu"),
  partial: t3("界面已全量翻译 · 母语审校进行中", "Fully translated · native review in progress", "Imetafsiriwa kikamilifu · ukaguzi wa mzawa unaendelea"),
};
