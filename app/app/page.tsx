"use client";
import Link from "next/link";
import { useT, t3, useLang } from "@/lib/i18n";
import LangSwitch from "@/components/LangSwitch";
import EnvBadge from "@/components/EnvBadge";
import { Bar, Net } from "@/components/ui";
import { kps, lessons, books } from "@/lib/data";
import { Signal, Wifi, BatteryMedium, Home, PlayCircle, ClipboardCheck, Library, User, Download, WifiOff, Languages, ShieldCheck, Mic, Orbit, Radio, Users, Play, Flame, ChevronRight, Sparkles, type LucideIcon } from "lucide-react";

const ACC = "#1f3aa8";

function Phone({ title, children, dark = false, tab = 0, net = "4G" }: { title: string; children: React.ReactNode; dark?: boolean; tab?: number; net?: string }) {
  const t = useT();
  const tabs: [LucideIcon, string][] = [[Home, t(t3("今天", "Today", "Leo"))], [PlayCircle, t(t3("课程", "Lessons", "Masomo"))], [ClipboardCheck, t(t3("练习", "Practice", "Mazoezi"))], [Library, t(t3("图书馆", "Library", "Maktaba"))], [User, t(t3("我", "Me", "Mimi"))]];
  return (
    <div>
      <div className="device">
        <div className={`screen ${dark ? "dark" : ""}`}>
          <div className="island" />
          <div className="sbar"><span>9:41</span><span><Signal size={13} /> {net} <Wifi size={13} /> <BatteryMedium size={15} /></span></div>
          <div className="screen__body">{children}</div>
          <div className="tabbar">{tabs.map(([I, l], i) => <span key={l} className={i === tab ? "on" : ""}><I size={20} strokeWidth={i === tab ? 2.2 : 1.7} />{l}</span>)}</div>
          <div className="homebar" />
        </div>
      </div>
      <div className="device__cap">{title}</div>
    </div>
  );
}

function Row({ l, r, c, sub }: { l: string; r: React.ReactNode; c?: string; sub?: string }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "11px 13px", marginTop: 8, borderRadius: 14, background: "#fff", border: "1px solid #e4e6ee", boxShadow: "0 1px 2px rgba(20,30,80,.04)" }}><div><div style={{ fontWeight: 600 }}>{l}</div>{sub && <div style={{ fontSize: 10.5, color: "#6a7290" }}>{sub}</div>}</div><b style={{ color: c ?? ACC, fontSize: 12.5, whiteSpace: "nowrap" }}>{r}</b></div>;
}

