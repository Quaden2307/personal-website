export {};

declare global {
  interface Window {
    /** Set once the client bundle has mounted; the boot script falls back to the static page without it. */
    __notebookReady?: boolean;
  }
}
