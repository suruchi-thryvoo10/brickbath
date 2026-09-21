"use client";

import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from "react";
import { cx } from "@/lib/utils/format";

const control =
  "w-full rounded-[10px] border bg-white px-3.5 text-[0.9375rem] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-ink-900 disabled:bg-ink-50";

function Wrapper({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[0.8125rem] font-medium text-ink-800">
        {label}
        {required ? (
          <span className="ml-0.5 text-brass-700" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-[0.75rem] font-normal text-ink-400">optional</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.75rem] font-medium text-[#b4442f]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.75rem] text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type FieldBase = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export function TextField({
  id,
  label,
  hint,
  error,
  wrapperClassName,
  required,
  ...props
}: FieldBase & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required} className={wrapperClassName}>
      <input
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(control, "h-11", error ? "border-[#b4442f]" : "border-ink-200")}
        {...props}
      />
    </Wrapper>
  );
}

export function TextArea({
  id,
  label,
  hint,
  error,
  wrapperClassName,
  required,
  rows = 5,
  ...props
}: FieldBase & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required} className={wrapperClassName}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(control, "resize-y py-3", error ? "border-[#b4442f]" : "border-ink-200")}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  wrapperClassName,
  required,
  options,
  ...props
}: FieldBase &
  SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] }) {
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required} className={wrapperClassName}>
      <select
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(control, "h-11 pr-8", error ? "border-[#b4442f]" : "border-ink-200")}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

/** Radio-style chips used for short, visual choices (budget, timeline, style). */
export function ChoiceChips({
  legend,
  name,
  options,
  value,
  onChange,
  columns = 2,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2 | 3;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[0.8125rem] font-medium text-ink-800">{legend}</legend>
      <div
        className={cx(
          "grid gap-2.5",
          columns === 1 && "grid-cols-1",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-3",
        )}
      >
        {options.map((option) => {
          const active = value === option.value;
          return (
            <label
              key={option.value}
              className={cx(
                "cursor-pointer rounded-[12px] border p-4 transition-all duration-200",
                active
                  ? "border-ink-900 bg-ink-900 text-ink-50 shadow-soft"
                  : "border-ink-200 bg-white hover:border-ink-400",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={active}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="block text-[0.9375rem] font-medium">{option.label}</span>
              {option.description ? (
                <span
                  className={cx(
                    "mt-1 block text-[0.8125rem] leading-snug",
                    active ? "text-ink-300" : "text-ink-500",
                  )}
                >
                  {option.description}
                </span>
              ) : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
