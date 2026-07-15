import { quizQuestions, type QuizOptionId, type QuizQuestionId } from "@/content/quiz";

export const runtime = "nodejs";

type QuizPayload = {
  email?: unknown;
  answers?: unknown;
  pageUrl?: unknown;
  referrer?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  submissionId?: unknown;
  website?: unknown;
};

type RateBucket = {
  count: number;
  resetAt: number;
};

type ReadinessLevel = "AI Beginner" | "AI User" | "AI Ready";
type AreaLabel = "Starting Point" | "Developing" | "Strong";

const MAX_BODY_BYTES = 12_000;
const IP_WINDOW_MS = 15 * 60 * 1_000;
const EMAIL_WINDOW_MS = 60 * 60 * 1_000;
const MAX_PER_IP = 5;
const MAX_PER_EMAIL = 3;

const optionValues: Record<QuizOptionId, number> = {
  a: 1,
  b: 2,
  c: 3,
};

const questionWeights: Record<QuizQuestionId, number> = {
  q1: 1,
  q2: 1,
  q3: 1,
  q4: 1,
  q5: 2,
  q6: 2,
  q7: 2,
  q8: 2,
};

const resultOrder: Record<ReadinessLevel, number> = {
  "AI Beginner": 0,
  "AI User": 1,
  "AI Ready": 2,
};

const resultSummaries: Record<ReadinessLevel, string> = {
  "AI Beginner":
    "You're at a useful starting point. With the right training, you can learn where AI fits, how to prompt it more clearly, how to avoid common risks, and how to use it with greater confidence at work.",
  "AI User":
    "You have started building a practical AI foundation, but there may still be gaps in prompting, review habits, data handling, or workplace process. Focused training can help turn individual AI use into more reliable workplace results.",
  "AI Ready":
    "You appear to have a strong foundation and may be ready to apply AI more strategically across real workplace tasks. Training can help standardize best practices, improve workflows, and make AI use safer and more consistent across your team.",
};

const areaDefinitions = [
  {
    name: "Practical AI Use",
    questionIds: ["q1", "q2"] as const,
    feedback: {
      "Starting Point":
        "You may benefit from practical examples of where AI fits into everyday workplace tasks and where it does not.",
      Developing:
        "You are using AI in useful ways, but clearer task selection could make the results more consistent.",
      Strong:
        "You appear to have a practical understanding of where AI can support workplace tasks.",
    },
  },
  {
    name: "Prompting and Iteration",
    questionIds: ["q3", "q4"] as const,
    feedback: {
      "Starting Point":
        "You may benefit from learning how to give AI clearer goals, context, constraints, and examples.",
      Developing:
        "You are adding useful direction, but a more repeatable prompting and revision process could improve quality.",
      Strong:
        "You appear to use context and focused iteration to improve AI responses.",
    },
  },
  {
    name: "Review and Risk",
    questionIds: ["q5", "q6"] as const,
    feedback: {
      "Starting Point":
        "You may benefit from stronger habits for checking AI output and protecting workplace or customer information.",
      Developing:
        "You are applying some review and privacy judgment, but clearer standards could reduce avoidable risk.",
      Strong:
        "You appear to use thoughtful review and data-handling practices before relying on AI output.",
    },
  },
  {
    name: "Workflow and Governance",
    questionIds: ["q7", "q8"] as const,
    feedback: {
      "Starting Point":
        "You may benefit from identifying one safe, repeatable task and defining how people should use and review AI within it.",
      Developing:
        "AI is providing value, but shared processes and clearer measurement could make that value more reliable.",
      Strong:
        "You appear ready to build or improve repeatable AI workflows with clearer standards and accountability.",
    },
  },
];

const globalForQuiz = globalThis as typeof globalThis & {
  quizRateBuckets?: Map<string, RateBucket>;
};

const rateBuckets =
  globalForQuiz.quizRateBuckets ?? new Map<string, RateBucket>();

