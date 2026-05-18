import type { Metadata } from 'next';
import { lpMaPrimeAdapt as lp } from '@/content/lp-maprimeadapt';

import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { QuizMaPrimeAdapt } from '@/components/QuizMaPrimeAdapt';
import { TrustStrip } from '@/components/TrustStrip';
import { PressBar } from '@/components/PressBar';
import { PromiseGrid } from '@/components/PromiseGrid';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { IncludedSection } from '@/components/IncludedSection';
import { ProcessSteps } from '@/components/ProcessSteps';
import { Gallery } from '@/components/Gallery';
import { SpecsSection } from '@/components/SpecsSection';
import { Testimonials } from '@/components/Testimonials';
import { AidesSection } from '@/components/AidesSection';
import { FaqAccordion } from '@/components/FaqAccordion';
import { FormLong } from '@/components/FormLong';
import { CtaFinal } from '@/components/CtaFinal';
import { Footer } from '@/components/Footer';
import { StickyBottomMobile } from '@/components/StickyBottomMobile';

export const metadata: Metadata = {
  title: lp.meta.title,
  description: lp.meta.description,
};

/**
 * LP 2 — MaPrimeAdapt' (douche sécurisée senior).
 *
 * Différences clés vs LP 1 :
 * - Hero a un QuizMaPrimeAdapt à droite (au lieu du ZipGate de la LP1).
 *   Tant que le composant Quiz n'est pas créé, le Hero utilise le ZipGate par défaut.
 * - AidesSection est centrale (avant la FAQ, mise en valeur).
 * - PromiseGrid + IncludedSection + Process orientés sécurité senior et aides.
 * - Pas de PacksSection (un seul "pack senior" complet, pas de gamme).
 */
export default function MaPrimeAdaptLP() {
  return (
    <>
      <AnnouncementBar
        prefix={lp.announcement.prefix}
        highlight={lp.announcement.highlight}
        text={lp.announcement.text}
        withDot={lp.announcement.withDot}
        withWeek={lp.announcement.withWeek}
        href={lp.announcement.href}
      />
      <Header />

      <main>
        <Hero
          locationChip={lp.hero.locationChip}
          h1Lead={lp.hero.h1Lead}
          h1Highlight={lp.hero.h1Highlight}
          h1Tail={lp.hero.h1Tail}
          sub={lp.hero.sub}
          bgImage={lp.hero.bgImage}
          source={lp.meta.source}
          merciHref={lp.meta.merciHref}
          rightSlot={
            <QuizMaPrimeAdapt source={lp.meta.source} merciHref={lp.meta.merciHref} />
          }
        />

        <TrustStrip items={lp.trustStrip} />

        {lp.pressBar && lp.pressBar.items.length > 0 && (
          <PressBar label={lp.pressBar.label} items={lp.pressBar.items} />
        )}

        <PromiseGrid
          eyebrow={lp.promiseGrid.eyebrow}
          h2={lp.promiseGrid.h2}
          h2Highlight={lp.promiseGrid.h2Highlight}
          intro={lp.promiseGrid.intro}
          items={lp.promiseGrid.items}
        />

        {/* AidesSection remontée plus haut sur LP2 : c'est LE morceau central */}
        <AidesSection
          eyebrow={lp.aides.eyebrow}
          h2={lp.aides.h2}
          intro={lp.aides.intro}
          items={lp.aides.items}
        />

        {lp.beforeAfter && (
          <BeforeAfterSlider
            eyebrow={lp.beforeAfter.eyebrow}
            h2Lead={lp.beforeAfter.h2Lead}
            h2Highlight={lp.beforeAfter.h2Highlight}
            intro={lp.beforeAfter.intro}
            introStrong={lp.beforeAfter.introStrong}
            stats={lp.beforeAfter.stats}
            caption={lp.beforeAfter.caption}
            itemCaptionPrefix={lp.beforeAfter.itemCaptionPrefix}
            items={lp.beforeAfter.items}
          />
        )}

        <ProcessSteps
          eyebrow={lp.process.eyebrow}
          h2Lead={lp.process.h2Lead}
          h2Highlight={lp.process.h2Highlight}
          h2Tail={lp.process.h2Tail}
          steps={lp.process.steps}
        />

        <IncludedSection
          eyebrow={lp.included.eyebrow}
          h2={lp.included.h2}
          intro={lp.included.intro}
          items={lp.included.items}
        />

        <Gallery
          eyebrow={lp.gallery.eyebrow}
          h2={lp.gallery.h2}
          images={lp.gallery.images}
        />

        <SpecsSection eyebrow={lp.specs.eyebrow} h2={lp.specs.h2} items={lp.specs.items} />

        <Testimonials
          eyebrow={lp.testimonials.eyebrow}
          h2={lp.testimonials.h2}
          items={lp.testimonials.items}
        />

        <FaqAccordion
          eyebrow={lp.faq.eyebrow}
          h2Lead={lp.faq.h2Lead}
          h2Highlight={lp.faq.h2Highlight}
          items={lp.faq.items}
        />

        <FormLong
          eyebrow={lp.formLong.eyebrow}
          h2={lp.formLong.h2}
          sub={lp.formLong.sub}
          projectTypes={lp.formLong.projectTypes}
          source={lp.meta.source}
          merciHref={lp.meta.merciHref}
        />

        <CtaFinal
          eyebrow={lp.ctaFinal.eyebrow}
          h2Lead={lp.ctaFinal.h2Lead}
          h2Highlight={lp.ctaFinal.h2Highlight}
          sub={lp.ctaFinal.sub}
          ctaLabel={lp.ctaFinal.ctaLabel}
          trustSignals={lp.ctaFinal.trustSignals}
        />
      </main>

      <Footer
        services={lp.footer?.services}
        entreprise={lp.footer?.entreprise}
        villes={lp.footer?.villes}
        tagline={lp.footer?.tagline}
      />
      <StickyBottomMobile
        devisHref="#hero-form"
        devisLabel="Devis"
        devisIcon="sparkles"
      />
    </>
  );
}
