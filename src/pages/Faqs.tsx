import { useState } from 'react';
import Seo from '@/components/Seo';
import { Guidance, TitleBand } from '@/components/Blocks';
import { faqs } from '@/data/faqs';
import { paths } from '@/routes';

export default function Faqs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Quick answers to the Medicare questions people ask us most: what our help costs, when you can enroll, and whether you can change plans later."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'FAQs' }]}
        title="Frequently asked questions"
        lede="Quick answers to what people ask us most. Tap a question to open it."
      />
      <div className="wrap pagebody" style={{ maxWidth: 900 }}>
        <div className="parts faq">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div className="faq-row" key={faq.q}>
                <h2>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {faq.q}
                    <span className="caret" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                </h2>
                <div className="faq-a" id={`faq-${i}`} hidden={!isOpen}>
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>

        <Guidance ctaLabel="Contact Us" ctaTo={paths.contact}>
          <strong>Your question not here?</strong> Ask us directly. There are no silly questions
          about Medicare.
        </Guidance>
      </div>
    </>
  );
}
