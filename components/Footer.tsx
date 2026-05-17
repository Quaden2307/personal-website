export default function Footer() {
  return (
    <footer className="border-t border-border/60 mt-10">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-y-3 px-6 py-8 sm:px-8 text-xs text-muted-foreground">
        <p className="font-mono">
          © {new Date().getFullYear()} Caden Sun
        </p>
        <p className="font-mono">
          Built with Next.js · Tailwind · Vercel
        </p>
        <a
          href="#top"
          className="font-mono hover:text-accent transition-colors"
        >
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}
