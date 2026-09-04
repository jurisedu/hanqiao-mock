import { t3 } from "./i18n";
import type { NavItem, Role } from "@/components/Shell";

export const learnerRole: Role = { key: "learn", label: t3("学员 · HSK 1", "Learner · HSK 1", "Mwanafunzi · HSK 1"), name: "Amara Okafor", initials: "AO", theme: "learner" };
export const learnerNav: NavItem[] = [
  { href: "/learn", label: t3("今天", "Today", "Leo"), icon: "home" },
  { href: "/learn/lesson", label: t3("课程", "Lessons", "Masomo"), icon: "play" },
  { href: "/learn/live", label: t3("直播课", "Live class", "Somo la moja kwa moja"), icon: "live", pill: "LIVE" },
  { href: "/learn/practice", label: t3("练习", "Practice", "Mazoezi"), icon: "exam", group: t3("学与练", "Learn & practise", "Jifunze na fanya mazoezi") },
  { href: "/learn/speak", label: t3("发音教练", "Pronunciation", "Matamshi"), icon: "mic" },
  { href: "/learn/talk", label: t3("情景对话", "Conversation", "Mazungumzo"), icon: "chat" },
  { href: "/learn/review", label: t3("复习卡", "Review cards", "Kadi za marudio"), icon: "cards" },
  { href: "/learn/homework", label: t3("拍照作业", "Photo homework", "Kazi ya picha"), icon: "cam" },
  { href: "/learn/exam", label: t3("模拟考", "Mock exam", "Mtihani wa majaribio"), icon: "check" },
  { href: "/learn/library", label: t3("图书馆", "Library", "Maktaba"), icon: "lib", group: t3("阅读与成长", "Read & grow", "Soma na ukue") },
  { href: "/learn/academy", label: t3("未来书院", "Future Academy", "Future Academy"), icon: "school" },
  { href: "/learn/progress", label: t3("知识星图", "Knowledge map", "Ramani ya maarifa"), icon: "graph" },
  { href: "/learn/agents", label: t3("我的 Agent", "My agents", "Mawakala wangu"), icon: "bot" },
  { href: "/learn/certificate", label: t3("证书", "Certificates", "Vyeti"), icon: "cert" },
];

export const teacherRole: Role = { key: "teach", label: t3("远程中文老师 · 郑州", "Remote Chinese teacher · Zhengzhou", "Mwalimu wa Kichina · Zhengzhou"), name: "王老师", initials: "王", tone: "gold" };
export const teacherNav: NavItem[] = [
  { href: "/teach", label: t3("工作台", "Workbench", "Dawati"), icon: "home" },
  { href: "/teach/review", label: t3("复核队列", "Review queue", "Foleni ya ukaguzi"), icon: "check", pill: "3" },
  { href: "/teach/proposals", label: t3("AI 提议", "AI proposals", "Mapendekezo ya AI"), icon: "inbox", pill: "2" },
  { href: "/teach/class/c1", label: t3("班级学情", "Class insight", "Hali ya darasa"), icon: "users", group: t3("教学", "Teaching", "Ufundishaji") },
  { href: "/teach/live", label: t3("直播控制台", "Live console", "Kidhibiti cha moja kwa moja"), icon: "live" },
  { href: "/teach/record", label: t3("录课与音色", "Recording & voice", "Kurekodi na sauti"), icon: "rec" },
  { href: "/teach/schedule", label: t3("排课", "Schedule", "Ratiba"), icon: "cal" },
  { href: "/teach/library", label: t3("图书馆 · 共读", "Library · shared reading", "Maktaba · usomaji wa pamoja"), icon: "lib", group: t3("内容", "Content", "Maudhui") },
];

export const opsRole: Role = { key: "ops", label: t3("运营 / 教务 · 新加坡", "Operations · Singapore", "Uendeshaji · Singapore"), name: "Ops Team", initials: "OP", tone: "green" };
export const opsNav: NavItem[] = [
  { href: "/ops", label: t3("总览", "Overview", "Muhtasari"), icon: "home" },
  { href: "/ops/schools", label: t3("学校与租户", "Schools & tenants", "Shule na wapangaji"), icon: "school" },
  { href: "/ops/content", label: t3("课程与内容包", "Courses & packs", "Kozi na vifurushi"), icon: "content" },
  { href: "/ops/publishing", label: t3("出版与图书馆", "Publishing & library", "Uchapishaji na maktaba"), icon: "pub" },
  { href: "/ops/agentops", label: t3("AgentOps", "AgentOps", "AgentOps"), icon: "ops", group: t3("平台", "Platform", "Jukwaa") },
  { href: "/ops/compliance", label: t3("合规与审计", "Compliance & audit", "Uzingatiaji na ukaguzi"), icon: "shield" },
  { href: "/ops/billing", label: t3("席位与结算", "Seats & billing", "Viti na malipo"), icon: "pay" },
  { href: "/ops/network", label: t3("网络与分发", "Network & delivery", "Mtandao na usambazaji"), icon: "globe" },
];

export const schoolRole: Role = { key: "school", label: t3("学校管理员 · Great Heights", "School admin · Great Heights", "Msimamizi wa shule · Great Heights"), name: "Mrs. Adaeze", initials: "AD", tone: "gold" };
export const schoolNav: NavItem[] = [
  { href: "/school", label: t3("学校总览", "School overview", "Muhtasari wa shule"), icon: "home" },
  { href: "/school/learners", label: t3("学员与班级", "Learners & classes", "Wanafunzi na madarasa"), icon: "users" },
  { href: "/school/devices", label: t3("设备与网络", "Devices & network", "Vifaa na mtandao"), icon: "phone" },
  { href: "/school/reports", label: t3("报告与证书", "Reports & certificates", "Ripoti na vyeti"), icon: "cert" },
];

export const enterpriseRole: Role = { key: "enterprise", label: t3("企业 HR · 委托班", "Enterprise HR · commissioned class", "HR ya kampuni · darasa la agizo"), name: "Sino-Lagos Energy", initials: "SL", tone: "green" };
export const enterpriseNav: NavItem[] = [
  { href: "/enterprise", label: t3("委托班总览", "Class overview", "Muhtasari wa darasa"), icon: "home" },
  { href: "/enterprise/attendance", label: t3("出勤与进度", "Attendance & progress", "Mahudhurio na maendeleo"), icon: "cal" },
  { href: "/enterprise/certificates", label: t3("结业证书", "Completion certificates", "Vyeti vya kuhitimu"), icon: "cert" },
  { href: "/enterprise/billing", label: t3("结算", "Billing", "Malipo"), icon: "pay" },
];
