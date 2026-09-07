import { useCallback } from 'react';
import Seo from '@/components/Seo';
import { Point } from '@/components/Blocks';
import { CheckCircleIcon } from '@/components/Icons';
import { Field, SubmitError, ThankYou } from '@/components/FormControls';
import { required, useLeadForm, validPhone } from '@/lib/forms';

type ReferValues = {
  yourName: string;
  yourPhone: string;
  friendName: string;
  friendPhone: string;
};

const initial: ReferValues = { yourName: '', yourPhone: '', friendName: '', friendPhone: '' };

export default function Refer() {
  const validate = useCallback(
    (v: ReferValues) => ({
      yourName: required(v.yourName, 'Your name'),
      yourPhone: required(v.yourPhone, 'Your phone') ?? validPhone(v.yourPhone),
      friendName: required(v.friendName, 'Your friend’s name'),
      friendPhone: required(v.friendPhone, 'Your friend’s phone') ?? validPhone(v.friendPhone),
    }),
    [],
  );

  const { values, errors, status, setValue, handleSubmit } = useLeadForm(
    initial,
    validate,
    'refer',
  );

  return (
    <>
      <Seo
        title="Refer a Friend"
        description="Know someone drowning in Medicare mail? Send them our way and we will take good care of them."
      />
      <div className="wrap quote-layout">
        <div className="reassure">
          <h1>Refer a Friend</h1>
          <p>
            Know someone drowning in Medicare mail? Send them our way and we will take good care of
            them, the same way we took care of you.
          </p>
          <Point>
            <CheckCircleIcon />
            <div>
              <strong>We call gently.</strong> One friendly conversation, no pressure, and we mention
              you sent them.
            </div>
          </Point>
        </div>

        {status === 'done' ? (
          <ThankYou heading="Thank you!">
            <p>We will reach out to your friend gently and mention you sent them.</p>
          </ThankYou>
        ) : (
          <form className="formcard" onSubmit={handleSubmit} noValidate>
            {status === 'error' && <SubmitError />}
            <div className="frow">
              <Field
                name="yourName"
                label="Your name"
                placeholder="Mary Johnson"
                autoComplete="name"
                value={values.yourName}
                error={errors.yourName}
                onChange={(v) => setValue('yourName', v)}
              />
              <Field
                name="yourPhone"
                label="Your phone"
                type="tel"
                inputMode="tel"
                placeholder="(555) 000-0000"
                autoComplete="tel"
                value={values.yourPhone}
                error={errors.yourPhone}
                onChange={(v) => setValue('yourPhone', v)}
              />
            </div>
            <div className="frow">
              <Field
                name="friendName"
                label="Friend’s name"
                placeholder="Robert Smith"
                value={values.friendName}
                error={errors.friendName}
                onChange={(v) => setValue('friendName', v)}
              />
              <Field
                name="friendPhone"
                label="Friend’s phone"
                type="tel"
                inputMode="tel"
                placeholder="(555) 000-0000"
                value={values.friendPhone}
                error={errors.friendPhone}
                onChange={(v) => setValue('friendPhone', v)}
              />
            </div>
            <div className="consent">
              Please make sure your friend is happy for us to call them about Medicare insurance
              options.
            </div>
            <button className="btn btn-amber btn-block" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send Referral'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
