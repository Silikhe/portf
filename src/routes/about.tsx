import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Contact — Silikhe" },
      {
        name: "description",
        content: "About Silikhe — a product designer based in Kenya — and how to get in touch.",
      },
      { property: "og:title", content: "About & Contact — Silikhe" },
      {
        property: "og:description",
        content: "About Silikhe — a product designer based in Kenya — and how to get in touch.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="glass-panel fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-[1440px] px-6 py-4 md:px-16 md:py-5">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-[32px] font-bold tracking-tight transition-transform duration-300 hover:scale-[1.02]"
          >
            Silikhe.
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
              activeProps={{ className: "bg-white/10" }}
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

      {/* About */}
      <section
        id="about"
        className="glass-panel relative mx-auto mt-24 w-full max-w-[1440px] overflow-hidden rounded-[32px] px-6 pb-20 pt-36 md:mt-28 md:px-16 md:pb-28 md:pt-44"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_22%)]" />
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">About</p>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-4">
            <p className="text-[26px] md:text-[40px] leading-[1.2] tracking-[-0.02em] font-medium">
              5+ years collaborating with top agencies and product teams — transforming 30+
              businesses with research-led UX and considered interface design.
            </p>
            <div className="mt-10 space-y-6 text-[16px] md:text-[18px] leading-[1.6] text-muted-foreground max-w-[62ch]">
              <p>
                I'm Silikhe, a product designer based in Kenya. I work across mobile, web, and
                complex enterprise systems — grounded in field research, prototyping, and tight
                collaboration with engineering.
              </p>
              <p>
                My practice sits at the intersection of clarity and craft: simple flows, calm
                interfaces, and product decisions backed by evidence. I've led design for fintech,
                ed-tech, mobility, and compliance teams shipping to global users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-16 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Process</p>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-4">
            <p className="text-[17px] md:text-[20px] leading-[1.7] text-foreground/90 max-w-[65ch]">
              My process is usually user-centered. I start by listening closely to the people behind
              the problem, then turn that understanding into clear opportunities, lightweight
              prototypes, and decisions that are easy to test and even easier to scale.
            </p>
            <div className="mt-8 space-y-5">
              <div className="glass-pill rounded-2xl p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  01 / Discover
                </p>
                <p className="mt-2 text-[16px] md:text-[18px] leading-[1.7] text-muted-foreground">
                  I begin with interviews, observation, and product context to understand behaviors,
                  friction, and business constraints before suggesting direction.
                </p>
              </div>
              <div className="glass-pill rounded-2xl p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  02 / Define
                </p>
                <p className="mt-2 text-[16px] md:text-[18px] leading-[1.7] text-muted-foreground">
                  I translate insights into clear problems, user journeys, priorities, and design
                  principles so teams can align quickly.
                </p>
              </div>
              <div className="glass-pill rounded-2xl p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  03 / Design
                </p>
                <p className="mt-2 text-[16px] md:text-[18px] leading-[1.7] text-muted-foreground">
                  I shape flows, interfaces, and systems with attention to detail, accessibility,
                  and consistency across touchpoints.
                </p>
              </div>
              <div className="glass-pill rounded-2xl p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  04 / Validate
                </p>
                <p className="mt-2 text-[16px] md:text-[18px] leading-[1.7] text-muted-foreground">
                  I test early, learn fast, and refine the product until the experience feels
                  intuitive, useful, and measurable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="glass-panel mx-auto w-full max-w-[1440px] px-6 md:px-16 py-24 md:py-32"
      >
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Ready to innovate?
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 mt-6 md:mt-0">
            <a
              href="mailto:silikhesilas@gmail.com"
              className="block text-[clamp(40px,7.5vw,82px)] font-medium tracking-[-0.035em] leading-[1.02] hover:opacity-70 transition-opacity"
            >
              silikhesilas@gmail.com<span className="text-muted-foreground"> ↗</span>
            </a>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-[14px]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                  Location
                </p>
                <p className="text-foreground/90">Nairobi, Kenya</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                  Availability
                </p>
                <p className="text-foreground/90">Open for 2026 projects</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                  Writing
                </p>
                <a
                  href="https://medium.com/@silikhesilas"
                  className="text-foreground/90 hover:opacity-70"
                >
                  Medium ↗
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                  Email
                </p>
                <a
                  href="mailto:silikhesilas@gmail.com"
                  className="text-foreground/90 hover:opacity-70"
                >
                  silikhesilas@gmail.com
                </a>
              </div>
            </div>
          </div>
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
