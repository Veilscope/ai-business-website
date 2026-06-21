export type Service = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  bullets: string[];
  bestFor: string[];
  included: string[];
  outcomes: string[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "team-workshops",
    title: "Team AI Training Workshops",
    category: "Training",
    summary:
      "Hands-on sessions that teach your team how to use AI tools for real tasks, not abstract demos.",
    description:
      "A practical workshop format for teams that need shared language, safer habits, and repeatable ways to use tools like ChatGPT in daily work.",
    bullets: [
      "ChatGPT and modern AI tool fundamentals",
      "Prompting frameworks",
      "Role-specific exercises",
      "Safe and responsible usage",
      "Practical workflows for daily work",
    ],
    bestFor: [
      "Teams experimenting with AI inconsistently",
      "Employees who need practical examples",
      "Owners who want shared standards before broad rollout",
    ],
    included: [
      "Discovery call and workshop planning",
      "Live training session for your team",
      "Role-specific exercises and prompt examples",
      "Responsible use guidance",
      "Follow-up recommendations",
    ],
    outcomes: [
      "A clearer understanding of where AI fits",
      "More confident prompts and workflows",
      "Shared language for safe team usage",
    ],
    cta: "Request a Workshop",
  },
  {
    slug: "use-case-discovery",
    title: "AI Use Case Discovery",
    category: "Strategy",
    summary:
      "Identify where AI can realistically save time, improve quality, or support growth inside your business.",
    description:
      "A structured review of current workflows, team friction, and practical AI opportunities before you invest heavily in tools or automation.",
    bullets: [
      "Workflow review",
      "Opportunity mapping",
      "Prioritized AI use cases",
      "Tool recommendations",
      "Implementation roadmap",
    ],
    bestFor: [
      "Leadership teams that know AI matters but need focus",
      "Organizations deciding what to train on first",
      "Businesses considering workflow automation later",
    ],
    included: [
      "Workflow and process intake",
      "Use case mapping by department or role",
      "Risk and complexity review",
      "Prioritized opportunity list",
      "Practical next-step roadmap",
    ],
    outcomes: [
      "A focused shortlist of realistic AI opportunities",
      "Better training priorities",
      "A clearer path from ideas to workflows",
    ],
    cta: "Get an AI Readiness Review",
  },
  {
    slug: "productivity-systems",
    title: "AI Productivity Systems",
    category: "Adoption",
    summary:
      "Help your team turn AI training into repeatable workflows for sales, marketing, operations, admin, or customer support.",
    description:
      "A bridge between training and implementation for teams that need reusable prompts, templates, and lightweight operating standards.",
    bullets: [
      "Reusable prompt libraries",
      "Team workflow templates",
      "SOP support",
      "Internal adoption resources",
      "Follow-up support",
    ],
    bestFor: [
      "Teams that want training to become daily practice",
      "Departments with repeatable content, research, or admin work",
      "Organizations not ready for custom software but ready for better systems",
    ],
    included: [
      "Workflow template design",
      "Prompt library structure",
      "Documentation and SOP support",
      "Team adoption resources",
      "Adoption feedback loop",
    ],
    outcomes: [
      "Reusable internal workflows",
      "Less scattered AI usage",
      "A foundation for later automation or consulting work",
    ],
    cta: "Train My Team",
  },
  {
    slug: "executive-briefings",
    title: "Executive AI Briefings",
    category: "Leadership",
    summary:
      "Focused sessions for owners and leadership teams that need strategic clarity before rolling AI out across the organization.",
    description:
      "A concise, business-first briefing that helps leaders understand practical AI opportunities, risks, policies, and adoption choices.",
    bullets: [
      "AI landscape overview",
      "Risk and policy considerations",
      "Competitive implications",
      "Practical adoption strategy",
      "Leadership Q&A",
    ],
    bestFor: [
      "Owners and executives who need a clear starting point",
      "Leadership teams setting internal AI standards",
      "Organizations evaluating training, consulting, or automation options",
    ],
    included: [
      "Leadership intake",
      "Briefing tailored to your business context",
      "Risk and policy discussion",
      "Adoption strategy outline",
      "Q&A and next-step recommendations",
    ],
    outcomes: [
      "Greater strategic clarity",
      "Better internal rollout decisions",
      "A practical training and adoption direction",
    ],
    cta: "Request a Free AI Strategy Call",
  },
];
