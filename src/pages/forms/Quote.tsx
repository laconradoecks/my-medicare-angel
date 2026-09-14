import { useCallback } from 'react';
import Seo from '@/components/Seo';
import { Point } from '@/components/Blocks';
import { CheckCircleIcon } from '@/components/Icons';
import { Field, SubmitError, TextareaField, ThankYou } from '@/components/FormControls';
import { site } from '@/config/site';
import { required, useLeadForm, validPhone } from '@/lib/forms';

/**
 * Short help form, per client feedback: name, phone, the Medicare issue and
 * the enrollment type, in place of the original quote form. Live chat is
 * planned for later.
 */
type HelpValues = {
  name: string;
  phone: string;
  helpWith: string[];
  enrollment: string | null;
  details: string;
};

const initial: HelpValues = { name: '', phone: '', helpWith: [], enrollment: null, details: '' };

/** Same topics as the client's reference site. */
const helpOptions = [
  'Original Medicare',
  'Medicare Supplements',
  'Medicare Advantage',
  'Veteran',
  'Employer Coverage',
  'Enrollment',
  'Eligibility',
  'Cost',
];

const enrollmentOptions = [
  { value: 'Initial Enrollment', hint: 'Turning 65 or new to Medicare' },
  { value: 'Annual Enrollment', hint: 'Changing plans, October 15 to December 7' },
  { value: 'Special Enrollment', hint: 'A life change, like losing coverage or moving' },
  { value: 'Not sure', hint: 'We will work it out with you' },
];

export default function Quote() {
  const validate = useCallback(
    (v: HelpValues) => ({
      name: required(v.name, 'Your name'),
      phone: required(v.phone, 'Phone') ?? validPhone(v.phone),
      helpWith: v.helpWith.length ? undefined : 'Choose at least one topic.',
      enrollment: v.enrollment ? undefined : 'Choose an enrollment type, or “Not sure”.',
    }),
    [],
  );

  const { values, errors, status, setValue, handleSubmit } = useLeadForm(
    initial,
    validate,
    'help',
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
        title="Get Free Medicare Help in Greater Boston and New England"
        description="Tell us your name, phone number and what you need help with. A licensed Medicare agent serving New England and New York will call you back, free."
      />
      <div className="wrap quote-layout">
        <div className="reassure">
          <h1>Get Free Medicare Help</h1>
          <p>
            Share your name, the best number to reach you and what you need help with. A licensed
            agent will call you back, at no cost to you, now or ever.
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
              A licensed agent will call you within one business day to help with your Medicare
              question. If you would rather not wait, call us now on{' '}
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
                name="name"
                label="Your name"
                placeholder="Mary Johnson"
                autoComplete="name"
                value={values.name}
                error={errors.name}
                onChange={(v) => setValue('name', v)}
              />
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
            </div>

            <fieldset className="plainfs">
              <legend className="grouplabel">What can we help you with?</legend>
              <div className="helpgrid">
                {helpOptions.map((option) => {
                  const on = values.helpWith.includes(option);
                  return (
                    <button
                      type="button"
                      name="helpWith"
                      key={option}
                      className={`helpopt${on ? ' sel' : ''}`}
                      aria-pressed={on}
                      onClick={() => toggleHelp(option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {errors.helpWith && <div className="grouperr">{errors.helpWith}</div>}
            </fieldset>

            <fieldset className="plainfs">
              <legend className="grouplabel">Which enrollment applies to you?</legend>
              <div className="helpgrid" role="radiogroup" aria-label="Enrollment type">
                {enrollmentOptions.map((option) => {
                  const on = values.enrollment === option.value;
                  return (
                    <button
                      type="button"
                      name="enrollment"
                      role="radio"
                      aria-checked={on}
                      key={option.value}
                      className={`helpopt enroll-opt${on ? ' sel' : ''}`}
                      onClick={() => setValue('enrollment', option.value)}
                    >
                      <strong>{option.value}</strong>
                      <span>{option.hint}</span>
                    </button>
                  );
                })}
              </div>
              {errors.enrollment && <div className="grouperr">{errors.enrollment}</div>}
            </fieldset>

            <TextareaField
              name="details"
              label="Anything else we should know? (optional)"
              placeholder="For example: my employer coverage ends in March"
              value={values.details}
              onChange={(v) => setValue('details', v)}
            />

            <button
              className="btn btn-amber btn-block"
              type="submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending…' : 'Submit'}
            </button>
            <div className="consent">
              By submitting this form you agree that a licensed insurance agent may contact you by
              phone about Medicare insurance options. This is a solicitation for insurance.
            </div>
          </form>
        )}
      </div>
    </>
  );
}
