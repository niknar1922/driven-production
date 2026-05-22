// Mirror of the block types in ssg-app/src/pages/rep-builder.tsx
// Keep in sync if new block types are added to the builder.

export type Theme = "classic" | "modern" | "bold" | "minimal" | "driven";

export interface HeroBlock { type: "hero"; enabled: boolean; headline: string; tagline: string; ctaText: string; ctaLink: string; ctaGhostText: string; bgStyle: "gradient" | "solid" | "dark"; navSubtitle?: string; navCtaLabel?: string; heroEyebrow?: string; heroStats?: { value: string; label: string }[]; }
export interface BioBlock { type: "bio"; enabled: boolean; name: string; title: string; market: string; headshotUrl: string; story: string; yearsExperience: string; asiNumber: string; }
export interface ServiceItem { title: string; description: string; }
export interface ServicesBlock { type: "services"; enabled: boolean; headline: string; items: ServiceItem[]; }
export interface TestimonialItem { quote: string; name: string; organization: string; }
export interface TestimonialsBlock { type: "testimonials"; enabled: boolean; headline: string; items: TestimonialItem[]; }
export interface SocialLinks { instagram?: string; facebook?: string; youtube?: string; linkedin?: string; twitter?: string; tiktok?: string; website?: string; }
export interface ContactBlock { type: "contact"; enabled: boolean; headline: string; subtext: string; email: string; phone: string; schedulingLink: string; schedulingLabel: string; socials?: SocialLinks; }
export interface ValueItem { icon: string; title: string; text: string; }
export interface PhilosophyBlock { type: "philosophy"; enabled: boolean; eyebrow: string; title: string; pullQuote: string; bodyText: string; values: ValueItem[]; }
export interface ProcessStep { title: string; text: string; }
export interface ProcessBlock { type: "process"; enabled: boolean; eyebrow: string; title: string; subtitle: string; steps: ProcessStep[]; }
export type LogoShape = "square" | "rounded" | "circle" | "original";
export type LogoSize = "sm" | "md" | "lg";
export interface ProgramItem { icon: string; name: string; type: string; description: string; logoUrl?: string; logoSize?: LogoSize; logoShape?: LogoShape; }
export interface ProgramsBlock { type: "programs"; enabled: boolean; eyebrow: string; title: string; subtitle: string; items: ProgramItem[]; }
export interface MarketArea { name: string; tag: string; }
export interface MarketStat { value: string; label: string; }
export interface MarketBlock { type: "market"; enabled: boolean; eyebrow: string; title: string; territoryName: string; territorySub: string; areas: MarketArea[]; statement: string; stats: MarketStat[]; }
export interface GalleryPhoto { id: string; url: string; caption: string; }
export interface GalleryBlock { type: "gallery"; enabled: boolean; headline: string; photos: GalleryPhoto[]; }
export interface YoutubeVideoItem { id: string; url: string; title: string; description: string; }
export interface YoutubeBlock { type: "youtube"; enabled: boolean; headline: string; subtext: string; videos: YoutubeVideoItem[]; }
export type FeatureLayout = "image-left" | "image-right" | "stacked" | "banner";
export interface FeatureCta { id: string; label: string; url: string; style: "primary" | "ghost"; }
export interface FeatureBlock { type: "feature"; enabled: boolean; layout: FeatureLayout; imageUrl: string; eyebrow: string; headline: string; body: string; ctas: FeatureCta[]; }
export interface MapBlock { type: "map"; enabled: boolean; title: string; rows: unknown[]; syncedAt?: string; }

export type Block =
  | HeroBlock | BioBlock | ServicesBlock | TestimonialsBlock | ContactBlock
  | PhilosophyBlock | ProcessBlock | ProgramsBlock | MarketBlock
  | GalleryBlock | YoutubeBlock | FeatureBlock | MapBlock;

export interface ColorOverrides { accent?: string; accentText?: string; headerBg?: string; heroBg?: string; }

export interface PageDoc {
  theme: Theme;
  blocks: Block[];
  colorOverrides?: ColorOverrides;
}

