import { useCallback, useMemo } from 'react';
import Seo from '@/components/Seo';
import { Point } from '@/components/Blocks';
import { CheckCircleIcon } from '@/components/Icons';
import { ChoiceGroup, Field, SubmitError, ThankYou } from '@/components/FormControls';
import { required, useLeadForm, validPhone } from '@/lib/forms';

type BookValues = { day: string | null; time: string | null; name: string; phone: string };

const timeSlots = ['9:30 AM', '11:00 AM', '1:30 PM', '3:00 PM'];

/**
 * The designs showed "Mon [DATE]" placeholders. We render the next five
 * business days instead, so the picker works without a scheduling backend.
 * Swap this for real availability when a calendar integration is added.
 */
function nextWeekdays(count: number): string[] {
  const days: string[] = [];
  const cursor = new Date();
  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const dow = cursor.getDay();
    if (dow === 0 || dow === 6) continue;
    days.push(
      cursor.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    );
  }
  return days;
}

export default function Book() {
  const days = useMemo(() => nextWeekdays(5), []);

  const initial: BookValues = useMemo(
    () => ({ day: days[2] ?? null, time: '11:00 AM', name: '', phone: '' }),
    [days],
  );

  const validate = useCallback(
    (v: BookValues) => ({
      name: required(v.name, 'Your name'),
      phone: required(v.phone, 'Phone') ?? validPhone(v.phone),
      day: v.day ? undefined : 'Choose a day.',
      time: v.time ? undefined : 'Choose a time.',
    }),
    [],
  );

  const { values, errors, status, setValue, handleSubmit } = useLeadForm(
    initial,
    validate,
    'book',
  );

  return (
    <>
      <Seo
        title="Book a Free Consultation"
        description="Pick a day and time that suits you and a licensed Medicare agent will call you then. Thirty unhurried minutes, free and without obligation."
      />
      <div className="wrap quote-layout">
        <div className="reassure">
          <h1>Book a Free Consultation</h1>
          <p>
            Pick a day and time that suits you and a licensed agent will call you then. No phone tag,
            no waiting on hold.
          </p>
          <Point>
            <CheckCircleIcon />
            <div>
              <strong>30 minutes, unhurried.</strong> Enough time to actually answer your questions.
            </div>
          </Point>
          <Point>
            <CheckCircleIcon />
            <div>
              <strong>Free and without obligation,</strong> like everything we do.
            </div>
          </Point>
        </div>

        {status === 'done' ? (
          <ThankYou heading="You are booked">
            <p>
              A licensed agent will call you at your chosen time. We will send a reminder the day
              before.
            </p>
          </ThankYou>
        ) : (
          <form className="formcard" onSubmit={handleSubmit} noValidate>
            {status === 'error' && <SubmitError />}

            <ChoiceGroup
              label="Choose a day"
              options={days}
              value={values.day}
              onSelect={(v) => setValue('day', v)}
              wide
            />

            <ChoiceGroup
              label="Choose a time"
              options={timeSlots}
              value={values.time}
              onSelect={(v) => setValue('time', v)}
              variant="helpopt"
            />

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

            <button className="btn btn-amber btn-block" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Booking…' : 'Confirm My Appointment'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
