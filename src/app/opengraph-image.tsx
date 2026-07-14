import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #123D2C 0%, #237352 55%, #2A7CAC 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* sunrise accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 14, display: "flex", background: "linear-gradient(90deg, #2E9466, #F4A24C, #3FA3DA)" }} />
        {/* warm sunrise glow */}
        <div style={{ position: "absolute", bottom: -220, left: 260, width: 760, height: 760, display: "flex", borderRadius: 9999, background: "radial-gradient(circle, rgba(244,162,76,0.40), transparent 60%)" }} />

        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>{siteConfig.name}</div>
        <div style={{ display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.08, marginTop: 24, maxWidth: 980 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 28, color: "rgba(255,255,255,0.88)" }}>
          Product supply · Design · Installation · APMIP subsidy assistance
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 40, color: "rgba(255,255,255,0.75)" }}>
          Jain Irrigation · KSB Pumps · Netafim · 25+ years
        </div>
      </div>
    ),
    { ...size }
  );
}