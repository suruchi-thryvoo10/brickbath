"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChoiceChips, SelectField, TextArea, TextField } from "@/components/forms/fields";
import { Button, ButtonLink } from "@/components/ui/button";
import { Check, Close, WhatsApp } from "@/components/ui/icons";
import { EmptyState } from "@/components/ui/primitives";
import { showroomCities } from "@/lib/data/content";
import { site, whatsappLink } from "@/lib/site";
import { useShop, type Enquiry } from "@/lib/store/shop-store";
import { cx, formatPrice } from "@/lib/utils/format";
import { hasErrors, validateContact, type Errors } from "@/lib/utils/validate";

const TOPICS = [
  { value: "quote", label: "Renovation quote" },
  { value: "products", label: "Product enquiry" },
  { value: "design", label: "Design consultation" },
  { value: "dealer", label: "Dealer / trade account" },
  { value: "guide", label: "Send me the cost guide" },
  { value: "careers", label: "Careers" },
  { value: "other", label: "Something else" },
];

type Values = {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  consent: boolean;
};

const initial: Values = {
  name: "",
  email: "",
  phone: "",
  city: "",
  message: "",
  consent: false,
};

/**
 * Shared enquiry form. `variant="quote"` adds the scope questions and shows the
 * enquiry basket; `variant="contact"` is the plain contact form.
 */
