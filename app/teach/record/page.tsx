"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar } from "@/components/ui";
import Waveform from "@/components/Waveform";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Record() {
  const t = useT();
  return (
    <Shell role={teacherRole} nav={teacherNav} title={t3("录课与音色", "Recording & voice", "Kurekodi na sauti")} sub={t3("一次录制 → 多码率 HLS → 多 CDN → 离线内容包；老师音色复刻（已授权）用于旁白、示范与朗读", "Record once → multi-bitrate HLS → multi-CDN → offline packs; cloned teacher voice (authorised) for narration, demos and read-aloud", "Rekodi mara moja → HLS → CDN → vifurushi; sauti ya mwalimu iliyonakiliwa")} net={3}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}>
          <Head title={t3("Unit 7 · 时间与日期 · 转码流水线", "Unit 7 · Time and dates · transcoding pipeline", "Unit 7 · Muda na tarehe · mchakato")} right={<Badge tone="acc" live>{t(t3("转码中", "Transcoding", "Inabadilishwa"))}</Badge>} />
          <ol className="tl"><li className="done">{t(t3("上传源片 1.2 GB → 新加坡 OSS", "Source 1.2 GB uploaded → Singapore OSS", "Chanzo 1.2 GB → OSS Singapore"))}</li><li className="done">{t(t3("自动字幕：中文 ✓ 英文 ✓ 斯瓦希里语 ✓（待老师校对）", "Auto captions: Chinese ✓ English ✓ Kiswahili ✓ (teacher to proofread)", "Manukuu: Kichina ✓ Kiingereza ✓ Kiswahili ✓"))}</li><li>{t(t3("多码率：720p ✓ 480p ✓ 360p ✓ 240p … 纯音频 …", "Renditions: 720p ✓ 480p ✓ 360p ✓ 240p … audio-only …", "Viwango: 720p ✓ 480p ✓ 360p ✓ 240p … sauti tu …"))}</li><li className="todo">{t(t3("切片加密 → 多 CDN 预热（拉各斯、阿布贾、蒙巴萨）", "Segment encryption → multi-CDN warm-up (Lagos, Abuja, Mombasa)", "Usimbaji → CDN (Lagos, Abuja, Mombasa)"))}</li><li className="todo">{t(t3("打包离线内容包 40 MB → 夜间推送", "Offline pack 40 MB → night push", "Kifurushi 40 MB → usiku"))}</li></ol>
          <div className="grid c3" style={{ marginTop: 14 }}>{[["720p", "310 MB"], ["240p", "38 MB"], [t(t3("纯音频", "Audio", "Sauti")), "9 MB"]].map(([q, s]) => <div key={q} className="panel"><b>{q}</b><div className="small mute">{s}</div><Bar v={q === "720p" ? 1 : q === "240p" ? .6 : .2} /></div>)}</div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2" gold><Head title={t3("我的音色 · CosyVoice", "My voice · CosyVoice", "Sauti yangu · CosyVoice")} right={<Badge tone="good">{t(t3("已授权 · 可撤回", "Authorised · revocable", "Imeidhinishwa · inaweza kubatilishwa"))}</Badge>} /><Waveform height={70} color="#d4af5a" /><p className="small mute" style={{ marginTop: 8 }}>{t(t3("用于：录播旁白、发音示范、图书馆朗读、纠音反馈。不用于任何其它目的；授权书存档。", "Used for: narration, pronunciation demos, library read-aloud, correction feedback. Nothing else; the authorisation is on file.", "Hutumika kwa: masimulizi, mifano ya matamshi, kusoma maktaba, maoni. Hakuna kingine."))}</p><div className="row" style={{ marginTop: 10 }}><button className="btn btn--sm">▶ {t(t3("试听「你好，我是王老师」", "Preview “Hello, I am Wang Laoshi”", "Sikiliza"))}</button></div></Panel>
          <Panel className="in in-3"><Head title={t3("字幕校对", "Caption proofreading", "Usahihishaji wa manukuu")} /><div className="small" style={{ fontFamily: "var(--serif)", fontSize: 15 }}>今天我们学习<span style={{ background: "rgba(245,185,63,.35)" }}>时间</span>的说法。</div><div className="small mute" style={{ marginTop: 4 }}>Today we learn how to say the time. / Leo tunajifunza jinsi ya kusema saa.</div><div className="row" style={{ marginTop: 10 }}><button className="btn btn--sm btn--good">✓ {t(t3("确认 3 语", "Confirm 3 languages", "Thibitisha lugha 3"))}</button></div></Panel>
        </div>
      </div>
    </Shell>
  );
}
