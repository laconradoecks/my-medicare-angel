import { useEffect, useState } from 'react';
import Seo from '@/components/Seo';
import { Guidance, TitleBand } from '@/components/Blocks';
import { faqs } from '@/data/faqs';
import { paths } from '@/routes';

export default function Faqs() {
  const [open, setOpen] = useState<number | null>(null);

  // FAQPage structured data, built from the same list the page renders. The
  // prerendered HTML already carries a copy, so replace it rather than add a second.
  useEffect(() => {
    document.getElementById('faq-jsonld')?.remove();
    const script = document.createElement('script');
    script.id = 'faq-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <>
      <Seo
        title="Medicare Questions Answered"
        description="Plain answers to the Medicare questions people in Massachusetts and New England ask us most."
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
