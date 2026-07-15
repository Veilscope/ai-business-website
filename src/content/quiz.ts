export type QuizQuestionId =
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "q6"
  | "q7"
  | "q8";

export type QuizOptionId = "a" | "b" | "c";

export type QuizQuestion = {
  id: QuizQuestionId;
  area: string;
  question: string;
  options: Array<{
    id: QuizOptionId;
    text: string;
  }>;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    area: "Practical AI Use",
    question: "Which best describes how you currently use AI at work?",
    options: [
      {
        id: "a",
        text: "I rarely use it, or I am still experimenting with where it might help.",
      },
      {
        id: "b",
        text: "I use it for common tasks such as writing, summaries, research, or ideas.",
      },
      {
        id: "c",
        text: "I use it regularly across several tasks and have started developing consistent ways to work with it.",
      },
    ],
  },
  {
    id: "q2",
    area: "Practical AI Use",
    question: "How do you decide whether a workplace task is a good fit for AI?",
    options: [
      {
        id: "a",
        text: "I usually try AI when I think it might save time and then judge the result.",
      },
      {
        id: "b",
        text: "I mainly use AI for lower-risk tasks such as drafting, brainstorming, or organizing information.",
      },
      {
        id: "c",
        text: "I consider the task's risk, data sensitivity, need for human judgment, and whether the process could be repeated reliably.",
      },
    ],
  },
  {
    id: "q3",
    area: "Prompting and Iteration",
    question: "When you ask AI for help, what do your prompts usually include?",
    options: [
      {
        id: "a",
        text: "A short request describing what I want.",
      },
      {
        id: "b",
        text: "The task, some background, and the type of answer I need.",
      },
      {
        id: "c",
        text: "A clear goal, useful context, audience, constraints, examples, and the desired output format.",
      },
    ],
  },
  {
    id: "q4",
    area: "Prompting and Iteration",
    question: "What do you usually do when the first AI response is not good enough?",
    options: [
      {
        id: "a",
        text: "I reword the request or start again with a different prompt.",
      },
      {
        id: "b",
        text: "I explain what is missing and ask AI to revise a specific part.",
      },
      {
        id: "c",
        text: "I identify why the response missed the mark, add better context or examples, and refine it through a few focused revisions.",
      },
    ],
  },
  {
    id: "q5",
    area: "Review and Risk",
    question: "If an AI response sounds useful, what do you usually do before using it?",
    options: [
      {
        id: "a",
        text: "I give it a quick review and use it when it appears to fit the task.",
      },
      {
        id: "b",
        text: "I edit it and check the most important facts, claims, or recommendations.",
      },
      {
        id: "c",
        text: "I verify important details against trusted sources, workplace data, or an appropriate person and confirm that it fits the real situation.",
      },
    ],
  },
  {
    id: "q6",
    area: "Review and Risk",
    question: "How do you handle private, customer, or workplace information when using AI?",
    options: [
      {
        id: "a",
        text: "I use normal judgment and avoid entering anything that is obviously sensitive.",
      },
      {
        id: "b",
        text: "I remove names and private details and follow any workplace rules I know about.",
      },
      {
        id: "c",
        text: "I use approved tools, minimize the information entered, follow clear data rules, and stop or ask when the risk is uncertain.",
      },
    ],
  },
  {
    id: "q7",
    area: "Workflow and Governance",
    question: "Which best describes how AI is currently used across your workplace?",
    options: [
      {
        id: "a",
        text: "Usage is mostly individual, informal, or experimental.",
      },
      {
        id: "b",
        text: "A few people use AI for common tasks, but methods and review practices vary.",
      },
      {
        id: "c",
        text: "AI is being used in repeatable workflows with clear responsibilities, review steps, and shared expectations.",
      },
    ],
  },
  {
    id: "q8",
    area: "Workflow and Governance",
    question: "How do you judge whether AI is actually improving a workplace task?",
    options: [
      {
        id: "a",
        text: "The task feels faster or produces more output than before.",
      },
      {
        id: "b",
        text: "I compare the time saved and the quality of the result on a few real examples.",
      },
      {
        id: "c",
        text: "I consider time, quality, errors, risk, consistency, and whether the process remains reliable when repeated by other people.",
      },
    ],
  },
];
