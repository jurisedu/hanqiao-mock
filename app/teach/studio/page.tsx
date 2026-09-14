"use client";
import { useEffect, useRef, useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar } from "@/components/ui";
import Waveform from "@/components/Waveform";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, t3, LANGS, type Lang, type L } from "@/lib/i18n";
import { useToast } from "@/components/Toast";
import { lessons, classes, kps, subjectAgents } from "@/lib/data";
import {
  Wand2, Sparkles, FileText, Presentation, ListChecks, Languages, MessagesSquare, Volume2, ClipboardCheck,
  CheckCircle2, Radio, Layers, Clock, Users, Target, Lightbulb, Play, RefreshCw, Palette, FileDown,
  PenLine, BookOpen, ShieldCheck, Boxes, Gamepad2, Globe, Mic, BookMarked, Smile, Compass, MapPin,
  Library, Cpu, Database, Store,
} from "lucide-react";

/* Countries drive country-specific adaptation (layout / colour / interaction / examples) and set the
   learner-translation language — the "100-country library" idea, wired to our 18-language system. */
type Country = { code: string; flag: string; name: L; lang: Lang };
const COUNTRIES: Country[] = [
  { code: "cn", flag: "🇨🇳", name: t3("中国", "China", "China"), lang: "zh" },
  { code: "vn", flag: "🇻🇳", name: t3("越南", "Vietnam", "Vietnam"), lang: "vi" },
  { code: "id", flag: "🇮🇩", name: t3("印尼", "Indonesia", "Indonesia"), lang: "id" },
  { code: "my", flag: "🇲🇾", name: t3("马来西亚", "Malaysia", "Malaysia"), lang: "ms" },
  { code: "th", flag: "🇹🇭", name: t3("泰国", "Thailand", "Thailand"), lang: "th" },
  { code: "sg", flag: "🇸🇬", name: t3("新加坡", "Singapore", "Singapore"), lang: "en" },
  { code: "kr", flag: "🇰🇷", name: t3("韩国", "South Korea", "Korea"), lang: "ko" },
  { code: "mn", flag: "🇲🇳", name: t3("蒙古", "Mongolia", "Mongolia"), lang: "mn" },
  { code: "ae", flag: "🇦🇪", name: t3("阿联酋 · 迪拜", "UAE · Dubai", "UAE"), lang: "ar" },
  { code: "ng", flag: "🇳🇬", name: t3("尼日利亚", "Nigeria", "Nigeria"), lang: "en" },
  { code: "us", flag: "🇺🇸", name: t3("美国", "United States", "Marekani"), lang: "en-US" },
  { code: "gb", flag: "🇬🇧", name: t3("英国", "United Kingdom", "Uingereza"), lang: "en" },
];

type Out = { id: string; label: L; icon: typeof FileText };
const OUTPUTS: Out[] = [
  { id: "plan", label: t3("教案", "Lesson plan", "Mpango wa somo"), icon: FileText },
  { id: "slides", label: t3("课件 PPT", "Slides", "Slaidi"), icon: Presentation },
  { id: "interactive", label: t3("互动环节", "Interactive", "Mchezo"), icon: Gamepad2 },
  { id: "exercises", label: t3("分层习题", "Tiered exercises", "Mazoezi ya viwango"), icon: ListChecks },
  { id: "vocab", label: t3("生词 · 汉字卡", "Vocab & characters", "Msamiati na herufi"), icon: Languages },
  { id: "dialogue", label: t3("情景对话", "Scenario dialogue", "Mazungumzo"), icon: MessagesSquare },
  { id: "audio", label: t3("朗读音频", "Read-aloud audio", "Sauti ya kusoma"), icon: Volume2 },
  { id: "quiz", label: t3("随堂测", "Quick quiz", "Jaribio la darasa"), icon: ClipboardCheck },
];

/* Art styles, aligned to the education-appropriate styles teachers actually pick. */
const TEMPLATES = [
  { id: "kids", name: t3("卡通童趣", "Playful cartoon", "Katuni"), rec: true, bg: "linear-gradient(135deg,#fff3e0,#ffe0e6)", fg: "#5a3410", ac: "#e8733a" },
  { id: "water", name: t3("清新水彩", "Watercolour", "Rangi ya maji"), rec: false, bg: "linear-gradient(135deg,#eef6f3,#e3eef7)", fg: "#22303a", ac: "#2f8f6b" },
  { id: "clean", name: t3("简洁教学", "Clean teaching", "Rahisi"), rec: false, bg: "#ffffff", fg: "#141a2e", ac: "#1f3aa8" },
  { id: "ink", name: t3("水墨", "Ink wash", "Wino"), rec: false, bg: "linear-gradient(135deg,#f7f4ee,#ece4d3)", fg: "#2a2018", ac: "#9a2f2f" },
  { id: "pro", name: t3("商务", "Corporate", "Biashara"), rec: false, bg: "linear-gradient(160deg,#101a3f,#0b1230)", fg: "#eef1fb", ac: "#d4af5a" },
];

const INTERACTIONS: { id: string; label: L; rec: boolean }[] = [
  { id: "match", label: t3("汉字翻翻乐 · 连连看", "Character match game", "Mchezo wa kufananisha"), rec: true },
  { id: "roleplay", label: t3("分角色朗读", "Role-play read-aloud", "Kusoma kwa majukumu"), rec: true },
  { id: "mcq", label: t3("看图选择问答", "Picture multiple-choice", "Maswali ya picha"), rec: true },
  { id: "tone", label: t3("限读正音 · 声调", "Tone & pronunciation drill", "Toni na matamshi"), rec: false },
  { id: "sentence", label: t3("句式仿说创编", "Sentence-pattern creation", "Kutunga sentensi"), rec: false },
  { id: "quiz", label: t3("课堂小测", "In-class quiz", "Jaribio la darasa"), rec: true },
];

const SKILLS: { id: string; label: L }[] = [
  { id: "listen", label: t3("听", "Listening", "Kusikiliza") },
  { id: "speak", label: t3("说", "Speaking", "Kuzungumza") },
  { id: "read", label: t3("读", "Reading", "Kusoma") },
  { id: "write", label: t3("写", "Writing", "Kuandika") },
  { id: "culture", label: t3("文化", "Culture", "Utamaduni") },
];

/* The 12 subject agents of the JE array live in lib/data (shared with AgentOps);
   this maps their lucide icon keys to components. */
