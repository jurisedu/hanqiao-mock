import { t3, type L } from "./i18n";

export const learner = { name: "Amara Okafor", initials: "AO", school: "Great Heights School", city: "Lagos", level: "HSK 1", streak: 12, minutesWeek: 146, xp: 1840, l1: "Kiswahili / English" };

export const kps: { id: string; han: string; pinyin: string; en: string; mastery: number; n: number; status: "mastered" | "developing" | "weak" | "insufficient" | "untested"; group: string }[] = [
  { id: "k1", han: "你好", pinyin: "nǐ hǎo", en: "hello", mastery: 0.96, n: 14, status: "mastered", group: "Greetings" },
  { id: "k2", han: "谢谢", pinyin: "xiè xie", en: "thank you", mastery: 0.9, n: 11, status: "mastered", group: "Greetings" },
  { id: "k3", han: "我是学生", pinyin: "wǒ shì xuéshēng", en: "I am a student", mastery: 0.78, n: 9, status: "developing", group: "Identity" },
  { id: "k4", han: "第三声", pinyin: "tone 3", en: "third tone", mastery: 0.42, n: 12, status: "weak", group: "Pronunciation" },
  { id: "k5", han: "量词 个", pinyin: "gè", en: "measure word", mastery: 0.55, n: 6, status: "developing", group: "Grammar" },
  { id: "k6", han: "数字 1–10", pinyin: "yī–shí", en: "numbers 1–10", mastery: 0.88, n: 10, status: "mastered", group: "Numbers" },
  { id: "k7", han: "吗 问句", pinyin: "ma", en: "yes/no question", mastery: 0.5, n: 2, status: "insufficient", group: "Grammar" },
  { id: "k8", han: "j q x", pinyin: "initials", en: "j q x initials", mastery: 0.38, n: 8, status: "weak", group: "Pronunciation" },
  { id: "k9", han: "家人", pinyin: "jiārén", en: "family", mastery: 0, n: 0, status: "untested", group: "Vocabulary" },
  { id: "k10", han: "在 + 地点", pinyin: "zài", en: "location", mastery: 0.7, n: 5, status: "developing", group: "Grammar" },
  { id: "k11", han: "点餐", pinyin: "diǎn cān", en: "ordering food", mastery: 0.62, n: 4, status: "developing", group: "Scenarios" },
  { id: "k12", han: "时间", pinyin: "shíjiān", en: "time", mastery: 0, n: 0, status: "untested", group: "Vocabulary" },
];
export const edges: [string, string][] = [["k1", "k2"], ["k1", "k3"], ["k4", "k8"], ["k5", "k6"], ["k3", "k7"], ["k10", "k11"], ["k6", "k12"], ["k3", "k9"]];

export const statusColor: Record<string, string> = { mastered: "#3ed598", developing: "#f5b93f", weak: "#ff6b6b", insufficient: "#a78bfa", untested: "#5a6386" };
export const statusLabel: Record<string, L> = {
  mastered: t3("已掌握", "Mastered", "Imefahamika"),
  developing: t3("发展中", "Developing", "Inaendelea"),
  weak: t3("薄弱", "Weak", "Dhaifu"),
  insufficient: t3("证据不足", "Not enough evidence", "Ushahidi hautoshi"),
  untested: t3("尚未评估", "Not yet assessed", "Bado haijatathminiwa"),
};

export const agents = [
  { id: "tutor", name: t3("伴学 Agent", "Study Companion", "Rafiki wa Masomo"), desc: t3("规划路径、调难度、有出处答疑", "Plans your path, adjusts difficulty, answers with sources", "Hupanga njia, hubadilisha ugumu, hujibu kwa vyanzo"), style: t3("耐心 · 慢速 · 斯瓦希里语提示", "Patient · slow pace · Kiswahili hints", "Mvumilivu · polepole · vidokezo vya Kiswahili"), color: "#6c8cff" },
  { id: "coach", name: t3("发音教练", "Pronunciation Coach", "Kocha wa Matamshi"), desc: t3("声调与音素评分，用老师音色示范", "Tone and phoneme scoring, demos in your teacher's voice", "Alama za toni na sauti, mifano kwa sauti ya mwalimu"), style: t3("严格 · 第三声重点", "Strict · focus on tone 3", "Mkali · lenga toni ya 3"), color: "#d4af5a" },
  { id: "review", name: t3("复习 Agent", "Review Agent", "Wakala wa Marudio"), desc: t3("按遗忘曲线安排卡片，离线可用", "Schedules cards by forgetting curve, works offline", "Hupanga kadi kwa mkondo wa kusahau, hufanya kazi nje ya mtandao"), style: t3("每天 15 分钟 · 晚 8 点提醒", "15 min daily · 8 pm reminder", "Dakika 15 kila siku · kikumbusho saa 2 usiku"), color: "#3ed598" },
  { id: "talk", name: t3("情景对话", "Conversation Partner", "Mshirika wa Mazungumzo"), desc: t3("点餐、问路、自我介绍角色扮演", "Role-play: ordering food, directions, introductions", "Igizo: kuagiza chakula, maelekezo, kujitambulisha"), style: t3("温和纠错 · 在线优先", "Gentle corrections · online first", "Masahihisho ya upole · mtandaoni kwanza"), color: "#a78bfa" },
  { id: "exam", name: t3("评测 Agent", "Assessment Agent", "Wakala wa Tathmini"), desc: t3("组卷、模拟考、双 Agent 批改", "Builds quizzes and mock exams, two-agent grading", "Huunda majaribio, usahihishaji wa wakala wawili"), style: t3("主观题转老师", "Subjective items go to teacher", "Maswali ya maoni huenda kwa mwalimu"), color: "#5ad8e6" },
];

