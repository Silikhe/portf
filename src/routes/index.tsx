import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import profile from "@/assets/profile.png";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Silikhe — Product Designer" },
      {
        name: "description",
        content:
          "Silikhe is a product designer based in Kenya, crafting innovative, user-centric digital experiences for global teams.",
      },
      { property: "og:title", content: "Silikhe — Product Designer" },
      {
        property: "og:description",
        content:
          "Product designer based in Kenya, crafting innovative, user-centric digital experiences for global teams.",
      },
    ],
  }),
  component: Index,
});

function CircleBadge() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/about"
      className="group relative block aspect-square w-28 shrink-0 sm:w-36 md:w-44 lg:w-52"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        viewBox="0 0 100 100"
        className={`absolute inset-0 h-full w-full transition-all duration-500 ${
          hovered ? "" : "animate-[spin_28s_linear_infinite]"
        }`}
      >
        <defs>
          <path id="circ" d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
        </defs>
        <text
          fontSize="7.2"
          fill="white"
          letterSpacing="2.6"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
        >
          <textPath href="#circ">SILAS SILIKHE · SR. PRODUCT DESIGNER · </textPath>
        </text>
      </svg>
      <div className="absolute inset-[14%] overflow-hidden rounded-full ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.02]">
        <img
          src={profile}
          alt="Silikhe"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/65 text-[13px] font-medium uppercase tracking-[0.22em] text-white transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          About →
        </div>
      </div>
    </Link>
  );
}

