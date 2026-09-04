"use client";
import { use, useState } from "react";
import Link from "next/link";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { books } from "@/lib/data";

export default function Reader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useT();
  const b = books.find((x) => x.id === id) ?? books[0];
  const [word, setWord] = useState<string | null>("热闹");
  const [dark, setDark] = useState(false);
  const [size, setSize] = useState(18);
  return (
    <Shell role={learnerRole} nav={learnerNav} title={b.title} sub={t3("第 4 章 · 我的家在拉各斯 · 作者：Amara Okafor（Great Heights School）", "Chapter 4 · My home is in Lagos · by Amara Okafor (Great Heights School)", "Sura ya 4 · Nyumba yangu iko Lagos · na Amara Okafor")} net={0}>
      <div className="reader">
        <div>
          <div className="between" style={{ marginBottom: 12 }}>
            <Link href="/learn/library" className="small" style={{ color: "var(--accent)" }}>← {t(t3("书架", "Shelf", "Rafu"))}</Link>
            <div className="row"><button className="btn btn--sm" onClick={() => setSize(Math.max(15, size - 1))}>A−</button><button className="btn btn--sm" onClick={() => setSize(Math.min(24, size + 1))}>A+</button><button className="btn btn--sm" onClick={() => setDark(!dark)}>{dark ? "☀" : "☾"}</button><button className="btn btn--sm btn--primary">▶ {t(t3("王老师朗读", "Wang Laoshi reads", "Wang Laoshi anasoma"))}</button></div>
          </div>
          <div className="page in" style={{ fontSize: size, background: dark ? "#1b1a17" : undefined, color: dark ? "#e8e4d8" : undefined }}>
            <h2>第四章 · 我的家在拉各斯</h2>
            <p>我的家在拉各斯。<span className="hl" onClick={() => setWord("市场")}>每天早上，我和妈妈一起去市场</span>。市场里有很多人，<span className="vocab" onClick={() => setWord("热闹")}>热闹</span>极了。</p>
            <p>妈妈卖<span className="vocab" onClick={() => setWord("水果")}>水果</span>。我帮她说中文：「你好！一个芒果十块。」有的客人是中国人，他们听到我说中文，都很<span className="hl b" onClick={() => setWord("高兴")}>高兴<span className="note-mark">1</span></span>。</p>
            <p>晚上没有电的时候，我在手机上复习汉字。奶奶问我：「你为什么学中文？」我说：「因为我想用中文，把我们的故事讲给世界听。」</p>
            <div className="pageno">42 / 212 · {t(t3("离线可读 · 已缓存整本", "readable offline · whole book cached", "husomeka nje ya mtandao · kitabu kizima kimehifadhiwa"))}</div>
          </div>
          <div style={{ marginTop: 12 }}><Bar v={0.42} tone="gold" /><div className="between small mute" style={{ marginTop: 6 }}><span>{t(t3("本章 42% · 预计剩 6 分钟", "Chapter 42% · about 6 min left", "Sura 42% · dakika 6 zimebaki"))}</span><span>{t(t3("上次读到：09-04 20:12", "Last read: 09-04 20:12", "Mara ya mwisho: 09-04 20:12"))}</span></div></div>
        </div>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2" glow>
            <div className="eyebrow">{t(t3("生词 · 点读", "Word · tap to define", "Neno · gusa"))}</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 700, marginTop: 6 }}>{word ?? "—"}</div>
            {word === "热闹" && <><div className="mute">rènao · adj. · HSK 3</div><p className="small" style={{ marginTop: 8 }}>{t(t3("人多、有活力、很响亮的样子。", "Lively and bustling, full of people and noise.", "Yenye shughuli nyingi, watu na kelele."))}</p><p className="small" style={{ fontFamily: "var(--serif)", marginTop: 6 }}>市场里很热闹。</p></>}
            {word === "市场" && <><div className="mute">shìchǎng · n. · HSK 2</div><p className="small" style={{ marginTop: 8 }}>{t(t3("买卖东西的地方。", "A place where things are bought and sold; a market.", "Mahali pa kununua na kuuza; soko."))}</p></>}
            {word === "水果" && <><div className="mute">shuǐguǒ · n. · HSK 1</div><p className="small" style={{ marginTop: 8 }}>{t(t3("水果。", "Fruit.", "Matunda."))}</p></>}
            {word === "高兴" && <><div className="mute">gāoxìng · adj. · HSK 1</div><p className="small" style={{ marginTop: 8 }}>{t(t3("开心、快乐。", "Happy, glad.", "Furaha."))}</p></>}
            <div className="row" style={{ marginTop: 12 }}><button className="btn btn--sm">▶ {t(t3("发音", "Pronounce", "Matamshi"))}</button><button className="btn btn--sm btn--gold">+ {t(t3("加入复习卡", "Add to review cards", "Ongeza kwenye kadi"))}</button></div>
            <div className="small mute" style={{ marginTop: 10 }}>{t(t3("释义来自课程词典与 HSK 词表，标注等级。超出等级的词会提示「进阶词」。", "Definitions come from the course dictionary and HSK lists, with level tags. Words above your level are marked “advanced”.", "Maana hutoka kwenye kamusi ya kozi na orodha za HSK. Maneno ya juu huwekwa alama."))}</div>
          </Panel>
          <Panel className="in in-3"><Head title={t3("笔记 · 1", "Notes · 1", "Maelezo · 1")} /><div className="small" style={{ padding: 10, borderRadius: 10, background: "var(--panel-2)" }}><b>高兴</b> — {t(t3("我也想让家人为我高兴。", "I also want my family to be happy for me.", "Nataka familia yangu inifurahie."))}<div className="dim" style={{ marginTop: 4 }}>{t(t3("09-04 · 同步到情节记忆", "09-04 · synced to episodic memory", "09-04 · imesawazishwa"))}</div></div><button className="btn btn--sm" style={{ marginTop: 10 }}>+ {t(t3("写笔记", "Add note", "Andika maelezo"))}</button></Panel>
          <Panel className="in in-4"><Head title={t3("共读 · 本班", "Shared reading · class", "Usomaji wa pamoja · darasa")} /><ul className="list small"><li><span className="avatar" style={{ width: 26, height: 26, fontSize: 9 }}>CN</span><div className="t"><b>Chidi</b><span>{t(t3("在「热闹」处留言：我们的市场也是！", "commented at 热闹: our market too!", "alitoa maoni kwenye 热闹: soko letu pia!"))}</span></div></li><li><span className="avatar gold" style={{ width: 26, height: 26, fontSize: 9 }}>王</span><div className="t"><b>{t(t3("王老师", "Wang Laoshi", "Wang Laoshi"))}</b><span>{t(t3("批注：注意「极了」放在形容词后面。", "note: 极了 goes after the adjective.", "maelezo: 极了 huja baada ya kivumishi."))}</span></div></li></ul><div className="row" style={{ marginTop: 8 }}><Badge tone="gold">{t(t3("本书由出版社授权 · 电子版", "Licensed by the publisher · digital edition", "Imeidhinishwa na mchapishaji"))}</Badge></div></Panel>
        </div>
      </div>
    </Shell>
  );
}
