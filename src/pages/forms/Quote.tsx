import { useCallback } from 'react';
import Seo from '@/components/Seo';
import { Point } from '@/components/Blocks';
import { CheckCircleIcon } from '@/components/Icons';
import {
  ChoiceGroup,
  Field,
  OptionGroup,
  SubmitError,
  ThankYou,
} from '@/components/FormControls';
import { site } from '@/config/site';
import {
  required,
  useLeadForm,
  validAge,
  validEmail,
  validPhone,
  validZip,
} from '@/lib/forms';

type QuoteValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  age: string;
  zip: string;
  helpWith: string[];
  familiarity: string | null;
};

const initial: QuoteValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  age: '',
  zip: '',
  helpWith: [],
  familiarity: null,
};

const helpOptions = [
  'New to Medicare',
  'Medicare Advantage',
  'Supplements',
  'Veterans options',
];

export default function Quote() {
  const validate = useCallback(
    (v: QuoteValues) => ({
      firstName: required(v.firstName, 'First name'),
      lastName: required(v.lastName, 'Last name'),
      phone: required(v.phone, 'Phone') ?? validPhone(v.phone),
      email: required(v.email, 'Email') ?? validEmail(v.email),
      age: required(v.age, 'Age') ?? validAge(v.age),
      zip: required(v.zip, 'Zip code') ?? validZip(v.zip),
    }),
    [],
  );

  const { values, errors, status, setValue, handleSubmit } = useLeadForm(
    initial,
    validate,
    'quote',
  );

  const toggleHelp = (option: string) =>
    setValue(
      'helpWith',
      values.helpWith.includes(option)
        ? values.helpWith.filter((o) => o !== option)
        : [...values.helpWith, option],
    );

  return (
    <>
      <Seo
        title="Get a Free Medicare Quote"
        description="Tell us a little about yourself and a licensed agent will call you back with the Medicare plans that fit your situation. Free, with no obligation."
      />
      <div className="wrap quote-layout">
        <div className="reassure">
          <h1>Get a Free Medicare Quote</h1>
          <p>
            Tell us a little about yourself and a licensed agent will call you back with the plans
            that fit your situation. It takes about two minutes, and it costs you nothing, now or
            ever.
          </p>
          <Point>
            <CheckCircleIcon />
            <div>
              <strong>No cost, no obligation.</strong> Agents are paid by insurance carriers, never
              by you.
            </div>
          </Point>
          <Point>
            <CheckCircleIcon />
            <div>
              <strong>One call, not a call list.</strong> Your details go to our agents only. We never
              sell your information.
            </div>
          </Point>
          <Point>
            <CheckCircleIcon />
            <div>
              <strong>Plain English, always.</strong> Ask anything. There are no silly questions about
              Medicare.
            </div>
          </Point>
          <div className="callout" style={{ color: 'var(--ink)' }}>
            <div>
              <strong>Rather talk right now?</strong>
              <br />
              Call{' '}
              <a href={site.phone.href}>
                <strong>{site.phone.display}</strong>
              </a>
              , {site.hours}.
            </div>
          </div>
        </div>

        {status === 'done' ? (
          <ThankYou heading="Thank you!">
            <p>
              A licensed agent will call you within one business day. If you would rather not wait,
              call us now on{' '}
              <a href={site.phone.href}>
                <strong>{site.phone.display}</strong>
              </a>
              .
            </p>
          </ThankYou>
        ) : (
          <form className="formcard" onSubmit={handleSubmit} noValidate>
            {status === 'error' && <SubmitError />}
            <div className="frow">
              <Field
                name="firstName"
                label="First name"
                placeholder="Mary"
                autoComplete="given-name"
                value={values.firstName}
                error={errors.firstName}
                onChange={(v) => setValue('firstName', v)}
              />
              <Field
                name="lastName"
                label="Last name"
                placeholder="Johnson"
                autoComplete="family-name"
                value={values.lastName}
                error={errors.lastName}
                onChange={(v) => setValue('lastName', v)}
              />
            </div>
            <div className="frow">
              <Field
                name="phone"
                label="Phone"
                type="tel"
                inputMode="tel"
                placeholder="(555) 000-0000"
                autoComplete="tel"
                value={values.phone}
                error={errors.phone}
                onChange={(v) => setValue('phone', v)}
              />
              <Field
                name="email"
                label="Email"
                type="email"
                inputMode="email"
                placeholder="mary@email.com"
                autoComplete="email"
                value={values.email}
                error={errors.email}
                onChange={(v) => setValue('email', v)}
              />
            </div>
            <div className="frow">
              <Field
                name="age"
                label="Age"
                type="number"
                inputMode="numeric"
                placeholder="65"
                value={values.age}
                error={errors.age}
                onChange={(v) => setValue('age', v)}
              />
              <Field
                name="zip"
                label="Zip code"
                inputMode="numeric"
                placeholder="02453"
                autoComplete="postal-code"
                value={values.zip}
                error={errors.zip}
                onChange={(v) => setValue('zip', v)}
              />
            </div>

            <OptionGroup
              label="What do you need help with?"
              options={helpOptions}
              selected={values.helpWith}
              onToggle={toggleHelp}
            />

            <ChoiceGroup
              label="How familiar are you with Medicare?"
              options={['1', '2', '3', '4', '5']}
              value={values.familiarity}
              onSelect={(v) => setValue('familiarity', v)}
              scaleLabels={['Totally new', 'Very familiar']}
            />

            <button className="btn btn-amber btn-block" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Request My Free Quote'}
            </button>
            <div className="consent">
              By submitting this form you agree that a licensed insurance agent may contact you by
              phone or email about Medicare insurance options. This is a solicitation for insurance.
            </div>
          </form>
        )}
      </div>
    </>
  );
}
