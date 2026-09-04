"use client";
import Link from "next/link";
import { useT, t3, useLang } from "@/lib/i18n";
import LangSwitch from "@/components/LangSwitch";
import { Tilt, Bar, Net } from "@/components/ui";
import { kps, lessons, books } from "@/lib/data";

/* Phone-frame showcase of the learner mobile app. Each frame renders a real screen composition. */
function Phone({ title, children, dark = false }: { title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Tilt max={10}>
      <div style={{ width: 300, borderRadius: 40, padding: 10, background: "#0b0e1c", boxShadow: "0 40px 80px -30px rgba(0,0,0,.8), inset 0 0 0 1px rgba(255,255,255,.08)" }}>
        <div style={{ borderRadius: 32, overflow: "hidden", background: dark ? "#0d1430" : "#f6f5f0", color: dark ? "#e9edf8" : "#111528", height: 600, position: "relative", fontSize: 12.5 }}>
          <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 90, height: 26, borderRadius: 20, background: "#0b0e1c" }} />
          <div style={{ padding: "44px 18px 18px" }}>{children}</div>
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 110, height: 4, borderRadius: 4, background: dark ? "rgba(255,255,255,.3)" : "rgba(0,0,0,.25)" }} />
        </div>
        <div className="dim small" style={{ textAlign: "center", padding: "10px 0 4px" }}>{title}</div>
      </div>
    </Tilt>
  );
}

