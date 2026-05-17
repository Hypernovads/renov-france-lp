import type { Metadata } from 'next';
import { lpBaignoireDouche as lp } from '@/content/lp-baignoire-douche';

import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
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
          items={lp.promiseGrid.items}
        />

        {lp.beforeAfter && (
          <BeforeAfterSlider
            eyebrow={lp.beforeAfter.eyebrow}
            h2={lp.beforeAfter.h2}
            intro={lp.beforeAfter.intro}
            items={lp.beforeAfter.items}
          />
        )}

        <IncludedSection
          eyebrow={lp.included.eyebrow}
          h2={lp.included.h2}
          intro={lp.included.intro}
          items={lp.included.items}
        />

        <ProcessSteps
          eyebrow={lp.process.eyebrow}
          h2={lp.process.h2}
          steps={lp.process.steps}
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

        <AidesSection
          eyebrow={lp.aides.eyebrow}
          h2={lp.aides.h2}
          intro={lp.aides.intro}
          items={lp.aides.items}
        />

        <FaqAccordion eyebrow={lp.faq.eyebrow} h2={lp.faq.h2} items={lp.faq.items} />

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

        <CtaFinal h2={lp.ctaFinal.h2} sub={lp.ctaFinal.sub} ctaLabel={lp.ctaFinal.ctaLabel} />
      </main>

      <Footer />
      <StickyBottomMobile devisHref="#form-long" />
    </>
  );
}
