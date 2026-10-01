// Sapia.ai deck helper: Talent Hub PRODUCT skin (default).
// Composition base: full-width executive memo grammar.
// Closing: decision-style (eyebrow + next decision + detail + tagline).
//
// Authority split:
// - Print guide: voice, naming ("Sapia.ai"), no dashes, no hype, no bangs.
// - Product look: bundled brand.md tokens, derived from Flora and ta-benchmark. Canvas, chrome,
//   Manrope SEMIBOLD headings, Geist Mono data, navy primary, pink as dose.
//
// Classic print-guide skin: scripts/sapia_deck_classic.js (opt-in).
//
// Hard rules: no shape shadows (LibreOffice crash). Proof ticks use
// assets/tick_pink.png (the unicode check glyph is not in Manrope or Geist Mono; LO substitutes
// Lucida; rotated shape ticks render malformed). White wordmark on navy uses
// logo_white_alpha.png (logo_white.png has a baked black box).
const fs = require("fs");
const pptxgen = require("pptxgenjs");

const SAPIA = {
  canvas: "F5F6F8",
  card: "FFFFFF",
  hairline: "EAECF0",
  ink: "101828",
  muted: "667085",
  navy: "245069",
  pink: "FFCEFF",
  track: "E5E7EC",
  pinkPanel: "F8EAFA",
  green: "067647",
  greenTint: "E6F1EC",
  amber: "B54708",
  amberTint: "F7ECE6",
  red: "B42318",
  redTint: "F7E9E7",
  noteInk: "667085",
  noteTint: "F2F4F7",
  font: "Manrope",
  mono: "Geist Mono",
  PW: 13.33,
  PH: 7.5,
  M: 0.7,
  chromeH: 0.58,
  logoBlack: __dirname + "/../assets/logo_black.png",
  logoWhite: __dirname + "/../assets/logo_white_alpha.png",
  tickPink: __dirname + "/../assets/tick_pink.png",
  logoAR: 665 / 270,
};
SAPIA.contentW = SAPIA.PW - 2 * SAPIA.M;
// Navy-led viz rotation (brand-legal secondary + pink).
SAPIA.viz = [SAPIA.navy, "9ACEDC", "8D58F9", SAPIA.pink];

function newDeck({ title }) {
  const p = new pptxgen();
  p.defineLayout({ name: "WIDE", width: SAPIA.PW, height: SAPIA.PH });
  p.layout = "WIDE";
  p.title = title;
  return p;
}

const T = (s, t, o) =>
  s.addText(t, Object.assign({ fontFace: SAPIA.font, color: SAPIA.ink, margin: 0 }, o));
const MT = (s, t, o) =>
  s.addText(t, Object.assign({ fontFace: SAPIA.mono, color: SAPIA.ink, margin: 0 }, o));

function logo(s, { x, y, h = 0.4, white = false }) {
  s.addImage({
    path: white ? SAPIA.logoWhite : SAPIA.logoBlack,
    x, y, h,
    w: h * SAPIA.logoAR,
  });
}

function panel(s, { x, y, w, h, radius = 0.12 }) {
  s.addShape("roundRect", {
    x, y, w, h,
    rectRadius: radius,
    fill: { color: SAPIA.card },
    line: { color: SAPIA.hairline, width: 0.75 },
  });
}

// Product chrome: white strip, wordmark left, mono context right, hairline under.
function headerBand(s, { right = "" } = {}) {
  const { PW, M, chromeH } = SAPIA;
  s.addShape("rect", {
    x: 0, y: 0, w: PW, h: chromeH,
    fill: { color: SAPIA.card },
    line: { type: "none" },
  });
  s.addShape("line", {
    x: 0, y: chromeH, w: PW, h: 0,
    line: { color: SAPIA.hairline, width: 0.75 },
  });
  logo(s, { x: M, y: 0.16, h: 0.24 });
  if (right) {
    MT(s, right, {
      x: PW - M - 6.2, y: 0, w: 6.2, h: chromeH,
      fontSize: 8.5, color: SAPIA.muted, align: "right", valign: "middle",
    });
  }
}

