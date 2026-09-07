import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { paths } from '@/routes';
import { site, isDemoForms } from '@/config/site';
import { SuccessIcon } from './Icons';

/* --------------------------------------------------------------- text field */

type FieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: 'text' | 'tel' | 'email' | 'number';
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric';
};

export function Field({
  name,
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
}: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <span className="err" id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- textarea */

export function TextareaField({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
}: Omit<FieldProps, 'type' | 'autoComplete' | 'inputMode'>) {
  const errorId = `${name}-error`;
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <span className="err" id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}

/* ----------------------------------------------- multi-select option chips */

export function OptionGroup({
  label,
  options,
  selected,
  onToggle,
  columns = true,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  columns?: boolean;
}) {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend className="grouplabel" style={{ padding: 0 }}>
        {label}
      </legend>
      <div className={columns ? 'helpgrid' : 'pillrow'}>
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              type="button"
              key={option}
              className={`helpopt${isSelected ? ' sel' : ''}`}
              aria-pressed={isSelected}
              onClick={() => onToggle(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ----------------------------------------------- single-select chip / scale */

export function ChoiceGroup({
  label,
  options,
  value,
  onSelect,
  wide = false,
  scaleLabels,
  variant = 'fam',
}: {
  label: string;
  options: string[];
  value: string | null;
  onSelect: (option: string) => void;
  wide?: boolean;
  scaleLabels?: [string, string];
  variant?: 'fam' | 'helpopt';
}) {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend className="grouplabel" style={{ padding: 0 }}>
        {label}
      </legend>
      <div className={variant === 'fam' ? 'famrow' : 'helpgrid'}>
        {options.map((option) => {
          const isSelected = value === option;
          const base = variant === 'fam' ? `fam${wide ? ' wide' : ''}` : 'helpopt';
          return (
            <button
              type="button"
              key={option}
              className={`${base}${isSelected ? ' sel' : ''}`}
              aria-pressed={isSelected}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
      {scaleLabels && (
        <div className="famlabels">
          <span>{scaleLabels[0]}</span>
          <span>{scaleLabels[1]}</span>
        </div>
      )}
    </fieldset>
  );
}

/* ------------------------------------------------------------ success panel */

export function ThankYou({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="formcard thanks" role="status" aria-live="polite">
      <SuccessIcon />
      <h2>{heading}</h2>
      {children}
      {isDemoForms && (
        <p className="note">
          (Form delivery is not configured yet, so nothing was actually sent. Set
          VITE_FORM_ENDPOINT to go live.)
        </p>
      )}
      <Link className="btn btn-teal" to={paths.home}>
        Back to homepage
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------- error panel */

export function SubmitError() {
  return (
    <div className="formerror" role="alert">
      Something went wrong sending your details. Please try again, or call us on{' '}
      <a href={site.phone.href}>
        <strong>{site.phone.display}</strong>
      </a>
      .
    </div>
  );
}
