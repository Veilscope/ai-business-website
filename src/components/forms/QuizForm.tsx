"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import type { QuizOptionId, QuizQuestionId } from "@/content/quiz";
import { quizQuestions } from "@/content/quiz";

type AnswerState = Partial<Record<QuizQuestionId, QuizOptionId>>;

type ResultArea = {
  name: string;
  label: string;
  feedback: string;
};

type QuizResult = {
  overallLevel: string;
  overallSummary: string;
  areas: ResultArea[];
  cta: {
    label: string;
    copy: string;
    url: string;
  };
  disclaimer: string;
};

type ApiResponse = {
  message?: string;
  fieldErrors?: {
    email?: string;
    answers?: string;
    form?: string;
  };
  result?: QuizResult;
};

type Step = "intro" | "questions" | "email" | "result";
type SubmitStatus = "idle" | "submitting" | "error";

export function QuizForm() {
  const [step, setStep] = useState<Step>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submissionId] = useState(() => createSubmissionId());

  const question = quizQuestions[currentIndex];
  const selectedAnswer = question ? answers[question.id] : undefined;
  const answeredCount = useMemo(
    () => quizQuestions.filter((item) => answers[item.id]).length,
    [answers],
  );

  function chooseAnswer(questionId: QuizQuestionId, optionId: QuizOptionId) {
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
    setError("");
  }

  function startQuiz() {
    setStep("questions");
    setError("");
  }

  function goBack() {
    setError("");
    if (step === "email") {
      setStep("questions");
      setCurrentIndex(quizQuestions.length - 1);
      return;
    }

    setCurrentIndex((current) => Math.max(current - 1, 0));
  }

  function goNext() {
    if (!question || !selectedAnswer) {
      setError("Choose an answer to continue.");
      return;
    }

    setError("");
    if (currentIndex === quizQuestions.length - 1) {
      setStep("email");
      return;
    }

    setCurrentIndex((current) => current + 1);
  }

  async function submitQuiz(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setEmailError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError("Email is required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    if (quizQuestions.some((item) => !answers[item.id])) {
      setError("Answer every question before viewing your result.");
      setStep("questions");
      return;
    }

    setSubmitStatus("submitting");

    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          answers,
          website,
          submissionId,
          ...getAttribution(),
        }),
      });
      const data = (await response.json().catch(() => null)) as ApiResponse | null;

      if (!response.ok || !data?.result) {
        setSubmitStatus("error");
        setEmailError(data?.fieldErrors?.email || "");
        setError(
          data?.fieldErrors?.answers ||
            data?.fieldErrors?.form ||
            data?.message ||
            "Your result could not be prepared. Please try again.",
        );
        return;
      }

      setResult(data.result);
      setStep("result");
      setSubmitStatus("idle");
    } catch {
      setSubmitStatus("error");
      setError("Your result could not be prepared. Please try again.");
    }
  }

  if (step === "result" && result) {
    return (
      <section aria-live="polite" className="grid gap-6">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-normal text-blue-700">
            Overall readiness
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            {result.overallLevel}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">
            {result.overallSummary}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {result.areas.map((area) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
              key={area.name}
            >
              <p className="text-sm font-semibold text-slate-500">
                {area.name}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                {area.label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {area.feedback}
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
          <h2 className="text-2xl font-semibold text-slate-950">
            Build practical AI habits with your team
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {result.cta.copy}
          </p>
          <Button className="mt-5" href={result.cta.url} showArrow size="lg">
            {result.cta.label}
          </Button>
          <p className="mt-5 text-xs leading-5 text-slate-500">
            {result.disclaimer}
          </p>
        </div>
      </section>
    );
  }

  if (step === "intro") {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 lg:p-8">
        <p className="text-sm font-semibold uppercase tracking-normal text-blue-700">
          Workplace AI readiness quiz
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-950">
          See how prepared you and your workplace are to use AI safely and
          effectively.
        </h2>
        <div className="mt-5 space-y-3 text-base leading-7 text-slate-700">
          <p>
            Answer 8 practical questions and receive a readiness result across
            four workplace AI areas.
          </p>
          <p>
            The assessment takes about 3 minutes and is designed for owners,
            managers, and employees, not technical AI programmers.
          </p>
        </div>
        <Button className="mt-8" onClick={startQuiz} showArrow size="lg">
          Start the Quiz
        </Button>
      </div>
    );
  }

  if (step === "email") {
    return (
      <form
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 lg:p-8"
        noValidate
        onSubmit={submitQuiz}
      >
        <div aria-hidden="true" className="hidden">
          <label htmlFor="quiz-website">Website</label>
          <input
            autoComplete="off"
            id="quiz-website"
            name="website"
            onChange={(event) => setWebsite(event.target.value)}
            tabIndex={-1}
            type="text"
            value={website}
          />
        </div>
        <p className="text-sm font-semibold text-blue-700">
          {answeredCount} of {quizQuestions.length} questions answered
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-950">
          Your readiness result is ready
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-700">
          Enter your email to view your workplace AI readiness result.
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          We may also send occasional follow-up about workplace AI training. You
          can unsubscribe anytime.
        </p>

        <div className="mt-6">
          <label className="text-sm font-semibold text-slate-900" htmlFor="email">
            Email <span className="text-blue-700">*</span>
          </label>
          <input
            aria-invalid={Boolean(emailError)}
            autoComplete="email"
            className="mt-2 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
            id="email"
            maxLength={180}
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError("");
              setError("");
            }}
            type="email"
            value={email}
          />
          {emailError ? (
            <p className="mt-2 text-sm text-red-700">{emailError}</p>
          ) : null}
        </div>

        {error ? (
          <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button onClick={goBack} type="button" variant="outline">
            Back
          </Button>
          <Button
            disabled={submitStatus === "submitting"}
            showArrow
            size="lg"
            type="submit"
          >
            {submitStatus === "submitting" ? "Preparing..." : "View My Result"}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700">
            Question {currentIndex + 1} of {quizQuestions.length}
          </p>
          <p className="mt-1 text-sm text-slate-500">{question.area}</p>
        </div>
        <p className="text-sm text-slate-500">
          {answeredCount} answered
        </p>
      </div>

      <div
        aria-hidden="true"
        className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className="h-full rounded-full bg-blue-600"
          style={{
            width: `${((currentIndex + 1) / quizQuestions.length) * 100}%`,
          }}
        />
      </div>

      <fieldset className="mt-8">
        <legend className="text-2xl font-semibold leading-9 text-slate-950">
          {question.question}
        </legend>
        <div className="mt-6 grid gap-3">
          {question.options.map((option) => {
            const checked = selectedAnswer === option.id;

            return (
              <label
                className={
                  checked
                    ? "flex cursor-pointer gap-3 rounded-lg border border-blue-500 bg-blue-50 p-4 shadow-sm shadow-blue-950/10"
                    : "flex cursor-pointer gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 hover:border-slate-300 hover:bg-slate-50"
                }
                key={option.id}
              >
                <input
                  checked={checked}
                  className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
                  name={question.id}
                  onChange={() => chooseAnswer(question.id, option.id)}
                  type="radio"
                  value={option.id}
                />
                <span className="text-sm leading-6 text-slate-800">
                  {option.text}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error ? (
        <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          disabled={currentIndex === 0}
          onClick={goBack}
          type="button"
          variant="outline"
        >
          Back
        </Button>
        <Button onClick={goNext} showArrow size="lg" type="button">
          {currentIndex === quizQuestions.length - 1
            ? "Continue to Result"
            : "Next Question"}
        </Button>
      </div>
    </section>
  );
}

function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `quiz-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getAttribution() {
  if (typeof window === "undefined") {
    return {
      pageUrl: "",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    pageUrl: window.location.href,
    referrer: document.referrer,
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };
}