// Chapter uniform: hairline + mono uppercase letterspaced eyebrow.
function chapter(s, text, { x = SAPIA.M, y = 0.9, w = SAPIA.contentW } = {}) {
  s.addShape("line", {
    x, y, w, h: 0,
    line: { color: SAPIA.hairline, width: 0.75 },
  });
  MT(s, String(text).toUpperCase(), {
    x, y: y + 0.1, w, h: 0.24,
    fontSize: 9, color: SAPIA.muted, charSpacing: 2.2,
  });
}

function countPill(s, { x, y, text, w = 0.48 }) {
  const h = 0.32;
  s.addShape("roundRect", {
    x, y, w, h,
    rectRadius: h / 2,
    fill: { color: SAPIA.pink },
    line: { type: "none" },
  });
  MT(s, String(text), {
    x, y: y - 0.01, w, h,
    fontSize: 10, bold: true, align: "center", valign: "middle",
  });
}

function statusPill(s, { x, y, text, tone = "note", w = 1.4 }) {
  const map = {
    green: [SAPIA.green, SAPIA.greenTint],
    amber: [SAPIA.amber, SAPIA.amberTint],
    red: [SAPIA.red, SAPIA.redTint],
    note: [SAPIA.noteInk, SAPIA.noteTint],
  };
  const [ink, tint] = map[tone] || map.note;
  const h = 0.3;
  s.addShape("roundRect", {
    x, y, w, h,
    rectRadius: h / 2,
    fill: { color: tint },
    line: { type: "none" },
  });
  T(s, text, {
    x, y: y - 0.01, w, h,
    fontSize: 9.5, bold: true, color: ink, align: "center", valign: "middle",
  });
}

function bar(s, { x, y, w, pct, color = SAPIA.navy, h = 0.14 }) {
  const r = { rectRadius: h / 2 };
  s.addShape("roundRect", Object.assign({
    x, y, w, h,
    fill: { color: SAPIA.track },
    line: { type: "none" },
  }, r));
  if (pct > 0) {
    s.addShape("roundRect", Object.assign({
      x, y,
      w: Math.max(h, (w * pct) / 100),
      h,
      fill: { color },
      line: { type: "none" },
    }, r));
  }
}

// Proof tick: bundled pink-circle + ink check PNG.
// Copy assets/ next to scripts/ so SAPIA.tickPink resolves. Never use unicode checks.
// (font substitution) and never rotated-rect fakes (malformed in Impress).
function tick(s, { x, y, d = 0.24 }) {
  s.addImage({ path: SAPIA.tickPink, x, y, w: d, h: d });
}

// Coachline: navy rule + the line that lands the point.
function coachline(s, { x, y, w, text, h = 0.55 }) {
  s.addShape("rect", {
    x, y, w: 0.03, h,
    fill: { color: SAPIA.navy },
    line: { type: "none" },
  });
  T(s, text, {
    x: x + 0.2, y, w: w - 0.2, h,
    fontSize: 12, lineSpacing: 16.5, valign: "middle",
  });
}

// White hairline card with semibold head + muted body.
function card(s, { x, y, w, h, head, body }) {
  panel(s, { x, y, w, h });
  if (head) {
    T(s, head, {
      x: x + 0.28, y: y + 0.22, w: w - 0.56, h: 0.32,
      fontSize: 13, bold: true,
    });
  }
  if (body) {
    T(s, body, {
      x: x + 0.28, y: y + 0.58, w: w - 0.56, h: h - 0.78,
      fontSize: 12, lineSpacing: 16.5, color: SAPIA.muted, valign: "top",
    });
  }
}

function readRasterDimensions(imagePath) {
  if (!imagePath || typeof imagePath !== "string") {
    throw new Error("imageFrame requires a local PNG or JPEG path");
  }

  let data;
  try {
    data = fs.readFileSync(imagePath);
  } catch (error) {
    throw new Error(`imageFrame could not read ${imagePath}: ${error.message}`);
  }

  const isPng = data.length >= 24
    && data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (isPng) {
    const width = data.readUInt32BE(16);
    const height = data.readUInt32BE(20);
    if (width > 0 && height > 0) return { width, height };
  }

  const isJpeg = data.length >= 4 && data[0] === 0xff && data[1] === 0xd8;
  if (isJpeg) {
    const startOfFrame = new Set([
      0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
      0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
    ]);
    let offset = 2;
    while (offset + 8 < data.length) {
      while (offset < data.length && data[offset] === 0xff) offset += 1;
      if (offset >= data.length) break;
      const marker = data[offset];
      offset += 1;
      if (marker === 0xd8 || marker === 0xd9 || marker === 0x01) continue;
      if (offset + 2 > data.length) break;
      const segmentLength = data.readUInt16BE(offset);
      if (segmentLength < 2 || offset + segmentLength > data.length) break;
      if (startOfFrame.has(marker)) {
        const height = data.readUInt16BE(offset + 3);
        const width = data.readUInt16BE(offset + 5);
        if (width > 0 && height > 0) return { width, height };
        break;
      }
      offset += segmentLength;
    }
  }

  throw new Error(`imageFrame supports PNG and JPEG files only: ${imagePath}`);
}

