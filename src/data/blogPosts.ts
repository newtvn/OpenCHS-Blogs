export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  published: string;
  readTime: number;
  image: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "revolutionizing-child-protection-with-ai",
    title: "How OpenCHS Is Revolutionizing Child Protection with AI",
    summary:
      "Every year, millions of children in crisis reach out to helplines — but the systems meant to protect them are often paper-based, slow, and fragmented. OpenCHS is changing that with AI-powered case management.",
    category: "Technology & Social Impact",
    author: "Newtvn",
    published: "Jan 15, 2025",
    readTime: 6,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    content: [
      "Every year, an estimated 1 billion children worldwide experience some form of violence. Child helplines are often the first — and sometimes only — lifeline for a child in crisis. Yet the systems powering these helplines are frequently outdated, relying on paper forms, fragmented databases, and overworked counselors with limited tools.",
      "OpenCHS was born from a simple but urgent question: what if we could use AI to make every interaction with a child helpline faster, smarter, and more effective?",
      "The platform integrates two core services — the Helpline Service for structured case management, and the AI Service for real-time transcription, sentiment analysis, risk scoring, and intelligent case routing. Together, they transform how helplines operate.",
      "In pilot deployments across East Africa, OpenCHS has demonstrated dramatic improvements. Response times have dropped by over 90%. Counselors spend less time on paperwork and more time with children. Case follow-up rates have increased by 60%, ensuring that no child falls through the cracks.",
      "But the impact goes beyond efficiency. The AI Service provides counselors with real-time risk assessments, flagging high-severity cases instantly. It transcribes calls in real time, creating accurate records that support evidence-based interventions. And it learns from every interaction, continuously improving its recommendations.",
      "OpenCHS is fully open source under the GPL-3.0 license, meaning any organization — from a small NGO to a national government — can deploy, customize, and extend it. The platform was designed with scalability in mind, supporting multi-tenant deployments and integration with existing child protection systems.",
      "The road ahead is ambitious. The team is working on multilingual support, offline-first capabilities for areas with limited connectivity, and advanced predictive analytics that could identify at-risk children before a crisis occurs.",
      "This is more than technology. It's a movement to ensure that every child who reaches out for help gets the response they deserve — quickly, compassionately, and effectively.",
    ],
  },
  {
    id: "2",
    slug: "two-powerful-services-one-mission",
    title: "Inside the OpenCHS Platform: Two Powerful Services, One Mission",
    summary:
      "At the heart of OpenCHS are two components that work seamlessly together to protect children. The Helpline Service manages cases, while the AI Service supercharges every interaction.",
    category: "Product",
    author: "Rodgendo",
    published: "Jan 20, 2025",
    readTime: 8,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    content: [
      "The OpenCHS platform is architected around two complementary services that together form a complete child protection ecosystem: the Helpline Service and the AI Service.",
      "The Helpline Service is the operational backbone. It provides structured case management with customizable intake forms, case tracking workflows, counselor assignment, follow-up scheduling, and reporting dashboards. Every interaction — whether a phone call, SMS, chat message, or walk-in — is captured and tracked through a unified interface.",
      "Cases move through configurable workflow stages: intake, assessment, referral, intervention, follow-up, and closure. At each stage, counselors have access to the child's full history, related cases, and contextual information that helps them make informed decisions.",
      "The AI Service is where the magic happens. Running as a separate microservice, it provides real-time capabilities that augment human judgment without replacing it. Key features include automatic speech-to-text transcription during calls, sentiment and emotion analysis, risk severity scoring, intelligent case categorization, and smart routing to the most appropriate counselor.",
      "The two services communicate through a well-defined API layer, making them independently deployable and scalable. Organizations can start with just the Helpline Service and add AI capabilities when ready — or run both from day one.",
      "Under the hood, the Helpline Service is built with a modern stack: a RESTful API backend, a responsive web frontend optimized for both desktop and mobile use, and a PostgreSQL database with full-text search capabilities. The AI Service leverages state-of-the-art language models fine-tuned on child protection contexts.",
      "Security is paramount. All data is encrypted at rest and in transit. Role-based access control ensures that sensitive information is only visible to authorized personnel. Audit logs track every action, supporting accountability and governance requirements.",
      "The platform supports multi-tenant deployments, meaning a single installation can serve multiple helplines or organizations while keeping their data completely isolated. This makes it ideal for national-level deployments where multiple agencies need to collaborate.",
    ],
  },
  {
    id: "3",
    slug: "93-percent-faster-response-times-kenya",
    title: "93% Faster Response Times: The Story of OpenCHS in Kenya",
    summary:
      "Before OpenCHS, Kenya's national child helpline struggled with 45-minute response times. Twelve months after deployment, response time dropped to 3.2 minutes — a 93% improvement.",
    category: "Case Studies & Impact",
    author: "Newtvn",
    published: "Feb 1, 2025",
    readTime: 5,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
    content: [
      "When Kenya's national child helpline first approached the OpenCHS team, they were handling over 200,000 contacts per year with a system that was largely paper-based. Average response time from first contact to case creation was 45 minutes. Follow-up rates were below 30%.",
      "The challenges were systemic. Counselors spent more time filling out forms than talking to children. Case information was scattered across spreadsheets, notebooks, and filing cabinets. Supervisors had no real-time visibility into caseloads or response times. Reporting to donors and government partners required weeks of manual data compilation.",
      "The OpenCHS deployment began with a three-month pilot involving 15 counselors at the Nairobi call center. The team worked closely with frontline staff to customize the platform — adapting intake forms to local protocols, configuring workflow stages to match existing procedures, and training counselors on the new system.",
      "Results were immediate. Within the first month, average response time dropped to 12 minutes. By the third month, it was under 5 minutes. Twelve months after full deployment, the average response time settled at 3.2 minutes — a 93% improvement from the baseline.",
      "But speed was only part of the story. Follow-up rates increased from 28% to 74%. The AI Service's risk scoring flagged 340 high-severity cases in the first year that might have been missed or delayed under the old system. Counselors reported feeling more supported and less overwhelmed.",
      "The data insights proved transformative for advocacy. For the first time, the helpline could produce real-time dashboards showing call volumes by region, case categories, resolution times, and outcome trends. This data directly influenced policy discussions at the national level.",
      "Today, the system serves all 47 counties in Kenya, with plans to expand to neighboring countries. The Kenya deployment has become a reference model for other nations exploring digital transformation of their child protection systems.",
    ],
  },
  {
    id: "4",
    slug: "ai-makes-every-helpline-call-count",
    title: "How AI Makes Every Child Helpline Call Count",
    summary:
      "When a child calls a helpline, every second matters. The OpenCHS AI Service ensures that no detail is ever lost and no child slips through the cracks with real-time transcription and analysis.",
    category: "AI & Technology",
    author: "Rodgendo",
    published: "Feb 10, 2025",
    readTime: 5,
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
    content: [
      "When a child musters the courage to call a helpline, they deserve to be heard — fully and completely. But traditional helpline systems put an enormous burden on counselors: listen to the child, assess the situation, take notes, categorize the case, determine severity, and decide on next steps — all in real time.",
      "The OpenCHS AI Service was designed to augment counselors, not replace them. It handles the mechanical tasks so counselors can focus entirely on the human connection.",
      "Real-time transcription is the foundation. As a call progresses, the AI Service converts speech to text with high accuracy, creating a complete record of the conversation. This eliminates the need for counselors to take notes during the call, allowing them to give the child their full attention.",
      "Sentiment analysis runs continuously during the call, detecting shifts in emotional state — fear, distress, anger, resignation. These signals are surfaced to the counselor as subtle indicators, helping them adjust their approach in real time.",
      "Risk scoring is perhaps the most impactful feature. The AI analyzes the content of the conversation against patterns learned from thousands of previous cases to assign a risk severity score. High-risk cases are immediately flagged, ensuring they receive priority attention and appropriate escalation.",
      "After the call, the AI Service generates a structured case summary, automatically categorizes the case, suggests relevant referral pathways, and identifies any similar cases in the system that might be related. What used to take a counselor 15-20 minutes of post-call paperwork now happens in seconds.",
      "The system is designed with privacy and ethics at its core. All AI processing happens within the organization's own infrastructure — no data is sent to external services. The AI's recommendations are always suggestions, never automated decisions. Human judgment remains central to every case.",
      "Early results show that AI-augmented counselors handle 40% more cases per shift while reporting lower stress levels and higher job satisfaction. More importantly, case outcomes have improved, with faster interventions and more accurate referrals.",
    ],
  },
  {
    id: "5",
    slug: "open-platform-for-child-protection-innovation",
    title:
      "Building on OpenCHS: An Open Platform for Child Protection Innovation",
    summary:
      "OpenCHS is fully open source under GPL-3.0, built from the ground up with integration in mind. Whether you're a developer, government agency, or NGO, the OpenCHS API gives you everything you need.",
    category: "Developer",
    author: "Newtvn",
    published: "Feb 15, 2025",
    readTime: 6,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    content: [
      "OpenCHS was built as a platform, not just a product. From day one, the architecture was designed to be extensible, integrable, and customizable — because child protection ecosystems vary dramatically from country to country.",
      "The platform exposes a comprehensive RESTful API that covers every aspect of the system: case management, user administration, reporting, AI services, and system configuration. Every action that can be performed through the web interface can also be done programmatically through the API.",
      "Authentication uses industry-standard OAuth 2.0 with JWT tokens, supporting both service-to-service and user-delegated access patterns. Rate limiting, request validation, and comprehensive error handling are built in.",
      "For developers looking to extend the platform, OpenCHS provides a plugin architecture that supports custom intake forms, workflow stages, reporting templates, and integration adapters. Plugins are isolated and independently deployable, ensuring that customizations don't break core functionality.",
      "The API documentation is auto-generated from the codebase using OpenAPI 3.0 specifications, meaning it's always up to date. Interactive API explorers let developers test endpoints directly from the documentation.",
      "Integration with external systems is a first-class concern. OpenCHS ships with adapters for common telephony platforms (Twilio, Africa's Talking), messaging services (WhatsApp, SMS gateways), identity providers (LDAP, Active Directory), and reporting tools (Power BI, Tableau).",
      "The codebase follows modern software engineering practices: comprehensive test coverage, continuous integration and deployment pipelines, containerized deployments with Docker and Kubernetes support, and infrastructure-as-code templates for major cloud providers.",
      "Contributing is straightforward. The GitHub repository includes detailed contribution guidelines, a code of conduct, issue templates, and a roadmap. The community is active and welcoming, with regular contributor calls and a public discussion forum.",
    ],
  },
  {
    id: "6",
    slug: "why-trust-matters-in-child-protection-tech",
    title: "Why Trust Matters in Child Protection Tech",
    summary:
      "When a platform handles the stories of children in crisis, governance and ethics aren't optional. They're the foundation. Learn how OpenCHS earns trust through transparency and oversight.",
    category: "Governance & Ethics",
    author: "Rodgendo",
    published: "Feb 20, 2025",
    readTime: 4,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop",
    content: [
      "Child protection technology occupies a unique position in the software landscape. The data it handles is among the most sensitive imaginable — the stories, identities, and circumstances of children in crisis. The stakes of getting it wrong are measured not in revenue or user engagement, but in children's safety and wellbeing.",
      "This is why OpenCHS treats governance and ethics not as features to be added later, but as foundational principles that shape every design decision.",
      "Transparency starts with open source. Every line of code is publicly available for inspection. Security researchers, child protection experts, and the broader community can examine how data is handled, how AI decisions are made, and how access controls are implemented. There are no black boxes.",
      "Data governance follows the principle of minimum necessary access. Role-based access control ensures that each user sees only the information relevant to their role. A counselor sees their assigned cases. A supervisor sees their team's caseload. An administrator manages system configuration but cannot access case content. Audit logs record every access, creating a complete accountability trail.",
      "The AI ethics framework is built on three pillars: transparency (the AI explains its reasoning), human oversight (all AI outputs are recommendations, never automated actions), and fairness (regular bias audits ensure the system doesn't disadvantage any group of children).",
      "An independent advisory board provides ongoing governance oversight. The board includes child protection experts, data privacy specialists, AI ethicists, and representatives from deploying organizations. They review the platform's practices, audit its outputs, and provide guidance on emerging challenges.",
      "Compliance with data protection regulations — including GDPR, Kenya's Data Protection Act, and other national frameworks — is built into the platform's architecture, not bolted on afterward. Data retention policies, consent management, and subject access request handling are all configurable per deployment.",
      "Trust is earned, not declared. OpenCHS earns it through radical transparency, rigorous governance, and an unwavering commitment to putting children's interests first in every technical decision.",
    ],
  },
];

export const categories = [
  "All",
  "Technology & Social Impact",
  "Product",
  "Case Studies & Impact",
  "AI & Technology",
  "Developer",
  "Governance & Ethics",
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return blogPosts;
  return blogPosts.filter((p) => p.category === category);
}
