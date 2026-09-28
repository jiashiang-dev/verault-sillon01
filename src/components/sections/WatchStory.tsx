import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SillonGlyphPortal } from '@/components/ui/sillon-glyph-portal';
import './WatchStory.css';

type AssetImageProps = {
  src: string;
  description: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

function AssetImage({ src, description, width, height, className = '', priority = false }: AssetImageProps) {
  return (
    <div className={`story-asset ${className}`}>
      <picture>
        <source srcSet={src.replace(/\.png$/, '.webp')} type="image/webp" />
        <img
          src={src}
          alt={description}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </picture>
    </div>
  );
}

function ChapterLabel({ number, name }: { number: string; name: string }) {
  return <p className="story-chapter__label"><span>{number}</span><span className="story-chapter__label-rule" /><span>{name}</span></p>;
}

function EditorialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="story-link" href={href}><span>{children}</span><span aria-hidden="true">↗</span></a>;
}

function FormSection() {
  const sequenceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const sequence = sequenceRef.current;
      if (!sequence) return;
      const front = sequence.querySelector('.story-form__front');
      const angle = sequence.querySelector('.story-form__angle');
      if (!front || !angle) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sequence,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.25,
          invalidateOnRefresh: true,
        },
      });
      timeline.to(front, { opacity: 0, duration: 0.35, ease: 'none' }, 0.28);
      timeline.to(angle, { opacity: 1, duration: 0.35, ease: 'none' }, 0.28);
      return () => timeline.kill();
    });
    return () => media.revert();
  }, []);

  return (
    <section className="story-chapter story-form" id="form" aria-labelledby="form-title">
      <div className="story-form__sequence" ref={sequenceRef}>
        <div className="story-form__sticky story-shell">
          <div className="story-form__copy">
            <ChapterLabel number="02" name="FORM" />
            <h2 id="form-title">A line<br />of light.</h2>
            <p className="story-chapter__body">A shallow channel follows each lug. It appears when the light finds it, then gives the form back to shadow.</p>
            <div className="story-form__measure" aria-label="Design dimensions">
              <span>38.5 MM CASE</span>
              <span>45.8 MM LUG TO LUG</span>
            </div>
            <p className="story-chapter__qualification">DESIGN DIMENSIONS</p>
            <EditorialLink href="#dial">Examine the dial</EditorialLink>
          </div>
          <div className="story-form__views">
            <figure className="story-form__view story-form__front">
              <AssetImage src="/images/verault/sillon01-front-master.png" description="Front view of the Sillon 01 watch with a graphite dial and leather strap" width={1024} height={1536} />
              <figcaption>01 / THE WHOLE FORM</figcaption>
            </figure>
            <figure className="story-form__view story-form__angle">
              <AssetImage src="/images/verault/sillon01-side-profile.png" description="Side profile of the Sillon 01 steel case, crown, curved lugs and leather strap" width={1536} height={1024} />
              <figcaption>02 / THE CASE IN PROFILE</figcaption>
            </figure>
          </div>
        </div>
      </div>
      <figure className="story-form__detail story-shell">
        <AssetImage src="/images/verault/sillon01-lug-detail.png" description="Close view of a brushed steel lug, bezel and leather strap junction" width={1536} height={1024} />
        <figcaption><span>DETAIL 01</span><span>One channel on each lug. It ends before the strap gap.</span></figcaption>
      </figure>
    </section>
  );
}

function DialSection() {
  return (
    <section className="story-chapter story-dial" id="dial" aria-labelledby="dial-title">
      <div className="story-shell story-dial__grid">
        <div className="story-dial__copy">
          <ChapterLabel number="03" name="DIAL" />
          <h2 id="dial-title">Made<br />to read.</h2>
          <p className="story-chapter__body">Two marks at twelve. A recessed minute track. Nothing asks for attention before the time does.</p>
          <p className="story-dial__technical">THREE CENTRAL HANDS <span>/</span> 60 MINUTE MARKS</p>
        </div>
        <figure className="story-dial__main">
          <AssetImage src="/images/verault/sillon01-dial-macro.png" description="Close view of the graphite dial, paired index, three hands and minute track" width={1536} height={1024} />
          <figcaption><span>GRAPHITE DIAL / A CLEAR READING AT A GLANCE</span><a href="/images/verault/sillon01-front-master.png" target="_blank" rel="noopener noreferrer">View full front reference <span aria-hidden="true">↗</span></a></figcaption>
        </figure>
      </div>
      <figure className="story-shell story-dial__index">
        <div className="story-dial__index-heading"><span>01 / PAIR</span><span>THE TWELVE O'CLOCK MARK</span></div>
        <AssetImage src="/images/verault/sillon01-front-master.png" className="story-asset--index-crop" description="Closer view of the paired steel batons at twelve o'clock" width={1024} height={1536} />
        <figcaption>Two equal marks. One quiet point of recognition.</figcaption>
      </figure>
    </section>
  );
}