function fittedImageOptions({ path, x, y, w, h, fit, altText }) {
  const { width: sourceW, height: sourceH } = readRasterDimensions(path);
  const mode = fit === "cover" ? "cover" : "contain";

  if (mode === "contain") {
    const scale = Math.min(w / sourceW, h / sourceH);
    const drawW = sourceW * scale;
    const drawH = sourceH * scale;
    return {
      path,
      x: x + (w - drawW) / 2,
      y: y + (h - drawH) / 2,
      w: drawW,
      h: drawH,
      altText,
    };
  }

  const scale = Math.max(w / sourceW, h / sourceH);
  const virtualW = sourceW * scale;
  const virtualH = sourceH * scale;
  return {
    path,
    x,
    y,
    w: virtualW,
    h: virtualH,
    sizing: {
      type: "crop",
      x: (virtualW - w) / 2,
      y: (virtualH - h) / 2,
      w,
      h,
    },
    altText,
  };
}

// Authentic product screenshot or supplied visual in the product card grammar.
// Never use this to draw or imply product UI that does not exist.
function imageFrame(s, {
  x,
  y,
  w,
  h,
  path,
  fit = "contain",
  tint = false,
  pad = 0.14,
  altText = "",
} = {}) {
  const values = { x, y, w, h, pad };
  Object.entries(values).forEach(([name, value]) => {
    if (!Number.isFinite(value)) {
      throw new Error(`imageFrame requires a finite ${name}`);
    }
  });
  if (w <= 0 || h <= 0 || pad < 0) {
    throw new Error("imageFrame requires positive frame dimensions and non-negative padding");
  }

  const fitMode = fit === "cover" ? "cover" : "contain";
  const outerPad = tint ? 0.16 : 0;
  const frameX = x + outerPad;
  const frameY = y + outerPad;
  const frameW = w - outerPad * 2;
  const frameH = h - outerPad * 2;
  const imageX = frameX + pad;
  const imageY = frameY + pad;
  const imageW = frameW - pad * 2;
  const imageH = frameH - pad * 2;
  if (frameW <= 0 || frameH <= 0 || imageW <= 0 || imageH <= 0) {
    throw new Error("imageFrame padding leaves no room for the image");
  }
  const imageOptions = fittedImageOptions({
    path,
    x: imageX,
    y: imageY,
    w: imageW,
    h: imageH,
    fit: fitMode,
    altText,
  });

  if (tint) {
    s.addShape("roundRect", {
      x, y, w, h,
      rectRadius: 0.16,
      fill: { color: SAPIA.pinkPanel },
      line: { type: "none" },
    });
  }

  panel(s, { x: frameX, y: frameY, w: frameW, h: frameH });
  s.addImage(imageOptions);
}

