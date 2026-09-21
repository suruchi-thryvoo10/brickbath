export type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/** Indian mobile numbers, with or without +91 / 0 prefix and spacing. */
const PHONE = /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

export function validateContact(values: {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  consent: boolean;
}): Errors<typeof values> {
  const errors: Errors<typeof values> = {};

  if (values.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email.trim())) errors.email = "That email address doesn't look right.";
  if (!PHONE.test(values.phone.replace(/\s/g, "")))
    errors.phone = "Enter a 10-digit Indian mobile number.";
  if (values.city.trim().length < 2) errors.city = "Which city is the project in?";
  if (values.message.trim().length < 12)
    errors.message = "A sentence or two helps us route this to the right person.";
  if (!values.consent) errors.consent = "We need your consent before we can contact you.";

  return errors;
}

export function hasErrors<T>(errors: Errors<T>): boolean {
  return Object.keys(errors).length > 0;
}