export function EnquiryForm({ variant = "contact" }: { variant?: "contact" | "quote" }) {
  const params = useSearchParams();
  const { enquiryCart, removeEnquiryItem, submitEnquiry, ready } = useShop();

  const [values, setValues] = useState<Values>(initial);
  const [topic, setTopic] = useState("quote");
  const [scope, setScope] = useState("full");
  const [budget, setBudget] = useState("2-4");
  const [timeline, setTimeline] = useState("1-3m");
  const [errors, setErrors] = useState<Errors<Values>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<Enquiry | null>(null);

  useEffect(() => {
    const t = params.get("topic");
    if (t && TOPICS.some((x) => x.value === t)) setTopic(t);
    const email = params.get("email");
    if (email) setValues((v) => ({ ...v, email }));
    const product = params.get("product");
    if (product) {
      setValues((v) => ({
        ...v,
        message: v.message || `I'd like a quote for: ${product}.`,
      }));
    }
  }, [params]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (hasErrors(found)) {
      const firstKey = Object.keys(found)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setSubmitting(true);
    // No backend in this build: the enquiry is recorded locally so the user can
    // track it, and a real deployment would POST this same payload.
    await new Promise((r) => window.setTimeout(r, 700));

    const scopeNote =
      variant === "quote"
        ? `\n\nScope: ${scope} · Budget: ₹${budget} lakh · Timeline: ${timeline}`
        : "";

    const enquiry = submitEnquiry({
      name: values.name,
      email: values.email,
      phone: values.phone,
      city: values.city,
      message: values.message + scopeNote,
      topic,
      items: enquiryCart,
    });

    setSubmitting(false);
    setDone(enquiry);
  };

  if (done) {
    return (
      <div className="rounded-[18px] border border-ink-200 bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <Check width={26} height={26} />
        </div>
        <h2 className="mt-5 text-2xl text-ink-900">Enquiry received</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-600">
          Your reference is{" "}
          <span className="font-mono font-semibold text-ink-900">{done.reference}</span>. A designer
          will call {done.phone} within one working day — usually sooner.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/enquiries">Track this enquiry</ButtonLink>
          <ButtonLink
            href={whatsappLink(`Hi Brick & Bath — following up on enquiry ${done.reference}.`)}
            variant="whatsapp"
            external
          >
            <WhatsApp width={17} height={17} />
            Continue on WhatsApp
          </ButtonLink>
        </div>
        <p className="mt-6 text-[0.75rem] text-ink-400">
          Kept on this device so you can check back. Nothing was sent to a third party.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      {variant === "quote" ? (
        <>
          <ChoiceChips
            legend="What do you need?"
            name="scope"
            value={scope}
            onChange={setScope}
            options={[
              { value: "full", label: "Full renovation", description: "Back to slab and rebuilt" },
              { value: "refresh", label: "Refresh", description: "Fittings and surfaces only" },
              { value: "products", label: "Products only", description: "Supply, your contractor" },
              { value: "design", label: "Design only", description: "Drawings and specification" },
            ]}
          />
          <ChoiceChips
            legend="Budget range (₹ lakh)"
            name="budget"
            value={budget}
            onChange={setBudget}
            columns={3}
            options={[
              { value: "under-2", label: "Under 2" },
              { value: "2-4", label: "2 – 4" },
              { value: "4-8", label: "4 – 8" },
              { value: "8-15", label: "8 – 15" },
              { value: "15+", label: "15+" },
              { value: "unsure", label: "Not sure yet" },
            ]}
          />
          <ChoiceChips
            legend="When would you like to start?"
            name="timeline"
            value={timeline}
            onChange={setTimeline}
            columns={3}
            options={[
              { value: "asap", label: "As soon as possible" },
              { value: "1-3m", label: "In 1 – 3 months" },
              { value: "3m+", label: "Still planning" },
            ]}
          />
        </>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your name"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(e) => set("name", e.target.value)}
        />
        <TextField
          id="phone"
          label="Mobile number"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98765 43210"
          value={values.phone}
          error={errors.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          required
          type="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(e) => set("email", e.target.value)}
        />
        <TextField
          id="city"
          label="Project city"
          required
          list="bnb-cities"
          autoComplete="address-level2"
          value={values.city}
          error={errors.city}
          onChange={(e) => set("city", e.target.value)}
        />
        <datalist id="bnb-cities">
          {showroomCities.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <SelectField
        id="topic"
        label="What is this about?"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        options={TOPICS}
      />

      <TextArea
        id="message"
        label="Tell us about the space"
        required
        placeholder="Rough dimensions, what is there now, and what you'd like to change. Photos help — you can send them on WhatsApp after."
        value={values.message}
        error={errors.message}
        hint="The more detail here, the more accurate the first number we give you."
        onChange={(e) => set("message", e.target.value)}
      />

      {variant === "quote" ? (
        <div className="rounded-[14px] border border-ink-200 bg-ink-50/70 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink-700">
              Products in this enquiry
            </h3>
            {ready && enquiryCart.length > 0 ? (
              <span className="text-[0.75rem] text-ink-500">{enquiryCart.length} item(s)</span>
            ) : null}
          </div>

          {!ready ? (
            <p className="mt-3 text-[0.8125rem] text-ink-500">Loading your selection…</p>
          ) : enquiryCart.length === 0 ? (
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-500">
              Nothing added yet — that is fine, we will specify from scratch. Or{" "}
              <Link href="/products" className="font-medium text-brass-700 underline underline-offset-4">
                browse the catalogue
              </Link>{" "}
              and add anything you like the look of.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {enquiryCart.map((item) => (
                <li key={item.slug} className="flex items-center gap-3">
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-[8px] bg-ink-100">
                    <Image src={item.image} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      className="block truncate text-[0.875rem] font-medium text-ink-900 hover:underline"
                    >
                      {item.name}
                    </Link>
                    {item.variant ? (
                      <span className="block truncate text-[0.75rem] text-ink-500">
                        {item.variant}
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-[0.8125rem] text-ink-700">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEnquiryItem(item.slug)}
                    aria-label={`Remove ${item.name} from enquiry`}
                    className="rounded-full p-1.5 text-ink-400 transition-colors hover:bg-ink-200 hover:text-ink-900"
                  >
                    <Close width={15} height={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}

      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-[0.8125rem] leading-relaxed text-ink-600">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className={cx(
              "mt-0.5 size-4 shrink-0 rounded-[4px] accent-ink-900",
              errors.consent && "outline outline-2 outline-[#b4442f]",
            )}
          />
          <span>
            I&apos;m happy for Brick &amp; Bath to contact me about this enquiry by phone, email or
            WhatsApp. We don&apos;t sell your details, and we don&apos;t send marketing you
            didn&apos;t ask for.
          </span>
        </label>
        {errors.consent ? (
          <p role="alert" className="mt-1.5 text-[0.75rem] font-medium text-[#b4442f]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : variant === "quote" ? "Request my quote" : "Send enquiry"}
        </Button>
        <ButtonLink
          href={whatsappLink("Hi Brick & Bath — I'd like to talk about my bathroom.")}
          variant="outline"
          size="lg"
          external
        >
          <WhatsApp width={17} height={17} />
          Or message us
        </ButtonLink>
        <p className="text-[0.75rem] text-ink-500">
          Typical reply: under 4 working hours · {site.hours}
        </p>
      </div>
    </form>
  );
}

export function EnquiryEmpty() {
  return (
    <EmptyState
      title="Nothing here yet"
      description="Add products to an enquiry from any product page and they will show up here."
      action={<ButtonLink href="/products">Browse products</ButtonLink>}
    />
  );
}