export interface ThemeConfig {
  label: string;
  fontImport?: string;
  pageBg: string;
  headerBg: string;
  headerText: string;
  heroBg: string;
  heroText: string;
  heroMuted: string;
  accent: string;
  accentText: string;
  bodyBg: string;
  cardBg: string;
  cardBorder: string;
  bodyText: string;
  mutedText: string;
  headingFont: string;
  bodyFont: string;
  sectionAlt: string;
}

export const THEMES: Record<Theme, ThemeConfig> = {
  classic: { label: "Classic", pageBg: "#faf7f2", headerBg: "#ffffff", headerText: "#0f172a", heroBg: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)", heroText: "#ffffff", heroMuted: "rgba(255,255,255,0.75)", accent: "#c8943a", accentText: "#ffffff", bodyBg: "#faf7f2", cardBg: "#ffffff", cardBorder: "#e8e2d9", bodyText: "#1e293b", mutedText: "#64748b", headingFont: "'Bebas Neue', sans-serif", bodyFont: "'Outfit', sans-serif", sectionAlt: "#f0ece4" },
  modern:  { label: "Modern",  pageBg: "#0a0a0a", headerBg: "#0f0f0f", headerText: "#f0ece4", heroBg: "linear-gradient(135deg, #111827 0%, #0a0a0a 100%)", heroText: "#f0ece4", heroMuted: "rgba(240,236,228,0.65)", accent: "#c8943a", accentText: "#0a0a0a", bodyBg: "#0a0a0a", cardBg: "#111111", cardBorder: "#222222", bodyText: "#f0ece4", mutedText: "#6b7280", headingFont: "'Bebas Neue', sans-serif", bodyFont: "'Outfit', sans-serif", sectionAlt: "#0f0f0f" },
  bold:    { label: "Bold",    pageBg: "#f8fafc", headerBg: "#0f2d5e", headerText: "#ffffff", heroBg: "linear-gradient(135deg, #1e40af 0%, #0f2d5e 100%)", heroText: "#ffffff", heroMuted: "rgba(255,255,255,0.78)", accent: "#f59e0b", accentText: "#0f2d5e", bodyBg: "#f8fafc", cardBg: "#ffffff", cardBorder: "#e2e8f0", bodyText: "#0f172a", mutedText: "#475569", headingFont: "'Outfit', sans-serif", bodyFont: "'Outfit', sans-serif", sectionAlt: "#eff6ff" },
  minimal: { label: "Minimal", pageBg: "#ffffff", headerBg: "#ffffff", headerText: "#111827", heroBg: "#111827", heroText: "#ffffff", heroMuted: "rgba(255,255,255,0.72)", accent: "#111827", accentText: "#ffffff", bodyBg: "#ffffff", cardBg: "#f9fafb", cardBorder: "#e5e7eb", bodyText: "#111827", mutedText: "#6b7280", headingFont: "'Outfit', sans-serif", bodyFont: "'Outfit', sans-serif", sectionAlt: "#f3f4f6" },
  driven:  { label: "Driven",  fontImport: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=DM+Mono:wght@400;500&display=swap", pageBg: "#f8f7f3", headerBg: "#042d61", headerText: "#ffffff", heroBg: "linear-gradient(180deg, #063e87 0%, #042d61 100%)", heroText: "#ffffff", heroMuted: "rgba(255,255,255,0.58)", accent: "#f0b429", accentText: "#042d61", bodyBg: "#f8f7f3", cardBg: "#ffffff", cardBorder: "#e4e0d8", bodyText: "#0d0d0d", mutedText: "#7a7570", headingFont: "'Barlow Condensed', sans-serif", bodyFont: "'Lora', serif", sectionAlt: "#ffffff" },
};

export function applyOverrides(base: ThemeConfig, overrides?: ColorOverrides): ThemeConfig {
  if (!overrides) return base;
  return {
    ...base,
    accent:     overrides.accent     ?? base.accent,
    accentText: overrides.accentText ?? base.accentText,
    headerBg:   overrides.headerBg   ?? base.headerBg,
    heroBg:     overrides.heroBg     ?? base.heroBg,
  };
}

export function ytVideoId(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0] ?? null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/embed/")[1]?.split("?")[0] ?? null;
      return u.searchParams.get("v");
    }
  } catch { /* not a valid URL */ }
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
  return null;
}
