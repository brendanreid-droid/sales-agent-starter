// Sapia.ai deck helper. Matched to the official Sapia.ai Brand Guidelines PDF.
// The system: Manrope Regular headings in sentence case (never bold), primary
// pink/black/white, a six-colour secondary palette for data viz, a hairline
// header band with a left rail on content pages, rounded bars on grey tracks,
// and pink rounded callout cards. Validated against the guide's styleframes.
const pptxgen = require("pptxgenjs");

const SAPIA = {
  // Primary palette (guide 2.5). Black is true black, not off-black.
  pink: "FFCEFF", black: "000000", white: "FFFFFF",
  // Secondary palette (guide 2.6): used "more subtly", e.g. to break up
  // content-heavy pieces such as a PowerPoint slide. This is the data-viz set.
  blue: "245069", lightblue: "9ACEDC", purple: "37147F", lightpurple: "8D58F9",
  grey: "E1E1E1", lightgrey: "F1F1F1",
  font: "Manrope",
  PW: 13.33, PH: 7.5, M: 0.6,
  railW: 2.95, contentX: 0.6 + 3.3, // left rail + gutter
  logoBlack: __dirname + "/../assets/logo_black.png",
  logoWhite: __dirname + "/../assets/logo_white.png",
  logoAR: 665 / 270, // wordmark png aspect ratio (w/h)
};
SAPIA.contentW = SAPIA.PW - SAPIA.M - SAPIA.contentX;
// Bar/segment fill rotation, in the order the guide's styleframes use it.
SAPIA.viz = [SAPIA.pink, SAPIA.purple, SAPIA.lightblue, SAPIA.blue];

function newDeck({ title }) {
  const p = new pptxgen();
  p.defineLayout({ name: "WIDE", width: SAPIA.PW, height: SAPIA.PH });
  p.layout = "WIDE";
  p.title = title;
  return p;
}

// Every piece of text goes through T: Manrope, black, no margin.
const T = (s, t, o) =>
  s.addText(t, Object.assign({ fontFace: SAPIA.font, color: SAPIA.black, margin: 0 }, o));

function logo(s, { x, y, h = 0.4, white = false }) {
  s.addImage({ path: white ? SAPIA.logoWhite : SAPIA.logoBlack, x, y, h, w: h * SAPIA.logoAR });
}

// ---- Page anatomy -----------------------------------------------------------

// Guide-style header band: hairlines above and below a small text row, split
// into a left block (rail width) and a right block, with a gutter gap.
// Mirrors the guide's "Sapia.ai | Brand guidelines | Our brand | 36" layout, but
// the written name in customer-facing artefacts is always "Sapia.ai":
// The bare company name is a different company and Sapia.ai does not own that name.
function headerBand(s, { left = "Sapia.ai", doc = "", section = "", page = "" }) {
  const { M, PW, railW, contentX, black } = SAPIA;
  const rt = 0.5, rb = 0.88;
  for (const y of [rt, rb]) {
    s.addShape("line", { x: M, y, w: railW, h: 0, line: { color: black, width: 0.5 } });
    s.addShape("line", { x: contentX, y, w: PW - M - contentX, h: 0, line: { color: black, width: 0.5 } });
  }
  const o = { y: rt + 0.07, h: 0.24, fontSize: 8.5, valign: "middle" };
  T(s, left, Object.assign({ x: M, w: 1.6 }, o));
  T(s, doc, Object.assign({ x: M, w: railW, align: "right" }, o));
  T(s, section, Object.assign({ x: contentX, w: 4 }, o));
  if (page) T(s, page, Object.assign({ x: PW - M - 1.2, w: 1.2, align: "right" }, o));
}

