'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type ProductDetail = {
  number: string;
  name: string;
  copy: string;
  image: string;
  alt: string;
};

type AnimatedTestimonialsProps = {
  details: readonly ProductDetail[];
  className?: string;
};

// The imported card stack uses a small, stable rotation for each inactive card.
// Stable values keep the perspective consistent across React renders.
const cardRotations = [-8, 6, -5, 8, -4];

export function AnimatedTestimonials({ details, className = '' }: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  if (details.length === 0) return null;

  const current = details[active % details.length];
  const move = (direction: -1 | 1) => {
    setActive((previous) => (previous + direction + details.length) % details.length);
  };

  return (
    <div className={`animated-testimonials max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20 ${className}`.trim()}>
      <div className="animated-testimonials__grid relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="animated-testimonials__visual">
          <div className="animated-testimonials__stack relative h-80 w-full [perspective:1000px]">
            <AnimatePresence>
              {details.map((detail, index) => {
                const selected = index === active;
                const rotation = cardRotations[index % cardRotations.length];
                return (
                  <motion.div
                    key={detail.image}
                    initial={reducedMotion ? false : {
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: rotation,
                    }}
                    animate={{
                      opacity: selected ? 1 : 0.7,
                      scale: selected ? 1 : 0.95,
                      z: selected || reducedMotion ? 0 : -100,
                      rotate: selected || reducedMotion ? 0 : rotation,
                      zIndex: selected ? 999 : details.length + 2 - index,
                      y: selected && !reducedMotion ? [0, -80, 0] : 0,
                    }}
                    exit={reducedMotion ? undefined : {
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: rotation,
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.4, ease: 'easeInOut' }}
                    className="animated-testimonials__image absolute inset-0 origin-bottom"
                    aria-hidden={!selected}
                  >
                    <picture className="block h-full w-full">
                      <source srcSet={detail.image.replace(/\.png$/, '.webp')} type="image/webp" />
                      <img
                        src={detail.image}
                        alt={selected ? detail.alt : ''}
                        width={500}
                        height={500}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                        className="animated-testimonials__image-media h-full w-full rounded-3xl object-cover object-center"
                      />
                    </picture>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="animated-testimonials__copy flex justify-between flex-col py-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.number}
              initial={reducedMotion ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reducedMotion ? undefined : { y: -20, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeInOut' }}
              className="animated-testimonials__text"
            >
              <h3 className="animated-testimonials__title text-2xl font-normal text-foreground">
                {current.name}
              </h3>
              <p className="animated-testimonials__meta text-sm text-muted-foreground">
                SILLON 01 / DETAIL
              </p>
              <motion.p className="animated-testimonials__description text-lg text-muted-foreground mt-8" aria-label={current.copy}>
                {current.copy.split(' ').map((word, index) => (
                  <motion.span
                    key={`${current.number}-${index}`}
                    initial={reducedMotion ? false : { filter: 'blur(10px)', opacity: 0, y: 5 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.2,
                      ease: 'easeInOut',
                      delay: reducedMotion ? 0 : 0.02 * index,
                    }}
                    className="inline-block"
                    aria-hidden="true"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="animated-testimonials__controls flex gap-4 pt-12 md:pt-0">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous watch detail"
              className="animated-testimonials__button h-11 w-11 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next watch detail"
              className="animated-testimonials__button h-11 w-11 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <ArrowRight aria-hidden="true" className="h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
            <span className="animated-testimonials__count" aria-hidden="true">
              {current.number} / {String(details.length).padStart(2, '0')}
            </span>
          </div>
          <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {current.number} of {details.length}: {current.name}. {current.copy}
          </span>
        </div>
      </div>
    </div>
  );
}
