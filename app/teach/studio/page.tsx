"use client";
import { useEffect, useRef, useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar } from "@/components/ui";
import Waveform from "@/components/Waveform";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, useLang, t3, LANGS, type L } from "@/lib/i18n";
import { useToast } from "@/components/Toast";
import { lessons, classes, kps } from "@/lib/data";
import {
  Wand2, Sparkles, FileText, Presentation, ListChecks, Languages, MessagesSquare, Volume2, ClipboardCheck,
  CheckCircle2, Radio, Layers, Clock, Users, Target, Lightbulb, Play, RefreshCw, Palette, FileDown,
  PenLine, BookOpen, ShieldCheck, Boxes,
} from "lucide-react";

type Out = { id: string; label: L; icon: typeof FileText };
const OUTPUTS: Out[] = [
  { id: "plan", label: t3("教案", "Lesson plan", "Mpango wa somo"), icon: FileText },
  { id: "slides", label: t3("课件 PPT", "Slides", "Slaidi"), icon: Presentation },
  { id: "exercises", label: t3("分层习题", "Tiered exercises", "Mazoezi ya viwango"), icon: ListChecks },
  { id: "vocab", label: t3("生词 · 汉字卡", "Vocab & characters", "Msamiati na herufi"), icon: Languages },
  { id: "dialogue", label: t3("情景对话", "Scenario dialogue", "Mazungumzo"), icon: MessagesSquare },
  { id: "audio", label: t3("朗读音频", "Read-aloud audio", "Sauti ya kusoma"), icon: Volume2 },
  { id: "quiz", label: t3("随堂测", "Quick quiz", "Jaribio la darasa"), icon: ClipboardCheck },
];

const TEMPLATES = [
  { id: "min", name: t3("简约", "Minimal", "Rahisi"), bg: "#ffffff", fg: "#141a2e", ac: "#1f3aa8" },
  { id: "ink", name: t3("水墨", "Ink wash", "Wino"), bg: "linear-gradient(135deg,#f7f4ee,#ece4d3)", fg: "#2a2018", ac: "#9a2f2f" },
  { id: "kids", name: t3("童趣", "Playful", "Kucheza"), bg: "linear-gradient(135deg,#fff7e6,#ffe7bf)", fg: "#4a3410", ac: "#d8930f" },
  { id: "pro", name: t3("商务", "Corporate", "Biashara"), bg: "linear-gradient(160deg,#101a3f,#0b1230)", fg: "#eef1fb", ac: "#d4af5a" },
];

const SKILLS: { id: string; label: L }[] = [
  { id: "listen", label: t3("听", "Listening", "Kusikiliza") },
  { id: "speak", label: t3("说", "Speaking", "Kuzungumza") },
  { id: "read", label: t3("读", "Reading", "Kusoma") },
  { id: "write", label: t3("写", "Writing", "Kuandika") },
  { id: "culture", label: t3("文化", "Culture", "Utamaduni") },
];

