export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  body: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

export const articles: Article[] = [
  {
    slug: "denver-businesses-start-using-ai",
    title: "How Denver Businesses Can Start Using AI Without Overwhelming Their Teams",
    excerpt:
      "A practical starting path for local teams that want real AI adoption without random tool chasing.",
    category: "Denver Business AI",
    date: "2026-02-10",
    readTime: "5 min read",
    author: "AI Training Denver",
    body: [
      {
        heading: "Start with work, not tools",
        paragraphs: [
          "The strongest AI adoption plans begin with real work: emails, research, reporting, proposals, support responses, meeting notes, and recurring decisions. Tool selection matters, but it should come after a clear understanding of where time is being spent.",
          "A small Denver business does not need a massive transformation program to begin. It needs a short list of workflows where AI can help employees produce better first drafts, organize information faster, or reduce repetitive work with human review still in place.",
        ],
      },
      {
        heading: "Create shared standards early",
        paragraphs: [
          "When every employee experiments alone, quality and privacy practices vary. A basic internal standard can explain which tools are approved, what information should not be entered, and when a manager or subject-matter expert needs to review outputs.",
          "Training works best when it creates a shared language for prompts, review, and responsible use. That gives the team confidence without pretending AI is perfect.",
        ],
      },
      {
        heading: "Pick one department-level use case",
        paragraphs: [
          "Instead of launching AI everywhere, choose one workflow that happens often and has a clear owner. Sales follow-up, marketing outlines, customer support drafts, and internal SOP updates are common starting points.",
          "Once the team sees how AI fits into one real process, it becomes easier to evaluate what should come next.",
        ],
      },
    ],
  },
  {
    slug: "ai-training-workshop-for-employees",
    title: "What to Include in an AI Training Workshop for Employees",
    excerpt:
      "The elements that make employee AI training practical, safe, and connected to daily work.",
    category: "AI Training",
    date: "2026-02-17",
    readTime: "6 min read",
    author: "AI Training Denver",
    body: [
      {
        heading: "Begin with realistic expectations",
        paragraphs: [
          "A good workshop should explain what AI tools do well and where they struggle. Employees need to understand that AI can accelerate drafts, summaries, research, and structure, but it still requires judgment.",
          "This keeps the training grounded and helps skeptical team members engage without feeling sold to.",
        ],
      },
      {
        heading: "Teach prompting through examples",
        paragraphs: [
          "Prompting improves when employees practice with real scenarios. A marketing team might work on campaign outlines. An operations team might create SOP drafts. A sales team might turn discovery notes into follow-up emails.",
          "The best exercises use the language and constraints of the business instead of generic demonstrations.",
        ],
      },
      {
        heading: "Include privacy and review standards",
        paragraphs: [
          "Responsible AI training should cover sensitive information, client data, confidential documents, and the importance of human review. Teams should leave knowing how to use AI more safely, not just more often.",
          "That guidance reduces risk and gives leadership a stronger foundation for adoption.",
        ],
      },
    ],
  },
  {
    slug: "ai-readiness-checklist-small-businesses",
    title: "AI Readiness Checklist for Small Businesses",
    excerpt:
      "A concise checklist for deciding whether your team is ready for AI training, workflow support, or both.",
    category: "AI for Small Business",
    date: "2026-02-24",
    readTime: "4 min read",
    author: "AI Training Denver",
    body: [
      {
        heading: "Look for repeatable work",
        paragraphs: [
          "AI is easiest to apply where work happens repeatedly. Common examples include writing first drafts, summarizing information, preparing meeting notes, creating internal documentation, and organizing research.",
          "If a task happens once a year, it is rarely the best starting point. If it happens every week, it deserves a closer look.",
        ],
      },
      {
        heading: "Check your standards",
        paragraphs: [
          "Before broad adoption, leadership should know which tools employees are using, what data is off-limits, and who reviews AI-assisted work before it reaches a customer or stakeholder.",
          "A simple standard is better than silence. It lets people experiment responsibly.",
        ],
      },
      {
        heading: "Decide how much support you need",
        paragraphs: [
          "Some teams need basic training first. Others already understand AI but need help choosing use cases or building repeatable workflows.",
          "The right starting point depends on team confidence, leadership clarity, and how much process change is required.",
        ],
      },
    ],
  },
  {
    slug: "ai-training-consulting-automation-difference",
    title: "The Difference Between AI Training, AI Consulting, and AI Automation",
    excerpt:
      "How to choose the right first investment when your business wants AI adoption but not unnecessary complexity.",
    category: "Workflow Automation",
    date: "2026-03-03",
    readTime: "5 min read",
    author: "AI Training Denver",
    body: [
      {
        heading: "Training builds capability",
        paragraphs: [
          "AI training helps employees understand tools, prompts, risks, and practical use cases. It is often the best first step when the team is curious but inconsistent.",
          "Training creates the baseline skills needed before more advanced workflow changes can succeed.",
        ],
      },
      {
        heading: "Consulting creates direction",
        paragraphs: [
          "AI consulting helps leadership decide where AI belongs in the business. It may include workflow review, use case prioritization, tool recommendations, and policy guidance.",
          "Consulting is useful when the organization has many possible directions and needs a practical roadmap.",
        ],
      },
      {
        heading: "Automation changes the system",
        paragraphs: [
          "AI automation connects tools, data, and processes so work can move with less manual effort. It can be valuable, but it works best after the business understands its workflows and risks.",
          "For many small teams, training and use case discovery should come before custom automation.",
        ],
      },
    ],
  },
  {
    slug: "sales-teams-use-ai-human-touch",
    title: "How Sales Teams Can Use AI Without Losing the Human Touch",
    excerpt:
      "Practical sales use cases that improve preparation and follow-up while keeping judgment with the rep.",
    category: "Sales & Marketing AI",
    date: "2026-03-10",
    readTime: "5 min read",
    author: "AI Training Denver",
    body: [
      {
        heading: "Use AI before and after the conversation",
        paragraphs: [
          "Sales teams can use AI to prepare questions, summarize notes, draft follow-ups, and organize research. These tasks support the rep without replacing the relationship.",
          "The strongest sales workflows keep the human voice intact and use AI to reduce blank-page work.",
        ],
      },
      {
        heading: "Build review into the workflow",
        paragraphs: [
          "AI-generated sales copy should be checked for accuracy, tone, promises, and fit. A rep should never send a message just because a tool produced it quickly.",
          "Training should show teams how to revise AI drafts so the output sounds useful, specific, and true.",
        ],
      },
      {
        heading: "Create reusable prompts",
        paragraphs: [
          "Teams can create prompt templates for discovery summaries, follow-up options, objection handling, and proposal outlines. Templates help quality stay consistent as usage grows.",
          "The point is not to remove judgment. It is to give reps a stronger starting point.",
        ],
      },
    ],
  },
  {
    slug: "common-ai-adoption-mistakes",
    title: "Common AI Adoption Mistakes Small Businesses Should Avoid",
    excerpt:
      "Avoid the traps that make AI feel busy but fail to improve how the business actually works.",
    category: "Responsible AI",
    date: "2026-03-17",
    readTime: "6 min read",
    author: "AI Training Denver",
    body: [
      {
        heading: "Mistake one: starting with too many tools",
        paragraphs: [
          "A crowded tool list can make AI adoption feel more advanced than it is. Small teams usually need a few clear workflows before they need more software.",
          "Start with the work to be improved, then decide which tools belong.",
        ],
      },
      {
        heading: "Mistake two: skipping privacy guidance",
        paragraphs: [
          "If employees do not know what information is sensitive, they may paste client data, contracts, or internal details into tools that are not approved for that use.",
          "Basic privacy guidance should be part of any serious AI training program.",
        ],
      },
      {
        heading: "Mistake three: treating training as a one-time event",
        paragraphs: [
          "A workshop can create momentum, but teams need ways to apply what they learn. Prompt libraries, workflow templates, and internal standards help training become a daily habit.",
          "Adoption improves when teams revisit the workflows after they have used them in real situations.",
        ],
      },
    ],
  },
];

export const articleCategories = [
  "All",
  "AI for Small Business",
  "AI Training",
  "Workflow Automation",
  "Denver Business AI",
  "Responsible AI",
  "Sales & Marketing AI",
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
