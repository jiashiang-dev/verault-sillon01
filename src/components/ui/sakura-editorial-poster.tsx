"use client";

import { useEffect, useRef, useState } from "react";

export type SakuraEditorialKeyword = {
  label: string;
};

export type SakuraEditorialPosterProps = {
  id?: string;
  title?: string;
  keywords?: SakuraEditorialKeyword[];
  headline?: string;
  body?: string;
  subheadline?: string;
  footerLeft?: string;
  footerCenter?: string;
  footerRight?: string;
  socialHandle?: string;
  sceneSrc?: string;
  sceneWebpSrc?: string;
  sceneMobileSrc?: string;
  sceneMobileWebpSrc?: string;
  sceneMobileWidth?: number;
  sceneMobileHeight?: number;
  sceneAlt?: string;
  sceneWidth?: number;
  sceneHeight?: number;
  foregroundSrc?: string | null;
  foregroundAlt?: string;
  height?: string;
  forceProgress?: number;
  preview?: boolean;
  variant?: "sakura" | "verault";
  className?: string;
};

const DEFAULT_SCENE = "/images/sakura/blossoms-pascal-debrunner.jpg";
const FONT_LINK_ID = "sakura-editorial-poster-fonts";
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500;600&family=Saira+Extra+Condensed:wght@700;800&display=swap";

export const SAKURA_EDITORIAL_DEFAULT_KEYWORDS: SakuraEditorialKeyword[] = [
  { label: "Bloom" },
  { label: "Pause" },
  { label: "Return" },
];

const DEFAULT_BODY =
  "For a few still days the canopy turns pale pink, and the street below goes quiet. Walk while the color lasts — it is already leaving, petal by petal, into the wind.";

const FRAME_PAD_CLASS = "p-[clamp(1.25rem,4vmin,2.5rem)]";

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function getScrollParent(el: HTMLElement): HTMLElement | Window {
  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const style = window.getComputedStyle(node);
    const oy = style.overflowY;
    const canScroll =
      (oy === "auto" || oy === "scroll" || oy === "overlay") &&
      node.scrollHeight > node.clientHeight + 1;
    if (canScroll) {
      if (node === document.documentElement || node === document.body) {
        return window;
      }
      return node;
    }
    node = node.parentElement;
  }
  return window;
}

function readScrollProgress(
  track: HTMLElement,
  scrollRoot: HTMLElement | Window,
): number {
  const useWindowScroll =
    !(scrollRoot instanceof HTMLElement) ||
    (typeof document !== "undefined" &&
      (scrollRoot === document.documentElement || scrollRoot === document.body));

  if (useWindowScroll) {
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const scrollable = track.offsetHeight - vh;
    if (scrollable <= 0) return 1;
    return clamp01(-rect.top / scrollable);
  }

  const rootRect = scrollRoot.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();
  const scrollable = track.offsetHeight - scrollRoot.clientHeight;
  if (scrollable <= 0) return 1;
  return clamp01((rootRect.top - trackRect.top) / scrollable);
}

type TitleChar = {
  key: string;
  char: string;
  index: number;
  fromCenter: number;
};

function splitTitleChars(title: string): TitleChar[] {
  const chars = Array.from(title);
  const mid = Math.max(chars.length - 1, 1) / 2;
  return chars.map((char, index) => ({
    key: `${index}-${char === " " ? "sp" : char}`,
    char: char === " " ? "\u00A0" : char,
    index,
    fromCenter: mid <= 0 ? 0 : Math.abs(index - mid) / mid,
  }));
}

function charReveal(progress: number, fromCenter: number): number {
  const start = fromCenter * 0.55;
  const end = Math.min(1, start + 0.38);
  return clamp01((progress - start) / Math.max(0.001, end - start));
}

function useSakuraEditorialFonts(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof document === "undefined") return;
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, [enabled]);
}

