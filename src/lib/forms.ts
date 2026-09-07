import { useCallback, useState } from 'react';
import { site } from '@/config/site';

export type SubmitStatus = 'idle' | 'submitting' | 'done' | 'error';

export type Validator<T> = (values: T) => Partial<Record<keyof T, string>>;

/* ------------------------------------------------------------ validators */

export const required = (value: string, label: string) =>
  value.trim() ? undefined : `${label} is required.`;

export const validEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? undefined : 'Enter a valid email address.';

/** Deliberately forgiving — accepts any US phone with 10 digits, formatted or not. */
export const validPhone = (value: string) =>
  value.replace(/\D/g, '').length >= 10 ? undefined : 'Enter a phone number with 10 digits.';

export const validZip = (value: string) =>
  /^\d{5}(-\d{4})?$/.test(value.trim()) ? undefined : 'Enter a 5-digit zip code.';

export const validAge = (value: string) => {
  const n = Number(value);
  return Number.isFinite(n) && n >= 18 && n <= 120 ? undefined : 'Enter an age between 18 and 120.';
};

/* --------------------------------------------------------------- the hook */

/**
 * Small form controller shared by the quote, contact, booking and referral
 * forms. On submit it POSTs JSON to `site.formEndpoint`; when that is unset
 * it resolves successfully without sending anything, so the site behaves like
 * the prototype until a real handler is configured.
 */
export function useLeadForm<T extends Record<string, unknown>>(
  initial: T,
  validate: Validator<T>,
  formName: string,
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const setValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const found = validate(values);
      const hasErrors = Object.values(found).some(Boolean);
      setErrors(found);

      if (hasErrors) {
        // Move focus to the first invalid control for keyboard and screen-reader users.
        const firstKey = Object.keys(found).find((k) => found[k as keyof T]);
        if (firstKey) {
          document.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
        }
        return;
      }

      setStatus('submitting');
      try {
        if (site.formEndpoint) {
          const res = await fetch(site.formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ form: formName, ...values, submittedAt: new Date().toISOString() }),
          });
          if (!res.ok) throw new Error(`Submission failed with status ${res.status}`);
        }
        setStatus('done');
      } catch {
        setStatus('error');
      }
    },
    [formName, validate, values],
  );

  const reset = useCallback(() => {
    setValues(initial);
    setErrors({});
    setStatus('idle');
  }, [initial]);

  return { values, errors, status, setValue, handleSubmit, reset };
}
