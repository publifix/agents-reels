// Box-model constants shared between ChatBubble's actual styles and the
// height estimator below, so the two can never drift out of sync.
export const BUBBLE_PADDING_V = 16;
export const BUBBLE_PADDING_H = 20;
export const BUBBLE_BORDER_WIDTH = 1;
export const BUBBLE_HEADER_HEIGHT = 34; // avatar size dominates the header row
export const BUBBLE_HEADER_TO_TEXT_GAP = 8; // gap in the outer flex column
export const MESSAGE_FONT_SIZE = 27;
export const MESSAGE_LINE_HEIGHT = 1.35;

// Per-character width as a ratio of font-size, measured with Canvas
// (ctx.measureText at 200px) against the actual Space Grotesk 500 woff2
// used in this project. Using real measurements (rather than a single
// flat average) keeps word-wrap line-count predictions accurate without
// depending on the font being loaded yet at render time — this table is
// static data, not a runtime canvas/font call.
const CHAR_WIDTH_RATIOS: Record<string, number> = {
  "0": 0.645,
  "1": 0.435,
  "2": 0.6,
  "3": 0.605,
  "4": 0.63,
  "5": 0.6,
  "6": 0.615,
  "7": 0.56,
  "8": 0.61,
  "9": 0.615,
  a: 0.575,
  b: 0.64,
  c: 0.59,
  d: 0.64,
  e: 0.585,
  f: 0.44,
  g: 0.64,
  h: 0.615,
  i: 0.255,
  j: 0.26,
  k: 0.55,
  l: 0.255,
  m: 0.855,
  n: 0.615,
  o: 0.615,
  p: 0.64,
  q: 0.64,
  r: 0.385,
  s: 0.525,
  t: 0.46,
  u: 0.615,
  v: 0.545,
  w: 0.79,
  x: 0.595,
  y: 0.615,
  z: 0.52,
  A: 0.63,
  B: 0.665,
  C: 0.645,
  D: 0.665,
  E: 0.56,
  F: 0.535,
  G: 0.66,
  H: 0.655,
  I: 0.255,
  J: 0.6,
  K: 0.62,
  L: 0.545,
  M: 0.875,
  N: 0.665,
  O: 0.675,
  P: 0.605,
  Q: 0.675,
  R: 0.63,
  S: 0.61,
  T: 0.59,
  U: 0.67,
  V: 0.62,
  W: 0.885,
  X: 0.64,
  Y: 0.615,
  Z: 0.575,
  " ": 0.255,
  ".": 0.275,
  ",": 0.275,
  "!": 0.275,
  "?": 0.58,
  "¡": 0.275,
  "¿": 0.58,
  á: 0.575,
  é: 0.585,
  í: 0.255,
  ó: 0.615,
  ú: 0.615,
  Á: 0.63,
  É: 0.56,
  Í: 0.255,
  Ó: 0.675,
  Ú: 0.67,
  ñ: 0.615,
  Ñ: 0.665,
  ü: 0.615,
  Ü: 0.67,
  "+": 0.62,
  "/": 0.38,
  "-": 0.445,
  "(": 0.39,
  ")": 0.385,
  $: 0.61,
  ":": 0.275,
};

const DEFAULT_CHAR_WIDTH_RATIO = 0.6;

const estimateTextWidth = (text: string, fontSize: number): number => {
  let width = 0;
  for (const char of text) {
    width += (CHAR_WIDTH_RATIOS[char] ?? DEFAULT_CHAR_WIDTH_RATIO) * fontSize;
  }
  return width;
};

// Greedy word-wrap simulation, mirroring the browser's default text
// wrapping (breaks at spaces, never mid-word) closely enough to predict
// the real rendered line count.
const estimateWrappedLineCount = (
  text: string,
  maxWidthPx: number,
  fontSize: number,
): number => {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return 1;
  }

  const spaceWidth = estimateTextWidth(" ", fontSize);
  let lines = 1;
  let currentLineWidth = 0;

  for (const word of words) {
    const wordWidth = estimateTextWidth(word, fontSize);
    const widthWithWord =
      currentLineWidth === 0
        ? wordWidth
        : currentLineWidth + spaceWidth + wordWidth;

    if (widthWithWord > maxWidthPx && currentLineWidth > 0) {
      lines += 1;
      currentLineWidth = wordWidth;
    } else {
      currentLineWidth = widthWithWord;
    }
  }

  return lines;
};

// Estimates a ChatBubble's real rendered height (in px) for a given
// message text and bubble width, so the cascade can space bubbles apart
// based on their actual size instead of a fixed guess. Bubbles use
// box-sizing: border-box (via Tailwind's preflight), so `bubbleWidth`
// already includes padding and border.
export const estimateBubbleHeight = (
  text: string,
  bubbleWidth: number,
): number => {
  const contentWidth =
    bubbleWidth - BUBBLE_PADDING_H * 2 - BUBBLE_BORDER_WIDTH * 2;
  const lines = estimateWrappedLineCount(text, contentWidth, MESSAGE_FONT_SIZE);
  const textBlockHeight = lines * MESSAGE_FONT_SIZE * MESSAGE_LINE_HEIGHT;

  return (
    BUBBLE_PADDING_V * 2 +
    BUBBLE_BORDER_WIDTH * 2 +
    BUBBLE_HEADER_HEIGHT +
    BUBBLE_HEADER_TO_TEXT_GAP +
    textBlockHeight
  );
};
