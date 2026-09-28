import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import './watch-hero.css';

gsap.registerPlugin(ScrollTrigger);

/** The five-layer timeline is adapted from the original 21st.dev component. */
export function WatchHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();
    media.add(
      {
        desktop: '(min-width: 1024px)',
        compact: '(max-width: 1023px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (context.conditions?.reduceMotion) return;
        const compact = Boolean(context.conditions?.compact);
        const layers = root.querySelector<HTMLElement>('[data-parallax-layers]');
        if (!layers) return;

        const motion = compact ? [1, -1.5, -3, -4, -2] : [1, -3, -6, -8, -3];
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        motion.forEach((travel, index) => {
          const layer = layers.querySelector(`[data-parallax-layer="${index + 1}"]`);
          if (!layer) return;
          timeline.to(layer, {
            y: () => root.clientHeight * travel / 100,
            scale: index === 2 && !compact ? 1.02 : 1,
            ease: 'none',
          }, 0);
        });
      },
      root,
    );

    const image = root.querySelector('img');
    const refreshOnLoad = () => ScrollTrigger.refresh();
    if (image && !image.complete) image.addEventListener('load', refreshOnLoad, { once: true });
    return () => {
      image?.removeEventListener('load', refreshOnLoad);
      media.revert();
    };
  }, []);

  return (
    <section id="top" className="watch-hero" aria-labelledby="hero-title" ref={rootRef}>
      <div className="watch-hero__stage" data-parallax-layers>
        <div className="watch-hero__ground" data-parallax-layer="1" aria-hidden="true" />
        <h1 id="hero-title" className="watch-hero__title" data-parallax-layer="2">
          <span>SILLON</span><span className="watch-hero__title-number">01</span>
        </h1>
        <div className="watch-hero__image-wrap" data-parallax-layer="3">
          <picture>
            <source media="(max-width: 639px)" type="image/webp" srcSet="/images/verault/sillon01-front-master.webp" />
            <source media="(max-width: 639px)" srcSet="/images/verault/sillon01-front-master.png" />
            <source type="image/webp" srcSet="/images/verault/sillon01-hero-3q.webp" />
            <img
              src="/images/verault/sillon01-hero-3q.png"
              width="1536"
              height="1024"
              alt="Sillon 01 mechanical watch concept with graphite dial, steel case and dark leather strap."
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
        <p className="watch-hero__foreground-index" data-parallax-layer="4" aria-hidden="true">01 / SILLON</p>
        <div className="watch-hero__edge-detail" data-parallax-layer="5" aria-hidden="true">
          <span>DESIGN CONCEPT</span><span>01 — 07</span>
        </div>
      </div>

      <div className="watch-hero__content">
        <p className="watch-hero__eyebrow">SILLON 01 <span aria-hidden="true">/</span> MANUAL WIND</p>
        <div className="watch-hero__copy">
          <p className="watch-hero__tagline">Time, attended to.</p>
          <div className="watch-hero__actions">
            <a className="editorial-link editorial-link--light" href="#form">Explore the watch <ArrowDownRight size={18} strokeWidth={1.35} aria-hidden="true" /></a>
            <a className="watch-hero__secondary" href="#movement">The movement <ArrowUpRight size={15} strokeWidth={1.35} aria-hidden="true" /></a>
          </div>
        </div>
        <p className="watch-hero__technical">38.5 MM CASE <span aria-hidden="true">/</span> THREE CENTRAL HANDS</p>
      </div>
    </section>
  );
}

// Keep the original export for integrations that import the 21st.dev component.
export { WatchHero as ParallaxComponent };
