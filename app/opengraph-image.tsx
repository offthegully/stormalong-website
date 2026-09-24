import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/components/press-house/site-config";

/**
 * The card a shared link unfurls into — iMessage, Slack, Facebook.
 * It is the masthead in miniature: the wordmark in paper and the
 * motto in gold on ink, inside the double gold frame. Pages that set
 * their own `openGraph.images` (each cider does) keep theirs.
 */
export const alt = "Stormalong Cider — Respect the apple!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0A1A2B";
const GOLD = "#C9A227";

async function dataUrl(file: string): Promise<string> {
  const bytes = await readFile(path.join(process.cwd(), "public", file));
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

/** Drawn rather than typed: the renderer's bundled face has no ★,
 *  and fetching one at build time would need the network. */
function StarGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill={GOLD}
        d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8l-6.3 3.7 1.7-7.3L2 9.5l7.1-.6z"
      />
    </svg>
  );
}

export default async function OpengraphImage() {
  // The motto is a gold copy of respect-the-apple.png rather than the
  // mask BrandMark uses on the page: the image renderer draws no masks.
  const [wordmark, respect] = await Promise.all([
    dataUrl("images/stormalong-logo.png"),
    dataUrl("images/respect-the-apple-gold.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: INK,
        }}
      >
        {/* Two solid rules stand in for CSS `double`, which the image
            renderer does not draw. */}
        <div
          style={{
            flex: 1,
            display: "flex",
            padding: 8,
            border: `3px solid ${GOLD}`,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 64,
              border: `1px solid ${GOLD}`,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={wordmark} width={540} height={134} alt="" />
              <div
                style={{
                  marginTop: 22,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  color: GOLD,
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                <StarGlyph />
                {site.origin}
                <StarGlyph />
              </div>
            </div>

            <div style={{ width: 2, height: 260, background: GOLD, opacity: 0.45 }} />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={respect} width={300} height={208} alt="" />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
