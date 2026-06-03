import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 42,
          fontWeight: 600,
          fontFamily: "Georgia, 'Times New Roman', serif",
          borderRadius: 14,
          border: "1px solid rgba(201, 162, 75, 0.35)",
          letterSpacing: "-0.02em",
        }}
      >
        U
      </div>
    ),
    { ...size }
  );
}