const GEN_STEPS: L[] = [
  t3("分析班级学情与薄弱点", "Analysing class needs & weak points", "Kuchambua mahitaji ya darasa"),
  t3("检索教材 · 知识图谱（带出处）", "Retrieving materials · knowledge graph (with sources)", "Kupata vifaa · grafu ya maarifa"),
  t3("生成教案与教学环节", "Drafting lesson plan & stages", "Kuandaa mpango wa somo"),
  t3("排版课件 · AI 配图", "Laying out slides · AI imagery", "Kupanga slaidi · picha za AI"),
  t3("生成分层习题与随堂测", "Building tiered exercises & quiz", "Kutengeneza mazoezi ya viwango"),
  t3("合成朗读音频（王老师音色）", "Synthesising audio (Wang laoshi voice)", "Kuunganisha sauti ya mwalimu"),
  t3("护栏校验 · 待老师签发", "Guardrails · awaiting sign-off", "Ukaguzi · inasubiri idhini"),
];

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
  const { lang } = useLang();
  const toast = useToast();
  const cur = LANGS.find((l) => l.code === lang);

  const [source, setSource] = useState<"unit" | "topic" | "weak">("unit");
  const [lessonId, setLessonId] = useState("l6");
  const [topic, setTopic] = useState("在餐厅点餐 Ordering at a restaurant");
  const [level, setLevel] = useState("HSK1");
  const [dur, setDur] = useState(45);
  const [classId, setClassId] = useState("c1");
  const [skills, setSkills] = useState<Record<string, boolean>>({ listen: true, speak: true, read: true, write: true, culture: false });
  const [sel, setSel] = useState<Record<string, boolean>>(Object.fromEntries(OUTPUTS.map((o) => [o.id, true])));

  const [status, setStatus] = useState<"idle" | "gen" | "ready">("idle");
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState("plan");
  const [tpl, setTpl] = useState(TEMPLATES[0]);
  const [slide, setSlide] = useState(0);
  const [answers, setAnswers] = useState(false);
  const [signed, setSigned] = useState(false);
  const [pushed, setPushed] = useState<Record<string, boolean>>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cls = classes.find((c) => c.id === classId)!;
  const lesson = lessons.find((l) => l.id === lessonId)!;
  const weak = kps.filter((k) => k.status === "weak" || k.status === "developing").slice(0, 3);
  const title = source === "unit" ? t(lesson.title) : source === "topic" ? topic : t(t3("薄弱点强化课", "Weak-point booster", "Somo la kuimarisha"));
  const shown = OUTPUTS.filter((o) => sel[o.id]);
  const active = shown.find((o) => o.id === tab)?.id ?? shown[0]?.id;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const generate = () => {
    if (!shown.length) { toast(t(t3("请至少选择一项产出", "Pick at least one output", "Chagua angalau kitu kimoja"))); return; }
    timers.current.forEach(clearTimeout); timers.current = [];
    setStatus("gen"); setStep(0); setSigned(false); setPushed({});
    GEN_STEPS.forEach((_, i) => timers.current.push(setTimeout(() => setStep(i + 1), 360 * (i + 1))));
    timers.current.push(setTimeout(() => {
      setStatus("ready"); setSlide(0); setTab(shown[0].id);
      toast(t(t3("备课已生成 · 待签发", "Lesson pack ready · awaiting sign-off", "Tayari · inasubiri idhini")), { sub: title, tone: "acc" });
    }, 360 * (GEN_STEPS.length + 1) + 240));
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
      sub={t3("一次输入，AI 生成整套备课：教案 · 课件 · 习题 · 生词卡 · 对话 · 朗读音频 · 随堂测；扎根教材与班级学情，老师签发后一键推送",
        "One brief, one AI pass — a full lesson pack: plan, slides, exercises, character cards, dialogue, audio and a quiz; grounded in your materials and class data, pushed with one tap after you sign off",
        "Maandalizi kamili kwa mbofyo mmoja")}
      actions={status === "ready" ? <button className="btn btn--sm" onClick={generate}><RefreshCw size={14} /> {t(t3("重新生成", "Regenerate", "Zalisha upya"))}</button> : undefined}>

      <div className="grid c3">
        {/* ---------- Composer ---------- */}
        <Panel className="in in-1" glow>
          <Head title={t3("备课设置", "Lesson brief", "Maelezo ya somo")} right={<Badge tone="acc"><Sparkles size={12} /> {t(t3("JE Agent", "JE Agent", "JE Agent"))}</Badge>} />
          <div className="stdlabel">{t(t3("来源", "Source", "Chanzo"))}</div>
          <div className="chips">
            {([["unit", t3("教材章节", "Course unit", "Kitengo")], ["topic", t3("自定义主题", "Custom topic", "Mada")], ["weak", t3("薄弱知识点", "Weak points", "Udhaifu")]] as const).map(([k, l]) =>
              <button key={k} className={`chip ${source === k ? "on" : ""}`} onClick={() => setSource(k)}>{t(l)}</button>)}
          </div>
          {source === "unit" && (
            <select className="std-in" value={lessonId} onChange={(e) => setLessonId(e.target.value)}>
              {lessons.map((l) => <option key={l.id} value={l.id}>{l.unit} · {t(l.title)}</option>)}
            </select>
          )}
          {source === "topic" && <input className="std-in" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={t(t3("输入主题，如：问路", "e.g. asking for directions", "Mada"))} />}
          {source === "weak" && <div className="std-note"><Target size={13} /> {t(t3("自动聚焦：", "Auto-focus: ", "Kuzingatia: "))}{weak.map((k) => k.han).join(" · ")}</div>}

          <div className="stdlabel">{t(t3("等级 / 课时", "Level / duration", "Kiwango / muda"))}</div>
          <div className="chips">
            {["HSK1", "HSK2", "YCT"].map((l) => <button key={l} className={`chip ${level === l ? "on" : ""}`} onClick={() => setLevel(l)}>{l}</button>)}
            <span style={{ width: 8 }} />
            {[30, 40, 45].map((d) => <button key={d} className={`chip ${dur === d ? "on" : ""}`} onClick={() => setDur(d)}>{d}′</button>)}
          </div>

          <div className="stdlabel">{t(t3("班级（带入学情）", "Class (pulls in data)", "Darasa"))}</div>
          <select className="std-in" value={classId} onChange={(e) => setClassId(e.target.value)}>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name} · {c.n}{t(t3(" 人", " learners", ""))}</option>)}
          </select>
          <div className="std-note"><Users size={13} /> {t(t3("薄弱：", "Weak: ", "Dhaifu: "))}{weak.map((k) => `${k.han}`).join(" · ")} · {t(t3("出勤", "att.", "mah."))} {Math.round(cls.attendance * 100)}%</div>

          <div className="stdlabel">{t(t3("技能侧重", "Skill focus", "Ujuzi"))}</div>
          <div className="chips">
            {SKILLS.map((s) => <button key={s.id} className={`chip ${skills[s.id] ? "on" : ""}`} onClick={() => setSkills((x) => ({ ...x, [s.id]: !x[s.id] }))}>{t(s.label)}</button>)}
          </div>

          <div className="stdlabel">{t(t3("产出内容", "Outputs", "Matokeo"))}</div>
          <div className="optgrid">
            {OUTPUTS.map((o) => { const I = o.icon; const on = sel[o.id]; return (
              <button key={o.id} className={`opt ${on ? "on" : ""}`} onClick={() => setSel((x) => ({ ...x, [o.id]: !x[o.id] }))}>
                <span className="opt__box">{on && <CheckCircle2 size={14} />}</span><I size={14} />{t(o.label)}
              </button>); })}
          </div>

          <div className="std-note"><Languages size={13} /> {t(t3("学生端译文语言：", "Learner translation: ", "Lugha ya tafsiri: "))}<b style={{ color: "var(--text)" }}>{cur?.label}</b> · {t(t3("支持 18 种", "18 supported", "18 zinazotumika"))}</div>

          <button className="btn btn--primary" style={{ width: "100%", marginTop: 14 }} onClick={generate} disabled={status === "gen"}>
            <Wand2 size={16} /> {status === "gen" ? t(t3("生成中…", "Generating…", "Inazalisha…")) : status === "ready" ? t(t3("重新生成整套备课", "Regenerate full pack", "Zalisha upya")) : t(t3("一键生成整套备课", "Generate full lesson pack", "Zalisha maandalizi"))}
          </button>
          <div className="std-fine">{t(t3("平均 40 秒完成一课时备课，相当于教师 90 分钟手工工作量。", "≈40 s per lesson — about 90 minutes of manual prep.", "≈sekunde 40 kwa somo."))}</div>
        </Panel>

        {/* ---------- Output stage ---------- */}
        <Panel className="span2 in in-2" lift={false} style={{ minHeight: 560 }}>
          {status === "idle" && <StudioIdle title={title} shown={shown} />}
          {status === "gen" && <StudioGen step={step} title={title} />}
          {status === "ready" && active && (
            <>
              <div className="between" style={{ marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
                <div className="row" style={{ gap: 10 }}>
                  <Badge tone="good" live><CheckCircle2 size={12} /> {t(t3("已生成", "Generated", "Imezalishwa"))}</Badge>
                  <b style={{ fontSize: 15 }}>{title}</b>
                  <span className="small mute">{level} · {dur}′ · {cls.name}</span>
                </div>
                <div className="row" style={{ gap: 6 }}>
                  <span className="trace"><span className="ground">{t(t3("出处：", "Sources: ", "Vyanzo: "))}{lesson.unit} · {t(t3("知识图谱", "graph", "grafu"))}</span></span>
                </div>
              </div>

              <div className="tabs" style={{ flexWrap: "wrap" }}>
                {shown.map((o) => { const I = o.icon; return (
                  <button key={o.id} className={active === o.id ? "on" : ""} onClick={() => setTab(o.id)}><I size={13} style={{ marginRight: 6, verticalAlign: "-2px" }} />{t(o.label)}</button>); })}
              </div>

              {active === "plan" && <TabPlan dur={dur} level={level} weak={weak} />}
              {active === "slides" && <TabSlides tpl={tpl} setTpl={setTpl} slide={slide} setSlide={setSlide} onExport={() => exp("PPTX")} />}
              {active === "exercises" && <TabExercises answers={answers} setAnswers={setAnswers} />}
              {active === "vocab" && <TabVocab langLabel={cur?.label ?? "English"} />}
              {active === "dialogue" && <TabDialogue />}
              {active === "audio" && <TabAudio />}
              {active === "quiz" && <TabQuiz answers={answers} setAnswers={setAnswers} />}

              {/* sign-off + distribute */}
              <div className="signbar">
                <div className="row" style={{ gap: 10 }}>
                  {signed
                    ? <Badge tone="good"><ShieldCheck size={12} /> {t(t3("王老师已签发", "Signed by Wang laoshi", "Imeidhinishwa"))}</Badge>
                    : <button className="btn btn--good btn--sm" onClick={doSign}><ShieldCheck size={14} /> {t(t3("老师签发", "Teacher sign-off", "Idhini ya mwalimu"))}</button>}
                  <span className="small mute">{t(t3("AI 起草，老师签发后方可进入生产", "AI drafts; nothing goes live until you sign off", "AI huandaa; wewe huidhinisha"))}</span>
                </div>
                <div className="row" style={{ gap: 6 }}>
                  {([["live", t3("推直播", "To live class", "Somo la moja kwa moja"), Radio], ["cards", t3("生成复习卡", "Review cards", "Kadi"), Layers], ["hw", t3("布置作业", "Assign homework", "Kazi"), FileText], ["lib", t3("存内容库", "Save to library", "Maktaba"), Boxes]] as const).map(([id, l, I]) =>
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

/* ---------------- idle / generating ---------------- */
function StudioIdle({ title, shown }: { title: string; shown: Out[] }) {
  const t = useT();
  return (
    <div className="std-empty">
      <div className="std-empty__ic"><Wand2 size={34} /><span className="orbit" /></div>
      <h3 style={{ fontSize: 18 }}>{t(t3("填好左侧设置，一键生成整套备课", "Set the brief, generate a full lesson pack", "Weka maelezo, zalisha"))}</h3>
      <p className="mute" style={{ maxWidth: "48ch", margin: "6px auto 0" }}>{t(t3("AI 会扎根你的教材与班级学情，产出教案、课件、习题、生词卡、对话、朗读音频与随堂测——全部可编辑、带出处、老师签发。", "Grounded in your materials and class data: plan, slides, exercises, character cards, dialogue, audio and a quiz — all editable, all sourced, all sign-off gated.", "Kwa kuzingatia vifaa vyako."))}</p>
      <div className="row" style={{ justifyContent: "center", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
        {shown.map((o) => { const I = o.icon; return <span key={o.id} className="std-pill"><I size={13} /> {t(o.label)}</span>; })}
      </div>
      <div className="std-empty__title">{title}</div>
    </div>
  );
}

function StudioGen({ step, title }: { step: number; title: string }) {
  const t = useT();
  const pct = Math.min(1, step / GEN_STEPS.length);
  return (
    <div className="std-gen">
      <div className="between" style={{ marginBottom: 4 }}><b>{t(t3("正在生成：", "Generating: ", "Inazalisha: "))}{title}</b><span className="mono mute">{Math.round(pct * 100)}%</span></div>
      <Bar v={pct} tone="gold" />
      <ul className="genlist">
        {GEN_STEPS.map((s, i) => (
          <li key={i} className={i < step ? "done" : i === step ? "now" : ""}>
            <span className="genlist__ic">{i < step ? <CheckCircle2 size={15} /> : i === step ? <span className="spin" /> : <span className="genlist__dot" />}</span>
            {t(s)}
          </li>
        ))}
      </ul>
      <div className="trace" style={{ marginTop: 6 }}>
        <span className="route">route</span><i>→</i><span className="ground">ground</span><i>→</i><span className="recall">recall</span><i>→</i><span className="verify">verify</span><i>→</i><span className="human">sign-off</span>
      </div>
    </div>
  );
}

/* ---------------- tabs ---------------- */
function TabPlan({ dur, level, weak }: { dur: number; level: string; weak: typeof kps }) {
  const t = useT();
  const stages: [string, L, L][] = [
    ["0–5′", t3("热身", "Warm-up", "Kuanza"), t3("复习上节生词，快问快答", "Recycle last unit's words, rapid Q&A", "Kurudia maneno")],
    ["5–15′", t3("导入", "Lead-in", "Utangulizi"), t3("情景视频《在餐厅》+ 生词呈现", "Scene video ‘At the restaurant’ + new words", "Video + maneno mapya")],
    ["15–28′", t3("新授", "Presentation", "Kufundisha"), t3("句型「我要+量词+名词」+ 量词操练", "Pattern ‘我要 + measure word + noun’ + drills", "Mchoro wa sentensi")],
    ["28–38′", t3("活动", "Activity", "Shughuli"), t3("角色扮演：点餐（两人一组）", "Role-play: ordering (in pairs)", "Igizo: kuagiza")],
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
          <dt>{t(t3("适配", "Adapted", "Imerekebishwa"))}</dt><dd className="mute">{level} · {dur}′ · {t(t3("针对薄弱：", "targets: ", "inalenga: "))}{weak.map((k) => k.han).join(" / ")}</dd>
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
        <div className="std-note" style={{ marginTop: 8 }}><BookOpen size={13} /> {t(t3("每个环节都可展开为课件页、习题或活动卡。", "Each stage expands into a slide, exercise or activity card.", "Kila hatua hupanuka."))}</div>
      </div>
    </div>
  );
}

function TabSlides({ tpl, setTpl, slide, setSlide, onExport }: { tpl: typeof TEMPLATES[number]; setTpl: (t: typeof TEMPLATES[number]) => void; slide: number; setSlide: (n: number) => void; onExport: () => void }) {
  const t = useT();
  const s = SLIDES[slide];
  return (
    <div>
      <div className="between" style={{ marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <div className="row" style={{ gap: 6 }}>
          <Palette size={14} className="mute" />
          {TEMPLATES.map((x) => <button key={x.id} className={`chip ${tpl.id === x.id ? "on" : ""}`} onClick={() => setTpl(x)}>{t(x.name)}</button>)}
        </div>
        <div className="row" style={{ gap: 6 }}>
          <span className="small mute">{slide + 1} / {SLIDES.length}</span>
          <button className="btn btn--sm btn--ghost" onClick={onExport}><FileDown size={13} /> {t(t3("导出 PPT", "Export PPT", "Hamisha"))}</button>
        </div>
      </div>
      <div className="slidebig" style={{ background: tpl.bg, color: tpl.fg }}>
        <span className="k">{t(s.k)}</span>
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
      <div className="std-note"><Sparkles size={13} /> {t(t3("配图由 AI 生成并做安全过滤；可替换为教材原图或图库。", "Imagery is AI-generated and safety-filtered; swap in textbook art or stock any time.", "Picha za AI zilizochujwa."))}</div>
    </div>
  );
}

function TabExercises({ answers, setAnswers }: { answers: boolean; setAnswers: (b: boolean) => void }) {
  const t = useT();
  const tiers: { name: L; tone: "good" | "warn" | "acc"; items: { q: string; a: L }[] }[] = [
    { name: t3("基础", "Foundation", "Msingi"), tone: "good", items: [
      { q: "我要一（　）米饭。", a: t3("碗（量词）", "碗 (bowl)", "碗") },
      { q: "这是（　）？多少钱？", a: t3("菜单", "菜单 (menu)", "菜单") },
    ] },
    { name: t3("提高", "Stretch", "Kuendeleza"), tone: "warn", items: [
      { q: t3("用「我要」点两样食物，说一句完整的话。", "Order two items in one full sentence with 我要.", "Agiza vitu viwili."), a: t3("示例：我要一碗米饭和一瓶水。", "e.g. 我要一碗米饭和一瓶水。", "Mfano") } as never,
    ] },
    { name: t3("挑战", "Challenge", "Changamoto"), tone: "acc", items: [
      { q: t3("听录音，写出顾客点了什么、一共多少钱。", "Listen and write what was ordered and the total price.", "Sikiliza."), a: t3("米饭×1、水×1；15 块", "rice×1, water×1; ¥15", "wali×1, maji×1; ¥15") } as never,
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
                  <div className="tier__qt">{typeof it.q === "string" ? it.q : t(it.q as L)}</div>
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
