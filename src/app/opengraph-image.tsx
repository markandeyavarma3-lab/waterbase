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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #082B1A 0%, #167A4A 55%, #0C5D8C 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>Waterbase Technologies</div>
        <div style={{ display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.08, marginTop: 24, maxWidth: 980 }}>
          Complete Irrigation & Agricultural Water Management
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 28, color: "rgba(255,255,255,0.85)" }}>
          Product supply · Design · Installation · APMIP subsidy assistance
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 40, color: "rgba(255,255,255,0.7)" }}>
          Jain Irrigation · KSB Pumps · Netafim · Since 2011
        </div>
      </div>
    ),
    { ...size }
  );
}