// Reusable content-page evidence band using the cover metric grammar.
function metricStrip(s, {
  x = SAPIA.M,
  y,
  w = SAPIA.contentW,
  h = 1.6,
  metrics = [],
  tint = true,
} = {}) {
  const outerPad = tint ? 0.14 : 0;
  if (tint) {
    s.addShape("roundRect", {
      x, y, w, h,
      rectRadius: 0.16,
      fill: { color: SAPIA.pinkPanel },
      line: { type: "none" },
    });
  }

  const frameX = x + outerPad;
  const frameY = y + outerPad;
  const frameW = w - outerPad * 2;
  const frameH = h - outerPad * 2;
  panel(s, { x: frameX, y: frameY, w: frameW, h: frameH });

  if (!metrics.length) return;

  const innerX = frameX + 0.26;
  const innerW = frameW - 0.52;
  const gap = 0.22;
  const cellW = (innerW - gap * (metrics.length - 1)) / metrics.length;
  metrics.forEach((metric, index) => {
    const cellX = innerX + index * (cellW + gap);
    MT(s, String(metric.label || "").toUpperCase(), {
      x: cellX,
      y: frameY + 0.24,
      w: cellW,
      h: 0.2,
      fontSize: 8,
      color: SAPIA.muted,
      charSpacing: 1.4,
    });
    MT(s, String(metric.value || ""), {
      x: cellX,
      y: frameY + 0.51,
      w: cellW,
      h: 0.42,
      fontSize: 22,
      bold: true,
      valign: "middle",
    });
    if (metric.note) {
      T(s, String(metric.note), {
        x: cellX,
        y: frameY + 1.02,
        w: cellW,
        h: Math.max(0.24, frameH - 1.15),
        fontSize: 9.5,
        color: SAPIA.muted,
        valign: "top",
      });
    }
    if (index < metrics.length - 1) {
      s.addShape("line", {
        x: cellX + cellW + gap / 2,
        y: frameY + 0.24,
        w: 0,
        h: frameH - 0.48,
        line: { color: SAPIA.hairline, width: 0.75 },
      });
    }
  });
}

// Full-width content page: chrome + chapter + title. No left rail.
function page(p, { right = "", chapterText = "", title = "" } = {}) {
  const s = p.addSlide();
  s.background = { color: SAPIA.canvas };
  headerBand(s, { right });
  if (chapterText) chapter(s, chapterText, { y: 0.88 });
  if (title) {
    T(s, title, {
      x: SAPIA.M, y: 1.28, w: SAPIA.contentW, h: 0.55,
      fontSize: 22, bold: true, valign: "top",
    });
  }
  return s;
}

// Cover: product hero. Title + lede, then full-width metric band on pink tint.
function coverSlide(p, {
  kicker = "",
  title,
  lede = "",
  right = "",
  metrics = [],
  foot = "",
} = {}) {
  const s = p.addSlide();
  s.background = { color: SAPIA.canvas };
  headerBand(s, { right });

  if (kicker) chapter(s, kicker, { y: 1.15, w: 8.5 });

  T(s, title, {
    x: SAPIA.M, y: 1.55, w: 11.5, h: 1.15,
    fontSize: 34, bold: true, valign: "top",
  });

  if (lede) {
    T(s, lede, {
      x: SAPIA.M, y: 2.85, w: 10.2, h: 0.7,
      fontSize: 15, color: SAPIA.muted, lineSpacing: 21, valign: "top",
    });
  }

  const bandY = 4.0;
  const bandH = 2.35;
  s.addShape("roundRect", {
    x: SAPIA.M, y: bandY, w: SAPIA.contentW, h: bandH,
    rectRadius: 0.16,
    fill: { color: SAPIA.pinkPanel },
    line: { type: "none" },
  });
  panel(s, {
    x: SAPIA.M + 0.18,
    y: bandY + 0.18,
    w: SAPIA.contentW - 0.36,
    h: bandH - 0.36,
    radius: 0.12,
  });

  if (metrics.length) {
    const innerX = SAPIA.M + 0.48;
    const innerW = SAPIA.contentW - 0.96;
    const gap = 0.3;
    const n = metrics.length;
    const cellW = (innerW - gap * (n - 1)) / n;
    metrics.forEach((m, i) => {
      const cx = innerX + i * (cellW + gap);
      MT(s, String(m.label || "").toUpperCase(), {
        x: cx, y: bandY + 0.42, w: cellW, h: 0.24,
        fontSize: 8, color: SAPIA.muted, charSpacing: 1.8,
      });
      MT(s, String(m.value), {
        x: cx, y: bandY + 0.75, w: cellW, h: 0.55,
        fontSize: 28, bold: true, valign: "middle",
      });
      if (m.note) {
        T(s, m.note, {
          x: cx, y: bandY + 1.4, w: cellW, h: 0.55,
          fontSize: 11, color: SAPIA.muted, valign: "top",
        });
      }
      if (i < n - 1) {
        s.addShape("line", {
          x: cx + cellW + gap / 2, y: bandY + 0.55, w: 0, h: 1.35,
          line: { color: SAPIA.hairline, width: 0.75 },
        });
      }
    });
  }

  if (foot) {
    MT(s, String(foot).toUpperCase(), {
      x: SAPIA.M, y: SAPIA.PH - 0.55, w: SAPIA.contentW, h: 0.28,
      fontSize: 7.5, color: SAPIA.muted, charSpacing: 1.2,
    });
  }
  return s;
}

