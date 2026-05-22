import React from "react";
import { RepPublicPage } from "./RepPublicPage";
import type { PageDoc } from "./types";
import { THEMES, applyOverrides } from "./types";

const SSG_API = import.meta.env.VITE_SSG_API_URL as string | undefined;
const REP_SLUG = import.meta.env.VITE_REP_SLUG as string | undefined;

export default function App() {
  const [doc, setDoc] = React.useState<PageDoc | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const base = SSG_API?.replace(/\/$/, "") ?? "https://app.schoolsolutionsglobal.com";
    const slug = REP_SLUG ?? "driven";
    fetch(`${base}/api/public/pages/${encodeURIComponent(slug)}?kind=rep`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ published: PageDoc | null }>;
      })
      .then(data => {
        if (!data.published) throw new Error("No published page yet");
        setDoc(data.published);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load page");
      });
  }, []);

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#042d61", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", padding: "40px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px", color: "#f0b429", fontWeight: 900, letterSpacing: "0.04em" }}>DRIVEN</div>
          <div style={{ fontSize: "14px" }}>Page coming soon.</div>
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div style={{ minHeight: "100vh", background: "#042d61", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", border: "3px solid rgba(255,255,255,0.15)", borderTopColor: "#f0b429", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const baseTheme = THEMES[doc.theme] ?? THEMES.driven;
  const theme = applyOverrides(baseTheme, doc.colorOverrides);

  return <RepPublicPage theme={theme} blocks={doc.blocks} />;
}