// Left rail: section number top, optional bold subhead + Regular body lower.
function rail(s, { num = "", subhead = "", body = "", bodyY = 2.05 }) {
  const { M, railW } = SAPIA;
  if (num) T(s, num, { x: M, y: 1.02, w: railW, h: 0.4, fontSize: 16 });
  if (subhead) T(s, subhead, { x: M, y: bodyY, w: railW, h: 0.3, fontSize: 12.5, bold: true });
  if (body) T(s, body, { x: M, y: bodyY + (subhead ? 0.38 : 0), w: railW, h: 3.5, fontSize: 10.5, lineSpacing: 15.5, valign: "top" });
}

// Page title in the content area. Guide weight: Regular, sentence case.
function pageTitle(s, t) {
  T(s, t, { x: SAPIA.contentX, y: 0.98, w: SAPIA.contentW, h: 0.5, fontSize: 18 });
}

// Full content page in one call. Returns the slide.
function contentSlide(p, { doc = "", section = "", page = "", title = "", railOpts = null }) {
  const s = p.addSlide();
  headerBand(s, { doc, section, page });
  if (railOpts) rail(s, railOpts);
  if (title) pageTitle(s, title);
  return s;
}

// Cover: full-bleed pink, wordmark, big Regular title. Guide divider style.
function coverSlide(p, { title, subtitle = "", date = "", pageNum = "01" }) {
  const s = p.addSlide();
  s.background = { color: SAPIA.pink };
  logo(s, { x: SAPIA.M, y: 0.55, h: 0.46 });
  T(s, title, { x: SAPIA.M, y: 2.0, w: SAPIA.PW - 2 * SAPIA.M, h: 1.1, fontSize: 54 });
  if (subtitle) T(s, subtitle, { x: SAPIA.M, y: 3.15, w: SAPIA.PW - 2 * SAPIA.M, h: 0.5, fontSize: 20 });
  if (date) T(s, date, { x: SAPIA.M, y: 3.7, w: SAPIA.PW - 2 * SAPIA.M, h: 0.4, fontSize: 13 });
  if (pageNum) T(s, pageNum, { x: SAPIA.M, y: SAPIA.PH - 0.95, w: 2, h: 0.4, fontSize: 13 });
  return s;
}

// Section divider: full-bleed pink, big title top-left, number bottom-left.
function dividerSlide(p, { title, num = "" }) {
  const s = p.addSlide();
  s.background = { color: SAPIA.pink };
  T(s, title, { x: SAPIA.M, y: 0.8, w: SAPIA.PW - 2 * SAPIA.M, h: 2.2, fontSize: 44, valign: "top" });
  if (num) T(s, num, { x: SAPIA.M, y: SAPIA.PH - 0.95, w: 2, h: 0.4, fontSize: 13 });
  return s;
}

// Closing: black page, white wordmark, tagline. Logo-on-black is sanctioned.
function closingSlide(p, { tagline = "The hires that stay." } = {}) {
  const s = p.addSlide();
  s.background = { color: SAPIA.black };
  logo(s, { x: SAPIA.M, y: 2.9, h: 0.62, white: true });
  T(s, tagline, { x: SAPIA.M, y: 3.85, w: SAPIA.PW - 2 * SAPIA.M, h: 0.6, fontSize: 22, color: SAPIA.white });
  return s;
}

// ---- Components -------------------------------------------------------------

// Rounded progress bar on a grey track. The styleframes' data-viz language.
function bar(s, { x, y, w, pct, color = SAPIA.black, h = 0.17 }) {
  const r = { rectRadius: h / 2 };
  s.addShape("roundRect", Object.assign({ x, y, w, h, fill: { color: SAPIA.grey }, line: { type: "none" } }, r));
  if (pct > 0)
    s.addShape("roundRect", Object.assign({ x, y, w: Math.max(h, w * pct / 100), h, fill: { color }, line: { type: "none" } }, r));
}

