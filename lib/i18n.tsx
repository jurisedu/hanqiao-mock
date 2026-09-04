"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "zh" | "en" | "sw";
export type L = { zh: string; en: string; sw: string };
export const LANGS: { code: Lang; label: string }[] = [
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
  { code: "sw", label: "Kiswahili" },
];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "zh", setLang: () => {} });

export function LangProvider({ children, initial = "zh" }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initial);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hq_lang") as Lang | null;
      if (saved && ["zh", "en", "sw"].includes(saved)) setLangState(saved);
    } catch {}
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("hq_lang", l); } catch {}
    document.documentElement.lang = l === "zh" ? "zh-Hans" : l;
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() { return useContext(Ctx); }

/** Pick the current language from a trilingual string. */
export function useT() {
  const { lang } = useContext(Ctx);
  return (s: L | string) => (typeof s === "string" ? s : s[lang] ?? s.en);
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
  mock: t3("演示环境 · 数据为模拟", "Preview · sample data", "Onyesho · data ya mfano"),
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
};
