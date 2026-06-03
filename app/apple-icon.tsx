import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0C0C0E",
          color: "#C9A24B",
          fontSize: 116,
          fontWeight: 600,
          fontFamily: "Georgia, 'Times New Roman', serif",
          borderRadius: 40,
          border: "3px solid rgba(201, 162, 75, 0.35)",
          letterSpacing: "-0.02em",
        }}
      >
        U
      </div>
    ),
    { ...size }
  );
}
