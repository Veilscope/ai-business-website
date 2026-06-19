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

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: Partial<FormState> = {};

    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.interest) nextErrors.interest = "Choose an area of interest.";
    if (values.contactMethod === "Text" && !values.textNumber.trim()) {
      nextErrors.textNumber = "Add a mobile number if text is preferred.";
    }
    if (!values.message.trim()) {
      nextErrors.message = "Share a short note about what you need.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    // TODO: Connect this submission to an API route, CRM, email service,
    // Zapier webhook, Airtable, or Google Sheets when backend details are set.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        aria-live="polite"
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-6"
      >
        <h2 className="text-xl font-semibold text-emerald-950">
          Thanks. Your request is ready for follow-up.
        </h2>
        <p className="mt-3 text-sm leading-6 text-emerald-900">
          This demo form is showing a success state. The submission layer can
          later connect to an API route, CRM, email service, Zapier webhook,
          Airtable, or Google Sheets.
        </p>
        <Button
          className="mt-5"
          onClick={() => {
            setValues(initialState);
            setSubmitted(false);
          }}
          variant="outline"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          error={errors.name}
          label="Name"
          name="name"
          onChange={(value) => updateField("name", value)}
          required
          value={values.name}
        />
        <Field
          error={errors.email}
          label="Email"
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
        name="textNumber"
        onChange={(value) => updateField("textNumber", value)}
        value={values.textNumber}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Company"
          name="company"
          onChange={(value) => updateField("company", value)}
          value={values.company}
        />
        <Field
          label="Role/title"
          name="role"
          onChange={(value) => updateField("role", value)}
          value={values.role}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Business type"
          name="businessType"
          onChange={(value) => updateField("businessType", value)}
          value={values.businessType}
        />
        <Field
          label="Team size"
          name="teamSize"
          onChange={(value) => updateField("teamSize", value)}
          value={values.teamSize}
        />
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
          className="mt-2 min-h-36 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          id="message"
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          value={values.message}
        />
        {errors.message ? (
          <p className="mt-2 text-sm text-red-700">{errors.message}</p>
        ) : null}
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

      <Button showArrow size="lg" type="submit">
        Request a Free AI Strategy Call
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
  required?: boolean;
  type?: string;
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
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
        name={name}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
