import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type SiteHeaderProps = {
  caseStudy?: boolean;
};

export function SiteHeader({ caseStudy = false }: SiteHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;

      if (currentScrollY <= 24) {
        setIsVisible(true);
        previousScrollY = currentScrollY;
        return;
      }

      if (Math.abs(scrollDelta) >= 8) {
        setIsVisible(scrollDelta < 0);
        previousScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-[1440px] transition-transform duration-300 ease-out ${
        caseStudy
          ? `glass-panel-light px-4 py-3 text-[#343c38] sm:px-6 md:px-16 md:py-5 ${isVisible ? "translate-y-0" : "-translate-y-full"}`
          : `glass-panel px-6 py-4 md:px-16 md:py-5 ${isVisible ? "translate-y-0" : "-translate-y-full"}`
      }`}
    >
      <div className={`flex items-center justify-between ${caseStudy ? "gap-3" : ""}`}>
        <Link
          to="/"
          className={
            caseStudy
              ? "text-[24px] font-bold tracking-tight text-[#343c38] transition-colors duration-300 hover:text-[#1f2522] sm:text-[28px] md:text-[32px]"
              : "text-[32px] font-bold tracking-tight transition-transform duration-300 hover:scale-[1.02]"
          }
        >
          Silikhe.
        </Link>
        <nav
          className={
            caseStudy
              ? "glass-pill flex items-center gap-1 rounded-full px-1.5 py-1 text-[13px] text-[#343c38] sm:gap-2 sm:px-2 sm:text-[14px] md:gap-6 md:px-3 md:text-[17px]"
              : "glass-pill flex items-center gap-3 rounded-full px-3 py-1.5 text-[15px] md:gap-6 md:text-[17px]"
          }
        >
          {caseStudy ? (
            <Link
              to="/work"
              className="rounded-full px-2.5 py-1 text-[#343c38] transition-all duration-300 hover:bg-black/5 hover:text-[#1f2522] sm:px-3"
            >
              Back to work
            </Link>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
