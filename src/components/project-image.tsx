import { useEffect, useRef, useState } from "react";
import type { Picture } from "vite-imagetools";

type ProjectImageProps = {
  image: Picture;
  alt: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  className?: string;
  wrapperClassName?: string;
  showProgress?: boolean;
};

function selectWebpSource(srcset: string, targetWidth: number) {
  const candidates = srcset
    .split(",")
    .map((entry) => {
      const [src, descriptor] = entry.trim().split(/\s+/);
      return { src, width: Number.parseInt(descriptor ?? "", 10) };
    })
    .filter((candidate) => candidate.src && Number.isFinite(candidate.width));

  return (
    candidates.find((candidate) => candidate.width >= targetWidth)?.src ?? candidates.at(-1)?.src
  );
}

export function ProjectImage({
  image,
  alt,
  loading = "lazy",
  fetchPriority = "auto",
  sizes = "100vw",
  className = "block h-auto w-full",
  wrapperClassName = "",
  showProgress = false,
}: ProjectImageProps) {
  const fallbackSrc = image.img.src;
  const imageSources = image.sources;
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageSrc, setImageSrc] = useState<string>();
  const [shouldLoad, setShouldLoad] = useState(loading === "eager");
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!showProgress) return;
    if (loading === "eager") {
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
      { rootMargin: "400px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loading, showProgress]);

  useEffect(() => {
    if (!showProgress || !shouldLoad) return;

    const webpSrcset = imageSources?.webp ?? imageSources?.["image/webp"];
    const displayWidth =
      imgRef.current?.parentElement?.getBoundingClientRect().width ?? window.innerWidth;
    const targetWidth = Math.min(displayWidth * window.devicePixelRatio, 1920);
    const optimizedSrc = webpSrcset ? selectWebpSource(webpSrcset, targetWidth) : undefined;
    const request = new XMLHttpRequest();
    let objectUrl: string | undefined;

    request.open("GET", optimizedSrc ?? fallbackSrc);
    request.responseType = "blob";
    request.onprogress = (event) => {
      const total = event.lengthComputable
        ? event.total
        : Number(request.getResponseHeader("Content-Length"));
      if (total > 0) {
        setProgress(Math.min(99, Math.round((event.loaded / total) * 100)));
      }
    };
    request.onload = () => {
      if (request.status >= 200 && request.status < 300 && request.response instanceof Blob) {
        objectUrl = URL.createObjectURL(request.response);
        setImageSrc(objectUrl);
      } else {
        setImageSrc(fallbackSrc);
      }
    };
    request.onerror = () => setImageSrc(fallbackSrc);
    request.send();

    return () => {
      request.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fallbackSrc, imageSources, showProgress, shouldLoad]);

  const imageElement = (
    <img
      ref={imgRef}
      src={showProgress ? imageSrc : fallbackSrc}
      srcSet={showProgress ? undefined : (imageSources?.webp ?? imageSources?.["image/webp"])}
      width={image.img.w}
      height={image.img.h}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      sizes={sizes}
      onLoad={() => {
        if (showProgress) setProgress(100);
        setIsLoaded(true);
      }}
      onError={() => {
        if (showProgress && imageSrc && imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
      }}
      className={className}
    />
  );

  if (!showProgress) {
    return (
      <picture className="contents">
        {Object.entries(imageSources ?? {})
          .filter(([format]) => format.includes("avif") || format.includes("webp"))
          .map(([format, srcSet]) => (
            <source
              key={format}
              type={format.startsWith("image/") ? format : `image/${format}`}
              srcSet={srcSet}
              sizes={sizes}
            />
          ))}
        {imageElement}
      </picture>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-[#090909] ${wrapperClassName}`}>
      {!isLoaded && (
        <>
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(10,10,10,0.9)_55%)]" />
          {shouldLoad && (
            <div className="absolute left-1/2 top-1/2 z-10 w-[min(280px,calc(100%-32px))] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/40 bg-black/95 px-4 py-3 text-white shadow-[0_0_0_1px_rgba(0,0,0,0.8),0_12px_36px_rgba(0,0,0,0.65)]">
              <div className="mb-2 text-center text-sm font-medium">
                <span className="block">Loading image</span>
                <span className="mt-1 block text-lg font-semibold tabular-nums">{progress}%</span>
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
      {imageElement}
    </div>
  );
}