export default function AppShowcase() {
  const t = useT(); const { lang } = useLang();
  const T = (zh: string, en: string, sw: string) => t(t3(zh, en, sw));
  const feats: [LucideIcon, string, string][] = [
    [WifiOff, T("离线优先", "Offline first", "Nje ya mtandao kwanza"), T("学、练、复习、模拟考、阅读都在本地完成；联网后增量同步，服务器对成绩有最终裁量。", "Lessons, practice, review, mock exams and reading all work locally; incremental sync on reconnect, server has final say on scores.", "Masomo, mazoezi, marudio, mitihani na kusoma hufanyika ndani; usawazishaji baada ya kuunganishwa.")],
    [Download, T("省流与省电", "Low data, low power", "Data kidogo, nguvu kidogo"), T("240p 与纯音频档、夜间 Wi-Fi 下载、图片压缩、分级缓存清理；流量用量随时可见。", "240p and audio-only tiers, night Wi-Fi downloads, compressed images, tiered cache cleanup; data usage always visible.", "Viwango vya 240p na sauti pekee, upakuaji wa usiku, picha zilizobanwa.")],
    [Languages, T("母语脚手架", "First-language scaffolding", "Msingi wa lugha ya kwanza"), T("界面、讲解与答疑支持中文、英语、斯瓦希里语，逐步过渡到中文。", "Interface, explanations and Q&A in Chinese, English and Kiswahili, moving gradually to Chinese.", "Kiolesura, maelezo na maswali kwa Kichina, Kiingereza na Kiswahili.")],
    [ShieldCheck, T("合规在底层", "Compliance built in", "Uzingatiaji msingini"), T("家长同意、学校数据隔离、新加坡驻留、导出与删除，从第一天就在架构里。", "Parental consent, school-level isolation, Singapore residency, export and deletion, in the architecture from day one.", "Idhini ya wazazi, utengano wa shule, uhifadhi Singapore, kuhamisha na kufuta.")],
  ];
  return (
    <div className="landing" style={{ padding: "24px 40px 60px" }}>
      <div className="between" style={{ marginBottom: 10 }}>
        <div className="row"><EnvBadge /><LangSwitch /></div>
        <Link href="/" className="btn btn--sm">← {T("返回", "Back", "Rudi")}</Link>
      </div>
      <div className="app-hero">
        <div className="in">
          <div className="eyebrow">{T("学员 App · 安卓优先 · 演示环境", "Learner app · Android first · preview environment", "App ya mwanafunzi · Android kwanza · mazingira ya onyesho")}</div>
          <h1 style={{ marginTop: 10 }}>{T("为低端手机、弱网与共享设备而设计的中文学习 App", "A Chinese learning app designed for low-end phones, weak networks and shared devices", "App ya Kichina iliyoundwa kwa simu za bei nafuu, mtandao dhaifu na vifaa vya pamoja")}</h1>
          <p>{T("安装包 150 MB 以内，2 GB 内存可流畅运行；一部手机可切换多名学员；界面支持中文、English、Kiswahili。所有截图均为演示环境的模拟数据。", "Under 150 MB, smooth on 2 GB RAM; several learners can share one phone; interface in 中文, English and Kiswahili. Every screen below shows sample data from the preview environment.", "Chini ya MB 150, inafanya kazi vizuri kwa RAM ya GB 2; wanafunzi kadhaa wanaweza kutumia simu moja.")}</p>
          <div className="row" style={{ marginTop: 18 }}>{[T("≤150 MB", "≤150 MB", "≤150 MB"), T("2 GB 内存", "2 GB RAM", "RAM 2 GB"), T("一机多账号", "Multi-learner", "Wanafunzi wengi"), T("离线内容包", "Offline packs", "Vifurushi"), T("三语界面", "3 languages", "Lugha 3")].map((x) => <span key={x} className="badge acc">{x}</span>)}</div>
        </div>
        <div className="in in-2" style={{ display: "grid", placeItems: "center" }}>
          <Phone title={T("今天 · 首页", "Today · home", "Leo · nyumbani")}>
            <div className="between"><div><div style={{ fontSize: 11, color: "#6a7290" }}>{T("你好，Amara", "Hello, Amara", "Habari, Amara")}</div><b style={{ fontSize: 19, fontFamily: "var(--serif)" }}>{T("今天学 15 分钟", "15 minutes today", "Dakika 15 leo")}</b></div><span className="avatar" style={{ width: 32, height: 32, fontSize: 11 }}>AO</span></div>
            <div style={{ marginTop: 14, borderRadius: 20, padding: 16, background: `linear-gradient(135deg, ${ACC}, #4b3fb5)`, color: "#fff", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, opacity: .85 }}><Flame size={13} />{T("连续学习", "Streak", "Mfululizo")}</div>
              <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-.02em" }}>12 <span style={{ fontSize: 12, fontWeight: 600 }}>{T("天", "days", "siku")}</span></div>
              <div style={{ display: "flex", gap: 4, marginTop: 10 }}>{[1, 1, 1, 1, 1, 0, 0].map((d, i) => <span key={i} style={{ flex: 1, height: 5, borderRadius: 4, background: d ? "#fff" : "rgba(255,255,255,.3)" }} />)}</div>
            </div>
            <div style={{ marginTop: 14, fontWeight: 700, display: "flex", justifyContent: "space-between" }}><span>{T("今日任务", "Today's tasks", "Kazi za leo")}</span><span style={{ fontSize: 11, color: "#6a7290" }}>3 · 11′ / 15′</span></div>
            <Row l={T("复习 12 张卡", "Review 12 cards", "Rudia kadi 12")} sub={T("已完成 · 离线", "Done · offline", "Imekamilika")} r="✓" c="#1f9d6a" />
            <Row l={T("Unit 6 录播", "Unit 6 recording", "Unit 6 rekodi")} sub={T("已下载 · 42 MB", "Saved · 42 MB", "Imehifadhiwa · 42 MB")} r={<span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Play size={12} /> 18′</span>} />
            <Row l={T("第三声 5 组", "Tone 3 · 5 sets", "Toni ya 3 · seti 5")} sub={T("发音教练", "Coach", "Kocha")} r={<ChevronRight size={16} />} c="#d8930f" />
          </Phone>
        </div>
      </div>

      <div className="stage">
        <Phone title={T("离线课程与内容包", "Offline lessons & packs", "Somo nje ya mtandao")} dark tab={1} net="2G">
          <div className="between"><b style={{ fontSize: 16 }}>{T("课程", "Lessons", "Masomo")}</b><span className="badge bad" style={{ fontSize: 10 }}><WifiOff size={11} /> {T("离线", "Offline", "Nje ya mtandao")}</span></div>
          <div style={{ marginTop: 12, borderRadius: 16, overflow: "hidden", background: "radial-gradient(70% 90% at 50% 40%, #223066, #070b18)", height: 150, position: "relative", display: "grid", placeItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,.92)", display: "grid", placeItems: "center", color: "#000" }}><Play size={20} fill="#000" /></div>
            <div style={{ position: "absolute", bottom: 8, left: 10, right: 10, fontSize: 10.5, background: "rgba(0,0,0,.6)", padding: "5px 8px", borderRadius: 6 }}>你好，我想点一杯茶。<br /><span style={{ opacity: .7 }}>{lang === "sw" ? "Habari, ningependa kuagiza chai." : "Hello, I'd like to order a tea."}</span></div>
            <div style={{ position: "absolute", top: 8, right: 8, fontSize: 10 }} className="badge good">240p · {T("音频优先", "audio first", "sauti kwanza")}</div>
          </div>
          {lessons.map((l) => (
            <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
              <div><div style={{ fontWeight: 700 }}>{l.unit} · {t(l.title)}</div><div className="dim" style={{ fontSize: 10.5 }}>{l.dur} {t({ zh: "分钟", en: "min", sw: "dakika" })} · {l.size}</div></div>
              <span className={`badge ${l.downloaded ? "good" : ""}`} style={{ fontSize: 10 }}>{l.downloaded ? T("已下载", "Saved", "Imehifadhiwa") : <><Download size={10} /> Wi-Fi</>}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 10.5 }} className="dim">{T("本月流量 38 / 200 MB · 省流模式已开", "Data this month 38 / 200 MB · low-data on", "Data 38 / 200 MB · hali ya data kidogo")}</div>
        </Phone>

        <Phone title={T("发音教练", "Pronunciation coach", "Kocha wa matamshi")} tab={2}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#6a7290" }}><Mic size={12} />{T("跟读 · 第三声 · 第 2 / 5 组", "Repeat · tone 3 · set 2 of 5", "Rudia · toni ya 3 · seti 2/5")}</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 42, fontWeight: 700, marginTop: 6, letterSpacing: ".06em" }}>我很好</div>
          <div style={{ color: "#6a7290", fontSize: 14 }}>wǒ hěn hǎo</div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>{[["wǒ", 92, "#1f9d6a"], ["hěn", 61, "#d8930f"], ["hǎo", 88, "#1f9d6a"]].map(([s, v, c]) => <div key={s as string} style={{ flex: 1, textAlign: "center", padding: 10, borderRadius: 14, background: "#fff", border: "1px solid #e4e6ee" }}><div style={{ fontSize: 15, fontWeight: 700 }}>{s}</div><div style={{ fontSize: 20, fontWeight: 800, color: c as string, fontFamily: "var(--serif)" }}>{v}</div></div>)}</div>
          <svg viewBox="0 0 260 90" width="100%" style={{ marginTop: 12 }}><rect x="0" y="6" width="260" height="70" rx="12" fill="#fff" stroke="#e4e6ee" /><path d="M14 40 C 44 30, 64 30, 94 40 S 134 72, 154 58 S 204 22, 246 32" fill="none" stroke={ACC} strokeWidth="2.5" /><path d="M14 45 C 44 40, 64 30, 94 35 S 134 68, 154 68 S 204 17, 246 30" fill="none" stroke="#d8930f" strokeWidth="2.5" strokeDasharray="4 4" /><text x="12" y="88" fontSize="9" fill="#6a7290">{T("蓝：老师 · 橙：你", "blue: teacher · orange: you", "bluu: mwalimu · machungwa: wewe")}</text></svg>
          <div style={{ marginTop: 8, padding: 12, borderRadius: 14, background: "#fff7e6", border: "1px solid #f3d9a0", fontSize: 11.5, lineHeight: 1.55 }}>{T("「很」第三声要先降再升：先低下去，再轻轻扬起。听老师示范 ▶", "For 很 the third tone dips then rises: go low first, then lift gently. Hear your teacher ▶", "Kwa 很 toni ya tatu hushuka kisha kupanda. Sikiliza mwalimu ▶")}</div>
          <div style={{ display: "grid", placeItems: "center", marginTop: 16 }}><div style={{ width: 64, height: 64, borderRadius: "50%", background: ACC, boxShadow: "0 0 0 12px rgba(31,58,168,.12), 0 14px 30px -12px rgba(31,58,168,.8)", display: "grid", placeItems: "center", color: "#fff" }}><Mic size={26} /></div></div>
        </Phone>

        <Phone title={T("图书馆", "Library", "Maktaba")} tab={3}>
          <div className="between"><b style={{ fontSize: 16 }}>{T("我的书架", "My shelf", "Rafu yangu")}</b><span style={{ fontSize: 10.5, color: "#6a7290" }}>{T("本周 84 分钟", "84 min this week", "Dakika 84 wiki hii")}</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 12 }}>
            {books.slice(0, 3).map((b) => <div key={b.id}><div style={{ aspectRatio: "3/4.2", borderRadius: 8, background: b.color, padding: 8, color: "#fff", fontSize: 9.5, fontFamily: "var(--serif)", display: "flex", alignItems: "flex-end", boxShadow: "4px 6px 14px -8px rgba(0,0,0,.6)" }}>{b.title}</div><div style={{ marginTop: 6 }}><Bar v={b.progress} tone="gold" /></div></div>)}
          </div>
          <div style={{ marginTop: 14, padding: 14, borderRadius: 16, background: "#fbfaf5", border: "1px solid #e4e6ee", fontFamily: "var(--serif)", lineHeight: 1.9, fontSize: 13 }}>
            我的家在拉各斯。<span style={{ background: "linear-gradient(transparent 55%, rgba(245,185,63,.55) 55%)" }}>每天早上，我和妈妈一起去市场</span>。市场里有很多人，<span style={{ borderBottom: "1.5px dotted " + ACC }}>热闹</span>极了。
            <div style={{ fontFamily: "var(--font)", fontSize: 10, marginTop: 8, color: "#6a7290", display: "flex", gap: 6, alignItems: "center" }}><Sparkles size={11} />{T("点词查义 · 老师音色朗读 · 划线同步笔记", "Tap a word · teacher-voice read-aloud · highlights sync", "Gusa neno · sauti ya mwalimu · mistari husawazishwa")}</div>
          </div>
          <div style={{ marginTop: 10, fontSize: 10.5, color: "#6a7290" }}>{T("GACEE 出版 · 第二届作文大赛作品集", "GACEE Publishing · 2nd competition anthology", "Uchapishaji wa GACEE")}</div>
        </Phone>

        <Phone title={T("知识星图与记忆", "Knowledge map & memory", "Ramani ya maarifa")} dark tab={4}>
          <div className="between"><b style={{ fontSize: 16, display: "flex", alignItems: "center", gap: 6 }}><Orbit size={16} />{T("知识星图", "Knowledge map", "Ramani ya maarifa")}</b><span className="badge acc" style={{ fontSize: 10 }}>TIDAR</span></div>
          <svg viewBox="0 0 260 190" width="100%" style={{ marginTop: 6 }}>
            {[[130, 95, 14, "#d4af5a"], [60, 55, 9, "#3ed598"], [200, 45, 8, "#3ed598"], [210, 135, 11, "#ff6b6b"], [70, 145, 7, "#f5b93f"], [140, 25, 6, "#a78bfa"], [40, 105, 5, "#5a6386"]].map(([x, y, r, c], i) => <g key={i}><line x1="130" y1="95" x2={x as number} y2={y as number} stroke="#6c8cff" strokeOpacity=".3" /><circle cx={x as number} cy={y as number} r={(r as number) + 6} fill={c as string} fillOpacity=".15" /><circle cx={x as number} cy={y as number} r={r as number} fill={c as string} /></g>)}
            <text x="196" y="165" fontSize="10" fill="#e9edf8">第三声 42%</text><text x="46" y="43" fontSize="10" fill="#e9edf8">你好 96%</text>
          </svg>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: 10 }}>{kps.slice(0, 4).map((k) => <span key={k.id} className="badge" style={{ fontSize: 10 }}>{k.han} {Math.round(k.mastery * 100)}%</span>)}</div>
          <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
            <div className="eyebrow" style={{ fontSize: 9 }}>{T("Agent 记住了", "Your agent remembers", "Wakala wako anakumbuka")}</div>
            <div style={{ fontSize: 11.5, marginTop: 6, lineHeight: 1.6 }}>· {T("你说过「想在 12 月前考 HSK 1」", "You said “I want to pass HSK 1 by December”", "Ulisema “Nataka kufaulu HSK 1 kabla ya Desemba”")}<br />· {T("第三声连续 3 周薄弱（12 次作答）", "Tone 3 weak for 3 weeks (12 attempts)", "Toni ya 3 dhaifu wiki 3")}<br />· {T("晚 8 点学习效果最好", "You learn best at 8 pm", "Unajifunza vizuri saa 2 usiku")}</div>
          </div>
        </Phone>

        <Phone title={T("直播课 · 二级降级", "Live class · level-2 degradation", "Somo la moja kwa moja · kiwango 2")} dark tab={1} net="3G">
          <div className="between"><span className="badge bad live" style={{ fontSize: 10 }}><span className="dot" />LIVE 22:14</span><Net level={2} /></div>
          <div style={{ marginTop: 12, borderRadius: 16, background: "#fff", color: "#111", height: 165, padding: 12, fontFamily: "var(--serif)", fontSize: 13, lineHeight: 1.7 }}>
            <div style={{ fontSize: 10, color: "#888", fontFamily: "var(--font)", display: "flex", gap: 6, alignItems: "center" }}><Radio size={11} />{T("板书 · 王老师", "Board · Wang Laoshi", "Ubao · Wang Laoshi")}</div>
            <b>第三声：214</b><br />低 → 更低 → 升<br />hǎo · hěn · wǒ<br /><span style={{ color: "#a83e3e" }}>你好 = ní hǎo（变调）</span>
          </div>
          <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 12, background: "rgba(245,185,63,.15)", border: "1px solid rgba(245,185,63,.4)", fontSize: 11, lineHeight: 1.5 }}>{T("网络变差：已关闭视频，保留老师声音、板书与字幕。掉线可在 15 分钟内回看录播。", "Network dropped: video off, teacher audio, board and captions kept. Replay within 15 minutes if you disconnect.", "Mtandao umeshuka: video imezimwa, sauti ya mwalimu, ubao na manukuu vimebaki.")}</div>
          <div style={{ marginTop: 12, fontSize: 11.5 }}><div className="dim" style={{ fontSize: 10 }}>{T("字幕", "Captions", "Manukuu")}</div>大家跟我读：wǒ hěn hǎo。<br /><span className="dim">{lang === "sw" ? "Kila mtu rudia baada yangu." : "Everyone repeat after me."}</span></div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>{[T("举手", "Raise hand", "Inua mkono"), T("文字提问", "Ask in text", "Uliza"), T("音频", "Audio", "Sauti")].map((x, i) => <span key={i} className="badge" style={{ fontSize: 10 }}>{x}</span>)}</div>
        </Phone>

        <Phone title={T("共享设备 · 多账号", "Shared device · multi-learner", "Kifaa cha pamoja")} tab={4}>
          <b style={{ fontSize: 16, display: "flex", alignItems: "center", gap: 6 }}><Users size={16} />{T("谁在学习？", "Who is learning?", "Nani anajifunza?")}</b>
          <div style={{ fontSize: 11, color: "#6a7290", marginTop: 4 }}>{T("这部手机上有 3 位学员，进度与离线数据分开保存。", "3 learners share this phone; progress and offline data stay separate.", "Wanafunzi 3 wanatumia simu hii; data hutunzwa tofauti.")}</div>
          {[["AO", "Amara", "HSK 1 · 12 " + T("天", "days", "siku"), true], ["CN", "Chidi", "HSK 1 · 4 " + T("天", "days", "siku"), false], ["FB", "Fatima", "YCT 1 · 21 " + T("天", "days", "siku"), false]].map(([i, n, s, on]) => (
            <div key={i as string} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, marginTop: 10, borderRadius: 16, background: "#fff", border: `1.5px solid ${on ? ACC : "#e4e6ee"}`, boxShadow: on ? "0 10px 24px -16px rgba(31,58,168,.6)" : undefined }}><span className="avatar" style={{ background: on ? ACC : "#c9cdd8" }}>{i as string}</span><div style={{ flex: 1 }}><b>{n as string}</b><div style={{ fontSize: 10.5, color: "#6a7290" }}>{s as string}</div></div>{on ? <span className="badge good" style={{ fontSize: 10 }}>{T("当前", "Current", "Sasa")}</span> : <span style={{ fontSize: 10, color: "#8a90a8" }}>PIN</span>}</div>
          ))}
          <div style={{ marginTop: 16, padding: 12, borderRadius: 14, background: "#eef1fb", fontSize: 11, display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.5 }}><ShieldCheck size={14} color={ACC} style={{ flex: "none", marginTop: 1 }} />{T("家长同意已记录 · 数据存放新加坡 · 可导出或删除", "Parental consent on file · data stored in Singapore · export or delete anytime", "Idhini ya wazazi · data ipo Singapore · hamisha au futa")}</div>
        </Phone>
      </div>

      <div className="app-feat">
        {feats.map(([I, h, b], i) => <div key={i} className={`panel in in-${i + 1}`}><I size={22} strokeWidth={1.75} /><div><div className="eyebrow">{h}</div><p className="mute" style={{ marginTop: 6, fontSize: 13.5 }}>{b}</p></div></div>)}
      </div>
    </div>
  );
}