globalForQuiz.quizRateBuckets = rateBuckets;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json(
      { message: "This quiz submission is too large." },
      { status: 413 },
    );
  }

  if (!isSameOrigin(request)) {
    return Response.json(
      { message: "This request could not be verified." },
      { status: 403 },
    );
  }

  let payload: QuizPayload;
  try {
    payload = (await request.json()) as QuizPayload;
  } catch {
    return Response.json(
      { message: "Send the quiz as valid JSON." },
      { status: 400 },
    );
  }

  if (asString(payload.website)) {
    return Response.json({ message: "Result prepared." });
  }

  const email = trimText(payload.email);
  const fieldErrors: { email?: string; answers?: string; form?: string } = {};

  if (!email) {
    fieldErrors.email = "Email is required.";
  } else if (email.length > 180 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  const answers = validateAnswers(payload.answers);
  if (!answers) {
    fieldErrors.answers = "Answer every quiz question before submitting.";
  }

  if (Object.keys(fieldErrors).length > 0 || !answers) {
    return Response.json(
      {
        message: "Please fix the highlighted fields.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(`ip:${ip}`, MAX_PER_IP, IP_WINDOW_MS)) {
    return Response.json(
      { message: "Too many quiz submissions were sent recently. Try again later." },
      { status: 429 },
    );
  }

  if (
    isRateLimited(
      `email:${email.toLowerCase()}`,
      MAX_PER_EMAIL,
      EMAIL_WINDOW_MS,
    )
  ) {
    return Response.json(
      { message: "Too many quiz submissions were sent from this email recently." },
      { status: 429 },
    );
  }

  const resendConfig = getResendConfig();
  if (!resendConfig) {
    return Response.json(
      { message: "Quiz email delivery is not configured yet." },
      { status: 500 },
    );
  }

  const evaluation = evaluateQuiz(answers);
  const attribution = normalizeAttribution(payload, request);

  try {
    await sendResendEmail({
      apiKey: resendConfig.apiKey,
      from: resendConfig.from,
      to: resendConfig.to,
      replyTo: email,
      subject: `New AI Readiness Lead: ${evaluation.finalLevel} - ${email}`,
      text: buildTextEmail(email, evaluation, attribution, ip),
      html: buildHtmlEmail(email, evaluation, attribution, ip),
    });

    return Response.json({
      result: buildPublicResult(evaluation.finalLevel, evaluation.areas),
    });
  } catch (error) {
    console.error("Quiz Resend notification failed", error);
    return Response.json(
      { message: "Your result could not be prepared. Please try again." },
      { status: 500 },
    );
  }
}

function validateAnswers(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const entries = Object.entries(value);
  const expectedIds = quizQuestions.map((question) => question.id);

  if (entries.length !== expectedIds.length) return null;

  const answers: Record<QuizQuestionId, QuizOptionId> = {} as Record<
    QuizQuestionId,
    QuizOptionId
  >;

  for (const questionId of expectedIds) {
    const answer = (value as Record<string, unknown>)[questionId];
    if (!isOptionId(answer)) return null;
    answers[questionId] = answer;
  }

  for (const [questionId] of entries) {
    if (!expectedIds.includes(questionId as QuizQuestionId)) return null;
  }

  return answers;
}

function evaluateQuiz(answers: Record<QuizQuestionId, QuizOptionId>) {
  const answerDetails = quizQuestions.map((question) => {
    const optionId = answers[question.id];
    const option = question.options.find((item) => item.id === optionId);
    const rawValue = optionValues[optionId];
    const weight = questionWeights[question.id];

    return {
      questionId: question.id,
      question: question.question,
      optionId,
      answer: option?.text || "",
      rawValue,
      weight,
      weightedContribution: rawValue * weight,
    };
  });

  const weightedSignal = answerDetails.reduce(
    (total, detail) => total + detail.weightedContribution,
    0,
  );
  const initialLevel = levelForWeightedSignal(weightedSignal);
  const guardrail = getGuardrail(answers);
  const finalLevel = guardrail
    ? minLevel(initialLevel, guardrail.maxLevel)
    : initialLevel;

  return {
    weightedSignal,
    initialLevel,
    finalLevel,
    guardrailApplied:
      guardrail && finalLevel !== initialLevel ? guardrail.reason : "None",
    guardrailTriggered: guardrail?.reason || "None",
    areas: areaDefinitions.map((area) => {
      const total = area.questionIds.reduce(
        (sum, questionId) => sum + optionValues[answers[questionId]],
        0,
      );
      const label = areaLabelForTotal(total);

      return {
        name: area.name,
        label,
        feedback: area.feedback[label],
      };
    }),
    answerDetails,
  };
}

function levelForWeightedSignal(weightedSignal: number): ReadinessLevel {
  if (weightedSignal <= 19) return "AI Beginner";
  if (weightedSignal <= 28) return "AI User";
  return "AI Ready";
}

function getGuardrail(answers: Record<QuizQuestionId, QuizOptionId>) {
  if (answers.q5 === "a" && answers.q6 === "a") {
    return {
      maxLevel: "AI Beginner" as const,
      reason: "Question 5 and Question 6 were both A.",
    };
  }

  if (answers.q5 === "a" || answers.q6 === "a") {
    return {
      maxLevel: "AI User" as const,
      reason: "Question 5 or Question 6 was A.",
    };
  }

  if (answers.q7 === "a" && answers.q8 === "a") {
    return {
      maxLevel: "AI User" as const,
      reason: "Question 7 and Question 8 were both A.",
    };
  }

  return null;
}

function minLevel(level: ReadinessLevel, maxLevel: ReadinessLevel) {
  return resultOrder[level] <= resultOrder[maxLevel] ? level : maxLevel;
}

function areaLabelForTotal(total: number): AreaLabel {
  if (total <= 3) return "Starting Point";
  if (total === 4) return "Developing";
  return "Strong";
}

function buildPublicResult(
  finalLevel: ReadinessLevel,
  areas: Array<{ name: string; label: AreaLabel; feedback: string }>,
) {
  return {
    overallLevel: finalLevel,
    overallSummary: resultSummaries[finalLevel],
    areas,
    cta: {
      label: "Book a Call for a Local AI Training Quote",
      copy: "We provide practical local, in-person AI training for businesses, owners, managers, and employees.",
      url: envValue("QUIZ_CTA_URL") || "/contact",
    },
    disclaimer:
      "This quiz is a practical workplace AI readiness assessment, not a formal certification or professional assessment.",
  };
}

function normalizeAttribution(payload: QuizPayload, request: Request) {
  const siteUrl = envValue("SITE_URL");

  return {
    pageUrl:
      trimText(payload.pageUrl).slice(0, 500) ||
      new URL("/quiz", siteUrl || request.url).toString(),
    referrer: trimText(payload.referrer).slice(0, 500) || "Not provided",
    utmSource: trimText(payload.utmSource).slice(0, 120) || "Not provided",
    utmMedium: trimText(payload.utmMedium).slice(0, 120) || "Not provided",
    utmCampaign: trimText(payload.utmCampaign).slice(0, 120) || "Not provided",
    submissionId:
      trimText(payload.submissionId).slice(0, 120) || `server-${Date.now()}`,
  };
}

function getResendConfig() {
  const apiKey = envValue("RESEND_API_KEY");
  const from = envValue("QUIZ_FROM_EMAIL");
  const to = parseEmailList(envValue("QUIZ_NOTIFICATION_EMAILS"));

  if (!apiKey || !from || to.length === 0) return null;

  return {
    apiKey,
    from,
    to,
  };
}

async function sendResendEmail({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  text,
  html,
}: {
  apiKey: string;
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}) {
  const configuredReplyTo = envValue("QUIZ_REPLY_TO_EMAIL");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: configuredReplyTo || replyTo,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend request failed with ${response.status}: ${body}`);
  }
}

function buildTextEmail(
  email: string,
  evaluation: ReturnType<typeof evaluateQuiz>,
  attribution: ReturnType<typeof normalizeAttribution>,
  ip: string,
) {
  return [
    "New AI readiness quiz lead",
    "",
    `Lead email: ${email}`,
    `Completion timestamp: ${new Date().toISOString()}`,
    `Final readiness level: ${evaluation.finalLevel}`,
    `Hidden weighted signal: ${evaluation.weightedSignal}`,
    `Initial result band: ${evaluation.initialLevel}`,
    `Guardrail applied: ${evaluation.guardrailApplied}`,
    `Guardrail triggered: ${evaluation.guardrailTriggered}`,
    `Source IP: ${ip}`,
    `Page URL: ${attribution.pageUrl}`,
    `Referrer: ${attribution.referrer}`,
    `UTM source: ${attribution.utmSource}`,
    `UTM medium: ${attribution.utmMedium}`,
    `UTM campaign: ${attribution.utmCampaign}`,
    `Submission ID: ${attribution.submissionId}`,
    "Resend send status: Submitted to Resend API",
    "",
    "Readiness areas:",
    ...evaluation.areas.map((area) => `${area.name}: ${area.label}`),
    "",
    "Selected answers:",
    ...evaluation.answerDetails.map(
      (detail) =>
        `${detail.questionId}: ${detail.question}\n` +
        `Answer ${detail.optionId.toUpperCase()}: ${detail.answer}\n` +
        `Raw value: ${detail.rawValue}; Weight: ${detail.weight}; Weighted contribution: ${detail.weightedContribution}`,
    ),
  ].join("\n");
}

function buildHtmlEmail(
  email: string,
  evaluation: ReturnType<typeof evaluateQuiz>,
  attribution: ReturnType<typeof normalizeAttribution>,
  ip: string,
) {
  const summaryRows = [
    ["Lead email", email],
    ["Completion timestamp", new Date().toISOString()],
    ["Final readiness level", evaluation.finalLevel],
    ["Hidden weighted signal", String(evaluation.weightedSignal)],
    ["Initial result band", evaluation.initialLevel],
    ["Guardrail applied", evaluation.guardrailApplied],
    ["Guardrail triggered", evaluation.guardrailTriggered],
    ["Source IP", ip],
    ["Page URL", attribution.pageUrl],
    ["Referrer", attribution.referrer],
    ["UTM source", attribution.utmSource],
    ["UTM medium", attribution.utmMedium],
    ["UTM campaign", attribution.utmCampaign],
    ["Submission ID", attribution.submissionId],
    ["Resend send status", "Submitted to Resend API"],
  ];

  return `
    <h2>New AI readiness quiz lead</h2>
    <table cellpadding="8" cellspacing="0" border="0">
      ${summaryRows.map(([label, value]) => tableRow(label, value)).join("")}
    </table>

    <h3>Readiness areas</h3>
    <table cellpadding="8" cellspacing="0" border="0">
      ${evaluation.areas
        .map((area) => tableRow(area.name, area.label))
        .join("")}
    </table>

    <h3>Selected answers</h3>
    <table cellpadding="8" cellspacing="0" border="1">
      <thead>
        <tr>
          <th align="left">Question ID</th>
          <th align="left">Question</th>
          <th align="left">Answer</th>
          <th align="left">Raw value</th>
          <th align="left">Weight</th>
          <th align="left">Weighted contribution</th>
        </tr>
      </thead>
      <tbody>
        ${evaluation.answerDetails
          .map(
            (detail) => `
              <tr>
                <td>${escapeHtml(detail.questionId)}</td>
                <td>${escapeHtml(detail.question)}</td>
                <td><strong>${escapeHtml(detail.optionId.toUpperCase())}</strong>: ${escapeHtml(detail.answer)}</td>
                <td>${detail.rawValue}</td>
                <td>${detail.weight}</td>
                <td>${detail.weightedContribution}</td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function tableRow(label: string, value: string) {
  return `
    <tr>
      <td><strong>${escapeHtml(label)}</strong></td>
      <td>${escapeHtml(value)}</td>
    </tr>
  `;
}

function parseEmailList(value: string | undefined) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item));
}

function isRateLimited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = rateBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    cleanupRateBuckets(now);
    return false;
  }

  current.count += 1;
  return current.count > max;
}

function cleanupRateBuckets(now: number) {
  if (rateBuckets.size < 1_000) return;

  for (const [key, bucket] of rateBuckets.entries()) {
    if (bucket.resetAt <= now) rateBuckets.delete(key);
  }
}

function isOptionId(value: unknown): value is QuizOptionId {
  return value === "a" || value === "b" || value === "c";
}

function envValue(name: string) {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function getClientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function trimText(value: unknown) {
  return asString(value).trim();
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
