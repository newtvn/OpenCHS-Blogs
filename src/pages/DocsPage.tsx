import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Server, Shield, Database, Zap, Globe, ChevronRight } from "lucide-react";
import { usePalette } from "@/hooks/useTheme";

const sections = [
  {
    id: "getting-started",
    icon: Zap,
    title: "Getting Started",
    content: [
      "OpenCHS is a two-service platform consisting of the Helpline Service (case management) and the AI Service (intelligent augmentation). Both can be deployed independently or together.",
      "Prerequisites: Node.js 18+, PostgreSQL 14+, Docker (optional but recommended).",
      "Quick start with Docker:",
      "git clone https://github.com/openchs/openchs-platform.git\ncd openchs-platform\ndocker-compose up -d",
      "The platform will be available at http://localhost:3000 with default admin credentials provided in the .env.example file. Change these immediately in production.",
    ],
  },
  {
    id: "architecture",
    icon: Server,
    title: "Architecture Overview",
    content: [
      "OpenCHS follows a microservices architecture with two primary services communicating through a well-defined REST API layer.",
      "The Helpline Service handles: case intake and management, workflow orchestration, user and role management, reporting and analytics, multi-tenant data isolation.",
      "The AI Service provides: real-time speech-to-text transcription, sentiment and emotion analysis, risk severity scoring, intelligent case categorization and routing, automated case summarization.",
      "Both services use PostgreSQL for persistence, Redis for caching and session management, and communicate via authenticated REST endpoints with JWT tokens.",
    ],
  },
  {
    id: "deployment",
    icon: Globe,
    title: "Deployment Guide",
    content: [
      "OpenCHS supports multiple deployment strategies depending on your scale and infrastructure.",
      "Single Server: Suitable for small deployments (< 50 concurrent users). Both services run on a single machine with Docker Compose. Minimum requirements: 4 CPU cores, 8GB RAM, 100GB SSD.",
      "Kubernetes: Recommended for production deployments. Helm charts are provided for both services with configurable replicas, resource limits, and auto-scaling policies.",
      "Cloud-native: Terraform modules are available for AWS, Azure, and GCP. These provision all required infrastructure including managed databases, load balancers, and monitoring.",
    ],
  },
  {
    id: "security",
    icon: Shield,
    title: "Security",
    content: [
      "Security is foundational to OpenCHS given the sensitive nature of child protection data.",
      "Encryption: All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Database-level encryption is supported for additional protection.",
      "Authentication: OAuth 2.0 with JWT tokens. Support for LDAP, Active Directory, and SAML SSO integrations. Multi-factor authentication is available.",
      "Authorization: Fine-grained role-based access control (RBAC) with configurable roles and permissions. Default roles include Counselor, Supervisor, Administrator, and Auditor.",
      "Audit: Every data access and modification is logged with user identity, timestamp, and action details. Audit logs are immutable and can be exported for compliance reporting.",
    ],
  },
  {
    id: "database",
    icon: Database,
    title: "Database Schema",
    content: [
      "The OpenCHS database schema is designed for flexibility and multi-tenancy.",
      "Core tables: organizations, users, cases, contacts, workflows, workflow_stages, referrals, follow_ups, audit_logs.",
      "Multi-tenancy is implemented at the row level using an organization_id foreign key on all tenant-scoped tables. PostgreSQL Row Level Security (RLS) policies ensure data isolation.",
      "Full-text search is powered by PostgreSQL's built-in tsvector/tsquery capabilities, with GIN indexes on case content, contact notes, and transcription text.",
      "Migrations are managed with a versioned migration system. Rolling back is supported for all migrations.",
    ],
  },
  {
    id: "configuration",
    icon: BookOpen,
    title: "Configuration Reference",
    content: [
      "OpenCHS is configured through environment variables and a YAML configuration file.",
      "Key environment variables: DATABASE_URL, REDIS_URL, JWT_SECRET, AI_SERVICE_URL, STORAGE_PROVIDER, ENCRYPTION_KEY.",
      "The YAML configuration file (config.yml) supports: custom intake form definitions, workflow stage configurations, notification templates, integration adapter settings, reporting templates.",
      "All configuration changes can be made without restarting the service — the platform watches for configuration file changes and applies them in real time.",
    ],
  },
];

export default function DocsPage() {
  const { palette } = usePalette();
  const [activeSection, setActiveSection] = useState("getting-started");

  const current = sections.find((s) => s.id === activeSection)!;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
      <h1 className="mb-2 text-4xl font-semibold md:text-5xl">Documentation</h1>
      <p className={`mb-12 text-lg ${palette.subtle}`}>Everything you need to deploy, configure, and extend OpenCHS.</p>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className={`rounded-2xl border p-4 lg:sticky lg:top-24 lg:self-start ${palette.border} ${palette.card}`}>
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  activeSection === s.id ? `font-semibold ${palette.highlight}` : `${palette.subtle} hover:${palette.highlight}`
                }`}
              >
                <s.icon className="h-4 w-4 flex-shrink-0" />
                {s.title}
                {activeSection === s.id && <ChevronRight className="ml-auto h-4 w-4" />}
              </button>
            ))}
          </nav>
          <div className={`mt-6 border-t pt-4 ${palette.border}`}>
            <Link to="/api-reference" className={`block text-sm hover:underline ${palette.subtle}`}>API Reference &rarr;</Link>
          </div>
        </aside>

        {/* Content */}
        <div className={`rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
          <div className="mb-6 flex items-center gap-3">
            <current.icon className="h-8 w-8" />
            <h2 className="text-2xl font-semibold md:text-3xl">{current.title}</h2>
          </div>
          <div className="space-y-4">
            {current.content.map((block, idx) => (
              block.includes("\n") ? (
                <pre key={idx} className={`overflow-x-auto rounded-lg border p-4 text-sm ${palette.border} ${palette.highlight}`}>
                  <code>{block}</code>
                </pre>
              ) : (
                <p key={idx} className={`text-base leading-relaxed ${palette.subtle}`}>{block}</p>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
