import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { VeraultSakuraHero } from '@/components/ui/verault-sakura-hero';
import { WatchStory } from '@/components/sections/WatchStory';

gsap.registerPlugin(ScrollTrigger);

function ScrollController() {
  useEffect(() => {
    const eligible = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;

    const sync = () => {
      if (eligible.matches && !lenis) {
        lenis = new Lenis({ smoothWheel: true, syncTouch: false });
        tick = (time) => lenis?.raf(time * 1000);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
      } else if (!eligible.matches && lenis) {
        if (tick) gsap.ticker.remove(tick);
        lenis.off('scroll', ScrollTrigger.update);
        lenis.destroy();
        lenis = undefined;
        tick = undefined;
      }
    };

    sync();
    eligible.addEventListener('change', sync);
    return () => {
      eligible.removeEventListener('change', sync);
      if (tick) gsap.ticker.remove(tick);
      lenis?.off('scroll', ScrollTrigger.update);
      lenis?.destroy();
    };
  }, []);
  return null;
}

const navigation = [
  { label: 'The watch', href: '#form' },
  { label: 'Design', href: '#dial' },
  { label: 'Movement', href: '#movement' },
  { label: 'On wrist', href: '#proportion' },
];

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<'dark' | 'paper'>('paper');
  const [portalOpening, setPortalOpening] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 36);
      const probe = 76;
      const atProbe = (id: string) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return Boolean(rect && rect.top <= probe && rect.bottom > probe);
      };
      const materials = document.getElementById('materials');
      const portal = materials?.querySelector<HTMLElement>('[data-gp-pin]')?.parentElement;
      const progress = Number(portal?.dataset.gpProgress ?? 0);
      const content = materials?.querySelector<HTMLElement>('[data-gp-content]')?.getBoundingClientRect();
      const contentAtProbe = Boolean(content && content.top <= probe && content.bottom > probe);
      const opening = atProbe('materials') && !contentAtProbe && progress < .74;
      const isPaper = atProbe('top') || atProbe('dial') || atProbe('proportion') || opening;
      setPortalOpening(opening);
      setTone(isPaper ? 'paper' : 'dark');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header" data-scrolled={scrolled} data-tone={tone} data-portal-opening={portalOpening}>
      <a className="site-header__brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="Vérault, back to top">VÉRAULT</a>
      <nav className="site-header__nav" id="primary-navigation" aria-label="Primary navigation" data-open={menuOpen}>
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        <a className="site-header__mobile-dossier" href="/dossier.html" onClick={() => setMenuOpen(false)}>View dossier</a>
      </nav>
      <a className="site-header__dossier" href="/dossier.html">View dossier <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden="true" /></a>
      <button
        className="site-header__menu-button"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} strokeWidth={1.3} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.3} aria-hidden="true" />}
        <span>{menuOpen ? 'Close' : 'Menu'}</span>
      </button>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><span className="site-footer__brand">VÉRAULT</span><p>A fictional contemporary watch concept created for a design portfolio. No watch is manufactured or offered for sale.</p></div>
      <nav className="site-footer__links" aria-label="Footer navigation">
        <a href="/dossier.html">Technical dossier</a>
        <a href="/case-study.html">Design case study</a>
        <a href="/credits.html">Credits &amp; accessibility</a>
      </nav>
      <a className="site-footer__top" href="#top">Back to top ↑</a>
    </footer>
  );
}

export default function Sillon01Page() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollController />
      <SiteHeader />
      <main id="main">
        <VeraultSakuraHero />
        <WatchStory />
      </main>
      <SiteFooter />
    </>
  );
}