export default function AppShowcase() {
  const t = useT(); const { lang } = useLang();
  const T = (zh: string, en: string, sw: string) => t(t3(zh, en, sw));
  const accent = "#1f3aa8";
  return (
    <div className="landing" style={{ padding: "24px 40px 60px" }}>
      <div className="between" style={{ marginBottom: 24 }}>
        <div><div className="eyebrow">{T("学员 App · 安卓优先", "Learner app · Android first", "App ya mwanafunzi · Android kwanza")}</div><h1 style={{ fontFamily: "var(--serif)", fontSize: 34, marginTop: 6 }}>{T("为低端手机、弱网与共享设备而设计", "Designed for low-end phones, weak networks and shared devices", "Imeundwa kwa simu za bei nafuu, mtandao dhaifu na vifaa vya pamoja")}</h1></div>
        <div className="row"><LangSwitch /><Link href="/" className="btn btn--sm">← {T("返回", "Back", "Rudi")}</Link></div>
      </div>
      <div className="row" style={{ gap: 14, marginBottom: 30 }}>
        {[T("≤150 MB 安装 · 2 GB 内存可跑", "≤150 MB install · runs on 2 GB RAM", "≤150 MB · inafanya kazi kwa RAM 2 GB"), T("内容包离线 · 夜间 Wi-Fi 下载", "Offline packs · night Wi-Fi downloads", "Vifurushi nje ya mtandao · upakuaji wa usiku"), T("一机多账号 · PIN 切换", "Multi-learner per phone · PIN switch", "Wanafunzi wengi kwa simu · PIN"), T("界面：中文 / English / Kiswahili", "UI: 中文 / English / Kiswahili", "Kiolesura: 中文 / English / Kiswahili"), T("省流模式 · 流量用量可见", "Low-data mode · usage visible", "Hali ya data kidogo · matumizi yanaonekana")].map((x, i) => <span key={i} className="badge acc">{x}</span>)}
      </div>
      <div style={{ display: "flex", gap: 28, overflowX: "auto", padding: "10px 4px 30px", perspective: 1400 }}>
        {/* Today */}
        <Phone title={T("今天", "Today", "Leo")}>
          <div className="between"><div><div className="dim" style={{ fontSize: 11 }}>{T("你好，Amara", "Hello, Amara", "Habari, Amara")}</div><b style={{ fontSize: 18, fontFamily: "var(--serif)" }}>{T("今天学 15 分钟", "15 minutes today", "Dakika 15 leo")}</b></div><span className="net" style={{ color: "#d8930f" }}><i style={{ height: 8 }} /><i style={{ height: 12 }} /><i style={{ height: 16, opacity: .25 }} />2G</span></div>
          <div style={{ marginTop: 14, borderRadius: 18, padding: 16, background: `linear-gradient(135deg, ${accent}, #4b3fb5)`, color: "#fff" }}>
            <div style={{ fontSize: 11, opacity: .8 }}>{T("连续学习", "Streak", "Mfululizo")}</div><div style={{ fontSize: 30, fontWeight: 800 }}>12 <span style={{ fontSize: 12, fontWeight: 600 }}>{T("天", "days", "siku")}</span></div>
            <div style={{ display: "flex", gap: 4, marginTop: 8 }}>{[1, 1, 1, 1, 1, 0, 0].map((d, i) => <span key={i} style={{ flex: 1, height: 6, borderRadius: 4, background: d ? "#fff" : "rgba(255,255,255,.3)" }} />)}</div>
          </div>
          <div style={{ marginTop: 14, fontWeight: 700 }}>{T("今日任务", "Today's tasks", "Kazi za leo")}</div>
          {[[T("复习 12 张卡", "Review 12 cards", "Rudia kadi 12"), "✓", "#1f9d6a"], [T("Unit 6 录播 · 已下载", "Unit 6 recording · downloaded", "Unit 6 rekodi · imepakuliwa"), "18'", accent], [T("第三声 5 组", "Tone 3 · 5 sets", "Toni ya 3 · seti 5"), "→", "#d8930f"]].map(([l, r, c], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", marginTop: 8, borderRadius: 12, background: "#fff", border: "1px solid #e4e6ee" }}><span>{l}</span><b style={{ color: c as string }}>{r}</b></div>
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, display: "flex", justifyContent: "space-around", padding: "0 12px", fontSize: 10, color: "#6a7290" }}>{[T("今天", "Today", "Leo"), T("课程", "Lessons", "Masomo"), T("练习", "Practice", "Mazoezi"), T("图书馆", "Library", "Maktaba"), T("我", "Me", "Mimi")].map((x, i) => <span key={i} style={{ color: i === 0 ? accent : undefined, fontWeight: i === 0 ? 800 : 500 }}>{x}</span>)}</div>
        </Phone>
        {/* Offline lesson */}
        <Phone title={T("离线课程与内容包", "Offline lesson & packs", "Somo nje ya mtandao")} dark>
          <div className="between"><b>{T("课程", "Lessons", "Masomo")}</b><span className="badge bad" style={{ fontSize: 10 }}>{T("离线", "Offline", "Nje ya mtandao")}</span></div>
          <div style={{ marginTop: 12, borderRadius: 16, overflow: "hidden", background: "#000", height: 150, position: "relative", display: "grid", placeItems: "center" }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "grid", placeItems: "center", color: "#000" }}>▶</div>
            <div style={{ position: "absolute", bottom: 8, left: 10, right: 10, fontSize: 10, background: "rgba(0,0,0,.6)", padding: "4px 8px", borderRadius: 6 }}>你好，我想点一杯茶。<br /><span style={{ opacity: .7 }}>{lang === "sw" ? "Habari, ningependa kuagiza chai." : "Hello, I'd like to order a tea."}</span></div>
            <div style={{ position: "absolute", top: 8, right: 8, fontSize: 10 }} className="badge good">240p · {T("音频优先", "audio first", "sauti kwanza")}</div>
          </div>
          {lessons.map((l) => (
            <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
              <div><div style={{ fontWeight: 700 }}>{l.unit} · {t(l.title)}</div><div className="dim" style={{ fontSize: 10 }}>{l.dur} {t({ zh: "分钟", en: "min", sw: "dakika" })} · {l.size}</div></div>
              <span className={`badge ${l.downloaded ? "good" : ""}`} style={{ fontSize: 10 }}>{l.downloaded ? T("已下载", "Saved", "Imehifadhiwa") : T("Wi-Fi 时下载", "On Wi-Fi", "Kwa Wi-Fi")}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 10 }} className="dim">{T("本月流量：38 MB / 200 MB · 省流模式已开", "Data this month: 38 MB / 200 MB · low-data on", "Data mwezi huu: 38 MB / 200 MB · hali ya data kidogo")}</div>
        </Phone>
        {/* Speak */}
        <Phone title={T("发音教练", "Pronunciation coach", "Kocha wa matamshi")}>
          <div className="dim" style={{ fontSize: 11 }}>{T("跟读 · 第三声", "Repeat · tone 3", "Rudia · toni ya 3")}</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 40, fontWeight: 700, marginTop: 4 }}>我很好</div>
          <div className="dim">wǒ hěn hǎo</div>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>{[["wǒ", 92, "#1f9d6a"], ["hěn", 61, "#d8930f"], ["hǎo", 88, "#1f9d6a"]].map(([s, v, c]) => <div key={s as string} style={{ flex: 1, textAlign: "center", padding: 10, borderRadius: 12, background: "#fff", border: "1px solid #e4e6ee" }}><div style={{ fontSize: 16, fontWeight: 700 }}>{s}</div><div style={{ fontSize: 18, fontWeight: 800, color: c as string }}>{v}</div></div>)}</div>
          <svg viewBox="0 0 260 90" width="100%" style={{ marginTop: 14 }}><path d="M10 40 C 40 30, 60 30, 90 40 S 130 75, 150 60 S 200 20, 250 30" fill="none" stroke={accent} strokeWidth="2.5" /><path d="M10 45 C 40 40, 60 30, 90 35 S 130 70, 150 70 S 200 15, 250 28" fill="none" stroke="#d8930f" strokeWidth="2.5" strokeDasharray="4 4" /><text x="10" y="86" fontSize="9" fill="#6a7290">{T("蓝：老师 · 橙：你", "blue: teacher · orange: you", "bluu: mwalimu · rangi ya machungwa: wewe")}</text></svg>
          <div style={{ marginTop: 8, padding: 12, borderRadius: 12, background: "#fff7e6", border: "1px solid #f3d9a0", fontSize: 11.5 }}>{T("「很」第三声要先降再升：先低下去，再轻轻扬起。听老师示范 ▶", "For 很 the third tone dips then rises: go low first, then lift gently. Hear your teacher ▶", "Kwa 很 toni ya tatu hushuka kisha kupanda: shuka kwanza, kisha inua taratibu. Sikiliza mwalimu ▶")}</div>
          <div style={{ display: "grid", placeItems: "center", marginTop: 18 }}><div style={{ width: 66, height: 66, borderRadius: "50%", background: accent, boxShadow: `0 0 0 12px rgba(31,58,168,.12)`, display: "grid", placeItems: "center", color: "#fff", fontSize: 22 }}>●</div></div>
        </Phone>
        {/* Library */}
        <Phone title={T("图书馆", "Library", "Maktaba")}>
          <div className="between"><b>{T("我的书架", "My shelf", "Rafu yangu")}</b><span className="dim" style={{ fontSize: 10 }}>{T("本周 84 分钟", "84 min this week", "Dakika 84 wiki hii")}</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 12 }}>
            {books.slice(0, 3).map((b) => <div key={b.id}><div style={{ aspectRatio: "3/4.2", borderRadius: 6, background: b.color, padding: 8, color: "#fff", fontSize: 10, fontFamily: "var(--serif)", display: "flex", alignItems: "flex-end" }}>{b.title}</div><Bar v={b.progress} /></div>)}
          </div>
          <div style={{ marginTop: 14, padding: 14, borderRadius: 14, background: "#fbfaf5", border: "1px solid #e4e6ee", fontFamily: "var(--serif)", lineHeight: 1.9, fontSize: 13 }}>
            我的家在拉各斯。<span style={{ background: "linear-gradient(transparent 55%, rgba(245,185,63,.55) 55%)" }}>每天早上，我和妈妈一起去市场</span>。市场里有很多人，<span style={{ borderBottom: "1.5px dotted " + accent }}>热闹</span>极了。
            <div style={{ fontFamily: "var(--font)", fontSize: 10, marginTop: 8, color: "#6a7290" }}>{T("点词查义 · 老师音色朗读 · 划线同步到笔记", "Tap a word · teacher-voice read-aloud · highlights sync to notes", "Gusa neno · sauti ya mwalimu · mistari husawazishwa")}</div>
          </div>
          <div style={{ marginTop: 12, fontSize: 11 }} className="dim">{T("来自 GACEE 出版 · 第二届作文大赛作品集", "From GACEE Publishing · 2nd competition anthology", "Kutoka Uchapishaji wa GACEE")}</div>
        </Phone>
        {/* Knowledge map */}
        <Phone title={T("知识星图与记忆", "Knowledge map & memory", "Ramani ya maarifa na kumbukumbu")} dark>
          <b>{T("知识星图", "Knowledge map", "Ramani ya maarifa")}</b>
          <svg viewBox="0 0 260 200" width="100%" style={{ marginTop: 8 }}>
            {[[130, 100, 14, "#d4af5a"], [60, 60, 9, "#3ed598"], [200, 50, 8, "#3ed598"], [210, 140, 11, "#ff6b6b"], [70, 150, 7, "#f5b93f"], [140, 30, 6, "#a78bfa"], [40, 110, 5, "#5a6386"]].map(([x, y, r, c], i) => <g key={i}><line x1="130" y1="100" x2={x as number} y2={y as number} stroke="#6c8cff" strokeOpacity=".3" /><circle cx={x as number} cy={y as number} r={r as number} fill={c as string} /></g>)}
            <text x="196" y="170" fontSize="10" fill="#e9edf8">第三声 42%</text><text x="46" y="48" fontSize="10" fill="#e9edf8">你好 96%</text>
          </svg>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: 10 }}>{kps.slice(0, 5).map((k) => <span key={k.id} className="badge" style={{ fontSize: 10 }}>{k.han} {Math.round(k.mastery * 100)}%</span>)}</div>
          <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
            <div className="eyebrow" style={{ fontSize: 9 }}>{T("Agent 记住了", "Your agent remembers", "Wakala wako anakumbuka")}</div>
            <div style={{ fontSize: 11.5, marginTop: 6, lineHeight: 1.6 }}>· {T("你说过「想在 12 月前考 HSK 1」", "You said “I want to pass HSK 1 by December”", "Ulisema “Nataka kufaulu HSK 1 kabla ya Desemba”")}<br />· {T("第三声连续 3 周薄弱（12 次作答）", "Tone 3 weak for 3 weeks (12 attempts)", "Toni ya 3 dhaifu wiki 3 (majaribio 12)")}<br />· {T("晚 8 点学习效果最好", "You learn best at 8 pm", "Unajifunza vizuri saa 2 usiku")}</div>
          </div>
          <div style={{ marginTop: 10, fontSize: 10 }} className="dim">{T("记忆只来自真实作答与你的原话，可导出、可删除", "Memory comes only from real attempts and your own words; export or delete anytime", "Kumbukumbu hutoka kwenye majaribio halisi na maneno yako; hamisha au futa wakati wowote")}</div>
        </Phone>
        {/* Live degraded */}
        <Phone title={T("直播课 · 二级降级", "Live class · level-2 degradation", "Somo la moja kwa moja · kiwango 2")} dark>
          <div className="between"><span className="badge bad live" style={{ fontSize: 10 }}><span className="dot" />LIVE</span><Net level={2} /></div>
          <div style={{ marginTop: 12, borderRadius: 14, background: "#fff", color: "#111", height: 170, padding: 12, fontFamily: "var(--serif)", fontSize: 13, lineHeight: 1.7 }}>
            <div style={{ fontSize: 10, color: "#888", fontFamily: "var(--font)" }}>{T("板书 · 王老师", "Board · Wang Laoshi", "Ubao · Wang Laoshi")}</div>
            <b>第三声：214</b><br />低 → 更低 → 升<br />hǎo · hěn · wǒ<br /><span style={{ color: "#a83e3e" }}>你好 = ní hǎo（变调）</span>
          </div>
          <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 10, background: "rgba(245,185,63,.15)", border: "1px solid rgba(245,185,63,.4)", fontSize: 11 }}>{T("网络变差：已关闭视频，保留老师声音、板书与字幕。掉线后可在 15 分钟内回看录播。", "Network dropped: video off, teacher audio, board and captions kept. Recording available within 15 minutes if you disconnect.", "Mtandao umeshuka: video imezimwa, sauti ya mwalimu, ubao na manukuu vimebaki. Rekodi inapatikana ndani ya dakika 15.")}</div>
          <div style={{ marginTop: 12, fontSize: 11 }}><div className="dim" style={{ fontSize: 10 }}>{T("字幕", "Captions", "Manukuu")}</div>大家跟我读：wǒ hěn hǎo。<br /><span className="dim">{lang === "sw" ? "Kila mtu rudia baada yangu." : "Everyone repeat after me."}</span></div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>{[T("举手", "Raise hand", "Inua mkono"), T("文字提问", "Ask in text", "Uliza kwa maandishi"), T("音频", "Audio", "Sauti")].map((x, i) => <span key={i} className="badge" style={{ fontSize: 10 }}>{x}</span>)}</div>
        </Phone>
        {/* Multi-account */}
        <Phone title={T("共享设备 · 多账号", "Shared device · multi-learner", "Kifaa cha pamoja · wanafunzi wengi")}>
          <b>{T("谁在学习？", "Who is learning?", "Nani anajifunza?")}</b>
          <div className="dim" style={{ fontSize: 11 }}>{T("这部手机上有 3 位学员。每人的进度与离线数据分开保存。", "3 learners share this phone. Progress and offline data stay separate.", "Wanafunzi 3 wanatumia simu hii. Maendeleo na data hutunzwa tofauti.")}</div>
          {[["AO", "Amara", "HSK 1 · 12 " + T("天", "days", "siku"), true], ["CN", "Chidi", "HSK 1 · 4 " + T("天", "days", "siku"), false], ["FB", "Fatima", "YCT 1 · 21 " + T("天", "days", "siku"), false]].map(([i, n, s, on]) => (
            <div key={i as string} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, marginTop: 10, borderRadius: 14, background: "#fff", border: `1px solid ${on ? accent : "#e4e6ee"}` }}><span className="avatar" style={{ background: on ? accent : "#c9cdd8" }}>{i}</span><div style={{ flex: 1 }}><b>{n}</b><div className="dim" style={{ fontSize: 10 }}>{s}</div></div>{on ? <span className="badge good" style={{ fontSize: 10 }}>{T("当前", "Current", "Sasa")}</span> : <span style={{ fontSize: 10 }} className="dim">PIN</span>}</div>
          ))}
          <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: "#eef1fb", fontSize: 11 }}>{T("家长同意已记录 · 数据存放新加坡 · 可导出或删除", "Parental consent on file · data stored in Singapore · export or delete anytime", "Idhini ya wazazi imehifadhiwa · data ipo Singapore · hamisha au futa")}</div>
        </Phone>
      </div>
      <div className="grid c4" style={{ marginTop: 10 }}>
        {[[T("离线优先", "Offline first", "Nje ya mtandao kwanza"), T("学、练、复习、模拟考、阅读都在本地完成；联网后增量同步，服务器对成绩有最终裁量。", "Lessons, practice, review, mock exams and reading all work locally; incremental sync on reconnect, server has final say on scores.", "Masomo, mazoezi, marudio, mitihani na kusoma hufanyika ndani; usawazishaji baada ya kuunganishwa.")], [T("省流与省电", "Low data, low power", "Data kidogo, nguvu kidogo"), T("240p 与纯音频档、夜间 Wi-Fi 下载、图片压缩、分级缓存清理。", "240p and audio-only tiers, night Wi-Fi downloads, compressed images, tiered cache cleanup.", "Viwango vya 240p na sauti pekee, upakuaji wa usiku, picha zilizobanwa.")], [T("母语脚手架", "First-language scaffolding", "Msingi wa lugha ya kwanza"), T("界面、讲解与答疑支持中文、英语、斯瓦希里语；逐步过渡到中文。", "Interface, explanations and Q&A in Chinese, English and Kiswahili, moving gradually to Chinese.", "Kiolesura, maelezo na maswali kwa Kichina, Kiingereza na Kiswahili.")], [T("合规在底层", "Compliance built in", "Uzingatiaji msingini"), T("家长同意、学校数据隔离、新加坡驻留、导出与删除。", "Parental consent, school-level isolation, Singapore residency, export and deletion.", "Idhini ya wazazi, utengano wa shule, uhifadhi Singapore, kuhamisha na kufuta.")]].map(([h, b], i) => <div key={i} className={`panel in in-${i + 1}`}><div className="eyebrow">{h}</div><p className="mute" style={{ marginTop: 8 }}>{b}</p></div>)}
      </div>
    </div>
  );
}
