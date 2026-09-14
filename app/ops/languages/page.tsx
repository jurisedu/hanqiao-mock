"use client";
import { useMemo, useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Stat } from "@/components/ui";
import { opsRole, opsNav } from "@/lib/roles";
import { useT, t3, LANGS, type Lang } from "@/lib/i18n";
import { DICT, CORE_COUNT } from "@/lib/dict";
import { CheckCircle2, Pencil, Sparkles, Upload, Download, ShieldCheck, Languages as LanguagesIcon, AlertTriangle } from "lucide-react";

const TOTAL = 1159; // distinct English strings extracted from the interface (extraction script in the repo)
const COVERED = Math.min(1, Object.keys(DICT).length / TOTAL);
type Row = { key: string; src: string; tr: string; status: "published" | "review" | "draft" | "flagged"; by: string; at: string };

export default function LanguagePacks() {
  const t = useT();
  const [lang, setLang] = useState<Lang>("fr");
  const [tab, setTab] = useState<"strings" | "glossary" | "workflow">("strings");
  const idx = { fr: 0, es: 1, nl: 2, id: 3 }[lang as "fr" | "es" | "nl" | "id"] ?? -1;
  const covPct = (l: typeof LANGS[number]) => l.code === "zh" || l.code === "en" || l.code === "en-US" ? 1 : l.cov === "full" ? 0.97 : l.cov === "core" ? 0.34 : 0.06;
  const readyCount = LANGS.filter((l) => l.cov === "full").length;
  const covStatus = (cov: string): [string, "good" | "warn" | "acc" | ""] => cov === "full" ? [t(t3("已发布 · 母语审校中", "Published · native review", "Imechapishwa")), "good"] : cov === "core" ? [t(t3("核心已就绪 · 补齐中", "Core ready · completing", "Msingi tayari")), "acc"] : [t(t3("接入中 · 暂回退英文", "In progress · English fallback", "Inaandaliwa")), "warn"];
  const rows: Row[] = useMemo(() => {
    const keys = Object.keys(DICT).slice(0, 14);
    return keys.map((k, i) => ({ key: k, src: k, tr: idx >= 0 ? DICT[k][idx] : k, status: (["published", "published", "review", "published", "draft", "published", "flagged"] as Row["status"][])[i % 7], by: ["M. Dubois", "AI draft", "S. Okonkwo", "L. van Dijk"][i % 4], at: `09-0${(i % 6) + 1}` }));
  }, [idx]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [states, setStates] = useState<Record<string, Row["status"]>>({});
  const st = (r: Row) => states[r.key] ?? r.status;
  const tone = (s: Row["status"]) => (s === "published" ? "good" : s === "review" ? "warn" : s === "flagged" ? "bad" : "");
  const label = (s: Row["status"]) => t(s === "published" ? t3("已发布", "Published", "Imechapishwa") : s === "review" ? t3("待审核", "In review", "Inakaguliwa") : s === "flagged" ? t3("被标记", "Flagged", "Imewekwa alama") : t3("机器草稿", "Machine draft", "Rasimu ya mashine"));

  return (
    <Shell role={opsRole} nav={opsNav} title={t3("语言包管理", "Language pack management", "Usimamizi wa vifurushi vya lugha")} sub={t3("界面语言：设置、审核、修正、发布；机器草稿 → 母语审校 → 发布，术语表统一口径", "Interface languages: configure, review, correct, publish; machine draft → native review → publish, with a shared glossary", "Lugha za kiolesura: sanidi, kagua, sahihisha, chapisha")} net={3}>
      <div className="grid c4">
        <Panel className="in in-1"><Stat value={LANGS.length} label={t3(`接入语言 · ${readyCount} 已就绪`, `languages · ${readyCount} ready`, `lugha · ${readyCount} tayari`)} /></Panel>
        <Panel className="in in-2"><Stat value={TOTAL} label={t3("界面字符串（自动提取）", "interface strings (auto-extracted)", "mistari ya kiolesura")} /></Panel>
        <Panel className="in in-3"><Stat value={Object.keys(DICT).length * 4} label={t3("新语言词条（4 语）· 人工审校 " + CORE_COUNT * 4, "entries in new languages (×4) · human-reviewed " + CORE_COUNT * 4, "vipengele katika lugha mpya")} delta="+" /></Panel>
        <Panel className="in in-4"><Stat value={3} label={t3("待处理标记（用户反馈）", "open flags (user feedback)", "alama zilizo wazi")} up={false} /></Panel>

        <Panel className="span2 in in-2"><Head title={t3("语言与覆盖率", "Languages & coverage", "Lugha na ufikiaji")} right={<button className="btn btn--sm"><LanguagesIcon size={14} /> {t(t3("新增语言", "Add language", "Ongeza lugha"))}</button>} />
          <div className="tbl"><table><thead><tr><th>{t(t3("语言", "Language", "Lugha"))}</th><th>{t(t3("覆盖率", "Coverage", "Ufikiaji"))}</th><th>{t(t3("状态", "Status", "Hali"))}</th><th>{t(t3("地区", "Region", "Eneo"))}</th><th></th></tr></thead><tbody>
            {LANGS.map((l) => { const p = covPct(l); const [sl, stone] = covStatus(l.cov); return <tr key={l.code} style={{ background: l.code === lang ? "rgba(108,140,255,.08)" : undefined }}><td><b>{l.label}</b> <span className="dim small">{l.en} · {l.code}</span></td><td style={{ minWidth: 160 }}><Bar v={p} tone={p > .95 ? "good" : p > .5 ? "warn" : ""} /><span className="small mute">{Math.round(p * 100)}%</span></td><td><Badge tone={stone}>{sl}</Badge></td><td className="small mute">{t(l.region)}</td><td><button className="btn btn--sm btn--ghost" onClick={() => setLang(l.code)}>{t(t3("管理", "Manage", "Dhibiti"))}</button></td></tr>; })}
          </tbody></table></div>
        </Panel>
        <Panel className="span2 in in-3" glow><Head title={t3("发布流程", "Publishing workflow", "Mchakato wa kuchapisha")} />
          <ol className="tl">
            <li className="done"><b>{t(t3("提取", "Extract", "Toa"))}</b> · {t(t3("构建时自动扫描界面字符串，新增即入队", "Interface strings are scanned at build time; new ones are queued automatically", "Mistari huchanganuliwa wakati wa kujenga"))}</li>
            <li className="done"><b>{t(t3("机器草稿", "Machine draft", "Rasimu ya mashine"))}</b> · {t(t3("经 Model Gateway 生成，带术语表约束，标记为草稿", "Generated through the Model Gateway with glossary constraints, marked as draft", "Huundwa kupitia Model Gateway"))}</li>
            <li><b>{t(t3("母语审校", "Native review", "Ukaguzi wa mzawa"))}</b> · {t(t3("审校人逐条通过或修正；用户端「翻译有误」反馈进入同一队列", "Reviewers approve or correct entry by entry; “translation wrong” reports from users join the same queue", "Wakaguzi huidhinisha au kusahihisha"))}</li>
            <li className="todo"><b>{t(t3("发布", "Publish", "Chapisha"))}</b> · {t(t3("按语言灰度发布，可一键回滚到上一版", "Rolled out per language with one-click rollback to the previous version", "Huchapishwa kwa lugha, hurudishwa kwa mbofyo mmoja"))}</li>
          </ol>
          <div className="row" style={{ marginTop: 8 }}><Badge tone="acc"><ShieldCheck size={12} /> {t(t3("未审核条目不会进入生产界面", "Unreviewed entries never reach the production interface", "Vipengele visivyokaguliwa haviingii kwenye uzalishaji"))}</Badge></div>
        </Panel>

        <Panel className="span3 in in-4" lift={false}>
          <div className="tabs"><button className={tab === "strings" ? "on" : ""} onClick={() => setTab("strings")}>{t(t3("词条审核", "String review", "Ukaguzi wa mistari"))} · {LANGS.find((l) => l.code === lang)?.label}</button><button className={tab === "glossary" ? "on" : ""} onClick={() => setTab("glossary")}>{t(t3("术语表", "Glossary", "Kamusi ya istilahi"))}</button><button className={tab === "workflow" ? "on" : ""} onClick={() => setTab("workflow")}>{t(t3("用户反馈", "User flags", "Maoni ya watumiaji"))}</button></div>
          {tab === "strings" && (
            <>
              <div className="row" style={{ marginBottom: 12 }}>
                <span className="chips">{(["fr", "es", "nl", "id", "sw"] as Lang[]).map((c) => <button key={c} className={`chip ${lang === c ? "on" : ""}`} onClick={() => setLang(c)}>{LANGS.find((l) => l.code === c)?.label}</button>)}</span>
                <span style={{ marginLeft: "auto" }} className="row"><button className="btn btn--sm"><Sparkles size={14} /> {t(t3("生成缺失草稿", "Draft missing entries", "Andaa rasimu zinazokosekana"))}</button><button className="btn btn--sm"><Upload size={14} /> {t(t3("导入 CSV", "Import CSV", "Ingiza CSV"))}</button><button className="btn btn--sm"><Download size={14} /> {t(t3("导出", "Export", "Hamisha"))}</button></span>
              </div>
              <div className="tbl"><table><thead><tr><th>{t(t3("源文（英文）", "Source (English)", "Chanzo (Kiingereza)"))}</th><th>{t(t3("译文", "Translation", "Tafsiri"))}</th><th>{t(t3("状态", "Status", "Hali"))}</th><th>{t(t3("审校", "Reviewer", "Mkaguzi"))}</th><th></th></tr></thead><tbody>
                {rows.map((r) => { const s = st(r); return (
                  <tr key={r.key}><td style={{ maxWidth: 260 }}><b>{r.src}</b></td>
                    <td style={{ minWidth: 260 }}><input value={edits[r.key] ?? r.tr} onChange={(e) => setEdits({ ...edits, [r.key]: e.target.value })} style={{ width: "100%", background: "transparent", border: "1px solid transparent", borderRadius: 6, padding: "4px 6px", color: "var(--text)", font: "inherit" }} onFocus={(e) => (e.target.style.borderColor = "var(--line-2)")} onBlur={(e) => (e.target.style.borderColor = "transparent")} /></td>
                    <td><Badge tone={tone(s)}>{label(s)}</Badge></td><td className="small mute">{r.by} · {r.at}</td>
                    <td><div className="row" style={{ gap: 6 }}><button className="btn btn--sm btn--good" onClick={() => setStates({ ...states, [r.key]: "published" })}><CheckCircle2 size={13} /> {t(t3("通过", "Approve", "Idhinisha"))}</button><button className="btn btn--sm" onClick={() => setStates({ ...states, [r.key]: "review" })}><Pencil size={13} /> {t(t3("修正", "Correct", "Sahihisha"))}</button></div></td></tr>); })}
              </tbody></table></div>
              <div className="small mute" style={{ marginTop: 10 }}>{t(t3("演示环境：显示前 14 条；生产环境按模块与页面分组，支持按状态、审校人、更新时间筛选。", "Preview environment: first 14 entries shown; production groups by module and page with filters by status, reviewer and date.", "Mazingira ya onyesho: vipengele 14 vya kwanza."))}</div>
            </>
          )}
          {tab === "glossary" && (
            <div className="tbl"><table><thead><tr><th>{t(t3("术语", "Term", "Istilahi"))}</th><th>中文</th><th>English</th><th>Kiswahili</th><th>Français</th><th>{t(t3("规则", "Rule", "Kanuni"))}</th></tr></thead><tbody>
              {[["SHANHAI TONGWEN", "山海同文", "SHANHAI TONGWEN", "SHANHAI TONGWEN", "SHANHAI TONGWEN", t(t3("品牌名不译", "Brand name, never translated", "Jina la chapa, halitafsiriwi"))], ["TIDAR KAG", "TIDAR KAG", "TIDAR KAG", "TIDAR KAG", "TIDAR KAG", t(t3("技术名不译", "Technical name, not translated", "Jina la kiufundi"))], ["Study Companion", "伴学 Agent", "Study Companion", "Rafiki wa Masomo", "Compagnon d'étude", t(t3("Agent 名称按语言意译", "Agent names are localised", "Majina ya mawakala hutafsiriwa"))], ["Teacher sign-off", "老师签发", "Teacher sign-off", "Idhini ya mwalimu", "Validation de l'enseignant", t(t3("强调「老师做主」", "Keeps the teacher-in-charge meaning", "Huweka maana ya mwalimu kuongoza"))], ["HSK / YCT", "HSK / YCT", "HSK / YCT", "HSK / YCT", "HSK / YCT", t(t3("考试名不译", "Exam names, not translated", "Majina ya mitihani"))], ["Preview environment", "演示环境", "Preview environment", "Mazingira ya onyesho", "Environnement de démonstration", t(t3("全站统一", "Site-wide, one wording", "Neno moja kote"))]].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={i === 5 ? "small mute" : ""}>{i === 0 ? <b>{c}</b> : c}</td>)}</tr>)}
            </tbody></table></div>
          )}
          {tab === "workflow" && (
            <ul className="list">
              {[["fr", "Cours en direct", t(t3("学员反馈：「直播课」法语更常用 « Cours en direct » 而非 « Classe en direct »", "Learner report: “Cours en direct” is the usual French, not “Classe en direct”", "Maoni ya mwanafunzi kuhusu Kifaransa")), "review"], ["sw", "Mfululizo", t(t3("老师反馈：斯瓦希里语「连续学习」建议用 « Mfululizo wa siku »", "Teacher report: suggest “Mfululizo wa siku” for streak in Kiswahili", "Pendekezo la mwalimu")), "flagged"], ["id", "Pelajar", t(t3("学校反馈：印尼语「学员」在成人班宜用 « Peserta »", "School report: for adult classes “Peserta” fits better than “Pelajar”", "Maoni ya shule kuhusu Kiindonesia")), "review"]].map(([c, w, note, s]) => <li key={w as string}><Badge tone={s === "flagged" ? "bad" : "warn"}><AlertTriangle size={12} /> {(c as string).toUpperCase()}</Badge><div className="t"><b>{w as string}</b><span>{note as string}</span></div><div className="row" style={{ gap: 6 }}><button className="btn btn--sm btn--good">{t(t3("采纳", "Accept", "Kubali"))}</button><button className="btn btn--sm btn--ghost">{t(t3("忽略", "Dismiss", "Puuza"))}</button></div></li>)}
            </ul>
          )}
        </Panel>
        <Panel className="in in-5" gold><Head title={t3("回退与质量规则", "Fallback & quality rules", "Kanuni za mbadala na ubora")} /><ul className="list small">
          <li><div className="t"><b>{t(t3("缺失即回退英文", "Missing entries fall back to English", "Zinazokosekana hurudi Kiingereza"))}</b><span>{t(t3("界面永不出现空白或键名", "The interface never shows blanks or key names", "Kiolesura hakionyeshi nafasi tupu"))}</span></div></li>
          <li><div className="t"><b>{t(t3("占位符与数字校验", "Placeholder and number checks", "Ukaguzi wa vishikilia nafasi"))}</b><span>{t(t3("译文必须保留 {n}、单位与品牌名", "Translations must keep {n}, units and brand names", "Tafsiri lazima zihifadhi {n} na majina"))}</span></div></li>
          <li><div className="t"><b>{t(t3("长度预警", "Length warnings", "Tahadhari ya urefu"))}</b><span>{t(t3("超过源文 140% 的译文在按钮与导航中标黄", "Translations over 140% of the source are flagged in buttons and navigation", "Tafsiri ndefu zaidi huwekwa alama"))}</span></div></li>
          <li><div className="t"><b>{t(t3("学员端优先", "Learner screens first", "Skrini za wanafunzi kwanza"))}</b><span>{t(t3("发布顺序：学员端 → 老师端 → 运营端", "Release order: learner → teacher → operations", "Mpangilio: mwanafunzi → mwalimu → uendeshaji"))}</span></div></li>
        </ul></Panel>
      </div>
    </Shell>
  );
}
