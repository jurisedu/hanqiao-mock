"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DICT } from "./dict";

export type Lang = "zh" | "en" | "sw" | "fr" | "es" | "nl" | "id";
export type L = { zh: string; en: string; sw: string; fr?: string; es?: string; nl?: string; id?: string };
export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "zh", label: "中文", short: "中" },
  { code: "en", label: "English", short: "EN" },
  { code: "sw", label: "Kiswahili", short: "SW" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
  { code: "nl", label: "Nederlands", short: "NL" },
  { code: "id", label: "Bahasa Indonesia", short: "ID" },
];
const CODES = LANGS.map((l) => l.code);
const HTML_LANG: Record<Lang, string> = { zh: "zh-Hans", en: "en", sw: "sw", fr: "fr", es: "es", nl: "nl", id: "id" };
const DICT_INDEX: Record<string, number> = { fr: 0, es: 1, nl: 2, id: 3 };

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

/** Resolve a string for the current language. zh / en / sw are authored inline; fr / es / nl / id come from the
    central dictionary keyed by the English text, and fall back to English when a phrase has no entry yet. */
export function resolve(s: L | string, lang: Lang): string {
  if (typeof s === "string") return s;
  const direct = s[lang];
  if (direct) return direct;
  const i = DICT_INDEX[lang];
  if (i !== undefined) { const hit = DICT[s.en]; if (hit) return hit[i]; }
  return s.en;
}

export function useT() {
  const { lang } = useContext(Ctx);
  return (s: L | string) => resolve(s, lang);
}

export const t3 = (zh: string, en: string, sw: string): L => ({ zh, en, sw });

/* Shared UI vocabulary */
export const UI = {
  brand: t3("汉桥", "HanQiao", "HanQiao"),
  brandSub: t3("GACEE 中文学习平台", "GACEE Chinese learning platform", "Jukwaa la kujifunza Kichina la GACEE"),
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
  partial: t3("核心界面已翻译，详细内容暂以英文显示", "Core interface translated; detailed content shown in English for now", "Kiolesura kikuu kimetafsiriwa; maudhui ya kina kwa Kiingereza kwa sasa"),
};
