import { useCallback } from 'react';
import Seo from '@/components/Seo';
import { TitleBand } from '@/components/Blocks';
import { SiteImage, imageSizes } from '@/components/SiteImage';
import { Field, SubmitError, TextareaField, ThankYou } from '@/components/FormControls';
import { site } from '@/config/site';
import { paths } from '@/routes';
import { required, useLeadForm } from '@/lib/forms';

type ContactValues = { name: string; contact: string; message: string };

const initial: ContactValues = { name: '', contact: '', message: '' };

export default function Contact() {
  const validate = useCallback(
    (v: ContactValues) => ({
      name: required(v.name, 'Your name'),
      contact: required(v.contact, 'A phone number or email'),
      message: required(v.message, 'Your message'),
    }),
    [],
  );

  const { values, errors, status, setValue, handleSubmit, honeypotProps } = useLeadForm(
    initial,
    validate,
    'contact',
  );

  return (
    <>
      <Seo
        title="Contact a Medicare Agent in Waltham, MA"
        description="Call, message or visit My Medicare Angel in Waltham, Massachusetts. Serving Greater Boston, all of New England and New York."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Contact Us' }]}
        title="Talk to us"
        lede="Call, visit, or send a message. A real person answers."
      />

      <div className="wrap quote-layout">
        <div className="reassure">
          <div className="sidecard" style={{ gap: 18 }}>
            <div>
              <div className="h" style={{ marginBottom: 4 }}>
                Phone
              </div>
              <div style={{ fontSize: 19, fontWeight: 700 }}>
                <a href={site.phone.href}>{site.phone.display}</a>
              </div>
              <div style={{ fontSize: 15, color: 'var(--muted)' }}>{site.hours}</div>
            </div>
            <div>
              <div className="h" style={{ marginBottom: 4 }}>
                Office
              </div>
              <div>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </div>
              <div style={{ fontSize: 15, color: 'var(--muted)', marginTop: 6 }}>
                Based in Waltham, we serve Greater Boston and communities across Massachusetts,
                Maine, New Hampshire, Rhode Island, Connecticut and New York, by phone or in person.
              </div>
            </div>
            <div>
              <div className="h" style={{ marginBottom: 4 }}>
                Email
              </div>
              <div>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
          </div>
          <SiteImage
            name="contact-office"
            alt="The My Medicare Angel office"
            sizes={imageSizes.contact}
            className="contact-photo"
          />
        </div>

        <div className="form-column">
          {status === 'done' ? (
            <ThankYou heading="Message received">
              <p>We will get back to you within one business day.</p>
            </ThankYou>
          ) : (
            <form className="formcard" onSubmit={handleSubmit} noValidate>
              {status === 'error' && <SubmitError />}
            {/* Hidden from people; bots that fill it in are dropped server side. */}
            <input className="hp-field" aria-hidden="true" {...honeypotProps} />
              <div className="frow">
                <Field
                  name="name"
                  label="Your name"
                  placeholder="Mary Johnson"
                  autoComplete="name"
                  value={values.name}
                  error={errors.name}
                  onChange={(v) => setValue('name', v)}
                />
                <Field
                  name="contact"
                  label="Phone or email"
                  placeholder="(555) 000-0000"
                  value={values.contact}
                  error={errors.contact}
                  onChange={(v) => setValue('contact', v)}
                />
              </div>
              <TextareaField
                name="message"
                label="Your message"
                placeholder="How can we help?"
                value={values.message}
                error={errors.message}
                onChange={(v) => setValue('message', v)}
              />
              <button className="btn btn-amber btn-block" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>
              <div className="consent">
                By submitting this form you agree that a licensed insurance agent may contact you by
                phone about Medicare insurance options. This is a solicitation for insurance.
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