const AGENT_ICONS: Record<string, typeof FileText> = {
  compass: Compass, smile: Smile, globe: Globe, clipboard: ClipboardCheck, mappin: MapPin, book: BookOpen,
  library: Library, gamepad: Gamepad2, mic: Mic, bookmarked: BookMarked, palette: Palette, chat: MessagesSquare,
};

const VOCAB = [
  { han: "菜单", py: "càidān", pos: t3("名", "n.", "n."), en: "menu", stroke: 11 },
  { han: "米饭", py: "mǐfàn", pos: t3("名", "n.", "n."), en: "cooked rice", stroke: 13 },
  { han: "水", py: "shuǐ", pos: t3("名", "n.", "n."), en: "water", stroke: 4 },
  { han: "多少钱", py: "duōshao qián", pos: t3("短语", "phr.", "kis."), en: "how much (money)", stroke: 0 },
  { han: "买单", py: "mǎidān", pos: t3("动", "v.", "kt."), en: "pay the bill", stroke: 0 },
  { han: "个", py: "gè", pos: t3("量", "m.", "kp."), en: "measure word (general)", stroke: 3 },
];

const DIALOGUE = [
  { who: "s", zh: "你好！请问要点什么？", py: "Nǐ hǎo! Qǐngwèn yào diǎn shénme?", en: "Hello! What would you like to order?" },
  { who: "c", zh: "我要一碗米饭和一瓶水。", py: "Wǒ yào yì wǎn mǐfàn hé yì píng shuǐ.", en: "I'll have a bowl of rice and a bottle of water." },
  { who: "s", zh: "好的，还要别的吗？", py: "Hǎo de, hái yào biéde ma?", en: "Sure, anything else?" },
  { who: "c", zh: "多少钱？", py: "Duōshao qián?", en: "How much is it?" },
  { who: "s", zh: "一共十五块。", py: "Yígòng shíwǔ kuài.", en: "Fifteen yuan in total." },
  { who: "c", zh: "给你钱，谢谢！", py: "Gěi nǐ qián, xièxie!", en: "Here you go — thank you!" },
];

type Slide = { k: L; title: string; sub?: string; han?: string; bullets?: L[] };
const SLIDES: Slide[] = [
  { k: t3("封面", "Cover", "Jalada"), title: "在餐厅点餐", sub: "Ordering at a restaurant · HSK 1 · Unit 6 · 45′" },
  { k: t3("学习目标", "Objectives", "Malengo"), title: "今天我们学会…", bullets: [t3("餐厅点餐常用语", "Everyday ordering phrases", "Misemo ya kuagiza"), t3("量词 个 / 瓶 / 碗", "Measure words 个 / 瓶 / 碗", "Vipimo 个 / 瓶 / 碗"), t3("复习并巩固第三声", "Review & secure tone 3", "Kurudia toni ya 3")] },
  { k: t3("生词", "Vocabulary", "Msamiati"), title: "菜单 · 米饭 · 水", sub: "多少钱 · 买单 · 个", han: "菜单" },
  { k: t3("语法", "Grammar", "Sarufi"), title: "我要 + 数量 + 量词 + 名词", sub: "我要一碗米饭 · 我要两瓶水" },
  { k: t3("情景", "Scenario", "Hali"), title: "在餐厅", sub: "服务员 ↔ 顾客 · 角色扮演" },
  { k: t3("课堂活动", "Activity", "Shughuli"), title: "点餐角色扮演", sub: "两人一组 · 菜单卡 · 3 分钟" },
  { k: t3("随堂检测", "Quick check", "Ukaguzi"), title: "小测 · 5 题", sub: "选量词 · 听价格 · 造句" },
  { k: t3("小结与作业", "Summary & homework", "Muhtasari"), title: "复习卡 12 张 + 录音作业", sub: "录一段点餐对话（30 秒）" },
];

