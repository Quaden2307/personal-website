import type { CSSProperties } from "react";

/** Pass CSS custom properties through React's style prop, e.g. cssVars({ "--i": 2 }). */
export function cssVars(vars: Record<`--${string}`, string | number>): CSSProperties {
  return vars as CSSProperties;
}
