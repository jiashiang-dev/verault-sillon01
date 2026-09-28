'use client';

import GlyphPortal from './glyph-portal';
import { AnimatedTestimonials, type ProductDetail } from './animated-testimonials';
import './sillon-glyph-portal.css';

const details: readonly ProductDetail[] = [
  {
    number: '01',
    name: 'DIAL',
    copy: 'Graphite dial / paired twelve index / recessed minute track',
    image: '/images/verault/sillon01-dial-macro.png',
    alt: 'Graphite Sillon 01 dial with paired twelve index, central hands and recessed minute track',
  },
  {
    number: '02',
    name: 'CROWN',
    copy: 'Manual winding / machined grip / polished transition',
    image: '/images/verault/sillon01-crown-macro.png',
    alt: 'Machined winding crown beside the brushed steel Sillon 01 case',
  },
  {
    number: '03',
    name: 'CASE',
    copy: 'Brushed steel / polished chamfer / signature lug line',
    image: '/images/verault/sillon01-lug-detail.png',
    alt: 'Close view of the brushed steel lug and polished case chamfer',
  },
  {
    number: '04',
    name: 'LEATHER',
    copy: 'Dark umber leather / natural grain / tonal construction',
    image: '/images/verault/sillon01-material-macro.png',
    alt: 'Dark umber leather strap and brushed steel buckle in a close material study',
  },
  {
    number: '05',
    name: 'MOVEMENT',
    copy: 'Manual-wind mechanical architecture / Sellita SW210-1 reference',
    image: '/images/verault/sillon01-caseback-movement.png',
    alt: 'Close crop of the proposed manual-wind movement through the exhibition caseback',
  },
];

/** The imported portal's word, camera and reveal structure remain the composition. */
export function SillonGlyphPortal() {
  return (
    <section id="materials" className="story-chapter sillon-glyph" aria-labelledby="materials-title">
      <GlyphPortal
        word="VÉRAULT"
        focusChar="R"
        fontFamily="'Segoe UI Variable Display', 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight={700}
        scrollLength={2.4}
        interactive
        enterLabel="Examine the details"
        className="sillon-glyph__portal"
        style={{
          '--gp-paper': 'var(--paper)',
          '--gp-ink': 'var(--text-on-paper)',
          '--gp-field': 'var(--charcoal)',
          '--gp-foreground': 'var(--text-on-dark)',
        }}
        background={<div className="sillon-glyph__solid-field" />}
        front={
          <>
            <div className="sillon-glyph__header" aria-hidden="true">
              <span className="sillon-glyph__brand">VÉRAULT</span>
              <span className="sillon-glyph__category">05 / CHARACTER IN DETAIL</span>
            </div>
            <p className="sillon-glyph__eyebrow">SILLON 01 / A CLOSER VIEW</p>
            <p className="sillon-glyph__support">Five details. One considered form.</p>
            <span className="sillon-glyph__scroll" aria-hidden="true">SCROLL TO ENTER ↓</span>
          </>
        }
      >
        <div className="sillon-glyph__content">
          <h2 id="materials-title">Character in detail.</h2>
          <AnimatedTestimonials details={details} className="sillon-glyph__showcase" />
        </div>
      </GlyphPortal>
    </section>
  );
}
