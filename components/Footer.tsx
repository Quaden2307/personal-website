export default function Footer() {
  return (
    <footer className="mt-10 border-t border-border">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-y-3 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-dust sm:px-8">
        <p>End of line · © {new Date().getFullYear()} Caden Sun</p>
        <p>Next.js · Tailwind · Vercel</p>
        <a href="#launch" className="transition-colors hover:text-amber">
          ↑ Return to launch
        </a>
      </div>
    </footer>
  );
}
