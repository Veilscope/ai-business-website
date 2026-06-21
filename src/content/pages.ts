import { brand } from "@/config/brand";

export const homePage = {
  hero: {
    eyebrow: "Based in Denver. Built for practical business adoption.",
    headline: "Practical AI Training for Denver Businesses",
    subheadline:
      "Help your team use AI confidently, safely, and productively with hands-on training built around real business workflows.",
    supportingCopy:
      "From ChatGPT fundamentals to team-specific use cases, we help local organizations move past AI confusion and start applying it where it actually saves time.",
  },
  problem: {
    eyebrow: "The adoption gap",
    headline: "Most teams are using AI without a real system.",
    copy:
      "Employees are experimenting inconsistently, leaders are unsure which tools or use cases matter, and generic online tutorials rarely translate into better business processes. Poor adoption can create wasted time, weak outputs, privacy issues, and missed opportunities.",
    items: [
      {
        title: "Scattered AI usage",
        description:
          "Different employees try different tools with no shared method, quality bar, or review process.",
      },
      {
        title: "No clear internal standards",
        description:
          "Teams need practical guidance on privacy, acceptable use, and when human review is required.",
      },
      {
        title: "Unclear business use cases",
        description:
          "AI feels interesting, but leaders need to know which tasks are worth changing first.",
      },
      {
        title: "Low confidence across the team",
        description:
          "Employees may be curious but unsure how to prompt well, evaluate outputs, or apply AI safely.",
      },
    ],
  },
  solution: {
    eyebrow: "How training helps",
    headline: "Training that turns AI curiosity into business capability.",
    copy:
      "The work is not about chasing every new tool. It is about helping your team understand AI, use better prompts, identify realistic use cases, and turn training into repeatable workflows that support daily operations.",
    items: [
      "Use AI tools effectively",
      "Write better prompts",
      "Identify high-value use cases",
      "Improve daily workflows",
      "Reduce repetitive work",
      "Create internal AI guidelines",
      "Understand risks and limitations",
      "Move from experimentation to practical adoption",
    ],
  },
  process: {
    eyebrow: "Process",
    headline: "A simple path from AI confusion to team adoption.",
    steps: [
      {
        title: "Discover",
        description:
          "Understand your team, workflows, goals, and current AI usage.",
      },
      {
        title: "Train",
        description:
          "Run practical, hands-on sessions built around your business context.",
      },
      {
        title: "Apply",
        description:
          "Translate training into repeatable workflows, prompts, and internal use cases.",
      },
      {
        title: "Improve",
        description:
          "Refine adoption with feedback, follow-up support, and clear next steps.",
      },
    ],
  },
  market: {
    eyebrow: "Local support",
    headline: "Denver-based support for teams ready to use AI better.",
    copy:
      "We work with businesses and organizations across the Denver metro area, with options for local workshops, remote sessions, and hybrid training.",
    points: [
      "Denver and Denver metro businesses",
      "Colorado organizations that want practical adoption support",
      "Local relationships with in-person or remote flexibility",
    ],
  },
  principles: {
    eyebrow: "Working principles",
    headline: "No hype. No vague AI promises. Just practical adoption.",
    items: [
      "Business-first, tool-second",
      "Practical examples over theory",
      "Human oversight matters",
      "Clear internal standards",
      "Measurable workflow improvement",
      "Training connected to implementation",
    ],
  },
  finalCta: {
    headline: "Ready to help your team use AI with confidence?",
    copy:
      "Start with a practical conversation about your team, your workflows, and where AI could actually make a difference.",
    cta: brand.ctas.primary,
  },
};

export const servicesPage = {
  eyebrow: "Services",
  headline: "AI training and adoption support built around real work.",
  intro:
    "Start with practical training, then extend into use case discovery, workflow systems, or leadership guidance as your team is ready.",
  comparison: {
    headline: "Choose the right starting point.",
    items: [
      {
        title: "Need team confidence?",
        description:
          "Start with a workshop that teaches fundamentals, prompting, safety, and role-specific examples.",
      },
      {
        title: "Need strategic clarity?",
        description:
          "Start with use case discovery or an executive briefing before rolling training across the organization.",
      },
      {
        title: "Need repeatable habits?",
        description:
          "Use productivity systems to turn training into templates, prompt libraries, and lightweight standards.",
      },
    ],
  },
};

export const aboutPage = {
  eyebrow: "About",
  headline: "Helping Denver teams make AI practical.",
  intro:
    "We help businesses move from AI curiosity to confident adoption through practical training, clear use cases, and workflow-focused support.",
  mission: {
    headline: "Our mission",
    copy:
      "AI adoption should feel concrete, useful, and understandable. The goal is to help teams learn what to do, what to avoid, and how to apply AI consistently inside real business workflows.",
  },
  philosophy: [
    "AI should support real business work.",
    "Training should be hands-on.",
    "Teams need standards, not random experimentation.",
    "Adoption works best when leadership and employees understand both opportunities and limits.",
  ],
  local:
    "Based in Denver, built for organizations that want practical support from people who understand the local business environment.",
  values: [
    "Clarity over hype",
    "Practicality over theory",
    "Human judgment over blind automation",
    "Systems over scattered tools",
    "Long-term capability over one-off demos",
  ],
  team: [
    {
      name: "Jacob Casey",
      role: "Co-founder, Systems & Integration",
      bio: "Jacob leads backend systems, workflow integration, and technical planning, keeping the implementation path aligned with the business vision and practical client outcomes.",
    },
    {
      name: "Brody Broughton",
      role: "Co-founder, Experience & Design",
      bio: "Brody leads the front-end experience, service design, and mission alignment, shaping clear digital touchpoints that make AI adoption feel useful, approachable, and credible.",
    },
  ],
};

export const contactPage = {
  eyebrow: "Contact",
  headline: "Start with a practical AI strategy conversation.",
  intro:
    "Tell us where your team is today and what you want AI to help with. We will use the conversation to clarify whether training, use case discovery, or workflow support is the right next step.",
  details: [
    {
      label: "Email",
      value: brand.contact.email,
    },
    ...(brand.contact.textNumber
      ? [
          {
            label: "Text",
            value: brand.contact.textNumber,
          },
        ]
      : []),
    {
      label: "Service area",
      value: `${brand.market.city}, ${brand.market.region}, and remote Colorado teams`,
    },
  ],
};

export const legalPages = {
  privacy: {
    eyebrow: "Privacy",
    headline: "Privacy Policy Placeholder",
    copy:
      "This placeholder page is provided so the site has a clear route for future legal content. Replace this text with a policy reviewed for your business, tools, analytics, forms, and data handling practices.",
  },
  terms: {
    eyebrow: "Terms",
    headline: "Terms Placeholder",
    copy:
      "This placeholder page is provided so the site has a clear route for future legal content. Replace this text with terms that match your services, payment process, delivery model, and client agreements.",
  },
};
