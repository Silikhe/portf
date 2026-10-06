import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectImage } from "@/components/project-image";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Silikhe" },
      {
        name: "description",
        content:
          "Selected product design work by Silikhe — fintech, ed-tech, mobility, and editorial.",
      },
      { property: "og:title", content: "Work — Silikhe" },
      {
        property: "og:description",
        content:
          "Selected product design work by Silikhe — fintech, ed-tech, mobility, and editorial.",
      },
    ],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="glass-panel fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-[1440px] px-6 py-4 md:px-16 md:py-5">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-[32px] font-bold tracking-tight transition-transform duration-300 hover:scale-[1.02]"
          >
            Silikhe <span>.</span>
          </Link>
          <nav className="glass-pill flex items-center gap-3 rounded-full px-3 py-1.5 text-[15px] md:gap-6 md:text-[17px]">
            <Link
              to="/work"
              className="rounded-full px-3 py-1 transition-all duration-300 hover:bg-white/5"
            >
              Work
            </Link>
            <Link
              to="/about"
              className="rounded-full px-3 py-1 transition-all duration-300 hover:bg-white/5"
            >
              About
            </Link>
            <a
              href="mailto:silikhesilas@gmail.com"
              className="rounded-full px-3 py-1 transition-all duration-300 hover:bg-white/5"
            >
              Resume
            </a>
          </nav>
        </div>
      </header>

      <section className="glass-panel relative mx-auto mt-24 w-full max-w-[1440px] overflow-hidden rounded-[32px] px-6 pb-16 pt-36 md:mt-28 md:px-16 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_22%)]" />
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              All Work
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-4">
            <h1 className="text-[36px] md:text-[64px] font-medium tracking-[-0.025em] leading-[1.04] max-w-[20ch]">
              {projects.length} projects shaped end-to-end.
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {projects.map((p, i) => (
            <Link key={p.slug} to="/work/$slug" params={{ slug: p.slug }} className="group block">
              <div
                className={`micro-hover zoom-glass group relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm md:rounded-[32px] bg-gradient-to-br ${p.bg}`}
              >
                {p.cover ? (
                  <ProjectImage
                    image={p.cover}
                    alt={p.name}
                    loading="lazy"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <span className="text-white/70 text-[11px] uppercase tracking-[0.22em]">
                      {p.client}
                    </span>
                    <span className="text-white/90 text-[28px] md:text-[40px] font-medium tracking-[-0.02em] leading-[1.05] max-w-[14ch]">
                      {p.name}
                    </span>
                  </div>
                )}
                <span className="absolute top-5 left-5 text-[11px] tabular-nums text-white/70 uppercase tracking-[0.22em]">
                  {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <h3 className="text-[20px] md:text-[22px] font-medium tracking-[-0.01em] truncate">
                    {p.name}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-muted-foreground mt-1 line-clamp-2">
                    {p.tagline}
                  </p>
                </div>
                <span className="shrink-0 text-[13px] text-muted-foreground pt-1 group-hover:text-foreground transition-colors">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="glass-panel mx-auto mb-6 mt-20 w-full max-w-[1440px] rounded-[24px] px-6 py-6 text-[13px] text-muted-foreground">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Silikhe Silas</span>
          <div className="flex flex-wrap gap-4">
            <Link to="/work" className="transition-colors hover:text-foreground">
              Work
            </Link>
            <Link to="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
            <a
              href="mailto:silikhesilas@gmail.com"
              className="transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
