import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUp, Link2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { getProject, projects, type Section } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const p = getProject(params.slug);
    const title = p ? `${p.name} — Silikhe` : "Case Study — Silikhe";
    const description = p?.description ?? "Case study from Silikhe's portfolio.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(p?.cover ? [{ property: "og:image", content: p.cover }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Case study not found.</p>
        <Link to="/" className="underline">
          Back to work
        </Link>
      </div>
    </div>
  ),
  component: CaseStudy,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function showProjectLinksToast(
  projectName: string,
  externalLinks: NonNullable<ReturnType<typeof getProject>>["externalLinks"],
): string | number | undefined {
  if (!externalLinks?.length) return;

  return toast.custom(
    (id) => (
      <div className="glass-panel w-[min(380px,calc(100vw-32px))] rounded-2xl border border-white/10 p-4 text-foreground shadow-[0_20px_55px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#dfe6df]">
              <Link2 aria-hidden="true" className="h-4 w-4" />
            </span>
            <p className="text-sm font-medium text-white">Explore {projectName}</p>
          </div>
          <button
            type="button"
            aria-label="Close project links"
            onClick={() => toast.dismiss(id)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {externalLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => toast.dismiss(id)}
              className="glass-pill inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-[#f3f6f3] transition-colors hover:bg-white/10"
            >
              {link.label}
              <Link2 aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    ),
    { duration: 10_000 },
  );
}

function ProjectImage({
  src,
  alt,
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageSrc, setImageSrc] = useState<string>();
  const [shouldLoad, setShouldLoad] = useState(eager);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!shouldLoad) return;

    const request = new XMLHttpRequest();
    let objectUrl: string | undefined;

    request.open("GET", src);
    request.responseType = "blob";
    request.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.min(99, Math.round((event.loaded / event.total) * 100)));
      }
    };
    request.onload = () => {
      if (request.status >= 200 && request.status < 300 && request.response instanceof Blob) {
        objectUrl = URL.createObjectURL(request.response);
        setImageSrc(objectUrl);
      } else {
        setImageSrc(src);
      }
    };
    request.onerror = () => setImageSrc(src);
    request.send();

    return () => {
      request.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [shouldLoad, src]);

  useEffect(() => {
    if (eager) {
      setShouldLoad(true);
      return;
    }

    const node = imgRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div className={`relative w-full overflow-hidden bg-[#090909] ${className}`}>
      {!isLoaded && (
        <>
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(10,10,10,0.9)_55%)]" />
          {shouldLoad && (
            <div className="absolute bottom-5 left-1/2 z-10 w-[min(280px,calc(100%-32px))] -translate-x-1/2 rounded-lg border border-white/40 bg-black/95 px-4 py-3 text-white shadow-[0_0_0_1px_rgba(0,0,0,0.8),0_12px_36px_rgba(0,0,0,0.65)]">
              <div className="mb-2 flex items-center justify-between gap-3 text-sm font-medium">
                <span>Loading image</span>
                <span className="tabular-nums">{progress}%</span>
              </div>
              <div
                role="progressbar"
                aria-label={`Loading ${alt}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                className="h-2 overflow-hidden rounded-full border border-white/35 bg-white/30"
              >
                <div
                  className="h-full rounded-full bg-[#c7ff5e] shadow-[0_0_12px_rgba(199,255,94,0.9)] transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </>
      )}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        sizes="100vw"
        onLoad={() => {
          setProgress(100);
          setIsLoaded(true);
        }}
        className={`block h-auto w-full transition-all duration-500 ${
          isLoaded ? "scale-100 opacity-100 blur-0" : "scale-[1.01] opacity-0 blur-sm"
        }`}
      />
    </div>
  );
}

function CaseStudyActions({
  projectName,
  externalLinks,
}: {
  projectName: string;
  externalLinks: NonNullable<ReturnType<typeof getProject>>["externalLinks"];
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 400);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {externalLinks?.length ? (
        <button
          type="button"
          aria-label={`Show ${projectName} links`}
          title="Show project links"
          onClick={() => showProjectLinksToast(projectName, externalLinks)}
          className="glass-panel-light flex h-12 w-12 items-center justify-center rounded-full text-[#343c38] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <Link2 aria-hidden="true" className="h-5 w-5" />
        </button>
      ) : null}
      {isVisible ? (
        <button
          type="button"
          aria-label="Back to top"
          title="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="glass-panel-light flex h-12 w-12 items-center justify-center rounded-full text-[#343c38] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <ArrowUp aria-hidden="true" className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const singleImage = project.sections.find((section) => section.image)?.image ?? project.cover;
  const externalLinks = project.externalLinks;

  useEffect(() => {
    if (!externalLinks?.length) return;

    let toastId: string | number | undefined;
    const timeoutId = window.setTimeout(() => {
      toastId = showProjectLinksToast(project.name, externalLinks);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
      if (toastId !== undefined) toast.dismiss(toastId);
    };
  }, [externalLinks, project.name]);

  if (project.singleImage) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader caseStudy />
        <div className="h-14 md:h-20" aria-hidden="true" />

        <section className="mx-auto w-full max-w-[1440px] px-6 pb-8 pt-10 md:px-16 md:pb-10 md:pt-16">
          <h1 className="font-bold tracking-[-0.035em] leading-[1.02] text-[clamp(48px,5vw,72px)]">
            {project.name}
          </h1>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-0 pb-10 md:pb-16">
          <div className="w-full overflow-hidden rounded-2xl bg-black">
            {(project.images ?? (singleImage ? [singleImage] : [])).map((image, index) => (
              <ProjectImage
                key={image}
                src={image}
                alt={`${project.name} case study image ${index + 1}`}
                eager={index === 0}
              />
            ))}
          </div>
        </section>
        <CaseStudyActions projectName={project.name} externalLinks={externalLinks} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader caseStudy />
      <div className="h-14 md:h-20" aria-hidden="true" />

      {/* Eyebrow + Title */}
      <section className="mx-auto w-full max-w-[1440px] px-6 md:px-16 pt-16 md:pt-28 pb-10 md:pb-16">
        <p className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
          Case Study
        </p>
        <h1 className="font-bold tracking-[-0.035em] leading-[1.02] text-[clamp(92px,8vw,58px)] max-w-full">
          {project.name}: <span className="text-muted-foreground">{project.tagline}</span>
        </h1>
        <p className="mt-10 max-w-[68ch] text-[18px] md:text-[22px] leading-[1.5] text-muted-foreground">
          {project.description}
        </p>
      </section>

      {/* Hero visual */}
      <section className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <div
          className={`relative aspect-[16/9] overflow-hidden rounded-[24px] md:rounded-[32px] bg-gradient-to-br ${project.bg}`}
        >
          {project.cover && (
            <ProjectImage
              src={project.cover}
              alt={project.name}
              eager
              className="absolute inset-0"
            />
          )}
        </div>
      </section>

      {/* Meta strip */}
      <section className="mx-auto w-full max-w-[1440px] px-6 md:px-16 py-16 md:py-20 border-b border-white/10 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-10">
          {[
            ["Client", project.client],
            ["Role", project.role],
            ["Year", project.year],
            ["Discipline", "Product Design"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                {k}
              </p>
              <p className="text-[16px]">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Body: TOC + content */}
      <section className="mx-auto w-full max-w-[1440px] px-6 md:px-16 pt-16 md:pt-28 pb-10 md:pb-16">
        {project.toc && (
          <div className="mb-8 flex justify-center">
            <nav className="glass-panel sticky top-4 z-20 inline-flex max-w-full items-center gap-2 rounded-full p-1.5">
              <span className="ml-3 mr-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                On this page
              </span>
              <ul className="flex flex-wrap items-center justify-center gap-1.5">
                {project.toc.map((t: string) => (
                  <li key={t}>
                    <a
                      href={`#${slugify(t)}`}
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-white/6 hover:text-foreground"
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        <div className="w-full">
          <div className="space-y-16 md:space-y-20">
            {project.sections.map((s: Section, i: number) => {
              const hasMedia = Boolean(s.image || (s.images && s.images.length > 0));
              const isAlternating = i % 2 === 1;

              return (
                <article key={s.heading} id={slugify(s.heading)} className="scroll-mt-24">
                  <div
                    className={`glass-panel rounded-[28px] p-7 md:p-10 ${
                      isAlternating ? "bg-white/[0.04]" : ""
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-8 ${hasMedia ? "md:flex-row" : ""} ${
                        hasMedia && isAlternating ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div className={hasMedia ? "md:w-[48%]" : "w-full"}>
                        <div className="flex items-baseline gap-4 mb-5">
                          <span className="text-[12px] tabular-nums text-muted-foreground">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h2 className="text-[26px] md:text-[34px] font-medium tracking-[-0.02em] leading-[1.15]">
                            {s.heading}
                          </h2>
                        </div>
                        {s.body && (
                          <p
                            className={`text-[17px] md:text-[19px] leading-[1.6] text-foreground/85 ${
                              hasMedia ? "max-w-none" : "max-w-[68ch]"
                            }`}
                          >
                            {s.body}
                          </p>
                        )}
                        {s.bullets && (
                          <ul
                            className={`mt-5 space-y-2.5 ${
                              hasMedia ? "max-w-none" : "max-w-[68ch]"
                            }`}
                          >
                            {s.bullets.map((b: string) => (
                              <li
                                key={b}
                                className="flex gap-3 text-[16px] md:text-[18px] leading-[1.5] text-foreground/85"
                              >
                                <span className="mt-[10px] inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-foreground/50" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {hasMedia && (
                        <div className="md:w-[52%]">
                          {s.image && (
                            <figure>
                              <div
                                className={
                                  s.imageFit === "natural"
                                    ? "overflow-hidden rounded-[20px] border border-white/5 bg-[#0a0a0a] md:rounded-[24px]"
                                    : "relative aspect-[16/9] overflow-hidden rounded-[20px] border border-white/5 bg-[#0a0a0a] md:rounded-[24px]"
                                }
                              >
                                <img
                                  src={s.image}
                                  alt={s.imageAlt ?? s.heading}
                                  loading={i === 0 ? "eager" : "lazy"}
                                  decoding="async"
                                  fetchPriority={i === 0 ? "high" : "auto"}
                                  className={
                                    s.imageFit === "natural"
                                      ? "block h-auto w-full object-contain"
                                      : "absolute inset-0 h-full w-full object-cover"
                                  }
                                />
                              </div>
                              {s.caption && (
                                <figcaption className="mt-3 text-[13px] text-muted-foreground">
                                  {s.caption}
                                </figcaption>
                              )}
                            </figure>
                          )}
                          {s.images && s.images.length > 0 && (
                            <figure>
                              <div className="overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03] p-3 md:p-4">
                                <div
                                  className="case-study-marquee flex w-max gap-4 md:gap-5"
                                  tabIndex={0}
                                >
                                  {[...s.images, ...s.images].map((img, idx) => (
                                    <div
                                      key={`${s.heading}-${idx}`}
                                      className="relative h-[260px] w-[190px] shrink-0 overflow-hidden rounded-[20px] border border-white/8 bg-black/20 md:h-[360px] md:w-[260px]"
                                    >
                                      <img
                                        src={img}
                                        alt={`${s.heading} preview ${idx + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {s.caption && (
                                <figcaption className="mt-3 text-[13px] text-muted-foreground">
                                  {s.caption}
                                </figcaption>
                              )}
                            </figure>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="pt-12 border-t border-white/10">
              <p className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                Thanks for reading
              </p>
              <p className="text-[18px]">
                Presented by <span className="font-medium">Silas Silikhe</span>, Senior Product
                Designer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="mx-auto w-full max-w-[1440px] px-6 md:px-16 py-20 border-t border-white/10">
        <Link to="/work/$slug" params={{ slug: next.slug }} className="group block">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Next case study
          </p>
          <div className="flex items-baseline justify-between gap-6 flex-wrap">
            <h3 className="text-[clamp(32px,5vw,72px)] font-medium tracking-[-0.02em] leading-[1.05] group-hover:opacity-70 transition-opacity">
              {next.name}
            </h3>
            <span className="text-[15px] text-muted-foreground group-hover:text-foreground transition-colors">
              View →
            </span>
          </div>
        </Link>
      </section>

      <footer className="mx-auto w-full max-w-[1440px] px-6 md:px-16 pb-10 pt-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[13px] text-muted-foreground">
        <span>© {new Date().getFullYear()} Silikhe Silas</span>
        <a href="mailto:silikhesilas@gmail.com" className="hover:text-foreground">
          silikhesilas@gmail.com
        </a>
      </footer>
      <CaseStudyActions projectName={project.name} externalLinks={externalLinks} />
    </div>
  );
}
