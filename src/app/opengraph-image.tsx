import { ImageResponse } from "next/og";

export const alt = "Rishabh Tripathi — Adaptive Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 60,
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 24,
                    }}
                >
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: "#6c5ce7",
                        }}
                    />
                    <span
                        style={{
                            color: "#6c5ce7",
                            fontSize: 20,
                            fontWeight: 600,
                            letterSpacing: 4,
                            textTransform: "uppercase" as const,
                        }}
                    >
                        Adaptive Portfolio
                    </span>
                </div>
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 800,
                        color: "#ffffff",
                        lineHeight: 1.1,
                        textAlign: "center" as const,
                        letterSpacing: -2,
                    }}
                >
                    Rishabh Tripathi
                </div>
                <div
                    style={{
                        fontSize: 24,
                        color: "#a0a0b0",
                        marginTop: 20,
                        textAlign: "center" as const,
                        maxWidth: 600,
                    }}
                >
                    AI-powered portfolio that adapts to your company and role
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        marginTop: 40,
                    }}
                >
                    {["React", "Next.js", "TypeScript", "AI"].map((tag) => (
                        <span
                            key={tag}
                            style={{
                                color: "#6c5ce7",
                                border: "1px solid rgba(108, 92, 231, 0.3)",
                                borderRadius: 20,
                                padding: "6px 16px",
                                fontSize: 16,
                                fontWeight: 500,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        ),
        { ...size }
    );
}