function MovementSection() {
  return (
    <section className="story-chapter story-movement" id="movement" aria-labelledby="movement-title">
      <div className="story-shell story-movement__opening">
        <figure className="story-movement__crown">
          <AssetImage src="/images/verault/sillon01-crown-macro.png" description="Close view of the knurled winding crown and brushed steel case flank" width={1536} height={1024} />
          <figcaption>THE CROWN / 5.8 MM DESIGN DIAMETER</figcaption>
        </figure>
        <div className="story-movement__copy">
          <ChapterLabel number="04" name="MOVEMENT" />
          <h2 id="movement-title">A daily<br />ritual.</h2>
          <p className="story-chapter__body">A turn of the crown is a small moment of attention. Sillon 01 is designed around a Sellita SW210-1 b manual-wind movement with central seconds.</p>
          <div className="story-movement__facts" aria-label="Proposed movement base specifications"><span>4 HZ</span><span>18 JEWELS</span><span>TYPICAL 45-HOUR RESERVE</span></div>
          <EditorialLink href="/dossier.html">Read the movement specification</EditorialLink>
        </div>
      </div>
      <figure className="story-shell story-movement__back">
        <AssetImage src="/images/verault/sillon01-caseback-movement.png" className="story-asset--caseback-crop" description="Detail of the proposed manual-wind movement visible through the exhibition back" width={1536} height={1024} />
        <figcaption>THE MOVEMENT / AN OPEN VIEW OF THE MECHANISM</figcaption>
      </figure>
    </section>
  );
}

function MaterialSection() {
  return <SillonGlyphPortal />;
}

function ProportionSection() {
  return (
    <section className="story-chapter story-proportion" id="proportion" aria-labelledby="proportion-title">
      <div className="story-shell story-proportion__grid">
        <figure className="story-proportion__wrist">
          <AssetImage src="/images/verault/sillon01-wrist-lifestyle.png" description="Sillon 01 on a wrist in warm daylight, showing its compact scale" width={1024} height={1536} />
          <figcaption>WORN IN DAYLIGHT / A HUMAN SCALE</figcaption>
        </figure>
        <div className="story-proportion__right">
          <div className="story-proportion__copy">
            <ChapterLabel number="06" name="PROPORTION" />
            <h2 id="proportion-title">Worn, not<br />displayed.</h2>
            <p className="story-chapter__body">The compact case is designed to sit close to the wrist. Its short lugs and gently curved back give the dimensions a human scale.</p>
          </div>
          <figure className="story-proportion__profile">
            <AssetImage src="/images/verault/sillon01-side-profile.png" description="Side profile of the steel case, crystal, crown and curved lugs" width={1536} height={1024} />
            <figcaption>PROFILE / DESIGN DIMENSIONS</figcaption>
          </figure>
          <div className="story-proportion__dimensions" aria-label="Design dimensions"><p><span>38.5 MM</span><span>DIAMETER</span></p><p><span>45.8 MM</span><span>LUG TO LUG</span></p><p><span>9.5 MM</span><span>THICKNESS TARGET</span></p></div>
        </div>
      </div>
    </section>
  );
}

function InvitationSection() {
  return (
    <section className="story-chapter story-invitation" id="invitation" aria-labelledby="invitation-title">
      <div className="story-shell story-invitation__grid">
        <figure className="story-invitation__portrait">
          <AssetImage src="/images/verault/sillon01-closing-campaign.png" description="Sillon 01 in a calm studio still life with warm daylight" width={1024} height={1536} />
          <figcaption>SILLON 01 / THE COMPLETE FORM</figcaption>
        </figure>
        <div className="story-invitation__copy">
          <ChapterLabel number="07" name="SILLON 01" />
          <h2 id="invitation-title">Keep<br />the hour.</h2>
          <p className="story-chapter__body">The complete Sillon 01 concept, in one place.</p>
          <EditorialLink href="/dossier.html">View the technical dossier</EditorialLink>
          <a className="story-invitation__secondary" href="/case-study.html">About this design concept</a>
        </div>
      </div>
    </section>
  );
}

export function WatchStory() {
  return <>
    <FormSection />
    <DialSection />
    <MovementSection />
    <MaterialSection />
    <ProportionSection />
    <InvitationSection />
  </>;
}
