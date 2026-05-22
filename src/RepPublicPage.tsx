import React from "react";
import type {
  ThemeConfig, Block,
  HeroBlock, BioBlock, ServicesBlock, TestimonialsBlock, ContactBlock,
  PhilosophyBlock, ProcessBlock, ProgramsBlock, MarketBlock,
  GalleryBlock, GalleryPhoto, YoutubeBlock, YoutubeVideoItem, SocialLinks,
  FeatureBlock, FeatureCta, MapBlock,
  LogoShape, LogoSize,
} from "./types";
import { ytVideoId } from "./types";

type BlockType = Block["type"];

export function RepPublicPage({ theme: t, blocks }: { theme: ThemeConfig; blocks: Block[] }) {
  const enabled = blocks.filter(b => b.enabled);
  const hero         = enabled.find(b => b.type === "hero")         as HeroBlock | undefined;
  const bio          = enabled.find(b => b.type === "bio")          as BioBlock | undefined;
  const services     = enabled.find(b => b.type === "services")     as ServicesBlock | undefined;
  const testimonials = enabled.find(b => b.type === "testimonials") as TestimonialsBlock | undefined;
  const contact      = enabled.find(b => b.type === "contact")      as ContactBlock | undefined;
  const philosophy   = enabled.find(b => b.type === "philosophy")   as PhilosophyBlock | undefined;
  const processBlock = enabled.find(b => b.type === "process")      as ProcessBlock | undefined;
  const programs     = enabled.find(b => b.type === "programs")     as ProgramsBlock | undefined;
  const market       = enabled.find(b => b.type === "market")       as MarketBlock | undefined;
  const gallery      = enabled.find(b => b.type === "gallery")      as GalleryBlock | undefined;
  const youtube      = enabled.find(b => b.type === "youtube")      as YoutubeBlock | undefined;
  const feature      = enabled.find(b => b.type === "feature")      as FeatureBlock | undefined;
  const mapBlock     = enabled.find(b => b.type === "map")          as MapBlock | undefined;

  const blockOrder = blocks.map(b => b.type);
  function pos(type: BlockType) { return blockOrder.indexOf(type); }
  const orderedSections = [
    { key: "bio",          node: bio,          pos: pos("bio") },
    { key: "philosophy",   node: philosophy,   pos: pos("philosophy") },
    { key: "process",      node: processBlock, pos: pos("process") },
    { key: "programs",     node: programs,     pos: pos("programs") },
    { key: "market",       node: market,       pos: pos("market") },
    { key: "services",     node: services,     pos: pos("services") },
    { key: "testimonials", node: testimonials, pos: pos("testimonials") },
    { key: "feature",      node: feature,      pos: pos("feature") },
    { key: "gallery",      node: gallery,      pos: pos("gallery") },
    { key: "youtube",      node: youtube,      pos: pos("youtube") },
    { key: "map",          node: mapBlock,     pos: pos("map") },
  ].filter(s => s.node).sort((a, b) => a.pos - b.pos);

  const [isMobile, setIsMobile] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setIsMobile((entry?.contentRect.width ?? 700) < 700);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const mono = t.headingFont.includes("Barlow") ? "'DM Mono', monospace" : "monospace";

  const eyebrowStyle: React.CSSProperties = {
    fontFamily: mono,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: t.mutedText,
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: t.headingFont,
    fontSize: "clamp(2rem, 4vw, 3.5rem)",
    fontWeight: 900,
    color: t.bodyText,
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    lineHeight: 0.95,
    marginBottom: "32px",
  };

  return (
    <div ref={rootRef} style={{ background: t.pageBg, fontFamily: t.bodyFont, color: t.bodyText, minHeight: "100vh" }}>
      {t.fontImport && <style>{`@import url('${t.fontImport}');`}</style>}
      <style>{`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } body { margin: 0; } a { text-decoration: none; } img { max-width: 100%; }`}</style>

      {/* Nav */}
      <div style={{ background: t.headerBg, borderBottom: "1px solid rgba(255,255,255,0.08)", padding: isMobile ? "0 16px" : "0 40px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div>
          <div style={{ fontFamily: t.headingFont, fontSize: "22px", letterSpacing: "0.06em", textTransform: "uppercase", color: t.headerText, lineHeight: 1 }}>
            {hero?.headline || ""}
          </div>
          <div style={{ fontFamily: mono, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: t.accent, marginTop: "2px" }}>
            {hero?.navSubtitle || "Independent Fundraising Rep"}
          </div>
        </div>
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {!isMobile && contact?.schedulingLink && (
            <a href={contact.schedulingLink} target="_blank" rel="noopener noreferrer"
              style={{ background: t.accent, color: t.accentText, padding: "8px 18px", borderRadius: "4px", fontFamily: t.headingFont, fontSize: "14px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap" }}>
              {hero?.navCtaLabel || "Schedule a Call"}
            </a>
          )}
        </div>
      </div>

      {/* Hero */}
      {hero && (
        <div style={{ background: t.heroBg, padding: isMobile ? "48px 16px" : "96px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "28px" : "64px", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: t.accent, marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ display: "inline-block", width: "28px", height: "1px", background: t.accent, opacity: 0.7 }} />
                {hero.heroEyebrow || "Independent Fundraising Professional"}
              </div>
              <div style={{ fontFamily: t.headingFont, fontSize: "clamp(3rem, 6vw, 6rem)", fontWeight: 900, color: t.heroText, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.0, marginBottom: "20px", overflowWrap: "break-word", wordBreak: "break-word" }}>
                {hero.headline || "Your Headline"}
              </div>
              <div style={{ fontSize: "16px", color: t.heroMuted, lineHeight: 1.75, maxWidth: "420px", marginBottom: "32px", fontStyle: "italic" }}>
                {hero.tagline}
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {hero.ctaText && hero.ctaLink && (
                  <a href={hero.ctaLink} target="_blank" rel="noopener noreferrer"
                    style={{ background: t.accent, color: t.accentText, padding: "14px 28px", borderRadius: "4px", fontFamily: t.headingFont, fontSize: "16px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
                    {hero.ctaText}
                  </a>
                )}
                {hero.ctaGhostText && (
                  <span style={{ border: "1px solid rgba(255,255,255,0.28)", color: t.heroText, padding: "13px 28px", borderRadius: "4px", fontFamily: t.headingFont, fontSize: "16px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "default", display: "inline-block" }}>
                    {hero.ctaGhostText}
                  </span>
                )}
              </div>
            </div>
            {hero.heroStats && hero.heroStats.length > 0 && (
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "32px" }}>
                <div style={{ fontFamily: mono, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  // By the numbers
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  {hero.heroStats.map((stat, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: t.headingFont, fontSize: "2.8rem", fontWeight: 900, color: i % 2 === 0 ? t.accent : t.heroText, lineHeight: 1 }}>{stat.value}</div>
                      <div style={{ fontFamily: mono, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.38)", marginTop: "4px" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mid sections — ordered by block list */}
      {orderedSections.map(({ key, node }) => {
        if (key === "philosophy") {
          const b = node as PhilosophyBlock;
          return (
            <div key={key} style={{ background: t.sectionAlt, padding: isMobile ? "48px 16px" : "80px 40px" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div style={{ ...eyebrowStyle, color: t.accent }}>
                  <span style={{ display: "inline-block", width: "28px", height: "2px", background: t.accent }} />
                  {b.eyebrow || "Our Approach"}
                </div>
                <div style={{ ...sectionTitleStyle }}>{b.title}</div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "28px" : "56px" }}>
                  <div>
                    {b.pullQuote && (
                      <div style={{ fontFamily: t.bodyFont, fontSize: "1.15rem", fontStyle: "italic", color: t.bodyText, lineHeight: 1.65, padding: "22px 28px", borderLeft: `4px solid ${t.accent}`, background: `${t.accent}10`, borderRadius: "0 10px 10px 0", marginBottom: "24px" }}>
                        "{b.pullQuote}"
                      </div>
                    )}
                    {b.bodyText && (
                      <div style={{ fontSize: "15px", color: t.mutedText, lineHeight: 1.85 }}>
                        {b.bodyText.split("\n\n").map((p, i) => <p key={i} style={{ marginBottom: "14px" }}>{p}</p>)}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {b.values.map((val, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 18px", background: t.bodyBg, borderRadius: "10px", border: `1px solid ${t.cardBorder}` }}>
                        <span style={{ fontSize: "1.3rem", flexShrink: 0, marginTop: "2px" }}>{val.icon}</span>
                        <div>
                          <div style={{ fontFamily: t.headingFont, fontSize: "1rem", fontWeight: 700, color: t.bodyText, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>{val.title}</div>
                          <div style={{ fontSize: "14px", color: t.mutedText, lineHeight: 1.65 }}>{val.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (key === "process") {
          const b = node as ProcessBlock;
          return (
            <div key={key} style={{ background: t.heroBg, padding: isMobile ? "48px 16px" : "80px 40px" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div style={{ ...eyebrowStyle, color: t.accent }}>
                  <span style={{ display: "inline-block", width: "28px", height: "2px", background: t.accent }} />
                  {b.eyebrow || "The Process"}
                </div>
                <div style={{ ...sectionTitleStyle, color: t.heroText }}>{b.title}</div>
                {b.subtitle && <div style={{ fontSize: "15px", color: t.heroMuted, lineHeight: 1.75, marginBottom: "36px" }}>{b.subtitle}</div>}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${b.steps.length}, 1fr)`, gap: isMobile ? "10px" : "2px" }}>
                  {b.steps.map((step, idx) => (
                    <div key={idx} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "28px 22px", position: "relative", borderRadius: isMobile ? "10px" : idx === 0 ? "10px 0 0 10px" : idx === b.steps.length - 1 ? "0 10px 10px 0" : "0" }}>
                      <div style={{ fontFamily: t.headingFont, fontSize: "3rem", fontWeight: 900, color: "rgba(255,255,255,0.05)", lineHeight: 1, marginBottom: "12px" }}>0{idx + 1}</div>
                      <div style={{ fontFamily: t.headingFont, fontSize: "1.1rem", fontWeight: 800, color: t.heroText, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>{step.title}</div>
                      <div style={{ fontSize: "14px", color: t.heroMuted, lineHeight: 1.7 }}>{step.text}</div>
                      {!isMobile && idx < b.steps.length - 1 && (
                        <div style={{ position: "absolute", right: "-14px", top: "50%", transform: "translateY(-50%)", zIndex: 2, width: "26px", height: "26px", background: t.accent, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: t.accentText, fontWeight: 700 }}>→</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (key === "programs") {
          const b = node as ProgramsBlock;
          return (
            <div key={key} style={{ background: t.bodyBg, padding: isMobile ? "48px 16px" : "80px 40px" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div style={{ ...eyebrowStyle }}>
                  <span style={{ display: "inline-block", width: "28px", height: "2px", background: t.cardBorder }} />
                  {b.eyebrow || "Programs & Products"}
                </div>
                <div style={{ ...sectionTitleStyle }}>{b.title}</div>
                {b.subtitle && <div style={{ fontSize: "15px", color: t.mutedText, lineHeight: 1.75, marginBottom: "36px" }}>{b.subtitle}</div>}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                  {b.items.map((item, idx) => {
                    const szMap: Record<LogoSize, number> = { sm: 48, md: 80, lg: 120 };
                    const logoSz = szMap[item.logoSize ?? "md"];
                    const shapeRadius: Record<LogoShape, string> = { square: "0", rounded: "12px", circle: "50%", original: "8px" };
                    const isOriginal = (item.logoShape ?? "rounded") === "original";
                    return (
                      <div key={idx} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "12px", padding: "28px 22px" }}>
                        {item.logoUrl ? (
                          <div style={{ marginBottom: "16px" }}>
                            <img src={item.logoUrl} alt={item.name} style={{ width: `${logoSz}px`, height: isOriginal ? "auto" : `${logoSz}px`, maxHeight: `${logoSz}px`, objectFit: isOriginal ? "contain" : "cover", borderRadius: shapeRadius[item.logoShape ?? "rounded"], display: "block" }} />
                          </div>
                        ) : (
                          <span style={{ fontSize: "2rem", marginBottom: "14px", display: "block" }}>{item.icon}</span>
                        )}
                        <div style={{ fontFamily: t.headingFont, fontSize: "1.15rem", fontWeight: 800, color: t.bodyText, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>{item.name}</div>
                        {item.type && <div style={{ fontFamily: mono, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: t.accent, marginBottom: "10px" }}>{item.type}</div>}
                        <div style={{ fontSize: "14px", color: t.mutedText, lineHeight: 1.7 }}>{item.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }

        if (key === "market") {
          const b = node as MarketBlock;
          return (
            <div key={key} style={{ background: t.sectionAlt, padding: isMobile ? "48px 16px" : "80px 40px" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div style={{ ...eyebrowStyle }}>
                  <span style={{ display: "inline-block", width: "28px", height: "2px", background: t.cardBorder }} />
                  {b.eyebrow || "Service Area"}
                </div>
                <div style={{ ...sectionTitleStyle }}>{b.title}</div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "24px" : "40px" }}>
                  <div style={{ background: `${t.accent}0d`, border: `1px solid ${t.accent}26`, borderRadius: "12px", padding: "28px" }}>
                    <div style={{ fontFamily: t.headingFont, fontSize: "1.3rem", fontWeight: 800, color: t.bodyText, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>{b.territoryName}</div>
                    <div style={{ fontFamily: mono, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: t.mutedText, marginBottom: "18px" }}>{b.territorySub}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {b.areas.map((area, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "6px" }}>
                          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.accent, flexShrink: 0 }} />
                          <span style={{ fontSize: "14px", fontWeight: 600, color: t.bodyText, flex: 1 }}>{area.name}</span>
                          <span style={{ fontFamily: mono, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: t.mutedText }}>{area.tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "15px", color: t.bodyText, lineHeight: 1.8, marginBottom: "24px" }}>{b.statement}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {b.stats.map((stat, idx) => (
                        <div key={idx} style={{ background: t.bodyBg, border: `1px solid ${t.cardBorder}`, borderRadius: "8px", padding: "16px" }}>
                          <div style={{ fontFamily: t.headingFont, fontSize: "2.2rem", fontWeight: 900, color: t.accent, lineHeight: 1, marginBottom: "4px" }}>{stat.value}</div>
                          <div style={{ fontFamily: mono, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: t.mutedText }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (key === "bio") {
          const b = node as BioBlock;
          return (
            <div key={key} style={{ background: t.sectionAlt, padding: isMobile ? "44px 16px" : "72px 40px" }}>
              <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", gap: "56px", alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ width: "140px", height: "140px", borderRadius: "50%", background: t.cardBorder, border: `3px solid ${t.accent}`, overflow: "hidden", flexShrink: 0 }}>
                  {b.headshotUrl ? (
                    <img src={b.headshotUrl} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", color: t.mutedText }}>
                      {(b.name || "?").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: "260px" }}>
                  <div style={{ fontFamily: t.headingFont, fontSize: "2.2rem", color: t.bodyText, letterSpacing: "0.02em", lineHeight: 1 }}>{b.name}</div>
                  <div style={{ fontSize: "13px", color: t.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "6px", marginBottom: "16px" }}>
                    {b.title || "Independent Fundraising Rep"}{b.market ? ` · ${b.market}` : ""}
                  </div>
                  <div style={{ fontSize: "15px", color: t.mutedText, lineHeight: 1.8 }}>{b.story}</div>
                  {(b.yearsExperience || b.asiNumber) && (
                    <div style={{ display: "flex", gap: "24px", marginTop: "18px" }}>
                      {b.yearsExperience && <div style={{ fontSize: "13px", color: t.mutedText }}><strong style={{ color: t.bodyText }}>{b.yearsExperience}</strong> yrs experience</div>}
                      {b.asiNumber && <div style={{ fontSize: "13px", color: t.mutedText }}>ASI# <strong style={{ color: t.bodyText }}>{b.asiNumber}</strong></div>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }

        if (key === "services") {
          const b = node as ServicesBlock;
          return (
            <div key={key} style={{ padding: isMobile ? "44px 16px" : "72px 40px", background: t.bodyBg }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div style={{ fontFamily: t.headingFont, fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 900, letterSpacing: "0.02em", color: t.bodyText, marginBottom: "32px", textTransform: "uppercase" }}>{b.headline || "Services"}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "14px" }}>
                  {b.items.filter(i => i.title).map((item, idx) => (
                    <div key={idx} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "12px", padding: "20px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.accent, marginBottom: "12px" }} />
                      <div style={{ fontSize: "15px", fontWeight: 700, color: t.bodyText, marginBottom: "6px" }}>{item.title}</div>
                      <div style={{ fontSize: "13px", color: t.mutedText, lineHeight: 1.65 }}>{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (key === "testimonials") {
          const b = node as TestimonialsBlock;
          return (
            <div key={key} style={{ background: t.sectionAlt, padding: isMobile ? "44px 16px" : "72px 40px" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div style={{ fontFamily: t.headingFont, fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 900, letterSpacing: "0.02em", color: t.bodyText, marginBottom: "32px", textTransform: "uppercase" }}>{b.headline || "Testimonials"}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
                  {b.items.filter(i => i.quote).map((item, idx) => (
                    <div key={idx} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "12px", padding: "22px" }}>
                      <div style={{ fontSize: "2rem", color: t.accent, lineHeight: 1, marginBottom: "10px" }}>"</div>
                      <div style={{ fontSize: "14px", color: t.bodyText, lineHeight: 1.75, fontStyle: "italic", marginBottom: "16px" }}>{item.quote}</div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: t.bodyText }}>{item.name}</div>
                      <div style={{ fontSize: "12px", color: t.mutedText }}>{item.organization}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (key === "feature") {
          const b = node as FeatureBlock;
          const isImageRight = b.layout === "image-right";
          const isBanner = b.layout === "banner";
          const isStacked = b.layout === "stacked";
          const imgNode = b.imageUrl ? (
            <div style={{ borderRadius: "12px", overflow: "hidden", background: t.cardBorder, flexShrink: 0 }}>
              <img src={b.imageUrl} alt={b.headline} style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          ) : null;
          const contentNode = (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", justifyContent: "center" }}>
              {b.eyebrow && <div style={{ fontFamily: mono, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: isBanner ? "rgba(255,255,255,0.7)" : t.accent }}>{b.eyebrow}</div>}
              {b.headline && <div style={{ fontFamily: t.headingFont, fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 900, color: isBanner ? "#fff" : t.bodyText, textTransform: "uppercase", lineHeight: 0.97 }}>{b.headline}</div>}
              {b.body && <p style={{ fontSize: "15px", color: isBanner ? "rgba(255,255,255,0.78)" : t.mutedText, lineHeight: 1.8, margin: 0 }}>{b.body}</p>}
              {b.ctas.length > 0 && (
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "4px" }}>
                  {b.ctas.map((cta: FeatureCta) => (
                    <a key={cta.id} href={cta.url || "#"} target={cta.url ? "_blank" : undefined} rel="noopener noreferrer"
                      style={cta.style === "primary" ? { background: t.accent, color: t.accentText, padding: "13px 28px", borderRadius: "5px", fontFamily: t.headingFont, fontSize: "15px", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" } : { border: `1px solid ${isBanner ? "rgba(255,255,255,0.4)" : t.bodyText + "30"}`, color: isBanner ? "#fff" : t.bodyText, padding: "13px 28px", borderRadius: "5px", fontSize: "14px", textDecoration: "none", display: "inline-block" }}>
                      {cta.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
          if (isBanner) {
            return (
              <div key={key} style={{ position: "relative", overflow: "hidden", minHeight: "360px", background: t.bodyText }}>
                {b.imageUrl && <img src={b.imageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "56px 20px" : "80px 64px", maxWidth: "700px" }}>{contentNode}</div>
              </div>
            );
          }
          if (isStacked) {
            return (
              <div key={key} style={{ background: t.bodyBg }}>
                {b.imageUrl && <div style={{ maxHeight: "480px", overflow: "hidden" }}><img src={b.imageUrl} alt={b.headline} style={{ width: "100%", height: "480px", objectFit: "cover", display: "block" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} /></div>}
                <div style={{ padding: isMobile ? "44px 20px" : "64px 40px", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>{contentNode}</div>
              </div>
            );
          }
          return (
            <div key={key} style={{ background: t.bodyBg, padding: isMobile ? "44px 20px" : "72px 48px" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "64px", alignItems: "center" }}>
                {(!isImageRight || isMobile) && imgNode}
                {contentNode}
                {isImageRight && !isMobile && imgNode}
              </div>
            </div>
          );
        }

        if (key === "gallery") {
          const b = node as GalleryBlock;
          const photos = b.photos.filter((p: GalleryPhoto) => p.url);
          if (!photos.length) return null;
          return (
            <div key={key} style={{ background: t.sectionAlt, padding: isMobile ? "44px 16px" : "72px 40px" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div style={{ fontFamily: t.headingFont, fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 900, letterSpacing: "0.02em", color: t.bodyText, marginBottom: "32px", textTransform: "uppercase" }}>{b.headline || "Photo Gallery"}</div>
                <div style={{ columns: "3 220px", gap: "14px" }}>
                  {photos.map((photo: GalleryPhoto) => (
                    <div key={photo.id} style={{ breakInside: "avoid", marginBottom: "14px", borderRadius: "10px", overflow: "hidden", border: `1px solid ${t.cardBorder}` }}>
                      <img src={photo.url} alt={photo.caption} style={{ width: "100%", display: "block", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      {photo.caption && (
                        <div style={{ background: t.cardBg, padding: "8px 12px", fontSize: "12px", color: t.mutedText }}>{photo.caption}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (key === "youtube") {
          const b = node as YoutubeBlock;
          const validVideos = b.videos.filter((v: YoutubeVideoItem) => ytVideoId(v.url));
          if (!validVideos.length) return null;
          const isSingle = validVideos.length === 1;
          return (
            <div key={key} style={{ background: t.bodyBg, padding: isMobile ? "44px 16px" : "72px 40px" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div style={{ fontFamily: t.headingFont, fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 900, letterSpacing: "0.02em", color: t.bodyText, marginBottom: "10px", textTransform: "uppercase" }}>{b.headline || "Watch Us in Action"}</div>
                {b.subtext && <p style={{ color: t.mutedText, fontSize: "15px", marginBottom: "32px" }}>{b.subtext}</p>}
                <div style={{ display: "grid", gridTemplateColumns: isSingle ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                  {validVideos.map((v: YoutubeVideoItem) => {
                    const vid = ytVideoId(v.url)!;
                    return (
                      <div key={v.id} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "12px", overflow: "hidden" }}>
                        <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
                          <iframe src={`https://www.youtube.com/embed/${vid}?rel=0`} title={v.title || "Video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} />
                        </div>
                        {(v.title || v.description) && (
                          <div style={{ padding: "16px 20px" }}>
                            {v.title && <div style={{ fontFamily: t.headingFont, fontSize: "18px", fontWeight: 800, color: t.bodyText, marginBottom: "4px" }}>{v.title}</div>}
                            {v.description && <p style={{ fontSize: "13px", color: t.mutedText, lineHeight: 1.5, margin: 0 }}>{v.description}</p>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }

        if (key === "map") {
          // Florida county heatmap — skipped in standalone build (requires SSG internal component).
          // Renders a placeholder so the page still loads cleanly.
          const b = node as MapBlock;
          if (!b.rows.length) return null;
          return (
            <div key={key} style={{ padding: isMobile ? "44px 16px" : "72px 40px", background: t.sectionAlt }}>
              <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                {b.title && (
                  <div style={{ fontFamily: t.headingFont, fontSize: "clamp(1.3rem,3vw,2rem)", fontWeight: 900, letterSpacing: "0.02em", color: t.bodyText, marginBottom: "28px", textTransform: "uppercase" }}>{b.title}</div>
                )}
                <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: "12px", padding: "32px", textAlign: "center", color: t.mutedText, fontSize: "14px" }}>
                  Territory map available on the full dashboard.
                </div>
              </div>
            </div>
          );
        }

        return null;
      })}

      {/* Contact CTA */}
      {contact && (
        <div style={{ background: t.heroBg, padding: isMobile ? "48px 16px" : "80px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", zIndex: 2, maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ fontFamily: mono, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: t.accent, marginBottom: "16px" }}>Ready to get started?</div>
            <div style={{ fontFamily: t.headingFont, fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: t.heroText, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: "16px" }}>
              {contact.headline || "Book Your Free Budget Session"}
            </div>
            {contact.subtext && (
              <div style={{ fontSize: "16px", color: t.heroMuted, lineHeight: 1.75, maxWidth: "480px", margin: "0 auto 32px", fontStyle: "italic" }}>
                {contact.subtext}
              </div>
            )}
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              {contact.schedulingLink && (
                <a href={contact.schedulingLink} target="_blank" rel="noopener noreferrer"
                  style={{ background: t.accent, color: t.accentText, padding: "14px 28px", borderRadius: "5px", fontFamily: t.headingFont, fontSize: "16px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
                  {contact.schedulingLabel || "Book a Call"}
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`}
                  style={{ border: "1px solid rgba(255,255,255,0.25)", color: t.heroText, padding: "14px 28px", borderRadius: "5px", fontSize: "15px", textDecoration: "none", display: "inline-block" }}>
                  {contact.email}
                </a>
              )}
            </div>
            {contact.socials && Object.values(contact.socials as SocialLinks).some(Boolean) && (
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginTop: "24px" }}>
                {([ ["instagram","Instagram"], ["facebook","Facebook"], ["youtube","YouTube"], ["linkedin","LinkedIn"], ["twitter","X / Twitter"], ["tiktok","TikTok"], ["website","Website"] ] as [keyof SocialLinks, string][]).map(([k, label]) =>
                  (contact.socials as SocialLinks)[k] ? (
                    <a key={k} href={(contact.socials as SocialLinks)[k]} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: t.heroText, padding: "7px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                      {label}
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ background: t.headerBg, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: t.headingFont, fontSize: "16px", color: t.headerText, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {hero?.headline || ""}
          </div>
          <div style={{ fontFamily: mono, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: `${t.headerText}40`, marginTop: "2px" }}>
            Powered by School Solutions Global
          </div>
        </div>
      </div>
    </div>
  );
}
