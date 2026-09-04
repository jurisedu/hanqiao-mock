"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Stat, Ring } from "@/components/ui";
import { schoolRole, schoolNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Devices() {
  const t = useT();
  return (
    <Shell role={schoolRole} nav={schoolNav} title={t3("设备与网络", "Devices & network", "Vifaa na mtandao")} sub={t3("22 台共享安卓 · 学校局域网缓存点 · 4G 为主 · 停电预报接入", "22 shared Android devices · school LAN cache point · mostly 4G · power-cut forecast connected", "Vifaa 22 vya Android · hifadhi ya shule · 4G")} net={2}>
      <div className="grid c4">
        <Panel className="in in-1"><Stat value={22} label={t3("共享设备（2 GB 内存为主）", "shared devices (mostly 2 GB RAM)", "vifaa vya pamoja")} /></Panel>
        <Panel className="in in-2"><Stat value={19} label={t3("今日在线设备", "devices online today", "vifaa mtandaoni leo")} /></Panel>
        <Panel className="in in-3"><Stat value={96} suffix="%" label={t3("内容包命中缓存点", "packs served from cache point", "vifurushi kutoka hifadhi")} /></Panel>
        <Panel className="in in-4"><Stat value={2} label={t3("需清理存储的设备", "devices needing storage cleanup", "vifaa vinavyohitaji kusafishwa")} /></Panel>
        <Panel className="span2 in in-2"><Head title={t3("设备", "Devices", "Vifaa")} /><div className="tbl"><table><thead><tr><th>#</th><th>{t(t3("型号", "Model", "Aina"))}</th><th>{t(t3("学员", "Learners", "Wanafunzi"))}</th><th>{t(t3("存储", "Storage", "Hifadhi"))}</th><th>{t(t3("内容包", "Packs", "Vifurushi"))}</th><th>{t(t3("状态", "Status", "Hali"))}</th></tr></thead><tbody>{[["07", "Tecno Spark 8 · 2 GB", 3, .62, "U1–U6", "good"], ["08", "Itel A60 · 2 GB", 3, .91, "U1–U6", "warn"], ["09", "Samsung A03 · 3 GB", 2, .48, "U1–U6", "good"], ["10", "Tecno Pop 7 · 2 GB", 3, .88, "U1–U5", "warn"], ["11", "Nokia C21 · 2 GB", 2, .55, "U1–U6", "good"]].map(([n, m, l, s, p, st]) => <tr key={n as string}><td className="mono">{n as string}</td><td>{m as string}</td><td className="num">{l as number}</td><td><Bar v={s as number} tone={(s as number) > .85 ? "warn" : "good"} /></td><td className="small">{p as string}</td><td><Badge tone={st as never}>{st === "good" ? "OK" : t(t3("清理缓存", "Clean cache", "Safisha"))}</Badge></td></tr>)}</tbody></table></div></Panel>
        <Panel className="span2 in in-3"><Head title={t3("学校缓存点", "School cache point", "Hifadhi ya shule")} /><div className="row" style={{ gap: 20 }}><Ring v={0.96} size={110} color="var(--good)" /><div className="small"><p>{t(t3("教务室一台迷你主机 + 路由器，夜间 02:00 从 CDN 拉取内容包，白天设备走局域网取包，不耗流量。", "A mini PC and router in the office pull packs from the CDN at 02:00; during the day devices fetch over the LAN, using no mobile data.", "Kompyuta ndogo na kipanga njia huvuta vifurushi saa 8 usiku; mchana vifaa huchukua kwa LAN."))}</p><div className="row" style={{ marginTop: 8 }}><Badge tone="good">{t(t3("在线", "Online", "Mtandaoni"))}</Badge><Badge>12 {t(t3("包", "packs", "vifurushi"))} · 480 MB</Badge></div></div></div></Panel>
        <Panel className="span2 in in-4"><Head title={t3("停电预报 · 本周", "Power-cut forecast · this week", "Utabiri wa umeme · wiki hii")} /><ul className="list small">{[[t3("周三", "Wed", "Jumatano"), "19:00–21:00", t3("与直播重叠 → 老师已改 16:00", "overlaps live class → moved to 16:00", "inaingiliana → imehamishwa 16:00"), "warn"], [t3("周五", "Fri", "Ijumaa"), "20:00–22:00", t3("复习提醒改到 17:30", "review reminder moved to 17:30", "kikumbusho 17:30"), ""], [t3("周日", "Sun", "Jumapili"), "—", t3("无", "None", "Hakuna"), "good"]].map(([d, h, n, s]) => <li key={t(d as never)}><Badge tone={s as never}>{t(d as never)}</Badge><div className="t"><b className="mono">{h as string}</b><span>{t(n as never)}</span></div></li>)}</ul></Panel>
        <Panel className="span2 in in-5"><Head title={t3("网络 · 24 小时", "Network · 24 h", "Mtandao · saa 24")} /><div className="grid c3">{[["4G", .82, "good"], ["3G", .61, "warn"], [t(t3("Wi-Fi（教务室）", "Wi-Fi (office)", "Wi-Fi (ofisi)")), .93, "good"]].map(([n, v, s]) => <div key={n as string} style={{ textAlign: "center" }}><div className="small mute">{n as string}</div><Ring v={v as number} size={84} stroke={8} color={s === "good" ? "var(--good)" : "var(--warn)"} /></div>)}</div></Panel>
      </div>
    </Shell>
  );
}
