/** A single answer within a forum thread. */
export interface Answer {
  id: number;
  author: string;
  content: string;
  votes: number;
  accepted: boolean;
  postedAt: string;
}

/** A top-level discussion thread with nested answers. */
export interface Thread {
  id: number;
  title: string;
  author: string;
  category: string;
  tags: string[];
  votes: number;
  views: number;
  content: string;
  postedAt: string;
  answers: Answer[];
}

/** Seed data — will be replaced by API calls once the backend is built. */
export const threads: Thread[] = [
  {
    id: 1,
    title: "Best practices for deploying OpenCHS in low-bandwidth environments",
    author: "Newtvn",
    category: "Deployment",
    tags: ["deployment", "performance", "offline"],
    votes: 24,
    views: 1842,
    content: "We've been working on deploying OpenCHS in rural Kenya where bandwidth is limited to around 256kbps. The platform works well in urban areas but struggles in remote regions. What are the recommended strategies for optimizing OpenCHS for low-bandwidth or intermittent connectivity scenarios? We've tried enabling service workers but looking for more comprehensive solutions.",
    postedAt: "2 hours ago",
    answers: [
      { id: 1, author: "Rodgendo", content: "Great question. We solved this in our Tanzania deployment by enabling the progressive web app mode and configuring aggressive caching. In your config.yml, set `offline_mode: true` and `cache_strategy: stale-while-revalidate`. This lets counselors continue working even when connectivity drops. Data syncs automatically when the connection returns.", votes: 18, accepted: true, postedAt: "1 hour ago" },
      { id: 2, author: "Franklin", content: "In addition to what Rodgendo said, consider compressing your API responses. We added gzip middleware and reduced payload sizes by ~70%. Also, lazy-load images and use the thumbnail API endpoint instead of full-resolution images in list views. Made a huge difference in our field deployments.", votes: 12, accepted: false, postedAt: "45 min ago" },
      { id: 3, author: "Miriam", content: "We deployed OpenCHS on a local server within the office network for our Uganda project. Counselors connect to the local instance, and it syncs with the central server every 15 minutes. Zero latency for the counselors and no bandwidth issues during calls. The sync module handles conflict resolution automatically.", votes: 9, accepted: false, postedAt: "30 min ago" },
    ],
  },
  {
    id: 2,
    title: "Custom workflow stages for child trafficking cases",
    author: "Rodgendo",
    category: "Configuration",
    tags: ["workflow", "customization", "trafficking"],
    votes: 16,
    views: 934,
    content: "Our organization handles child trafficking cases that require specialized workflow stages beyond the default intake → assessment → referral flow. We need stages for: cross-border coordination, law enforcement liaison, safe house placement, and long-term rehabilitation tracking. Has anyone customized the workflow engine for this? Looking for examples of the YAML configuration.",
    postedAt: "5 hours ago",
    answers: [
      { id: 4, author: "Newtvn", content: "Yes, the workflow engine is fully customizable. In your `workflows.yml`, you can define custom stages with their own form fields, required actions, and transition rules. Here's a snippet:\n\n```yaml\nstages:\n  - id: cross_border\n    name: Cross-Border Coordination\n    fields: [country_origin, country_destination, border_crossing]\n    transitions: [law_enforcement, safe_house]\n```\n\nYou can also set up automated notifications when cases enter specific stages. We use this for alerting partner organizations across borders.", votes: 14, accepted: true, postedAt: "4 hours ago" },
      { id: 5, author: "Franklin", content: "Building on Newtvn's answer — make sure you also configure the role permissions for each new stage. Trafficking cases are extremely sensitive, so you'll want to restrict access. Use the `stage_permissions` block in your config to limit which roles can view/edit cases at each stage. We also added mandatory two-person approval for stage transitions in trafficking cases.", votes: 8, accepted: false, postedAt: "3 hours ago" },
    ],
  },
  {
    id: 3,
    title: "Integrating OpenCHS with WhatsApp Business API",
    author: "Newtvn",
    category: "Integrations",
    tags: ["whatsapp", "api", "messaging"],
    votes: 31,
    views: 2156,
    content: "We've successfully integrated OpenCHS with WhatsApp Business API for incoming case reports. Children and caregivers can now send messages to our WhatsApp number and they automatically create cases in OpenCHS. Happy to share our implementation if anyone is interested. The integration uses webhooks and the OpenCHS REST API.",
    postedAt: "1 day ago",
    answers: [
      { id: 6, author: "Rodgendo", content: "This is fantastic! We've been wanting to do this for months. Could you share details on how you handle media attachments? Our counselors often receive photos and voice notes via WhatsApp that need to be attached to cases.", votes: 15, accepted: false, postedAt: "22 hours ago" },
      { id: 7, author: "Newtvn", content: "Sure! For media attachments, we download them from the WhatsApp CDN using the media ID, then upload to OpenCHS via the `/api/v1/cases/:id/attachments` endpoint. Voice notes get automatically sent to the AI Service for transcription. The whole pipeline is event-driven using a message queue so nothing gets lost even under high load.", votes: 22, accepted: true, postedAt: "20 hours ago" },
      { id: 8, author: "Miriam", content: "Have you considered privacy implications? WhatsApp messages may contain sensitive information about the child. Make sure your WhatsApp Business account has end-to-end encryption enabled and that your webhook endpoint uses TLS. Also check local regulations — some countries require explicit consent before processing messages from minors.", votes: 11, accepted: false, postedAt: "18 hours ago" },
    ],
  },
  {
    id: 4,
    title: "AI risk scoring accuracy improvements in v2.4",
    author: "Rodgendo",
    category: "AI & ML",
    tags: ["ai", "risk-scoring", "v2.4", "benchmarks"],
    votes: 19,
    views: 1267,
    content: "The new risk scoring model in v2.4 has significantly improved accuracy. We ran benchmarks comparing v2.3 vs v2.4 across 10,000 historical cases from our Kenya deployment. Key findings: precision improved from 78% to 91%, recall from 72% to 88%, and false positive rate dropped from 15% to 6%. The new model uses a transformer-based architecture fine-tuned on anonymized case data.",
    postedAt: "2 days ago",
    answers: [
      { id: 9, author: "Franklin", content: "These numbers are impressive. Can you share the benchmark methodology? Specifically, how did you handle the class imbalance between high-risk and low-risk cases? In our dataset, high-risk cases are only about 8% of total volume, which tends to skew precision metrics.", votes: 13, accepted: false, postedAt: "2 days ago" },
      { id: 10, author: "Rodgendo", content: "Good point. We used stratified sampling to ensure balanced representation in our test set. The training pipeline uses focal loss to handle the class imbalance. You can retrain the model on your own data using `openchs-ai train --config risk_model.yml`. The training guide is in the docs under AI Service > Custom Models.", votes: 16, accepted: true, postedAt: "1 day ago" },
    ],
  },
  {
    id: 5,
    title: "Multi-language support: adding Swahili and Amharic",
    author: "Newtvn",
    category: "Localization",
    tags: ["i18n", "swahili", "amharic", "translation"],
    votes: 45,
    views: 3201,
    content: "We're working on adding Swahili and Amharic language support to both the UI and AI transcription. The UI translation is straightforward using the i18n framework, but the AI transcription for these languages is challenging due to limited training data. We've started collecting anonymized voice samples — contributors welcome! Current progress: Swahili UI 85% complete, Amharic UI 60% complete.",
    postedAt: "3 days ago",
    answers: [
      { id: 11, author: "Miriam", content: "This is much needed! We can contribute Amharic translations for the UI. Our team in Addis Ababa has 4 native speakers who can help with both translation and voice sample collection. Should we submit via the translation portal or create PRs directly?", votes: 28, accepted: false, postedAt: "3 days ago" },
      { id: 12, author: "Newtvn", content: "Amazing, thank you! Please use the translation portal at translate.OpenCHS.org — it has a review workflow built in. For voice samples, we have a separate collection tool at voice.OpenCHS.org. Each sample needs to be at least 5 seconds and include the speaker's consent. The more diverse accents and dialects we capture, the better the model will perform.", votes: 19, accepted: true, postedAt: "2 days ago" },
      { id: 13, author: "Franklin", content: "For anyone working on Swahili — be aware that there are significant dialectal differences between coastal Swahili and the inland variants used in Kenya, Tanzania, and DRC. The AI model should ideally handle code-switching too, since many Swahili speakers mix in English or local languages. We've started annotating our training data with dialect tags to help.", votes: 14, accepted: false, postedAt: "2 days ago" },
    ],
  },
  {
    id: 6,
    title: "Compliance with GDPR for European deployments",
    author: "Rodgendo",
    category: "Legal & Compliance",
    tags: ["gdpr", "compliance", "europe", "data-protection"],
    votes: 14,
    views: 876,
    content: "For organizations deploying OpenCHS in the EU, we've developed a GDPR compliance checklist. Key areas: data processing agreements, lawful basis for processing children's data, right to erasure implementation, data portability, breach notification procedures, and DPIA (Data Protection Impact Assessment). Would like community feedback before we publish it as an official guide.",
    postedAt: "1 week ago",
    answers: [
      { id: 14, author: "Miriam", content: "This is really valuable work. One thing to add: under GDPR Article 8, processing of children's personal data requires parental consent for children under 16 (or lower age set by member state, minimum 13). OpenCHS should have configurable age thresholds per deployment to match local requirements. Also, the right to erasure is particularly complex for child protection cases where data retention may be legally required.", votes: 11, accepted: true, postedAt: "6 days ago" },
      { id: 15, author: "Newtvn", content: "Agree with Miriam. Also consider Article 35 — a DPIA is mandatory for OpenCHS deployments since we're processing sensitive data about vulnerable individuals at scale. I'd recommend including a DPIA template in the guide. We created one for our Netherlands pilot that we can share as a starting point.", votes: 8, accepted: false, postedAt: "5 days ago" },
    ],
  },
];

export const forumCategories = [
  "All",
  "Deployment",
  "Configuration",
  "Integrations",
  "AI & ML",
  "Localization",
  "Legal & Compliance",
];
