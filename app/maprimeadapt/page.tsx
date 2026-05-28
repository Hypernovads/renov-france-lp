import type { Metadata } from 'next';
import { lpMaPrimeAdapt as lp } from '@/content/lp-maprimeadapt';

import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { QuizMaPrimeAdapt } from '@/components/QuizMaPrimeAdapt';
import { TrustStrip } from '@/components/TrustStrip';
import { PressBar } from '@/components/PressBar';
import { CoveredWorks } from '@/components/CoveredWorks';
import { IdentificationSection } from '@/components/IdentificationSection';
import { EligibilitySection } from '@/components/EligibilitySection';
import { BaremeSection } from '@/components/BaremeSection';
import { AidesSection } from '@/components/AidesSection';
import { ProcessSteps } from '@/components/ProcessSteps';
import { IncludedSection } from '@/components/IncludedSection';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
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
 * LP 2 — MaPrimeAdapt' (adaptation logement / maintien à domicile).
 *
 * Angle "l'aide d'abord" (refonte inspirée EcoShower) :
 * - Hero = hook MaPrimeAdapt + montant d'aides + QuizMaPrimeAdapt à droite.
 * - Travaux couverts (PromiseGrid) : scope large, salle de bain en tête.
 * - Identification émotionnelle → Éligibilité (3 tranches) → Barème + exemple chiffré.
 * - Aides cumulables, process, prise en charge, preuves, FAQ, form.
 *
 * Le "1€" est volontairement ABSENT de la page (réservé à la pub Meta).
 * Aucune mention "pose en 1 jour / 24h". Crédit d'impôt PMR supprimé (→ Action Logement).
 * SpecsSection retirée de cette LP (trop technique pour la cible 60+).
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

        {/* Travaux couverts — split image + liste aérée (diversité dans la liste) */}
        {lp.coveredWorks && (
          <CoveredWorks
            eyebrow={lp.coveredWorks.eyebrow}
            h2={lp.coveredWorks.h2}
            h2Highlight={lp.coveredWorks.h2Highlight}
            intro={lp.coveredWorks.intro}
            image={lp.coveredWorks.image}
            imageCaption={lp.coveredWorks.imageCaption}
            items={lp.coveredWorks.items}
          />
        )}

        {/* Vous vous reconnaissez ? — identification émotionnelle */}
        {lp.identification && (
          <IdentificationSection
            eyebrow={lp.identification.eyebrow}
            h2={lp.identification.h2}
            h2Highlight={lp.identification.h2Highlight}
            intro={lp.identification.intro}
            items={lp.identification.items}
            ctaLabel={lp.identification.ctaLabel}
            ctaHref={lp.identification.ctaHref}
          />
        )}

        {/* Êtes-vous éligible ? — 3 tranches d'âge */}
        {lp.eligibility && (
          <EligibilitySection
            eyebrow={lp.eligibility.eyebrow}
            h2={lp.eligibility.h2}
            h2Highlight={lp.eligibility.h2Highlight}
            intro={lp.eligibility.intro}
            tranches={lp.eligibility.tranches}
            conditions={lp.eligibility.conditions}
            ctaLabel={lp.eligibility.ctaLabel}
            ctaHref={lp.eligibility.ctaHref}
          />
        )}

        {/* Barème ANAH 2026 + exemple chiffré */}
        {lp.bareme && (
          <BaremeSection
            eyebrow={lp.bareme.eyebrow}
            h2={lp.bareme.h2}
            h2Highlight={lp.bareme.h2Highlight}
            intro={lp.bareme.intro}
            plafondTravaux={lp.bareme.plafondTravaux}
            rows={lp.bareme.rows}
            example={lp.bareme.example}
            note={lp.bareme.note}
          />
        )}

        {/* Aides cumulables */}
        <AidesSection
          eyebrow={lp.aides.eyebrow}
          h2={lp.aides.h2}
          intro={lp.aides.intro}
          items={lp.aides.items}
        />

        <ProcessSteps
          eyebrow={lp.process.eyebrow}
          h2Lead={lp.process.h2Lead}
          h2Highlight={lp.process.h2Highlight}
          h2Tail={lp.process.h2Tail}
          steps={lp.process.steps}
        />

        {/* Notre prise en charge */}
        <IncludedSection
          eyebrow={lp.included.eyebrow}
          h2={lp.included.h2}
          intro={lp.included.intro}
          items={lp.included.items}
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

        <Gallery
          eyebrow={lp.gallery.eyebrow}
          h2={lp.gallery.h2}
          images={lp.gallery.images}
        />

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