// Pink rounded callout card with a short bold lead-in ("Did you know?" style).
function card(s, { x, y, w, h, head, body, fill = SAPIA.pink }) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.14, fill: { color: fill }, line: { type: "none" } });
  if (head) T(s, head, { x: x + 0.28, y: y + 0.16, w: w - 0.56, h: 0.3, fontSize: 12, bold: true });
  if (body) T(s, body, { x: x + 0.28, y: y + 0.48, w: w - 0.56, h: h - 0.6, fontSize: 10.5, lineSpacing: 14.5, valign: "top" });
}

// Vertical milestone list: numbered pink dots on a grey hairline spine.
function milestones(s, items, { x = SAPIA.contentX, y = 1.85, step = 0.8 } = {}) {
  const d = 0.5;
  s.addShape("line", { x: x + d / 2, y: y + d / 2, w: 0, h: step * (items.length - 1), line: { color: SAPIA.grey, width: 1 } });
  items.forEach((it, i) => {
    const cy = y + i * step;
    s.addShape("ellipse", { x, y: cy, w: d, h: d, fill: { color: SAPIA.pink }, line: { type: "none" } });
    T(s, String(i + 1), { x, y: cy, w: d, h: d, fontSize: 12, align: "center", valign: "middle" });
    T(s, it.head, { x: x + d + 0.3, y: cy - 0.04, w: SAPIA.contentW - d - 0.3, h: 0.3, fontSize: 13 });
    if (it.sub) T(s, it.sub, { x: x + d + 0.3, y: cy + 0.27, w: SAPIA.contentW - d - 0.3, h: 0.26, fontSize: 10.5 });
  });
}

// Row of big stats: Regular-weight values (large Regular reads light), small labels.
function statRow(s, stats, { x = SAPIA.contentX, y = 2.2, w = SAPIA.contentW } = {}) {
  const cw = w / stats.length;
  stats.forEach((st, i) => {
    T(s, st.value, { x: x + i * cw, y, w: cw - 0.3, h: 0.9, fontSize: 40 });
    T(s, st.label, { x: x + i * cw, y: y + 0.95, w: cw - 0.3, h: 0.6, fontSize: 10.5, lineSpacing: 14.5, valign: "top" });
  });
}

// Pill label: pink pill, small letterspaced uppercase ("BOOK DEMO" style).
function pill(s, { x, y, text, w = 1.6, fill = SAPIA.pink }) {
  const h = 0.34;
  s.addShape("roundRect", { x, y, w, h, rectRadius: h / 2, fill: { color: fill }, line: { type: "none" } });
  T(s, text.toUpperCase(), { x, y, w, h, fontSize: 9, align: "center", valign: "middle", charSpacing: 2 });
}

// Minimal table: bold header row, grey hairlines between rows, no cell fills.
function table(s, { x = SAPIA.contentX, y = 1.8, w = SAPIA.contentW, widths, header, rows, rowH = 0.36 }) {
  const tot = widths.reduce((a, b) => a + b, 0);
  const ws = widths.map(v => v / tot * w);
  const colX = i => x + ws.slice(0, i).reduce((a, b) => a + b, 0);
  header.forEach((hd, i) => T(s, hd, { x: colX(i), y, w: ws[i] - 0.12, h: 0.28, fontSize: 9.5, bold: true }));
  s.addShape("line", { x, y: y + 0.3, w, h: 0, line: { color: SAPIA.black, width: 0.5 } });
  rows.forEach((row, r) => {
    const ry = y + 0.38 + r * rowH;
    row.forEach((cell, i) => T(s, String(cell), { x: colX(i), y: ry, w: ws[i] - 0.12, h: rowH, fontSize: 10.5, valign: "middle" }));
    s.addShape("line", { x, y: ry + rowH, w, h: 0, line: { color: SAPIA.grey, width: 0.75 } });
  });
}

module.exports = {
  SAPIA, newDeck, T, logo,
  headerBand, rail, pageTitle, contentSlide, coverSlide, dividerSlide, closingSlide,
  bar, card, milestones, statRow, pill, table,
};