export default function LessonStudio() {
  const t = useT();
  const toast = useToast();

  const [country, setCountry] = useState("ng");
  const [source, setSource] = useState<"unit" | "topic" | "weak">("unit");
  const [lessonId, setLessonId] = useState("l6");
  const [topic, setTopic] = useState("在餐厅点餐 Ordering at a restaurant");
  const [level, setLevel] = useState("HSK1");
  const [periods, setPeriods] = useState(2);
  const [classId, setClassId] = useState("c1");
  const [style, setStyle] = useState("kids");
  const [inter, setInter] = useState<Record<string, boolean>>(Object.fromEntries(INTERACTIONS.map((i) => [i.id, i.rec])));
  const [skills, setSkills] = useState<Record<string, boolean>>({ listen: true, speak: true, read: true, write: true, culture: true });
  const [sel, setSel] = useState<Record<string, boolean>>(Object.fromEntries(OUTPUTS.map((o) => [o.id, true])));

  const [status, setStatus] = useState<"idle" | "gen" | "ready">("idle");
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState("plan");
  const [slide, setSlide] = useState(0);
  const [answers, setAnswers] = useState(false);
  const [signed, setSigned] = useState(false);
  const [pushed, setPushed] = useState<Record<string, boolean>>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cls = classes.find((c) => c.id === classId)!;
  const lesson = lessons.find((l) => l.id === lessonId)!;
  const ctry = COUNTRIES.find((c) => c.code === country)!;
  const transLang = LANGS.find((l) => l.code === ctry.lang);
  const tpl = TEMPLATES.find((x) => x.id === style)!;
  const weak = kps.filter((k) => k.status === "weak" || k.status === "developing").slice(0, 3);
  const title = source === "unit" ? t(lesson.title) : source === "topic" ? topic : t(t3("薄弱点强化课", "Weak-point booster", "Somo la kuimarisha"));
  const shown = OUTPUTS.filter((o) => sel[o.id]);
  const active = shown.find((o) => o.id === tab)?.id ?? shown[0]?.id;
  const activeExperts = status === "ready" ? subjectAgents.length : Math.round((tick / 13) * subjectAgents.length);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const setStyleTpl = (id: string) => setStyle(id);

  const generate = () => {
    if (!shown.length) { toast(t(t3("请至少选择一项产出", "Pick at least one output", "Chagua angalau kitu kimoja"))); return; }
    timers.current.forEach(clearTimeout); timers.current = [];
    setStatus("gen"); setTick(0); setSigned(false); setPushed({});
    for (let i = 1; i <= 13; i++) timers.current.push(setTimeout(() => setTick(i), 235 * i));
    timers.current.push(setTimeout(() => {
      setStatus("ready"); setSlide(0); setTab(shown[0].id);
      toast(t(t3("备课已生成 · 待签发", "Lesson pack ready · awaiting sign-off", "Tayari · inasubiri idhini")), { sub: `${title} · ${t(ctry.name)}`, tone: "acc" });
    }, 235 * 14 + 200));
  };

  const doSign = () => { setSigned(true); toast(t(t3("已签发：进入生产，可推送", "Signed off — live and ready to push", "Imeidhinishwa")), { tone: "good" }); };
  const push = (id: string, label: string) => {
    if (!signed) { toast(t(t3("请先由老师签发", "Teacher must sign off first", "Mwalimu aidhinishe kwanza")), { tone: "warn" }); return; }
    setPushed((p) => ({ ...p, [id]: true }));
    toast(t(t3("已推送：", "Pushed to ", "Imetumwa: ")) + label, { tone: "good" });
  };
  const exp = (fmt: string) => toast(t(t3("正在导出 ", "Exporting ", "Inahamisha ")) + fmt + "…", { sub: title, tone: "acc" });

  return (
    <Shell role={teacherRole} nav={teacherNav} net={3}
      title={t3("备课工坊", "Lesson Studio", "Studio ya Maandalizi")}
      sub={t3("JE 引擎驱动 · 12 个学科智能体协同备课：一次输入 → 教案·课件·互动·习题·生词·对话·朗读·随堂测；国别适配 100+，扎根教材与班级学情，老师签发后一键推送",
        "Powered by the JE Engine — 12 subject agents co-produce a full pack: one brief → plan, slides, interactive games, exercises, vocab, dialogue, audio and a quiz; adapts to 100+ countries, grounded in your materials and class data, pushed once you sign off",
        "Injini ya JE · mawakala 12 wa masomo huandaa somo pamoja")}
      actions={status === "ready" ? <button className="btn btn--sm" onClick={generate}><RefreshCw size={14} /> {t(t3("重新生成", "Regenerate", "Zalisha upya"))}</button> : undefined}>

      <div className="grid c3">
        {/* ---------- Composer ---------- */}
        <Panel className="in in-1" glow>
          <Head title={t3("备课设置", "Lesson brief", "Maelezo ya somo")} right={<Badge tone="acc"><Cpu size={12} /> {t(t3("JE 引擎 · 8 模型 · 16 库", "JE Engine · 8 models · 16 KBs", "Injini ya JE"))}</Badge>} />

          <div className="std-sec">{t(t3("① 教材与目标", "① Material & goal", "① Nyenzo"))}</div>
          <div className="stdlabel">{t(t3("国别 · 决定版式与母语", "Country · layout & language", "Nchi"))}</div>
          <div className="ctry">
            {COUNTRIES.map((c) => (
              <button key={c.code} className={`ctry__b ${country === c.code ? "on" : ""}`} onClick={() => setCountry(c.code)} title={t(c.name)}>
                <span className="ctry__f">{c.flag}</span><span className="ctry__n">{t(c.name)}</span>
              </button>
            ))}
          </div>
          <div className="std-note"><Globe size={13} /> {t(t3("国别课件库 100+ · 本课适配：", "100+ country library · adapted for ", "Maktaba ya nchi 100+ · "))}<b style={{ color: "var(--text)" }}>{ctry.flag} {t(ctry.name)}</b></div>

          <div className="stdlabel">{t(t3("来源", "Source", "Chanzo"))}</div>
          <div className="chips">
            {([["unit", t3("从教材内容", "From materials", "Vifaa")], ["topic", t3("从教学想法", "From an idea", "Wazo")], ["weak", t3("从薄弱点", "From weak points", "Udhaifu")]] as const).map(([k, l]) =>
              <button key={k} className={`chip ${source === k ? "on" : ""}`} onClick={() => setSource(k)}>{t(l)}</button>)}
          </div>
          {source === "unit" && (
            <select className="std-in" value={lessonId} onChange={(e) => setLessonId(e.target.value)}>
              {lessons.map((l) => <option key={l.id} value={l.id}>{l.unit} · {t(l.title)}</option>)}
            </select>
          )}
          {source === "topic" && <input className="std-in" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={t(t3("描述教学主题或目标，如：问路", "Describe a topic or objective, e.g. asking directions", "Mada"))} />}
          {source === "weak" && <div className="std-note"><Target size={13} /> {t(t3("自动聚焦：", "Auto-focus: ", "Kuzingatia: "))}{weak.map((k) => k.han).join(" · ")}</div>}

          <div className="stdlabel">{t(t3("等级", "Level", "Kiwango"))}</div>
          <div className="chips">
            {["HSK1", "HSK2", "YCT"].map((l) => <button key={l} className={`chip ${level === l ? "on" : ""}`} onClick={() => setLevel(l)}>{l}</button>)}
          </div>
          <div className="stdlabel">{t(t3("课时数", "Periods", "Vipindi"))}</div>
          <div className="chips">
            {([[1, t3("1 课时 · 40′", "1 period · 40′", "Kipindi 1")], [2, t3("2 课时 · 课文+字词", "2 periods · text + words", "Vipindi 2")], [3, t3("3 课时+ · 含拓展", "3+ periods · + extension", "Vipindi 3+")]] as const).map(([n, l]) =>
              <button key={n} className={`chip ${periods === n ? "on" : ""}`} onClick={() => setPeriods(n)}>{t(l)}{n === 2 && <span className="rec">{t(t3("荐", "rec", "-"))}</span>}</button>)}
          </div>

          <div className="std-sec">{t(t3("② 班级与侧重", "② Class & focus", "② Darasa"))}</div>
          <div className="stdlabel">{t(t3("班级（带入学情）", "Class (pulls in data)", "Darasa"))}</div>
          <select className="std-in" value={classId} onChange={(e) => setClassId(e.target.value)}>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name} · {c.n}{t(t3(" 人", " learners", ""))}</option>)}
          </select>
          <div className="std-note"><Users size={13} /> {t(t3("薄弱：", "Weak: ", "Dhaifu: "))}{weak.map((k) => k.han).join(" · ")} · {t(t3("出勤", "att.", "mah."))} {Math.round(cls.attendance * 100)}%</div>
          <div className="stdlabel">{t(t3("技能侧重", "Skill focus", "Ujuzi"))}</div>
          <div className="chips">
            {SKILLS.map((s) => <button key={s.id} className={`chip ${skills[s.id] ? "on" : ""}`} onClick={() => setSkills((x) => ({ ...x, [s.id]: !x[s.id] }))}>{t(s.label)}</button>)}
          </div>

          <div className="std-sec">{t(t3("③ 互动与风格", "③ Activities & style", "③ Shughuli"))}</div>
          <div className="stdlabel">{t(t3("互动环节", "Interactive activities", "Shughuli"))}</div>
          <div className="chips">
            {INTERACTIONS.map((i) => <button key={i.id} className={`chip ${inter[i.id] ? "on" : ""}`} onClick={() => setInter((x) => ({ ...x, [i.id]: !x[i.id] }))}>{t(i.label)}{i.rec && <span className="rec">{t(t3("荐", "rec", "-"))}</span>}</button>)}
          </div>
          <div className="stdlabel">{t(t3("美术风格", "Art style", "Mtindo"))}</div>
          <div className="chips">
            {TEMPLATES.map((x) => <button key={x.id} className={`chip ${style === x.id ? "on" : ""}`} onClick={() => setStyle(x.id)}>{t(x.name)}{x.rec && <span className="rec">{t(t3("荐", "rec", "-"))}</span>}</button>)}
          </div>

          <div className="std-sec">{t(t3("④ 产出与语言", "④ Outputs & language", "④ Matokeo"))}</div>
          <div className="optgrid">
            {OUTPUTS.map((o) => { const I = o.icon; const on = sel[o.id]; return (
              <button key={o.id} className={`opt ${on ? "on" : ""}`} onClick={() => setSel((x) => ({ ...x, [o.id]: !x[o.id] }))}>
                <span className="opt__box">{on && <CheckCircle2 size={14} />}</span><I size={14} />{t(o.label)}
              </button>); })}
          </div>

          <div className="std-note"><Languages size={13} /> {t(t3("学生端译文语言：", "Learner translation: ", "Lugha ya tafsiri: "))}<b style={{ color: "var(--text)" }}>{transLang?.label}</b> · {t(t3("随国别自动选择 · 18 种", "auto by country · 18 supported", "kwa nchi · 18"))}</div>

          <button className="btn btn--primary" style={{ width: "100%", marginTop: 14 }} onClick={generate} disabled={status === "gen"}>
            <Wand2 size={16} /> {status === "gen" ? t(t3("JE 智能体阵列协同中…", "JE agent array working…", "Mawakala wa JE…")) : status === "ready" ? t(t3("重新生成整套备课", "Regenerate full pack", "Zalisha upya")) : t(t3("一键生成整套备课", "Generate full lesson pack", "Zalisha maandalizi"))}
          </button>
          <div className="std-fine">{t(t3("过去一课时优质备课约 20 小时；JE 混合编排智能体阵列 3 分钟完成，再加要求 +5 分钟。", "A polished lesson used to take ~20 hours; the JE agent array does it in 3 minutes, +5 for extra asks.", "Zamani ~saa 20; sasa dakika 3."))}</div>
        </Panel>

        {/* ---------- Output stage ---------- */}
        <Panel className="span2 in in-2" lift={false} style={{ minHeight: 560 }}>
          {status === "idle" && <StudioIdle title={title} shown={shown} ctry={ctry} />}
          {status === "gen" && <StudioGen activeExperts={activeExperts} tick={tick} title={title} ctry={ctry} />}
          {status === "ready" && active && (
            <>
              <div className="between" style={{ marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
                <div className="row" style={{ gap: 10 }}>
                  <Badge tone="good" live><CheckCircle2 size={12} /> {t(t3("已生成", "Generated", "Imezalishwa"))}</Badge>
                  <b style={{ fontSize: 15 }}>{title}</b>
                  <span className="small mute">{ctry.flag} {t(ctry.name)} · {level} · {periods}{t(t3(" 课时", "p", ""))} · {cls.name}</span>
                </div>
                <div className="row" style={{ gap: 6 }}>
                  <span className="trace"><span className="ground">{t(t3("出处：", "Sources: ", "Vyanzo: "))}{lesson.unit} · {t(t3("知识图谱", "graph", "grafu"))} · 16 KB</span></span>
                </div>
              </div>

              <div className="tabs" style={{ flexWrap: "wrap" }}>
                {shown.map((o) => { const I = o.icon; return (
                  <button key={o.id} className={active === o.id ? "on" : ""} onClick={() => setTab(o.id)}><I size={13} style={{ marginRight: 6, verticalAlign: "-2px" }} />{t(o.label)}</button>); })}
              </div>

              {active === "plan" && <TabPlan periods={periods} level={level} weak={weak} />}
              {active === "slides" && <TabSlides tpl={tpl} setStyle={setStyleTpl} slide={slide} setSlide={setSlide} ctry={ctry} onExport={() => exp("PPTX")} />}
              {active === "interactive" && <TabInteractive inter={inter} tpl={tpl} />}
              {active === "exercises" && <TabExercises answers={answers} setAnswers={setAnswers} />}
              {active === "vocab" && <TabVocab langLabel={transLang?.label ?? "English"} />}
              {active === "dialogue" && <TabDialogue />}
              {active === "audio" && <TabAudio />}
              {active === "quiz" && <TabQuiz answers={answers} setAnswers={setAnswers} />}

              {/* sign-off + distribute */}
              <div className="signbar">
                <div className="row" style={{ gap: 10 }}>
                  {signed
                    ? <Badge tone="good"><ShieldCheck size={12} /> {t(t3("王老师已签发", "Signed by Wang laoshi", "Imeidhinishwa"))}</Badge>
                    : <button className="btn btn--good btn--sm" onClick={doSign}><ShieldCheck size={14} /> {t(t3("老师签发", "Teacher sign-off", "Idhini ya mwalimu"))}</button>}
                  <span className="small mute">{t(t3("JE 智能体阵列起草，老师定夺后进入生产（AI 协同，非替代）", "The JE agent array drafts; you decide, then it goes live (AI assists, never replaces)", "Mawakala wa JE huandaa; wewe huamua"))}</span>
                </div>
                <div className="row" style={{ gap: 6 }}>
                  {([["live", t3("推直播", "To live class", "Somo la moja kwa moja"), Radio], ["cards", t3("生成复习卡", "Review cards", "Kadi"), Layers], ["hw", t3("布置作业", "Assign homework", "Kazi"), FileText], ["plaza", t3("发布到课件广场", "Publish to plaza", "Uwanja"), Store], ["lib", t3("存内容库", "Save to library", "Maktaba"), Boxes]] as const).map(([id, l, I]) =>
                    <button key={id} className={`btn btn--sm ${pushed[id] ? "btn--good" : "btn--ghost"}`} onClick={() => push(id, t(l))}>{pushed[id] ? <CheckCircle2 size={13} /> : <I size={13} />} {t(l)}</button>)}
                  <span className="std-sep" />
                  <button className="btn btn--sm btn--ghost" onClick={() => exp("PPTX")}><FileDown size={13} /> PPT</button>
                  <button className="btn btn--sm btn--ghost" onClick={() => exp("DOCX")}><FileDown size={13} /> Word</button>
                  <button className="btn btn--sm btn--ghost" onClick={() => exp("PDF")}><FileDown size={13} /> PDF</button>
                </div>
              </div>
            </>
          )}
        </Panel>
      </div>
    </Shell>
  );
}

