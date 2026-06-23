import { brand } from "@/config/brand";

export const site = {
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  primaryCta: {
    label: brand.ctas.primary,
    href: "/contact",
  },
  secondaryCta: {
    label: brand.ctas.secondary,
    href: "/services",
  },
  footerDescription:
    "Practical AI training and workflow-focused support for teams across the Denver metro area.",
  metadata: {
    home: {
      title: "AI Training Denver | Practical Team Workshops",
      description:
        "Practical AI training for Denver businesses. Help your team use AI confidently, safely, and productively with hands-on workshops and workflow-focused support.",
      path: "/",
    },
    services: {
      title: "AI Training Workshops & Use Case Discovery",
      description:
        "Explore hands-on AI training workshops, use case discovery, productivity systems, and executive AI briefings for Denver businesses.",
      path: "/services",
    },
    about: {
      title: "About AI Training Denver",
      description:
        "Learn how AI Training Denver helps local teams move from AI curiosity to confident, practical adoption.",
      path: "/about",
    },
    insights: {
      title: "AI Training Insights for Denver Businesses",
      description:
        "Practical articles on AI training, workflow adoption, responsible AI, and small business AI readiness.",
      path: "/insights",
    },
    contact: {
      title: "Book an AI Strategy Call | Denver AI Training",
      description:
        "Talk through AI training options, team readiness, and practical workflows for your Denver metro business.",
      path: "/contact",
    },
  },
} as const;
