"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  email: string;
  textNumber: string;
  company: string;
  role: string;
  businessType: string;
  teamSize: string;
  interest: string;
  message: string;
  contactMethod: string;
};

type FormErrors = Partial<Record<keyof FormState | "form", string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const initialState: FormState = {
  name: "",
  email: "",
  textNumber: "",
  company: "",
  role: "",
  businessType: "",
  teamSize: "",
  interest: "",
  message: "",
  contactMethod: "Email",
};

const interests = [
  "AI training workshop",
  "Executive AI briefing",
  "AI use case discovery",
  "Workflow/productivity support",
  "Not sure yet",
];

const teamSizeOptions = [
  "1-5",
  "6-10",
  "11-25",
  "26-50",
  "51-100",
  "101-250",
  "251+",
];

const FIELD_LIMITS = {
  name: 120,
  email: 180,
  textNumber: 20,
  company: 120,
  role: 120,
  businessType: 120,
  teamSize: 60,
  message: 1_200,
} as const;

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    const nextValue =
      field === "textNumber" ? formatUsPhoneInput(value) : value;

    setValues((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setServerMessage("");
    setSubmitStatus("idle");
  }

  function validate() {
    const nextErrors: FormErrors = {};

    validateFieldLengths(values, nextErrors);

    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!nextErrors.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.interest) nextErrors.interest = "Choose an area of interest.";
    if (values.contactMethod === "Text" && !values.textNumber.trim()) {
      nextErrors.textNumber = "Add a mobile number if text is preferred.";
    } else if (
      values.textNumber.trim() &&
      !nextErrors.textNumber &&
      !isValidUsPhoneNumber(values.textNumber)
    ) {
      nextErrors.textNumber = "Enter a valid US phone number.";
    }
    if (!values.message.trim()) {
      nextErrors.message = "Share a short note about what you need.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    setSubmitStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          website: "",
          formStartedAt,
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | {
            message?: string;
            fieldErrors?: FormErrors;
          }
        | null;

      if (!response.ok) {
        setErrors(result?.fieldErrors || {});
        setServerMessage(
          result?.message || "The message could not be sent. Please try again.",
        );
        setSubmitStatus("error");
        return;
      }

      setServerMessage(
        result?.message || "Thanks. Your message was sent to AI Training Denver.",
      );
      setSubmitted(true);
      setSubmitStatus("success");
    } catch {
      setServerMessage("The message could not be sent. Please try again.");
      setSubmitStatus("error");
    }
  }

  function resetForm() {
    setValues(initialState);
    setErrors({});
    setServerMessage("");
    setSubmitStatus("idle");
    setSubmitted(false);
    setFormStartedAt(Date.now());
  }

  if (submitted) {
    return (
      <div
        aria-live="polite"
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-6"
      >
        <h2 className="text-xl font-semibold text-emerald-950">
          Thanks. Your message was sent.
        </h2>
        <p className="mt-3 text-sm leading-6 text-emerald-900">
          {serverMessage ||
            "AI Training Denver will follow up through your preferred contact path."}
        </p>
        <Button
          className="mt-5"
          onClick={resetForm}
          variant="outline"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
      <input name="formStartedAt" type="hidden" value={formStartedAt} />
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input
          autoComplete="off"
          id="website"
          name="website"
          tabIndex={-1}
          type="text"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          error={errors.name}
          label="Name"
          maxLength={FIELD_LIMITS.name}
          name="name"
          onChange={(value) => updateField("name", value)}
          required
          value={values.name}
        />
        <Field
          error={errors.email}
          label="Email"
          maxLength={FIELD_LIMITS.email}
          name="email"
          onChange={(value) => updateField("email", value)}
          required
          type="email"
          value={values.email}
        />
      </div>
      <Field
        error={errors.textNumber}
        label="Text number"
        maxLength={FIELD_LIMITS.textNumber}
        name="textNumber"
        onChange={(value) => updateField("textNumber", value)}
        placeholder="(555)-555-5555"
        type="tel"
        value={values.textNumber}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Company"
          maxLength={FIELD_LIMITS.company}
          name="company"
          onChange={(value) => updateField("company", value)}
          value={values.company}
        />
        <Field
          label="Role/title"
          maxLength={FIELD_LIMITS.role}
          name="role"
          onChange={(value) => updateField("role", value)}
          value={values.role}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Business type"
          maxLength={FIELD_LIMITS.businessType}
          name="businessType"
          onChange={(value) => updateField("businessType", value)}
          value={values.businessType}
        />
        <div>
          <label
            className="text-sm font-semibold text-slate-900"
            htmlFor="teamSize"
          >
            Team size
          </label>
          <select
            aria-invalid={Boolean(errors.teamSize)}
            className="mt-2 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
            id="teamSize"
            name="teamSize"
            onChange={(event) => updateField("teamSize", event.target.value)}
            value={values.teamSize}
          >
            <option value="">Select a range</option>
            {teamSizeOptions.map((teamSize) => (
              <option key={teamSize} value={teamSize}>
                {teamSize}
              </option>
            ))}
          </select>
          {errors.teamSize ? (
            <p className="mt-2 text-sm text-red-700">{errors.teamSize}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          className="text-sm font-semibold text-slate-900"
          htmlFor="interest"
        >
          What are you interested in? <span className="text-blue-700">*</span>
        </label>
        <select
          aria-invalid={Boolean(errors.interest)}
          className="mt-2 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          id="interest"
          name="interest"
          onChange={(event) => updateField("interest", event.target.value)}
          value={values.interest}
        >
          <option value="">Select an option</option>
          {interests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
        {errors.interest ? (
          <p className="mt-2 text-sm text-red-700">{errors.interest}</p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-900" htmlFor="message">
          Message <span className="text-blue-700">*</span>
        </label>
        <textarea
          aria-invalid={Boolean(errors.message)}
          aria-describedby="message-count"
          className="mt-2 min-h-36 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          id="message"
          maxLength={FIELD_LIMITS.message}
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          value={values.message}
        />
        <div className="mt-2 flex items-start justify-between gap-3 text-sm">
          {errors.message ? (
            <p className="text-red-700">{errors.message}</p>
          ) : (
            <span aria-hidden="true" />
          )}
          <p
            className={
              values.message.length >= FIELD_LIMITS.message
                ? "shrink-0 font-medium text-red-700"
                : "shrink-0 text-slate-500"
            }
            id="message-count"
          >
            {values.message.length}/{FIELD_LIMITS.message}
          </p>
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-slate-900">
          Preferred contact method
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {["Email", "Text"].map((method) => (
            <label
              className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
              key={method}
            >
              <input
                checked={values.contactMethod === method}
                className="h-4 w-4 accent-blue-600"
                name="contactMethod"
                onChange={() => updateField("contactMethod", method)}
                type="radio"
                value={method}
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      {submitStatus === "error" && serverMessage ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {serverMessage}
        </p>
      ) : null}

      <Button
        disabled={submitStatus === "submitting"}
        showArrow
        size="lg"
        type="submit"
      >
        {submitStatus === "submitting"
          ? "Sending..."
          : "Request a Free AI Strategy Call"}
      </Button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  maxLength,
  placeholder,
  required = false,
  type = "text",
}: FieldProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-900" htmlFor={name}>
        {label} {required ? <span className="text-blue-700">*</span> : null}
      </label>
      <input
        aria-invalid={Boolean(error)}
        className="mt-2 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
        id={name}
        maxLength={maxLength}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}

function validateFieldLengths(values: FormState, errors: FormErrors) {
  const labels: Record<keyof typeof FIELD_LIMITS, string> = {
    name: "Name",
    email: "Email",
    textNumber: "Text number",
    company: "Company",
    role: "Role/title",
    businessType: "Business type",
    teamSize: "Team size",
    message: "Message",
  };

  for (const field of Object.keys(FIELD_LIMITS) as Array<keyof typeof FIELD_LIMITS>) {
    const maxLength = FIELD_LIMITS[field];
    if (values[field].length > maxLength) {
      errors[field] = `${labels[field]} must be ${maxLength} characters or fewer.`;
    }
  }
}

function isValidUsPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  const nationalDigits =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  if (nationalDigits.length !== 10) return false;

  return /^[2-9]\d{2}[2-9]\d{6}$/.test(nationalDigits);
}

function formatUsPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "");
  const nationalDigits =
    digits.length > 10 && digits.startsWith("1") ? digits.slice(1) : digits;
  const trimmedDigits = nationalDigits.slice(0, 10);
  const areaCode = trimmedDigits.slice(0, 3);
  const exchange = trimmedDigits.slice(3, 6);
  const lineNumber = trimmedDigits.slice(6);

  if (trimmedDigits.length === 0) return "";
  if (trimmedDigits.length <= 3) return `(${areaCode}`;
  if (trimmedDigits.length <= 6) return `(${areaCode})-${exchange}`;

  return `(${areaCode})-${exchange}-${lineNumber}`;
}
