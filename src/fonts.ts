import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Space Grotesk";

const fontUrl = staticFile("fonts/SpaceGrotesk-Variable.woff2");

export const fontsLoaded = Promise.all([
  loadFont({ family: fontFamily, url: fontUrl, weight: "500" }),
  loadFont({ family: fontFamily, url: fontUrl, weight: "700" }),
]);