// Closing: navy primary (product), never print black.
// Decision-style (default for working decks):
//   { eyebrowText, title, detail, tagline }
// Simple:
//   { tagline } or { line, sub }
function closingSlide(p, {
  eyebrowText = "",
  title = "",
  detail = "",
  tagline = "The hires that stay.",
  line = "",
  sub = "",
} = {}) {
  const s = p.addSlide();
  s.background = { color: SAPIA.navy };

  const useDecision = Boolean(title || eyebrowText || detail);

  if (!useDecision) {
    logo(s, { x: SAPIA.M, y: 2.7, h: 0.55, white: true });
    T(s, line || tagline, {
      x: SAPIA.M, y: 3.6, w: SAPIA.contentW, h: 0.55,
      fontSize: 22, bold: true, color: SAPIA.card,
    });
    if (sub) {
      T(s, sub, {
        x: SAPIA.M, y: 4.3, w: 9.5, h: 0.5,
        fontSize: 13, color: SAPIA.card,
      });
    }
    return s;
  }

  // Decision-style close retained on the full-width composition base.
  logo(s, { x: SAPIA.M, y: 0.65, h: 0.42, white: true });
  if (eyebrowText) {
    MT(s, String(eyebrowText).toUpperCase(), {
      x: SAPIA.M, y: 2.0, w: 6, h: 0.3,
      fontSize: 9, color: SAPIA.card, charSpacing: 2,
    });
  }
  tick(s, { x: SAPIA.M, y: 2.58, d: 0.28 });
  T(s, title || line, {
    x: SAPIA.M + 0.52, y: 2.45, w: 10.2, h: 1.7,
    fontSize: 28, bold: true, color: SAPIA.card, lineSpacing: 34, valign: "top",
  });
  if (detail) {
    MT(s, String(detail).toUpperCase(), {
      x: SAPIA.M + 0.52, y: 4.45, w: 9, h: 0.35,
      fontSize: 9, color: SAPIA.card, charSpacing: 1.2,
    });
  }
  T(s, tagline, {
    x: SAPIA.M, y: SAPIA.PH - 0.9, w: 5, h: 0.35,
    fontSize: 12, bold: true, color: SAPIA.card,
  });
  return s;
}

// Minimal hairline table. monoColumns: array of column indexes using Geist Mono.
function table(s, {
  x = SAPIA.M,
  y = 2.1,
  w = SAPIA.contentW,
  widths,
  header,
  rows,
  rowH = 0.48,
  monoColumns = [],
} = {}) {
  const tot = widths.reduce((a, b) => a + b, 0);
  const ws = widths.map((v) => (v / tot) * w);
  const colX = (i) => x + ws.slice(0, i).reduce((a, b) => a + b, 0);
  header.forEach((hd, i) => {
    MT(s, String(hd).toUpperCase(), {
      x: colX(i), y, w: ws[i] - 0.1, h: 0.28,
      fontSize: 8, color: SAPIA.muted, charSpacing: 1.5,
    });
  });
  s.addShape("line", {
    x, y: y + 0.32, w, h: 0,
    line: { color: SAPIA.muted, width: 0.5 },
  });
  rows.forEach((row, r) => {
    const ry = y + 0.42 + r * rowH;
    row.forEach((cell, i) => {
      const fn = monoColumns.includes(i) ? MT : T;
      fn(s, String(cell), {
        x: colX(i), y: ry, w: ws[i] - 0.1, h: rowH,
        fontSize: 12, bold: monoColumns.includes(i), valign: "middle",
      });
    });
    s.addShape("line", {
      x, y: ry + rowH - 0.04, w, h: 0,
      line: { color: SAPIA.hairline, width: 0.75 },
    });
  });
}

module.exports = {
  SAPIA,
  newDeck,
  T,
  MT,
  logo,
  panel,
  headerBand,
  chapter,
  page,
  coverSlide,
  closingSlide,
  countPill,
  statusPill,
  bar,
  tick,
  coachline,
  card,
  imageFrame,
  metricStrip,
  table,
};