function Index() {
  const featured = projects.slice(0, 4);
  const more = projects.slice(4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="glass-panel relative mx-auto mt-14 w-full max-w-[1440px] overflow-hidden rounded-[28px] px-4 pb-32 pt-12 shadow-none sm:px-6 sm:pt-32 md:mt-40 md:rounded-[32px] md:px-16 md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="relative grid grid-cols-12 items-center gap-6 md:gap-8">
          <div className="col-span-12 text-center md:col-span-7 md:text-left">
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              5+ Years of UX Craft
            </p>
            <p className="mx-auto max-w-[48ch] text-[16px] leading-[1.5] text-foreground/90 sm:text-[18px] md:mx-0 md:text-[22px]">
              Hi, I'm Silikhe, an experienced product designer based in Kenya, crafting innovative
              and impactful solutions that resonate globally. I live for the sweet spot between
              aesthetics and functionality.
            </p>
          </div>
          <div className="col-span-12 flex justify-center md:col-span-4 md:col-start-9 md:justify-end">
            <CircleBadge />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-12 items-end gap-6 md:mt-14 md:gap-8">
          <div className="col-span-12 text-center md:col-span-8 md:text-left">
            <h1 className="font-medium tracking-[-0.035em] leading-[0.9] text-[clamp(52px,9vw,82px)]">
              Product Designer
              <br />
            </h1>
          </div>
          <div className="col-span-12 mt-6 flex justify-center md:col-span-4 md:mt-0 md:justify-end">
            <div className="flex w-full max-w-[240px] flex-col items-center gap-2 text-center text-[14px] md:items-end md:text-right md:text-[15px]">
              <a
                href="mailto:silikhesilas@gmail.com"
                className="glass-pill rounded-full px-3 py-1.5"
              >
                silikhesilas@gmail.com
              </a>
              <span className="text-muted-foreground transition-colors duration-300 hover:text-foreground">
                Scroll to explore ↓
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section
        id="work"
        className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-16 sm:px-6 md:px-16 md:pt-20"
      >
        {/* <div className='grid grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-16'>
          <div className='col-span-12 md:col-span-3'>
            <p className='text-[11px] uppercase tracking-[0.22em] text-muted-foreground'>
              Selected Work
            </p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-4'>
            <h2 className='text-[32px] md:text-[48px] font-medium tracking-[-0.025em] leading-[1.05] max-w-[24ch]'>
              A few projects I've shaped end-to-end.
            </h2>
          </div>
        </div> */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
          {featured.map((p, i) => (
            <Link key={p.slug} to="/work/$slug" params={{ slug: p.slug }} className="group block">
              <div
                className={`micro-hover zoom-glass group relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm md:rounded-[32px] bg-gradient-to-br ${p.bg}`}
              >
                {p.cover ? (
                  <img
                    src={p.cover}
                    alt={p.name}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
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

        {/* More projects — vertical carousel */}
        {/* {more.length > 0 && (
          <div className='mt-20 md:mt-28 grid grid-cols-12 gap-6 md:gap-8'>
            <div className='col-span-12 md:col-span-3'>
              <p className='text-[11px] uppercase tracking-[0.22em] text-muted-foreground'>
                More projects
              </p>
              <p className='mt-3 text-[14px] text-muted-foreground max-w-[24ch]'>
                Scroll for additional case studies.
              </p>
            </div>
            <div className='col-span-12 md:col-span-8 md:col-start-4'>
              <div className='relative'>
                <div className='max-h-[520px] overflow-y-auto snap-y snap-mandatory pr-2 -mr-2 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.15)_transparent]'>
                  <ul className='divide-y divide-white/10'>
                    {more.map((p, i) => (
                      <li key={p.slug} className='snap-start'>
                        <Link
                          to='/work/$slug'
                          params={{ slug: p.slug }}
                          className='group flex items-center gap-5 py-5 md:py-6'
                        >
                          <span className='w-10 shrink-0 text-[11px] tabular-nums text-muted-foreground uppercase tracking-[0.22em]'>
                            {String(featured.length + i + 1).padStart(2, "0")}
                          </span>
                          <div
                            className={`relative h-16 w-24 md:h-20 md:w-32 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${p.bg}`}
                          >
                            {p.cover && (
                              <img
                                src={p.cover}
                                alt=''
                                loading='lazy'
                                className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]'
                              />
                            )}
                          </div>
                          <div className='min-w-0 flex-1'>
                            <h3 className='text-[18px] md:text-[22px] font-medium tracking-[-0.01em] truncate'>
                              {p.name}
                            </h3>
                            <p className='text-[13px] md:text-[14px] text-muted-foreground mt-1 line-clamp-1'>
                              {p.tagline}
                            </p>
                          </div>
                          <span className='shrink-0 text-[13px] text-muted-foreground group-hover:text-foreground transition-colors'>
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent' />
              </div>
            </div>
          </div>
        )} */}

        <div className="mt-14 md:mt-16 flex justify-center">
          <Link
            to="/work"
            className="glass-pill inline-flex items-center gap-3 rounded-full bg-white/[0.08] px-6 py-3 text-[14px] font-medium md:text-[15px]"
          >
            More projects <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Expertise — compact */}
      <section className="mx-auto w-full max-w-[1440px] border-t border-white/10 px-4 py-10 sm:px-6 md:px-16 md:py-14">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground shrink-0">
            Expertise
          </span>
          <span className="text-[15px] md:text-[17px] text-foreground/80">
            Product Design, User Experience, Interface & Visual Design, Design Systems, Prototyping
            & Motion, Frontend Collaboration
          </span>
        </div>
      </section>

      {/* About teaser */}
      <section className="glass-panel mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 md:px-16 md:py-32">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">About</p>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-4">
            <p className="text-[26px] md:text-[40px] leading-[1.2] tracking-[-0.02em] font-medium">
              5+ years collaborating with top agencies and product teams — transforming 30+
              businesses with research-led UX and considered interface design.
            </p>
            <Link
              to="/about"
              className="glass-pill mt-10 inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 text-[15px] text-foreground"
            >
              About & contact <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-panel mx-auto mb-6 mt-16 w-full max-w-[1440px] rounded-[24px] px-4 py-6 text-[13px] text-muted-foreground sm:px-6 md:mt-20">
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