/* ---------------- expert team ---------------- */
function ExpertGrid({ activeCount }: { activeCount: number }) {
  const t = useT();
  return (
    <div className="experts">
      {subjectAgents.map((e, i) => { const I = AGENT_ICONS[e.icon] ?? FileText; const on = i < activeCount; return (
        <div key={e.id} className={`expert ${on ? "on" : ""}`}>
          <span className="expert__ic">{on ? <I size={15} /> : <span className="genlist__dot" />}</span>
          <span className="expert__t"><b><span className="expert__code">{e.code}</span>{t(e.name)}</b><small>{t(e.role)}</small></span>
          {on && <CheckCircle2 size={13} className="expert__ck" />}
        </div>
      ); })}
    </div>
  );
}

/* ---------------- idle / generating ---------------- */
function StudioIdle({ title, shown, ctry }: { title: string; shown: Out[]; ctry: Country }) {
  const t = useT();
  return (
    <div className="std-idle">
      <div className="between" style={{ marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div className="row" style={{ gap: 10 }}>
          <div className="std-idle__ic"><Wand2 size={22} /></div>
          <div><b style={{ fontSize: 16 }}>{t(t3("JE 混合编排智能体阵列 · 就绪", "JE agent array · ready", "Mkusanyiko wa mawakala wa JE · tayari"))}</b><div className="small mute">{t(t3("12 个学科智能体 · JE 引擎 · 8 模型 · 16 知识库", "12 subject agents · JE Engine · 8 models · 16 knowledge bases", "Mawakala 12 · Injini ya JE"))}</div></div>
        </div>
        <span className="std-pill">{ctry.flag} {t(ctry.name)}</span>
      </div>
      <ExpertGrid activeCount={0} />
      <div className="std-idle__foot">
        <p className="mute small" style={{ maxWidth: "60ch" }}>{t(t3("填好左侧设置，点「一键生成」——JE 智能体阵列与你协同，按国别与班级学情产出整套可编辑、带出处、老师签发的备课。", "Set the brief and hit generate — the JE agent array works alongside you to produce a full, editable, sourced, sign-off-gated pack, adapted to the country and your class.", "Weka maelezo, bofya kuzalisha."))}</p>
        <div className="row" style={{ gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          {shown.map((o) => { const I = o.icon; return <span key={o.id} className="std-pill"><I size={13} /> {t(o.label)}</span>; })}
        </div>
        <div className="std-idle__title">{title} · {ctry.flag} {t(ctry.name)}</div>
      </div>
    </div>
  );
}

function StudioGen({ activeExperts, tick, title, ctry }: { activeExperts: number; tick: number; title: string; ctry: Country }) {
  const t = useT();
  const pct = Math.min(1, tick / 13);
  return (
    <div className="std-gen2">
      <div className="between" style={{ marginBottom: 4 }}><b>{t(t3("JE 智能体阵列协同备课：", "JE agent array co-producing: ", "Mawakala wa JE: "))}{title} · {ctry.flag}</b><span className="mono mute">{Math.round(pct * 100)}%</span></div>
      <Bar v={pct} tone="gold" />
      <div className="row small mute" style={{ gap: 8, margin: "8px 0 2px" }}><Cpu size={13} /> {t(t3("8 大模型", "8 models", "mifano 8"))} <Database size={13} /> {t(t3("16 套知识库", "16 knowledge bases", "maktaba 16"))} · {t(t3("融合本土国情 + 先进教法", "fusing local context + advanced pedagogy", "muktadha + ufundishaji"))}</div>
      <ExpertGrid activeCount={activeExperts} />
      <div className="trace" style={{ marginTop: 12 }}>
        <span className="route">route</span><i>→</i><span className="ground">ground</span><i>→</i><span className="recall">recall</span><i>→</i><span className="verify">verify</span><i>→</i><span className="human">sign-off</span>
      </div>
    </div>
  );
}

/* ---------------- tabs ---------------- */
function TabPlan({ periods, level, weak }: { periods: number; level: string; weak: typeof kps }) {
  const t = useT();
  const stages: [string, L, L][] = [
    ["0–5′", t3("热身", "Warm-up", "Kuanza"), t3("复习上节生词，快问快答", "Recycle last unit's words, rapid Q&A", "Kurudia maneno")],
    ["5–15′", t3("导入", "Lead-in", "Utangulizi"), t3("情景视频《在餐厅》+ 生词呈现", "Scene video ‘At the restaurant’ + new words", "Video + maneno mapya")],
    ["15–28′", t3("新授", "Presentation", "Kufundisha"), t3("句型「我要+量词+名词」+ 量词操练", "Pattern ‘我要 + measure word + noun’ + drills", "Mchoro wa sentensi")],
    ["28–38′", t3("互动活动", "Interactive activity", "Shughuli"), t3("汉字翻翻乐 + 角色扮演点餐", "Character match game + ordering role-play", "Mchezo + igizo")],
    ["38–43′", t3("检测", "Check", "Ukaguzi"), t3("随堂小测 5 题，即时反馈", "5-item quick quiz, instant feedback", "Jaribio la maswali 5")],
    ["43–45′", t3("小结与作业", "Wrap-up & homework", "Muhtasari"), t3("复习卡 12 张 + 录音作业", "12 review cards + audio homework", "Kadi 12 + sauti")],
  ];
  return (
    <div className="grid c2" style={{ gap: 16 }}>
      <div>
        <div className="std-h"><Target size={14} /> {t(t3("教学目标", "Objectives", "Malengo"))}</div>
        <ul className="list small">
          <li><div className="t"><b>{t(t3("能听懂并说出餐厅点餐常用语", "Understand and use everyday ordering phrases", "Kuelewa na kutumia misemo ya kuagiza"))}</b></div></li>
          <li><div className="t"><b>{t(t3("掌握量词 个 / 瓶 / 碗 的搭配", "Use measure words 个 / 瓶 / 碗 correctly", "Kutumia vipimo kwa usahihi"))}</b></div></li>
          <li><div className="t"><b>{t(t3("复习并巩固第三声连读", "Review and secure tone-3 sandhi", "Kuimarisha toni ya 3"))}</b></div></li>
        </ul>
        <div className="std-h" style={{ marginTop: 14 }}><Lightbulb size={14} /> {t(t3("重点 · 难点", "Focus & challenge", "Lengo na changamoto"))}</div>
        <div className="kv small">
          <dt>{t(t3("重点", "Focus", "Lengo"))}</dt><dd>{t(t3("点餐句型「我要 + 数量 + 量词 + 食物」", "Pattern ‘我要 + number + measure word + food’", "Mchoro wa kuagiza"))}</dd>
          <dt>{t(t3("难点", "Challenge", "Changamoto"))}</dt><dd>{t(t3("量词搭配；第三声连读", "measure-word pairing; tone-3 sandhi", "vipimo; toni ya 3"))}</dd>
          <dt>{t(t3("适配", "Adapted", "Imerekebishwa"))}</dt><dd className="mute">{level} · {periods}{t(t3(" 课时", " periods", ""))} · {t(t3("针对薄弱：", "targets: ", "inalenga: "))}{weak.map((k) => k.han).join(" / ")}</dd>
        </div>
        <div className="std-h" style={{ marginTop: 14 }}><PenLine size={14} /> {t(t3("板书设计", "Board plan", "Ubao"))}</div>
        <div className="boardplan">我要 <b>+</b> 一 <b>+</b> 个 / 瓶 / 碗 <b>+</b> 米饭 / 水</div>
      </div>
      <div>
        <div className="std-h"><Clock size={14} /> {t(t3("教学过程", "Lesson flow", "Mtiririko"))}</div>
        <ul className="tl">
          {stages.map(([time, name, desc], i) => (
            <li key={i} className={i === stages.length - 1 ? "todo" : ""}>
              <b>{time} · {t(name)}</b><div className="mute small">{t(desc)}</div>
            </li>
          ))}
        </ul>
        <div className="std-note" style={{ marginTop: 8 }}><BookOpen size={13} /> {t(t3("每个环节都可展开为课件页、互动游戏或习题。", "Each stage expands into a slide, interactive game or exercise.", "Kila hatua hupanuka."))}</div>
      </div>
    </div>
  );
}

function TabSlides({ tpl, setStyle, slide, setSlide, ctry, onExport }: { tpl: typeof TEMPLATES[number]; setStyle: (id: string) => void; slide: number; setSlide: (n: number) => void; ctry: Country; onExport: () => void }) {
  const t = useT();
  const s = SLIDES[slide];
  return (
    <div>
      <div className="between" style={{ marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <div className="row" style={{ gap: 6 }}>
          <Palette size={14} className="mute" />
          {TEMPLATES.map((x) => <button key={x.id} className={`chip ${tpl.id === x.id ? "on" : ""}`} onClick={() => setStyle(x.id)}>{t(x.name)}</button>)}
        </div>
        <div className="row" style={{ gap: 6 }}>
          <span className="small mute">{slide + 1} / {SLIDES.length}</span>
          <button className="btn btn--sm btn--ghost" onClick={onExport}><FileDown size={13} /> {t(t3("导出 PPT", "Export PPT", "Hamisha"))}</button>
        </div>
      </div>
      <div className="slidebig" style={{ background: tpl.bg, color: tpl.fg }}>
        <span className="k">{t(s.k)}</span>
        <span className="slidebig__flag">{ctry.flag} {t(t3("国别适配版", "Localised", "Toleo la nchi"))}</span>
        {s.han && <div className="han" style={{ color: tpl.ac }}>{s.han}</div>}
        <h2>{s.title}</h2>
        {s.sub && <p style={{ marginTop: 8, opacity: .8, fontSize: 15 }}>{s.sub}</p>}
        {s.bullets && <ul style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>{s.bullets.map((b, i) => <li key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 15 }}><span style={{ width: 7, height: 7, borderRadius: 9, background: tpl.ac, flex: "none" }} />{t(b)}</li>)}</ul>}
        <span className="slidebig__wm" style={{ color: tpl.ac }}>山海同文 · AI</span>
      </div>
      <div className="deck">
        {SLIDES.map((x, i) => (
          <button key={i} className={`slide ${slide === i ? "on" : ""}`} onClick={() => setSlide(i)} style={{ background: tpl.bg, color: tpl.fg }}>
            <span className="slide__no">{i + 1}</span>
            <span className="slide__k" style={{ color: tpl.ac }}>{t(x.k)}</span>
            <span className="slide__t">{x.han ?? x.title}</span>
          </button>
        ))}
      </div>
      <div className="std-note"><Sparkles size={13} /> {t(t3("版式·色彩·配图按国别与年龄自动适配；配图 AI 生成并做安全过滤，可替换教材原图。", "Layout, colour and imagery adapt by country and age; images are AI-generated and safety-filtered, swappable for textbook art.", "Muundo hurekebishwa kwa nchi na umri."))}</div>
    </div>
  );
}

function TabInteractive({ inter, tpl }: { inter: Record<string, boolean>; tpl: typeof TEMPLATES[number] }) {
  const t = useT();
  const on = (id: string) => inter[id];
  const mcq = [
    { py: "yí zuò xuéxiào", han: "一座学校", icon: "🏫" },
    { py: "yí piàn guǒshùlín", han: "一片果树林", icon: "🌳" },
    { py: "yì tiáo xiǎohé", han: "一条小河", icon: "🏞️" },
    { py: "yì tiáo gōnglù", han: "一条公路", icon: "🛣️" },
  ];
  return (
    <div>
      <div className="std-note" style={{ marginBottom: 12 }}><Gamepad2 size={13} /> {t(t3("由「互动游戏智能体」生成，可直接投屏或推到学生端；每个环节都可编辑。", "Built by the interactive-game agent — project on screen or push to learners; every activity is editable.", "Imetengenezwa na wakala wa michezo."))}</div>
      <div className="grid c2" style={{ gap: 14 }}>
        {on("match") && (
          <div className="game">
            <div className="between" style={{ marginBottom: 8 }}><b>🃏 {t(t3("汉字翻翻乐", "Character match", "Kufananisha"))}</b><span className="small dim">0 / 6</span></div>
            <div className="matchgrid">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="matchcell" style={{ background: tpl.ac }}>?</div>)}</div>
            <div className="small mute" style={{ marginTop: 8 }}>{t(t3("翻卡配对：找到汉字和图片的好朋友！", "Flip to match each character with its picture!", "Geuza kadi kufananisha!"))}</div>
          </div>
        )}
        {on("mcq") && (
          <div className="game">
            <div className="between" style={{ marginBottom: 8 }}><b>🖼️ {t(t3("看图选择", "Picture choice", "Chagua picha"))}</b><span className="small dim">shān pō shàng yǒu shén me?</span></div>
            <div className="mcq">
              {mcq.map((m, i) => (
                <div key={i} className="mcq__opt">
                  <span className="mcq__ic">{m.icon}</span>
                  <span className="mcq__py">{m.py}</span>
                  <span className="mcq__han">{m.han}</span>
                  <span className="mcq__k">{String.fromCharCode(65 + i)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {on("roleplay") && (
          <div className="game">
            <div className="between" style={{ marginBottom: 8 }}><b>🎭 {t(t3("分角色朗读", "Role-play read-aloud", "Kusoma majukumu"))}</b><Badge tone="gold"><Volume2 size={11} /> {t(t3("王老师音色", "Teacher voice", "Sauti"))}</Badge></div>
            <ul className="list small">
              <li><span className="rolechip a">A</span><div className="t"><b style={{ fontFamily: "var(--serif)" }}>你好！请问要点什么？</b></div><Play size={13} className="mute" /></li>
              <li><span className="rolechip b">B</span><div className="t"><b style={{ fontFamily: "var(--serif)" }}>我要一碗米饭。</b></div><Play size={13} className="mute" /></li>
            </ul>
          </div>
        )}
        {on("sentence") && (
          <div className="game">
            <div className="between" style={{ marginBottom: 8 }}><b>✏️ {t(t3("句式仿说创编", "Sentence creation", "Kutunga"))}</b><span className="small dim">比喻句「是」</span></div>
            <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
              {["这件毛衣是晴朗的天空。", "这条裙子是一片草原。"].map((x, i) => <span key={i} className="sentchip">{x}</span>)}
            </div>
            <div className="small mute" style={{ marginTop: 8 }}>{t(t3("学生仿照句式，创编自己的比喻句。", "Learners create their own metaphors from the pattern.", "Wanafunzi hutunga sentensi zao."))}</div>
          </div>
        )}
        {on("tone") && (
          <div className="game">
            <div className="between" style={{ marginBottom: 8 }}><b>🎯 {t(t3("限读正音 · 声调", "Tone drill", "Toni"))}</b><span className="small dim">tone 3</span></div>
            <div className="row" style={{ gap: 10 }}>{["nǐ", "hǎo", "wǒ", "hěn"].map((x) => <span key={x} className="tonechip">{x}</span>)}</div>
            <div className="small mute" style={{ marginTop: 8 }}>{t(t3("跟读评分，第三声连读重点标红。", "Echo-read with scoring; tone-3 sandhi highlighted.", "Soma na alama."))}</div>
          </div>
        )}
        {on("quiz") && (
          <div className="game">
            <div className="between" style={{ marginBottom: 8 }}><b>📝 {t(t3("课堂小测", "In-class quiz", "Jaribio"))}</b><span className="small dim">5 {t(t3("题", "items", ""))}</span></div>
            <div className="small mute">{t(t3("连连看 + 选择 + 听价格，自动判分入知识图谱。", "Match + choose + listen-for-price, auto-graded into the graph.", "Hujipima kiotomatiki."))}</div>
            <Bar v={0.0} />
          </div>
        )}
      </div>
    </div>
  );
}

function TabExercises({ answers, setAnswers }: { answers: boolean; setAnswers: (b: boolean) => void }) {
  const t = useT();
  const tiers: { name: L; tone: "good" | "warn" | "acc"; items: { q: L | string; a: L }[] }[] = [
    { name: t3("基础", "Foundation", "Msingi"), tone: "good", items: [
      { q: "我要一（　）米饭。", a: t3("碗（量词）", "碗 (bowl)", "碗") },
      { q: "这是（　）？多少钱？", a: t3("菜单", "菜单 (menu)", "菜单") },
    ] },
    { name: t3("提高", "Stretch", "Kuendeleza"), tone: "warn", items: [
      { q: t3("用「我要」点两样食物，说一句完整的话。", "Order two items in one full sentence with 我要.", "Agiza vitu viwili."), a: t3("示例：我要一碗米饭和一瓶水。", "e.g. 我要一碗米饭和一瓶水。", "Mfano") },
    ] },
    { name: t3("挑战", "Challenge", "Changamoto"), tone: "acc", items: [
      { q: t3("听录音，写出顾客点了什么、一共多少钱。", "Listen and write what was ordered and the total price.", "Sikiliza."), a: t3("米饭×1、水×1；15 块", "rice×1, water×1; ¥15", "wali×1, maji×1; ¥15") },
    ] },
  ];
  return (
    <div>
      <div className="between" style={{ marginBottom: 12 }}>
        <span className="small mute">{t(t3("按班级学情自动分三层，可加减题量。", "Auto-tiered from class data; add or drop items freely.", "Viwango vitatu."))}</span>
        <button className="btn btn--sm btn--ghost" onClick={() => setAnswers(!answers)}>{answers ? t(t3("隐藏答案", "Hide answers", "Ficha majibu")) : t(t3("显示答案解析", "Show answer key", "Onyesha majibu"))}</button>
      </div>
      <div className="grid c3" style={{ gap: 12 }}>
        {tiers.map((tr, i) => (
          <div key={i} className="tier">
            <div className="between" style={{ marginBottom: 8 }}><Badge tone={tr.tone}>{t(tr.name)}</Badge><span className="small dim">{tr.items.length} {t(t3("题", "items", ""))}</span></div>
            <ol className="tier__q">
              {tr.items.map((it, j) => (
                <li key={j}>
                  <div className="tier__qt">{typeof it.q === "string" ? it.q : t(it.q)}</div>
                  {answers && <div className="tier__a">{t(t3("答案：", "Answer: ", "Jibu: "))}{t(it.a)}</div>}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabVocab({ langLabel }: { langLabel: string }) {
  const t = useT();
  return (
    <div>
      <div className="std-note" style={{ marginBottom: 12 }}><Languages size={13} /> {t(t3("汉字卡含笔顺与拼音；释义自动生成学员母语版本（当前：", "Character cards include stroke order & pinyin; glosses auto-generate in the learner's language (now: ", "Herufi na tafsiri ("))}<b style={{ color: "var(--text)" }}>{langLabel}</b>{t(t3("）。", ").", ")"))}</div>
      <div className="tbl">
        <table><thead><tr>
          <th>{t(t3("汉字", "Character", "Herufi"))}</th><th>{t(t3("拼音", "Pinyin", "Pinyin"))}</th><th>{t(t3("词性", "Type", "Aina"))}</th><th>{t(t3("释义", "Gloss", "Maana"))}</th><th>{t(t3("笔画", "Strokes", "Mistari"))}</th>
        </tr></thead><tbody>
          {VOCAB.map((v) => (
            <tr key={v.han}>
              <td><b style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{v.han}</b></td>
              <td className="mono">{v.py}</td>
              <td><span className="small mute">{t(v.pos)}</span></td>
              <td>{v.en}</td>
              <td className="small dim">{v.stroke ? v.stroke : "—"}</td>
            </tr>
          ))}
        </tbody></table>
      </div>
      <div className="row" style={{ gap: 16, marginTop: 16, alignItems: "flex-start" }}>
        <div>
          <div className="std-h"><PenLine size={14} /> {t(t3("汉字书写卡", "Writing cards", "Kadi za kuandika"))}</div>
          <div className="grid-han" style={{ maxWidth: 200 }}>
            <div className="on">米</div><div className="on">饭</div><div className="on">水</div><div>菜</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="std-h"><Sparkles size={14} /> {t(t3("例句（自动配翻译）", "Example sentences (auto-translated)", "Mifano"))}</div>
          <ul className="list small">
            <li><div className="t"><b>我要一碗米饭。</b><span>Wǒ yào yì wǎn mǐfàn. · {t(t3("我要一碗米饭。", "I'd like a bowl of rice.", "Nataka bakuli la wali."))}</span></div></li>
            <li><div className="t"><b>多少钱？</b><span>Duōshao qián? · {t(t3("多少钱？", "How much is it?", "Ni bei gani?"))}</span></div></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TabDialogue() {
  const t = useT();
  return (
    <div>
      <div className="between" style={{ marginBottom: 12 }}>
        <span className="small mute">{t(t3("情景：在餐厅 · 服务员 ↔ 顾客 · 可分角色朗读", "Scenario: at the restaurant · waiter ↔ customer · read by role", "Hali: mgahawani"))}</span>
        <Badge tone="acc"><Volume2 size={12} /> {t(t3("可一键转朗读音频", "One-tap to audio", "Bofya kwa sauti"))}</Badge>
      </div>
      <div className="chat">
        {DIALOGUE.map((d, i) => (
          <div key={i} className={`msg ${d.who === "s" ? "ai" : "me"}`} style={d.who === "c" ? { alignSelf: "flex-end" } : undefined}>
            <b style={{ fontSize: 15 }}>{d.zh}</b>
            <small>{d.py} · {t(t3(d.zh, d.en, d.en))}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabAudio() {
  const t = useT();
  const lines = ["你好！请问要点什么？", "我要一碗米饭和一瓶水。", "一共十五块。"];
  return (
    <div>
      <div className="between" style={{ marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <div className="row" style={{ gap: 8 }}><Badge tone="gold"><Volume2 size={12} /> {t(t3("王老师音色 · CosyVoice", "Wang laoshi voice · CosyVoice", "Sauti ya mwalimu"))}</Badge><span className="small mute">{t(t3("新加坡区合成 · 弱网优先音频", "Synthesised in Singapore · audio-first on weak networks", "Imeundwa Singapore"))}</span></div>
        <button className="btn btn--sm"><Play size={13} /> {t(t3("试听全文", "Play all", "Sikiliza"))}</button>
      </div>
      <div className="wavebox"><Waveform height={90} color="#d4af5a" /></div>
      <ul className="list small" style={{ marginTop: 8 }}>
        {lines.map((l, i) => (
          <li key={i}><button className="btn btn--sm btn--ghost"><Play size={12} /></button><div className="t"><b style={{ fontFamily: "var(--serif)", fontSize: 15 }}>{l}</b></div><span className="small dim">0:0{i + 3}</span></li>
        ))}
      </ul>
      <div className="std-note"><ShieldCheck size={13} /> {t(t3("音色为老师本人授权复刻，仅用于本班教学。", "Voice is the teacher's own authorised clone, used only for this class.", "Sauti ya mwalimu, kwa darasa hili tu."))}</div>
    </div>
  );
}

function TabQuiz({ answers, setAnswers }: { answers: boolean; setAnswers: (b: boolean) => void }) {
  const t = useT();
  const items: { q: string; opts: string[]; a: number }[] = [
    { q: "我要一（　）米饭。", opts: ["个", "碗", "瓶"], a: 1 },
    { q: "「多少钱」的意思是？", opts: ["How are you", "How much", "What time"], a: 1 },
    { q: "服务员问：还要（　）吗？", opts: ["别的", "谢谢", "再见"], a: 0 },
  ];
  return (
    <div>
      <div className="between" style={{ marginBottom: 12 }}>
        <span className="small mute">{t(t3("随堂测 · 自动判分入知识图谱 · 主观题转老师", "Auto-graded into the knowledge graph · subjective items go to the teacher", "Hujipima papo hapo"))}</span>
        <button className="btn btn--sm btn--ghost" onClick={() => setAnswers(!answers)}>{answers ? t(t3("隐藏答案", "Hide answers", "Ficha")) : t(t3("显示答案", "Show answers", "Onyesha"))}</button>
      </div>
      <ol className="quiz">
        {items.map((it, i) => (
          <li key={i}>
            <div className="quiz__q">{i + 1}. {it.q}</div>
            <div className="row" style={{ gap: 8, marginTop: 8 }}>
              {it.opts.map((o, j) => <span key={j} className={`quiz__opt ${answers && j === it.a ? "ok" : ""}`}>{String.fromCharCode(65 + j)}. {o}</span>)}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
