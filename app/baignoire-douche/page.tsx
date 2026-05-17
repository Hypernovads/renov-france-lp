import type { Metadata } from 'next';
import { lpBaignoireDouche as lp } from '@/content/lp-baignoire-douche';

import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { PromiseGrid } from '@/components/PromiseGrid';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { IncludedSection } from '@/components/IncludedSection';
import { PacksSection } from '@/components/PacksSection';
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

export default function BaignoireDoucheLP() {
  return (
    <>
      <AnnouncementBar
        prefix={lp.announcement.prefix}
        highlight={lp.announcement.highlight}
        text={lp.announcement.text}
        withDot={lp.announcement.withDot}
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
        />

        <TrustStrip items={lp.trustStrip} />

        <PromiseGrid
          eyebrow={lp.promiseGrid.eyebrow}
          h2={lp.promiseGrid.h2}
          h2Highlight={lp.promiseGrid.h2Highlight}
          intro={lp.promiseGrid.intro}
          items={lp.promiseGrid.items}
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

        {lp.packs && (
          <PacksSection
            eyebrow={lp.packs.eyebrow}
            h2Lead={lp.packs.h2Lead}
            h2Highlight={lp.packs.h2Highlight}
            sub={lp.packs.sub}
            packs={lp.packs.packs}
            note={lp.packs.note}
          />
        )}

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

        <AidesSection
          eyebrow={lp.aides.eyebrow}
          h2={lp.aides.h2}
          intro={lp.aides.intro}
          items={lp.aides.items}
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
          budgets={lp.formLong.budgets}
          timings={lp.formLong.timings}
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
      <StickyBottomMobile devisHref="#form-long" />
    </>
  );
}
