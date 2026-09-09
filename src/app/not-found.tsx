import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center justify-center py-24 text-center md:py-32">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist, or may have moved. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-6 bg-foreground px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-background transition-opacity hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