function SakuraFitTitle({
  title,
  revealProgress,
  variant,
}: {
  title: string;
  revealProgress: number;
  variant: "sakura" | "verault";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [fontPx, setFontPx] = useState<number | null>(null);
  const chars = splitTitleChars(title);
  const titleProgress = clamp01(revealProgress / 0.4);
  const verault = variant === "verault";
  const family = verault
    ? '"Segoe UI Variable Display", "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif'
    : '"Saira Extra Condensed", "Arial Narrow", sans-serif';
  const weight = verault ? 500 : 800;

  useEffect(() => {
    const wrap = wrapRef.current;
    const probe = probeRef.current;
    if (!wrap || !probe) return;

    const PROBE = 100;
    let cancelled = false;
    const fit = () => {
      if (cancelled) return;
      const next = (wrap.clientWidth / Math.max(1, probe.scrollWidth)) * PROBE;
      if (!Number.isFinite(next) || next <= 0) return;
      setFontPx(next);
    };

    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    const fonts = document.fonts;
    const onFonts = () => {
      void fonts?.ready.then(fit);
    };
    fonts?.addEventListener?.("loadingdone", onFonts);
    void (async () => {
      if (!verault) {
        try {
          await fonts?.load?.('800 100px "Saira Extra Condensed"');
        } catch {
          /* fallback metrics */
        }
      }
      await fonts?.ready;
      fit();
    })();
    fit();

    return () => {
      cancelled = true;
      ro.disconnect();
      fonts?.removeEventListener?.("loadingdone", onFonts);
    };
  }, [title, verault]);

  const titleStyle = {
    fontFamily: family,
    fontWeight: weight,
    letterSpacing: verault ? "-0.045em" : "0.02em",
    WebkitFontSmoothing: "antialiased" as const,
    MozOsxFontSmoothing: "grayscale" as const,
    textRendering: "geometricPrecision" as const,
  };

  return (
    <div
      data-sakura-title-wrap
      ref={wrapRef}
      className="absolute inset-x-[4%] top-[4%] z-20 overflow-visible"
    >
      <span
        ref={probeRef}
        aria-hidden
        className="pointer-events-none invisible absolute whitespace-nowrap uppercase leading-none"
        style={{ ...titleStyle, fontSize: 100 }}
      >
        {title}
      </span>
      <h1
        data-sakura-title
        className="m-0 overflow-visible whitespace-nowrap text-left uppercase leading-none text-white"
        style={{
          ...titleStyle,
          fontSize: fontPx != null
            ? `${fontPx * (verault ? 0.82 : 1)}px`
            : verault ? "min(29.52cqw, 42.64cqh)" : "min(36cqw, 52cqh)",
        }}
      >
        {chars.map((item) => {
          const t = charReveal(titleProgress, item.fromCenter);
          const y = (1 - t) * (18 + item.fromCenter * 24);
          const side = item.index < chars.length / 2 ? 1 : -1;
          const x =
            (1 - t) *
            (item.fromCenter > 0.01 ? item.fromCenter * 16 * side : 0);
          return (
            <span
              key={item.key}
              aria-hidden
              className="inline-block"
              style={{
                opacity: t,
                transform: `translate3d(${x}px, ${y}px, 0)`,
              }}
            >
              {item.char}
            </span>
          );
        })}
        <span className="sr-only">{title}</span>
      </h1>
    </div>
  );
}

function SakuraHeroVisual({
  title,
  sceneSrc,
  sceneWebpSrc,
  sceneMobileSrc,
  sceneMobileWebpSrc,
  sceneMobileWidth,
  sceneMobileHeight,
  sceneAlt,
  sceneWidth,
  sceneHeight,
  foregroundSrc,
  foregroundAlt,
  revealProgress,
  variant,
}: {
  title: string;
  sceneSrc: string;
  sceneWebpSrc?: string;
  sceneMobileSrc?: string;
  sceneMobileWebpSrc?: string;
  sceneMobileWidth?: number;
  sceneMobileHeight?: number;
  sceneAlt: string;
  sceneWidth: number;
  sceneHeight: number;
  foregroundSrc: string | null;
  foregroundAlt: string;
  revealProgress: number;
  variant: "sakura" | "verault";
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <picture>
          {sceneMobileWebpSrc ? <source media="(max-width: 639px)" srcSet={sceneMobileWebpSrc} type="image/webp" width={sceneMobileWidth} height={sceneMobileHeight} /> : null}
          {sceneMobileSrc ? <source media="(max-width: 639px)" srcSet={sceneMobileSrc} width={sceneMobileWidth} height={sceneMobileHeight} /> : null}
          {sceneWebpSrc ? <source srcSet={sceneWebpSrc} type="image/webp" /> : null}
          <img
            data-sakura-scene
            src={sceneSrc}
            alt={sceneAlt}
            width={sceneWidth}
            height={sceneHeight}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full scale-105 object-cover object-center"
            draggable={false}
          />
        </picture>
        <div
          data-sakura-noise
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <SakuraFitTitle title={title} revealProgress={revealProgress} variant={variant} />

      {foregroundSrc ? (
        <img
          src={foregroundSrc}
          alt={foregroundAlt}
          className="pointer-events-none absolute bottom-0 left-1/2 z-30 h-auto w-[min(92%,78cqh)] -translate-x-[40%] object-contain object-bottom drop-shadow-[0_10px_28px_rgba(40,20,20,0.18)]"
          draggable={false}
        />
      ) : null}

      <div
        data-sakura-fade
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[35] bg-gradient-to-b from-transparent via-transparent to-[#f5f5f0]/18"
      />
    </div>
  );
}

function SakuraEditorialCopy({
  keywordItems,
  headline,
  body,
  subheadline,
  footerLeft,
  footerCenter,
  footerRight,
  socialHandle,
  variant,
}: {
  keywordItems: SakuraEditorialKeyword[];
  headline: string;
  body: string;
  subheadline: string;
  footerLeft: string;
  footerCenter: string;
  footerRight: string;
  socialHandle?: string;
  variant: "sakura" | "verault";
}) {
  const verault = variant === "verault";
  return (
    <div data-sakura-copy className="relative flex min-h-[38%] flex-col border-0 bg-transparent p-[clamp(1.1rem,4.5cqw,2.25rem)] text-[#f6eee8]">
      <div
        data-sakura-copy-gradient
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#33252a]/90 via-[#4a2c32]/60 to-transparent sm:from-[#4a2c32]/55 sm:via-[#c99aa0]/25"
      />
      <div className="relative z-10 flex items-start justify-between gap-3 text-[10px] font-light tracking-[0.16em] text-[#f6eee8]/80 sm:text-[clamp(9px,1.7cqw,11px)]">
        {keywordItems.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>

      <h2
        className="relative z-10 mt-[clamp(0.7rem,2.2cqw,1.15rem)] text-[21px] font-semibold leading-[1.2] text-[#f6eee8] sm:text-[clamp(1.2rem,3.6cqw,1.7rem)] sm:leading-[1.3]"
        style={{
          fontFamily: verault
            ? '"Segoe UI Variable Display", "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif'
            : '"Cormorant Garamond", "Hiragino Mincho ProN", "Yu Mincho", Georgia, serif',
          fontWeight: verault ? 400 : undefined,
        }}
      >
        {headline}
      </h2>

      <p className="relative z-10 mt-[clamp(0.5rem,1.6cqw,0.75rem)] max-w-[34ch] text-[13px] font-light leading-[1.5] text-[#f6eee8]/90 sm:max-w-[62%] sm:text-[clamp(10px,1.7cqw,12px)] sm:leading-[1.55]">
        {body}
      </p>

      <p
        className="relative z-10 mt-[clamp(0.65rem,2cqw,0.95rem)] text-[16px] font-medium leading-[1.35] text-[#f6eee8] sm:text-[clamp(0.95rem,2.6cqw,1.2rem)]"
        style={{ fontFamily: verault ? 'var(--font-sans)' : '"Jost", ui-sans-serif, sans-serif' }}
      >
        {subheadline}
      </p>

      <div className="relative z-10 mt-auto flex items-end justify-between gap-3 pt-[clamp(0.7rem,2.4cqw,1.1rem)] text-[clamp(9px,1.6cqw,11px)] font-light tracking-[0.08em] text-[#f6eee8]/75">
        <span>{footerLeft}</span>
        <span>{footerCenter}</span>
        <span>{footerRight}</span>
      </div>

      {socialHandle ? (
        <span className="absolute bottom-[clamp(0.35rem,1.2cqw,0.65rem)] right-[clamp(0.75rem,4.5cqw,2.25rem)] z-10 text-[clamp(9px,2cqw,11px)] font-light tracking-[0.04em] text-[#f6eee8]/40">
          {socialHandle}
        </span>
      ) : null}
    </div>
  );
}

export function SakuraEditorialPoster({
  id,
  title = "SAKURA",
  keywords = SAKURA_EDITORIAL_DEFAULT_KEYWORDS,
  headline = "Petals Hold the Light | 花びらが光を抱く。",
  body = DEFAULT_BODY,
  subheadline = "Stay for the fall. 散るまで、見ていて。",
  footerLeft = "DesignLayer",
  footerCenter = "Vol. 01",
  footerRight = "03.26 2026",
  socialHandle = "@designlayer",
  sceneSrc = DEFAULT_SCENE,
  sceneWebpSrc,
  sceneMobileSrc,
  sceneMobileWebpSrc,
  sceneMobileWidth,
  sceneMobileHeight,
  sceneAlt = "Pink cherry blossoms against a dark, softly blurred background",
  sceneWidth = 2400,
  sceneHeight = 3600,
  foregroundSrc = null,
  foregroundAlt = "Cherry blossom branch in the foreground",
  height = "280vh",
  forceProgress,
  preview = false,
  variant = "sakura",
  className,
}: SakuraEditorialPosterProps) {
  useSakuraEditorialFonts(variant === "sakura");

  const trackRef = useRef<HTMLElement>(null);
  const keywordItems = keywords.filter((item) => item.label.trim().length > 0);

  const locked = forceProgress != null && Number.isFinite(forceProgress);
  const [progress, setProgress] = useState(
    forceProgress != null ? clamp01(forceProgress) : 0,
  );
  const [stickyPx, setStickyPx] = useState<number | null>(null);

  const fillViewport = locked || preview;
  const trackHeight = fillViewport ? "auto" : height;
  const useSticky = !locked && !preview;

  useEffect(() => {
    if (locked || preview) {
      setProgress(clamp01(forceProgress ?? 0));
      setStickyPx(null);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollRoot = getScrollParent(track);
    let target = 0;
    let current = 0;
    let raf = 0;

    const read = () => {
      const fromRoot = readScrollProgress(track, scrollRoot);
      if (scrollRoot === window) return fromRoot;
      const fromWindow = readScrollProgress(track, window);
      return Math.abs(fromWindow - fromRoot) > 0.02 ? fromWindow : fromRoot;
    };

    const loop = () => {
      raf = 0;
      const delta = target - current;
      current += Math.abs(delta) > 0.35 ? delta * 0.22 : delta * 0.14;
      if (Math.abs(delta) < 0.0008) current = target;
      setProgress(current);
      if (current !== target) raf = window.requestAnimationFrame(loop);
    };

    const schedule = () => {
      if (raf === 0 && current !== target) raf = window.requestAnimationFrame(loop);
    };

    const onScroll = () => {
      if (motionPreference.matches) return;
      target = read();
      schedule();
    };

    const onResize = () => {
      if (scrollRoot === window) {
        setStickyPx(window.innerHeight);
      } else {
        setStickyPx((scrollRoot as HTMLElement).clientHeight);
      }
      if (!motionPreference.matches) {
        target = read();
        schedule();
      }
    };

    const onMotionChange = () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
      target = motionPreference.matches ? 1 : read();
      current = target;
      setProgress(current);
    };

    onMotionChange();
    onResize();

    const opts: AddEventListenerOptions = { passive: true };
    scrollRoot.addEventListener("scroll", onScroll, opts);
    window.addEventListener("resize", onResize);
    motionPreference.addEventListener("change", onMotionChange);

    return () => {
      scrollRoot.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      motionPreference.removeEventListener("change", onMotionChange);
      window.cancelAnimationFrame(raf);
    };
  }, [forceProgress, locked, preview]);

  const revealProgress = locked || preview ? clamp01(forceProgress ?? 0) : progress;
  const copyProgress = clamp01((revealProgress - 0.78) / 0.22);
  const copyOffset = `${(1 - copyProgress) * 100}%`;
  const panelHeight =
    useSticky && stickyPx != null
      ? stickyPx
      : fillViewport
        ? "100%"
        : ("100svh" as const);

  return (
    <section
      id={id}
      ref={trackRef}
      className={cn(
        "relative isolate w-full bg-[#ece8df]",
        fillViewport && "h-screen",
        className,
      )}
      style={{
        height: useSticky ? trackHeight : undefined,
        fontFamily: variant === "verault" ? 'var(--font-sans)' : '"Jost", ui-sans-serif, sans-serif',
      }}
    >
      <div
        data-sakura-frame
        className={cn(
          "box-border w-full overflow-hidden",
          FRAME_PAD_CLASS,
          useSticky ? "sticky top-0" : "relative",
        )}
        style={{ height: panelHeight }}
      >
        <article data-sakura-card className="@container relative flex h-full w-full min-h-0 flex-col overflow-hidden rounded-xl bg-[#f5f5f0] shadow-[0_24px_80px_rgba(80,50,50,0.12)]">
          <div className="@container relative min-h-0 flex-1 overflow-hidden [container-type:size]">
            <SakuraHeroVisual
              title={title}
              sceneSrc={sceneSrc}
              sceneWebpSrc={sceneWebpSrc}
              sceneMobileSrc={sceneMobileSrc}
              sceneMobileWebpSrc={sceneMobileWebpSrc}
              sceneMobileWidth={sceneMobileWidth}
              sceneMobileHeight={sceneMobileHeight}
              sceneAlt={sceneAlt}
              sceneWidth={sceneWidth}
              sceneHeight={sceneHeight}
              foregroundSrc={foregroundSrc}
              foregroundAlt={foregroundAlt}
              revealProgress={revealProgress}
              variant={variant}
            />
          </div>

          <div
            data-sakura-panel
            className="absolute inset-x-0 bottom-0 z-30 will-change-transform"
            style={{ transform: `translate3d(0, ${copyOffset}, 0)` }}
          >
            <SakuraEditorialCopy
              keywordItems={keywordItems}
              headline={headline}
              body={body}
              subheadline={subheadline}
              footerLeft={footerLeft}
              footerCenter={footerCenter}
              footerRight={footerRight}
              socialHandle={socialHandle}
              variant={variant}
            />
          </div>
        </article>
      </div>
    </section>
  );
}

export default SakuraEditorialPoster;