export const lessons = [
  { id: "l6", unit: "Unit 6", title: t3("在餐厅点餐", "Ordering at a restaurant", "Kuagiza mgahawani"), dur: 18, size: "42 MB", downloaded: true, progress: 0.35, teacher: "Wang Laoshi" },
  { id: "l5", unit: "Unit 5", title: t3("我的家人", "My family", "Familia yangu"), dur: 21, size: "48 MB", downloaded: true, progress: 1, teacher: "Wang Laoshi" },
  { id: "l7", unit: "Unit 7", title: t3("时间与日期", "Time and dates", "Muda na tarehe"), dur: 19, size: "40 MB", downloaded: false, progress: 0, teacher: "Li Laoshi" },
  { id: "l8", unit: "Unit 8", title: t3("买东西", "Shopping", "Kununua vitu"), dur: 22, size: "51 MB", downloaded: false, progress: 0, teacher: "Wang Laoshi" },
];

export const books = [
  { id: "b1", title: "中文链接世界 · 我的文化之旅", sub: t3("第二届世界中文作文大赛作品集", "World Chinese Composition Competition, 2nd edition anthology", "Mkusanyiko wa Shindano la Insha za Kichina, toleo la 2"), color: "linear-gradient(160deg,#a83e3e,#5d1f1f)", progress: 0.42, pages: 212, source: t3("GACEE 出版", "GACEE Publishing", "Uchapishaji wa GACEE"), strand: t3("中华文化与中文", "Chinese culture and language", "Utamaduni na lugha ya Kichina") },
  { id: "b2", title: "HSK 一级分级读本 · 第一册", sub: t3("未来书院 · 中文阅读", "Future Academy · Chinese reading", "Future Academy · Kusoma Kichina"), color: "linear-gradient(160deg,#1f3aa8,#0d1a5c)", progress: 0.78, pages: 96, source: t3("未来书院", "Future Academy", "Future Academy"), strand: t3("中华文化与中文", "Chinese culture and language", "Utamaduni na lugha ya Kichina") },
  { id: "b3", title: "行走中国 · 赓续文脉", sub: t3("研学笔记与摄影集", "Study-journey notes and photographs", "Maelezo na picha za safari ya masomo"), color: "linear-gradient(160deg,#b8912f,#6b4f10)", progress: 0.1, pages: 148, source: t3("GACEE 出版", "GACEE Publishing", "Uchapishaji wa GACEE"), strand: t3("世界文明与全球视野", "World civilisations", "Ustaarabu wa dunia") },
  { id: "b4", title: "AI 时代的人文思考", sub: t3("未来书院 · AI 与未来能力", "Future Academy · AI and future capabilities", "Future Academy · AI na uwezo wa baadaye"), color: "linear-gradient(160deg,#4b3fb5,#1d163f)", progress: 0, pages: 120, source: t3("未来书院", "Future Academy", "Future Academy"), strand: t3("AI 与未来能力", "AI and future capabilities", "AI na uwezo wa baadaye") },
  { id: "b5", title: "五洲共读一本书 · 2026", sub: t3("全球共读计划选本", "Global shared-reading selection", "Uteuzi wa usomaji wa pamoja duniani"), color: "linear-gradient(160deg,#1f9d6a,#0b4a31)", progress: 0.55, pages: 88, source: t3("GACEE 公益", "GACEE Public Good", "GACEE Manufaa ya Umma"), strand: t3("青少年成长与实践", "Growth and practice", "Ukuaji na mazoezi") },
];

export const classes = [
  { id: "c1", name: "HSK1 · Great Heights A", school: "Great Heights School", city: "Lagos", n: 28, attendance: 0.93, homework: 0.86, weak: 5, next: t3("周三 16:00 (WAT)", "Wed 16:00 (WAT)", "Jumatano 16:00 (WAT)"), teacher: "Wang Laoshi" },
  { id: "c2", name: "HSK1 · New Horizon B", school: "New Horizon School", city: "Abuja", n: 24, attendance: 0.88, homework: 0.79, weak: 7, next: t3("周四 15:30 (WAT)", "Thu 15:30 (WAT)", "Alhamisi 15:30 (WAT)"), teacher: "Wang Laoshi" },
  { id: "c3", name: "HSK2 · Great Heights C", school: "Great Heights School", city: "Lagos", n: 19, attendance: 0.95, homework: 0.9, weak: 2, next: t3("周五 16:00 (WAT)", "Fri 16:00 (WAT)", "Ijumaa 16:00 (WAT)"), teacher: "Li Laoshi" },
];

