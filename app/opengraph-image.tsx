import { ImageResponse } from "next/og";

export const alt = "Ussly — Independent Web Design Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static OG card. Uses next/og's bundled font (no network fetch at build) so
// generation can't fail offline; brand is carried by palette + layout.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F5F1E8",
          color: "#141414",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5C544A",
          }}
        >
          <span>Independent Studio · Vol. 01</span>
          <span>Lynnwood, WA</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 150, fontWeight: 800, lineHeight: 1 }}>
            Ussly<span style={{ color: "#C8501E" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 600,
              marginTop: 18,
              color: "#141414",
            }}
          >
            Websites that earn their keep<span style={{ color: "#C8501E" }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#5C544A",
          }}
        >
          <div style={{ display: "flex", width: 56, height: 6, backgroundColor: "#C8501E" }} />
          <span>Hand-coded · No templates · ussly.design</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
