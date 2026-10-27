"use client";

import { useEffect } from "react";
import { attachNotebook } from "@/lib/notebook";

/** Mounts the page turning (lib/notebook.ts) on the notebook. */
export default function NotebookController() {
  useEffect(() => {
    window.__notebookReady = true;
    const root = document.querySelector<HTMLElement>("[data-notebook]");
    if (!root) return;
    return attachNotebook(root);
  }, []);

  return null;
}
