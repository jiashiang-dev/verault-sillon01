import { SakuraEditorialPoster } from './sakura-editorial-poster';
import './verault-sakura-hero.css';

const heroKeywords = [
  { label: 'SILLON 01' },
  { label: 'MANUAL WIND' },
  { label: 'DESIGN CONCEPT' },
];

export function VeraultSakuraHero() {
  return (
    <SakuraEditorialPoster
      id="top"
      variant="verault"
      className="verault-sakura-hero"
      height="var(--verault-hero-track-height)"
      title="VÉRAULT"
      keywords={heroKeywords}
      headline="TIME, ATTENDED TO."
      body="A study in form, legibility and the daily winding ritual."
      subheadline="SILLON 01"
      footerLeft="VÉRAULT"
      footerCenter="SILLON 01"
      footerRight="01 / 07"
      socialHandle=""
      sceneSrc="/images/verault/sillon01-hero-3q.png"
      sceneWebpSrc="/images/verault/sillon01-hero-3q.webp"
      sceneMobileSrc="/images/verault/sillon01-front-master.png"
      sceneMobileWebpSrc="/images/verault/sillon01-front-master.webp"
      sceneMobileWidth={1024}
      sceneMobileHeight={1536}
      sceneWidth={1536}
      sceneHeight={1024}
      sceneAlt="Sillon 01 mechanical watch concept with graphite dial, brushed steel case, winding crown and dark leather strap"
      foregroundSrc={null}
    />
  );
}