export const reviewQueue = [
  { id: "r1", learner: "Amara Okafor", type: t3("拍照作业 · 手写", "Photo homework · handwriting", "Kazi ya picha · mwandiko"), item: "我 有 三 个 姐姐", ai: t3("AI 判定：「个」书写结构偏右；语法正确", "AI: 个 written off-centre; grammar correct", "AI: 个 imeandikwa upande; sarufi sahihi"), confidence: 0.91, reason: t3("笔画识别置信度高，建议签发", "High stroke confidence, ready to sign", "Uhakika mkubwa wa mistari, tayari kuidhinishwa"), kind: "sign" },
  { id: "r2", learner: "Chidi Nwosu", type: t3("口语 · 第三声", "Speaking · tone 3", "Kuzungumza · toni ya 3"), item: "wǒ hěn hǎo", ai: t3("双 Agent 不一致：评分 62 / 复核 74", "Two agents disagree: 62 / 74", "Wakala wawili hawakubaliani: 62 / 74"), confidence: 0.48, reason: t3("分歧项，请老师裁定", "Disagreement, teacher decides", "Kutokubaliana, mwalimu anaamua"), kind: "decide" },
  { id: "r3", learner: "Fatima Bello", type: t3("作文 · 我的家", "Composition · My home", "Insha · Nyumba yangu"), item: "我家有四口人……", ai: t3("主观题：AI 弃权，仅给出结构提示", "Subjective: AI abstained, structure hints only", "Maoni: AI imejizuia, vidokezo vya muundo tu"), confidence: 0, reason: t3("主观题一律老师批改", "Subjective items are always teacher-graded", "Maswali ya maoni husahihishwa na mwalimu"), kind: "grade" },
  { id: "r4", learner: "Tunde Adeyemi", type: t3("客观题 · 单元测验", "Objective · unit quiz", "Lengo · jaribio la kitengo"), item: "18 / 20", ai: t3("AI 判分一致，自动入图谱", "Both agents agree, written to graph", "Wakala wote wanakubaliana, imeandikwa kwenye grafu"), confidence: 0.99, reason: t3("无需复核，仅通知", "No review needed, notice only", "Hakuna ukaguzi, taarifa tu"), kind: "info" },
];

export const proposals = [
  { id: "p1", from: "Amara Okafor", what: t3("安排「第三声」专项练习 10 题", "Schedule 10 tone-3 drills", "Panga mazoezi 10 ya toni ya 3"), why: t3("校准掌握度 42%，12 次作答，薄弱", "Calibrated mastery 42% over 12 attempts, weak", "Umahiri 42% kwa majaribio 12, dhaifu"), agent: "tutor", status: "pending" },
  { id: "p2", from: "Chidi Nwosu", what: t3("下调本周复习卡密度", "Reduce review-card load this week", "Punguza kadi za marudio wiki hii"), why: t3("三天未完成，停电时段重叠", "Three missed days overlapping power cuts", "Siku tatu hazijakamilika, kukatika kwa umeme"), agent: "review", status: "pending" },
  { id: "p3", from: t3("班级 · New Horizon B", "Class · New Horizon B", "Darasa · New Horizon B"), what: t3("为 6 名学员补录 Unit 5 音频版", "Push audio-only Unit 5 to 6 learners", "Tuma sauti pekee ya Unit 5 kwa wanafunzi 6"), why: t3("下载失败 3 次，2G 网络", "Downloads failed 3 times on 2G", "Upakuaji umeshindwa mara 3 kwenye 2G"), agent: "tutor", status: "approved" },
];

export const schoolsData = [
  { name: "Great Heights School", city: "Lagos, NG", learners: 128, classes: 5, devices: 22, consent: 1, net: "4G", status: "active" },
  { name: "New Horizon School", city: "Abuja, NG", learners: 96, classes: 4, devices: 14, consent: 0.98, net: "3G/4G", status: "active" },
  { name: "Mombasa Chinese Learning Centre", city: "Mombasa, KE", learners: 40, classes: 2, devices: 8, consent: 0.95, net: "3G", status: "pilot" },
  { name: "Accra International Academy", city: "Accra, GH", learners: 0, classes: 0, devices: 0, consent: 0, net: "—", status: "onboarding" },
];

export const news = [
  { d: "09-05", t: t3("Unit 6 录播已发布到 3 个班级", "Unit 6 recording published to 3 classes", "Rekodi ya Unit 6 imetolewa kwa madarasa 3") },
  { d: "09-04", t: t3("Great Heights 停电 2 小时，离线练习 41 人完成", "Great Heights power cut 2 h, 41 learners practised offline", "Umeme ulikatika saa 2, wanafunzi 41 walifanya mazoezi nje ya mtandao") },
  { d: "09-03", t: t3("周三直播降级到二级（音频 + 板书）", "Wednesday live class degraded to level 2 (audio + board)", "Somo la moja kwa moja lilishuka hadi kiwango cha 2") },
];
