"use client";

import { useEffect } from "react";
import { attachYarn } from "@/lib/yarn";

/** Mounts the cat's ball of yarn (lib/yarn.ts) on the desk. */
export default function YarnController() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>("[data-notebook]");
    if (!stage) return;
    return attachYarn(stage);
  }, []);

  return null;
}
