import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Prashant Bairagi — Java Backend Engineer";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 72px",
          backgroundColor: "#09090b",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#22c55e",
            }}
          />
          <div style={{ fontSize: 28, color: "#71717a", fontFamily: "monospace" }}>
            JAVA BACKEND ENGINEER
          </div>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#fafafa",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Prashant Bairagi
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "#a1a1aa",
            lineHeight: 1.5,
            maxWidth: 900,
          }}
        >
          Spring Boot · Stateless JWT · Docker · AWS EC2
        </div>
      </div>
    ),
    { ...size },
  );
}
