import { usePalette } from "@/hooks/useTheme";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyButton from "@/components/CopyButton";

const endpoints = [
  { method: "GET", path: "/api/v1/cases", desc: "List all cases with pagination, filtering, and sorting" },
  { method: "POST", path: "/api/v1/cases", desc: "Create a new case with intake data" },
  { method: "GET", path: "/api/v1/cases/:id", desc: "Retrieve a specific case by ID" },
  { method: "PUT", path: "/api/v1/cases/:id", desc: "Update an existing case" },
  { method: "DELETE", path: "/api/v1/cases/:id", desc: "Archive a case (soft delete)" },
  { method: "POST", path: "/api/v1/cases/:id/referrals", desc: "Create a referral for a case" },
  { method: "GET", path: "/api/v1/cases/:id/timeline", desc: "Get full timeline of case events" },
  { method: "POST", path: "/api/v1/ai/transcribe", desc: "Start real-time transcription session" },
  { method: "POST", path: "/api/v1/ai/analyze", desc: "Analyze text for sentiment and risk" },
  { method: "POST", path: "/api/v1/ai/summarize", desc: "Generate structured case summary" },
  { method: "GET", path: "/api/v1/ai/risk-score/:caseId", desc: "Get AI risk assessment for a case" },
  { method: "GET", path: "/api/v1/users", desc: "List users in the organization" },
  { method: "POST", path: "/api/v1/users", desc: "Create a new user" },
  { method: "PUT", path: "/api/v1/users/:id/roles", desc: "Update user roles and permissions" },
  { method: "GET", path: "/api/v1/reports/summary", desc: "Get aggregate summary statistics" },
  { method: "GET", path: "/api/v1/reports/export", desc: "Export report data as CSV or PDF" },
  { method: "POST", path: "/api/v1/auth/token", desc: "Obtain JWT access token" },
  { method: "POST", path: "/api/v1/auth/refresh", desc: "Refresh an expired token" },
];

const methodColors: Record<string, string> = {
  GET: "text-green-600 bg-green-500/10 border-green-500/20 dark:text-green-400",
  POST: "text-blue-600 bg-blue-500/10 border-blue-500/20 dark:text-blue-400",
  PUT: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20 dark:text-yellow-400",
  DELETE: "text-red-600 bg-red-500/10 border-red-500/20 dark:text-red-400",
};

const exampleRequest = `curl -X GET https://your-instance.openchs.org/api/v1/cases \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \\
  -H "Content-Type: application/json" \\
  -d '{"page": 1, "limit": 20, "status": "open"}'`;

const exampleResponse = `{
  "data": [
    {
      "id": "case_abc123",
      "status": "open",
      "severity": "high",
      "created_at": "2024-01-15T10:30:00Z",
      "counselor": "Newtvn",
      "category": "abuse",
      "summary": "AI-generated case summary..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1543
  }
}`;

export default function ApiReferencePage() {
  const { palette } = usePalette();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-12">
      <SEO title="API Reference" description="RESTful API endpoints for the OpenCHS platform." />
      <Breadcrumbs items={[{ label: "Docs", to: "/docs" }, { label: "API Reference" }]} />

      <h1 className="mb-2 text-4xl font-semibold md:text-5xl">API Reference</h1>
      <p className={`mb-4 text-lg ${palette.subtle}`}>
        RESTful API endpoints for the OpenCHS platform. All endpoints require authentication via JWT bearer token.
      </p>
      <div className={`mb-12 rounded-lg border p-4 text-sm ${palette.border} ${palette.highlight}`}>
        <p><strong>Base URL:</strong> <code>https://your-instance.openchs.org/api/v1</code></p>
        <p className={`mt-1 ${palette.subtle}`}>Authentication: <code>Authorization: Bearer &lt;token&gt;</code></p>
      </div>

      <div className="space-y-3">
        {endpoints.map((ep, idx) => (
          <div key={idx} className={`flex flex-col gap-2 rounded-xl border p-4 sm:flex-row sm:items-center sm:gap-4 ${palette.border} ${palette.card}`}>
            <span className={`inline-flex w-fit rounded-md border px-2.5 py-0.5 text-xs font-bold ${methodColors[ep.method]}`} aria-label={`${ep.method} method`}>
              {ep.method}
            </span>
            <code className="text-sm font-medium">{ep.path}</code>
            <span className={`text-sm sm:ml-auto ${palette.subtle}`}>{ep.desc}</span>
          </div>
        ))}
      </div>

      <div className={`mt-12 rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
        <h2 className="mb-4 text-xl font-semibold">Example Request</h2>
        <div className="relative">
          <pre className={`overflow-x-auto rounded-lg border p-4 pr-12 text-sm ${palette.border} ${palette.highlight}`}>
            <code>{exampleRequest}</code>
          </pre>
          <CopyButton text={exampleRequest} />
        </div>
        <h2 className="mb-4 mt-8 text-xl font-semibold">Example Response</h2>
        <div className="relative">
          <pre className={`overflow-x-auto rounded-lg border p-4 pr-12 text-sm ${palette.border} ${palette.highlight}`}>
            <code>{exampleResponse}</code>
          </pre>
          <CopyButton text={exampleResponse} />
        </div>
      </div>
    </div>
  );
}
